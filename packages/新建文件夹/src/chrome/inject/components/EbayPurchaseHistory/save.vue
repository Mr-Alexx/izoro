<template>
  <div class="search-wrapper">
    <el-form :model="form" label-width="60px">
      <el-form-item label="属性匹配">
        <el-input
          v-model="form.variation"
          @keypress.native.enter="search"
          placeholder="多个条件用英文逗号隔开"
          type="textarea"
          rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item label="时间匹配">
        <el-input
          v-model="form.date"
          @keypress.native.enter="search"
          placeholder="多个条件用英文逗号隔开"
          type="textarea"
          rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetCount">重置</el-button>
        <el-button type="primary" :loading="loading" @click="search">
          确定
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 搜索结果 -->
    <div class="search-result">
      <el-table :data="data" :loading="loading" :max-height="400">
        <el-table-column
          prop="keyword"
          label="匹配字符"
          align="left"
          min-width="130px"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="left"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="count"
          label="总数"
          align="center"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="totalPrice"
          label="总价"
          align="center"
          min-width="75px"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import $ from "@/plugins/umbrella.min.js";
// import clip from "@/utils/clipboard";

import $ from "jquery";
window.$ = $;

export default {
  name: "App",
  components: {},
  data() {
    return {
      loading: false,
      form: {
        variation: "",
        date: ""
      },
      data: [],
      table: this.table,
      dateTds: {
        td: [],
        tdHtml: [],
        text: []
      },
      variationTds: {
        td: [],
        tdHtml: [],
        text: []
      },
      priceTdsHtml: []
    };
  },
  computed: {},
  mounted() {
    // 1. 保存列Variation的元素和html
    // 2. 保存Date of Purchase列的元素和html
    // 3. 保存Price列的html，价格统计用
    this.table = $(".revmsg")
      .next()
      .next();
    const ths = $(this.table).find("tr th");

    let variationIndex, dateIndex, priceIndex;
    let text = "";
    // 因为列的位置不固定，需要通过字符去匹配各列的位置，通过位置去找到对应的内容
    $(ths).each((index, th) => {
      text = $(th).text();
      if (!text) {
        return;
      }
      if (text.match(/variation/gi)) {
        variationIndex = index + 1;
      } else if (text.match(/date of purchase/gi)) {
        dateIndex = index + 1;
      } else if (text.match(/price/gi)) {
        priceIndex = index + 1;
      }
    });

    // 1
    this.variationTds.td = $(this.table)
      .find(`tr td:nth-child(${variationIndex})`)
      .toArray();
    this.variationTds.td.forEach(td =>
      $(td).html(
        $(td)
          .html()
          .replace(/<b>|<\/b>/g, "")
      )
    );
    this.variationTds.tdHtml = this.variationTds.td.map(td => $(td).html());
    this.variationTds.text = this.variationTds.td.map(td => $(td).text());
    // 2
    this.dateTds.td = $(this.table)
      .find(`tr td:nth-child(${dateIndex})`)
      .toArray();
    this.dateTds.tdHtml = this.dateTds.td.map(td => $(td).html());
    this.dateTds.text = this.dateTds.td.map(td => $(td).text());
    // 3
    this.priceTdsHtml = $(this.table)
      .find(`tr td:nth-child(${priceIndex})`)
      .map((i, td) => $(td).html())
      .toArray();

    // 初始搜索结果
    if (localStorage.ebayPurchaseHistorySearchKeyword) {
      this.form = JSON.parse(localStorage.ebayPurchaseHistorySearchKeyword);
    }
    this.search();
    ("Compatible Model: For Apple iPhone 12 Pro MaxColour: Clear");
    ("Compatible Model: For Apple iPhone XR Colour: Clear");
  },
  methods: {
    /**
     * @description 搜索方法
     */
    search() {
      // 保存搜索过得结果，新开页用
      localStorage.ebayPurchaseHistorySearchKeyword = JSON.stringify(this.form);

      // 注意判断条件：由于"".trim()会返回String{""}类型（object），所以不能用!"".trim()判断
      if (
        Object.values(this.form).every(
          v => v.trim() === "" || typeof v.trim() === "object"
        )
      ) {
        // 初始统计
        this.resetCount();
        return;
      }
      this.loading = true;
      const { variation, date } = this.form;
      const variationList = variation.split(",");
      const dateList = date.split(",");

      this.data = [
        ...this.countAndHighlight(variationList, "variation"),
        ...this.countAndHighlight(dateList, "date")
      ];
      this.loading = false;
    },
    /**
     * @description 关键字搜索对应td，并高亮
     * @param { array } queryList
     * @param { string } type variation/date
     * @return {}
     */
    countAndHighlight(queryList = [], type = "date") {
      if (queryList.length === 0) {
        return queryList;
      }
      const key = type + "Tds";
      const tdsHtml = this[key].tdHtml;
      const tds = this[key].td;
      let reg = "",
        result = [];
      queryList.forEach(keyword => {
        if (!keyword) {
          return;
        }
        reg = new RegExp(keyword.trim(), "ig");
        const temp = {
          keyword,
          totalPrice: 0,
          count: 0,
          type: type === "date" ? "时间" : "属性"
        };

        // 统计匹配项与着色
        let html = "";
        tds.forEach((td, index) => {
          html = $(td).html(); // $(td).html();
          if (!reg.test(tdsHtml[index])) {
            $(tds[index]).html(tdsHtml[index]);
            return;
          }
          // if (!reg.test(tdTexts[index])) {
          //   return;
          // }
          // 统计
          temp.count += 1;
          temp.totalPrice += Number(
            /* eslint-disable-next-line */
            this.priceTdsHtml[index].replace(/[^\d\.]/g, "")
          );
          // 着色
          html = html.replace(reg, res => {
            // 注意：此处res不能使用query，否则原文本会随着query变化
            return '<span class="text-active">' + res + "</span>";
          });
          $(td).html(html);
        });

        temp.totalPrice = Number(temp.totalPrice.toFixed(2));
        result.push(temp);
      });

      return result;
    },

    /**
     * @description 初始统计
     */
    resetCount() {
      this.form.variation = "";
      this.form.date = "";
      localStorage.ebayPurchaseHistorySearchKeyword = JSON.stringify(this.form);
      const temp = {
        keyword: "全匹配",
        totalPrice: 0,
        count: this.priceTdsHtml.length,
        type: "所有"
      };
      // 还原
      this.variationTds.td.forEach((td, i) => {
        $(td).html(this.variationTds.tdHtml[i]);
      });
      this.dateTds.td.forEach((td, i) => {
        $(td).html(this.dateTds.tdHtml[i]);
      });
      // 统计所有
      this.priceTdsHtml.forEach((html, index) => {
        temp.totalPrice += Number(
          /* eslint-disable-next-line */
          this.priceTdsHtml[index].replace(/[^\d\.]/g, "")
        );
      });
      temp.totalPrice = Number(temp.totalPrice.toFixed(2));
      this.data = [temp];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/var.scss";

/deep/ textarea {
  font-family: $font-family;
}
.search-wrapper {
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
}
/deep/.el-form {
  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label {
      font-size: 12px;
    }
  }
}

/deep/ .el-table {
  width: 100%;
  .cell {
    line-height: 1.2;
  }
}
/deep/ .el-textarea__inner {
  line-height: 1.2;
}
</style>

<style lang="scss">
.variationContentValueFont {
  position: relative;
}
.custom-copy {
  position: absolute;
  right: 0;
  bottom: 5px;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
}
</style>
