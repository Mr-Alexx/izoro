<template>
  <RightPanel>
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
          <el-button @click="handleClear">重置</el-button>
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
          >
            <span slot-scope="{ row }" v-html="row.keyword"></span>
          </el-table-column>
          <el-table-column
            prop="type"
            label="匹配类型"
            align="center"
            min-width="70px"
          ></el-table-column>
          <el-table-column
            prop="count"
            label="总数"
            align="center"
            min-width="45px"
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
  </RightPanel>
</template>

<script>
import RightPanel from "@/components/RightPanel";

// import clip from "@/utils/clipboard";
let count = 0;
let totalPrice = 0;

import $ from "jquery";
window.$ = $;

export default {
  name: "PurchaseHistory",
  components: {
    RightPanel
  },
  data() {
    return {
      loading: false,
      form: {
        variation: "",
        date: ""
      },
      data: [],
      table: null,
      date: {
        tds: [],
        htmls: []
      },
      variation: {
        tds: [],
        htmls: []
      },
      priceList: []
    };
  },
  mounted() {
    console.log("======= ebay购买历史页插件初始化成功 =======");

    this.table = $(".revmsg")
      .next()
      .next();
    let variationIndex, dateIndex, priceIndex;
    let text = "";
    const ths = $(this.table).find("tr th");

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
    this.variation.tds = $(this.table)
      .find(`tr td:nth-child(${variationIndex})`)
      .toArray();
    this.variation.tds.forEach(td =>
      $(td).html(
        $(td)
          .html()
          .replace(/<b>|<\/b>/g, "")
      )
    );
    this.variation.htmls = this.variation.tds.map(td => $(td).html());
    this.variation.text = this.variation.tds.map(td => $(td).text());
    // 2
    this.date.tds = $(this.table)
      .find(`tr td:nth-child(${dateIndex})`)
      .toArray();
    this.date.htmls = this.date.tds.map(td => $(td).html());
    // 3
    /* eslint-disable */
    this.priceList = $(this.table)
      .find(`tr td:nth-child(${priceIndex})`)
      .map((i, td) =>
        Number(
          $(td)
            .html()
            .replace(/[^\d\.]/g, "")
        )
      )
      .toArray();

    // 初始搜索结果
    if (localStorage.ebayPurchaseHistorySearchKeyword) {
      this.form = JSON.parse(localStorage.ebayPurchaseHistorySearchKeyword);
    }

    this.search();
  },
  methods: {
    search() {
      localStorage.ebayPurchaseHistorySearchKeyword = JSON.stringify(this.form);
      // 注意判断条件：由于"".trim()会返回String{""}类型（object），所以不能用!"".trim()判断
      if (
        Object.values(this.form).every(
          v => v.trim() === "" || typeof v.trim() === "object"
        )
      ) {
        // 初始统计
        this.handleClear();
        return;
      }
      // localStorage.ebayTimeSearchKeyword = value
      const { variation, date } = this.form;

      this.data = [
        ...this.formatMoreConditionRes(
          "variation",
          variation,
          this.countAndHighlight(variation, "variation")
        ),
        ...this.formatMoreConditionRes(
          "date",
          date,
          this.countAndHighlight(date, "date")
        )
      ];
      // const res = this.countAndHighlight(value);
      // this.formatMoreConditionRes(value, res);
    },
    /**
     * @description 构造多条件结果显示
     */
    formatMoreConditionRes(type = "date", value) {
      // 按逗号切割的条件分开匹配，有多个条件时才执行
      const queryList = value.split(",");

      const { htmls } = this[type];

      const obj = {};
      let reg = "";
      try {
        if (queryList.length === 0) {
          return;
        }
        // 筛选符合条件内容
        queryList.forEach(item => {
          if (!item) {
            return;
          }
          reg = new RegExp(
            type === "date" ? item : item.split("\n").join(".*"),
            "gi"
          );
          obj[item] = {
            total: 0,
            count: 0,
            list: htmls.filter(text => reg.test(text))
          };

          for (let i = 0, len = htmls.length; i < len; i++) {
            if (reg.test(htmls[i])) {
              obj[item].count += 1;
              obj[item].total += this.priceList[i];
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
      // 构造html
      const data = Object.keys(obj).map(key => {
        return {
          keyword: key.split("\n").join("<br>"),
          totalPrice: Number(obj[key].total.toFixed(2)),
          count: obj[key].count,
          type: type === "date" ? "时间" : "属性"
        };
      });
      return data;
      // return data.length > 1
      //   ? data.concat([
      //       {
      //         keyword: "所有匹配项",
      //         totalPrice: Number(res.total.toFixed(2)),
      //         count: res.count
      //       }
      //     ])
      //   : data;
    },
    /**
     * @description 单个字符查找
     */
    countAndHighlight(query, type = "date") {
      if (query === "") {
        return;
      }

      // 多个条件，逗号隔开
      query = query.replace(/,/gi, "|");

      const { tds, htmls } = this[type];

      count = 0;
      totalPrice = 0;
      let html = "";
      // 属性有多个情况，需要将回车转化为且符号（|）
      const reg = new RegExp(
        type === "date" ? query : query.split("\n").join(".*"),
        "gi"
      );

      tds.forEach((td, i) => {
        html = htmls[i];
        if (reg.test(html)) {
          count++;
          $(td).html(
            html.replace(reg, res => {
              // 注意：此处res不能使用query，否则原文本会随着query变化
              return '<span class="text-active">' + res + "</span>";
            })
          );
          totalPrice += this.priceList[i];
        } else {
          $(td).html(htmls[i]);
        }
      });

      return { total: totalPrice, count };
    },
    /**
     * @description 清空按钮事件
     */
    handleClear() {
      this.form.date = "";
      this.form.variation = "";
      localStorage.ebayPurchaseHistorySearchKeyword = JSON.stringify(this.form);
      count = 0;
      totalPrice = 0;
      const { tds, htmls } = this.date;
      for (let i = 0; i < tds.length; i++) {
        $(tds[i]).html(htmls[i]);
      }
      this.data = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

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
