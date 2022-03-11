<template>
  <RightPanel>
    <div class="research-wrapper">
      <div class="sort-wrapper">
        <div class="sort-title">排序</div>
        <ul class="sort-list">
          <li class="sort-item" v-for="item in sortList" :key="item.name">
            <span class="sort-item__label">{{ item.name }}：</span>
            <el-radio
              v-model="sort"
              v-for="radio in item.list"
              :key="radio.value"
              :label="radio.value"
              @change="changeSort"
              >{{ radio.label }}</el-radio
            >
          </li>
        </ul>
      </div>

      <el-table :data="salesData">
        <el-table-column
          prop="salesAmount"
          label="总销售额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="salesNumber"
          label="总销售数量"
          align="center"
        ></el-table-column>
      </el-table>

      <div>
        <el-table :data="itemsData">
          <el-table-column
            prop="total"
            label="Item总数"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="openNumber"
            label="已打开数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="remainNumber"
            label="剩余数量"
            align="center"
          ></el-table-column>
        </el-table>
        <div>
          <span v-for="item in items" :key="item">{{ item }}</span>
        </div>
        <div>
          <el-form :model="form" label-width="70px">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="每批数量" style="margin-bottom: 10px">
                  <el-input type="number" v-model="form.eachNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="间隔(ms)" style="margin-bottom: 10px">
                  <el-input type="number" v-model="form.time"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div>
              <el-button type="primary">批量打开</el-button>
              <el-button type="primary" @click="copyItems($event)"
                >复制所有Item</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div
      v-if="false"
      class="custom-popup-3 ${slideStatus === '0' ? 'popup-hide' : ''}"
    >
      <div class="custom-popup-3-total-info">
        <div>
          总销售额
          <p id="custom-popup-total-price">0</p>
        </div>
        <div>
          总销售数
          <p id="custom-popup-total-num">0</p>
        </div>
      </div>

      <div class="custom-popup-3-wrapper" id="condition-wrapper">
        <div>
          <span style="display: inline-block; width: 6em;">平均售价：</span>
          <label>
            <input name="research-radio" type="radio" value="-avgsalesprice"
            data-key="sorting" ${paramObj.value === '-avgsalesprice' ? 'checked'
            : ''}/> 高到低
          </label>

          <label>
            <input name="research-radio" type="radio" value="avgsalesprice"
            data-key="sorting" ${paramObj.value === 'avgsalesprice' ? 'checked'
            : ''}/> 低到高
          </label>
        </div>

        <div>
          <span style="display: inline-block; width: 6em;">销量：</span>
          <label>
            <input name="research-radio" type="radio" value="-itemssold"
            data-key="sorting" ${paramObj.value === '-itemssold' ? 'checked' :
            ''}/> 高到低
          </label>

          <label>
            <input name="research-radio" type="radio" value="itemssold"
            data-key="sorting" ${paramObj.value === 'itemssold' ? 'checked' :
            ''}/> 低到高
          </label>
        </div>

        <div>
          <span style="display: inline-block; width: 6em;">总销售额：</span>
          <label>
            <input name="research-radio" type="radio" value="-totalsales"
            data-key="sorting" ${paramObj.value === '-totalsales' ? 'checked' :
            ''}/> 高到低
          </label>

          <label>
            <input name="research-radio" type="radio" value="totalsales"
            data-key="sorting" ${paramObj.value === 'totalsales' ? 'checked' :
            ''}/> 低到高
          </label>
        </div>

        <!-- 批量打开 -->
        <div style="margin-top: 20px">
          <div class="flex-item">
            <span style="display: none">
              当前页码:
              <em style="font-style: normal" id="custom-current-page">1</em>
            </span>
            <span>Item总数：<span id="url-total-num">0</span></span>
          </div>
          <div class="flex-item">
            <span>已打开数量：<span id="url-opened-num">0</span></span>
            <span>剩余数量：<span id="url-unopen-num">0</span></span>
          </div>

          <div class="custom-popup-2-result" id="custom-popup-2-result">
            加载中...
          </div>

          <div class="flex-item">
            <label>
              每批打开数量：
              <input id="custom-batch-open-num" value="${openNum}" />
            </label>
            <label>
              间隔(ms)：
              <input id="custom-batch-open-interval" value="${interval}" />
            </label>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <button id="custom-batch-open-button">批量打开</button>
          <button type="button" id="copyAllItems">复制所有item</button>
        </div>
      </div>
    </div>
  </RightPanel>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import ajaxListener from "@/utils/ajax-listener";
import $ from "jquery";
import moment from "moment";
import clip from "@/utils/clipboard";
import { getUrlParam, formatDate } from "./utils";
import { queryIfItemsInEbayProductDevelope } from "@/api/ebay";

ajaxListener();

export default {
  components: {
    RightPanel
  },
  data() {
    return {
      salesData: [{ salesAmount: 0, salesNumber: 0 }],
      itemsData: [{ total: 0, openNumber: 0, remainNumber: 0 }],
      sortList: [
        {
          name: "平均售价",
          list: [
            { value: "-avgsalesprice", label: "高到低" },
            { value: "avgsalesprice", label: "低到高" }
          ]
        },
        {
          name: "销售数量",
          list: [
            { value: "-itemssold", label: "高到低" },
            { value: "itemssold", label: "低到高" }
          ]
        },
        {
          name: "总销售额",
          list: [
            { value: "-totalsales", label: "高到低" },
            { value: "totalsales", label: "低到高" }
          ]
        }
      ],
      sort: "",
      form: {
        eachNum: 10,
        time: 200
      },
      items: ["19234324"]
    };
  },
  mounted() {
    console.log("======= Ebay Research页插件初始化 =======");
    this.init();
    // 初始默认排序
    if (localStorage.researchCondition) {
      const paramObj = JSON.parse(localStorage.researchCondition);
      this.sort = paramObj.value;
    }
  },
  methods: {
    init() {
      // 购买搜索时间快捷按键
      this.makeLeftRightArrow();
      // 构造item是否在ebay开发产品中存在
      this.queryItemIdsAndMakeLink();
      // window.addEventListener("ajaxLoadEnd", () => {
      //   setTimeout(() => {
      //     this.queryItemIdsAndMakeLink();
      //   }, 500);
      // });
    },
    /**
     * @description 切换排序
     */
    changeSort() {
      console.log(this.sort);
    },
    /**
     * @description 复制未打开的items
     */
    copyItems(e) {
      const text = this.items.join(",");
      if (text.trim().length === 0) {
        return;
      }
      clip(text, e);
    },
    /**
     * @create 2021/02/23 15:10
     * @desc 自定义时间左右加箭头，点击设置时间段删/增一个月
     */
    makeLeftRightArrow() {
      const params = getUrlParam();
      let start = params.startDate,
        end = params.endDate;
      const html = `
      <div class="arrow-container">
        <span id="leftArrow" class="custom-arrow"><</span>
        <div style="display: flex">
          <span id="rightArrow" class="custom-arrow">></span>

          <span class="custom-input">
            分类：<input id="custom-category" type="text" placeholder="请输入分类ID" />
          </span>
          <span id="customSearch" class="custom-arrow" style="width: auto; padding: 0 10px; margin-left: 20px;">搜索</span>
        </div>
      </div>
    `;
      $("section .research-container").css({ position: "relative" });
      $("section .research-container").prepend(html);

      $("#leftArrow").click(changeDate("subtract"));
      $("#rightArrow").click(changeDate("add"));

      function changeDate(type = "subtract") {
        return function() {
          // 格式为dd/mm/yyyy形式，moment会将dd识别为月
          // 故需要格式化一下
          let startDate = formatDate($(".from-container input").val()); // params.startDate
          let endDate = formatDate($(".to-container input").val()); // params.endDate

          startDate = moment(startDate)
            [type](1, "months")
            .format("DD/MM/YYYY");
          endDate = moment(endDate)
            [type](1, "months")
            .format("DD/MM/YYYY");
          start = moment(startDate)
            [type](1, "months")
            .valueOf();
          end = moment(endDate)
            [type](1, "months")
            .valueOf();

          $(".from-container input").val(startDate);
          $(".to-container input").val(endDate);
        };
      }

      $("#customSearch").click(function() {
        const params = getUrlParam();
        let startDate = formatDate($(".from-container input").val()); // params.startDate
        let endDate = formatDate($(".to-container input").val()); // params.endDate

        startDate = moment(startDate).valueOf();
        endDate = moment(endDate).valueOf();

        params.startDate = startDate;
        params.endDate = endDate;
        const categoryId = $("#custom-category").val();
        if (categoryId) {
          params.categoryId = categoryId;
        }
        const query = Object.keys(params).map(key => `${key}=${params[key]}`);
        location.replace(
          `${location.origin}${location.pathname}?${query.join("&")}`
        );
      });
    },
    /**
     * @create 2021/03/03 16:37
     * @desc itemId查ebay产品开发是否存在该itemId，有则显示链接跳转到产品开发页，itemId为参数
     * 注意：不能直接从a标签里取item，有些item没有链接的
     * hack方法，取到data-item-id 的div的上一个兄弟元素，再通过兄弟元素取出data-item-id的div
     */
    queryItemIdsAndMakeLink() {
      const list = $(".listing-container .listing-text .gh-ar-hdn");
      const itemIds = $(list).next();
      const ids = [];
      let id = "";
      for (let i = 0; i < itemIds.length; i++) {
        id = $(itemIds[i]).attr("data-item-id");
        ids.push(id);
        // 父元素为class="listing-tex"的元素
        const parent =
          $(itemIds[i])
            .parent()
            .attr("class") === "listing-text"
            ? $(itemIds[i]).parent()
            : $(itemIds[i])
                .parent()
                .parent();
        if ($(parent).find(".append-item-id").length > 0) {
          $(parent)
            .find(".append-item-id a")
            .attr(
              "href",
              `http://erp.bz-bss.com/ebay/develop-product-spu/index?DevelopProductSpuSearch[item_id]=${id}`
            );
        } else {
          $(parent).append(`
          <div class="append-item-id">
            <a href="http://erp.bz-bss.com/ebay/develop-product-spu/index?DevelopProductSpuSearch[item_id]=${id}" target="_blank" style="color: purple; font-size: 13px; text-decoration: underline;">${id}</a>
          </div>
        `);
        }
      }
      // 调用接口
      queryIfItemsInEbayProductDevelope(ids).then(data => {
        console.log(data);
      });

      // 构造链接
    }
  }
};
(function() {
  let timer = null;
  let timer2 = null;
  let paramObj = null;
  let idsArr = [];
  let openedNum = 0;

  if (localStorage.researchCondition) {
    paramObj = JSON.parse(localStorage.researchCondition);
  }

  makeLeftRightArrow();
  $(".arrow-container").css(
    "display",
    $(".select-filter.data-range-select.field .field__control select")
      .val()
      .toLowerCase() === "custom"
      ? "flex"
      : "none"
  );
  $(".select-filter.data-range-select.field .field__control select").on(
    "change",
    function() {
      $(".arrow-container").css(
        "display",
        $(this)
          .val()
          .toLowerCase() === "custom"
          ? "flex"
          : "none"
      );
    }
  );

  $('#condition-wrapper input[type="radio"]').change(function() {
    const key = $(this).data("key");
    const value = $(this).val();

    if (paramObj && paramObj.key === key && paramObj.value === value) {
      return console.log("当前已经是所选条件，不能触发");
    }
    paramObj = { key, value };
    localStorage.researchCondition = JSON.stringify(paramObj);
    listenQuery();
  });

  $("#copyAllItems").click(copyItems);

  /**
   * @date 2020/10/19 17:01
   * @description 复制item
   */
  function copyItems() {
    var tag = document.createElement("input");
    tag.setAttribute("id", "cp_hgz_input1");
    tag.value = idsArr.join(",");
    document.getElementsByTagName("body")[0].appendChild(tag);
    document.getElementById("cp_hgz_input1").select();
    document.execCommand("copy");
    document.getElementById("cp_hgz_input1").remove();
  }

  listenQuery();
  // 轮询
  function listenQuery() {
    // 重置数据
    idsArr = [];
    $("#url-total-num").text(0); // 设置item总数
    $("#url-unopen-num").text(0); // 设置未打开数量
    openedNum = 0;
    $("#url-opened-num").text(openedNum); // 重置已打开数量
    $("#custom-popup-2-result").text("加载中..."); // 显示item
    let count = 20;

    timer = setInterval(function() {
      count--;
      if (!paramObj) {
        clearInterval(timer);
        timer = null;
        return;
      }
      const queryObj = getUrlParam();
      const { key, value } = paramObj;
      if (queryObj[key] !== value) {
        if (count <= 0) {
          clearInterval(timer);
          timer = null;
          return;
        }
        console.log(count);
        const button = "." + value.replace("-", "") + " button";
        $(button).trigger("click");
      } else {
        clearInterval(timer);
        timer = null;
        console.log("done");
        // 一定要延时获取，因为trigger出发的异步操作可能还没更新dom
        // 轮询处理
        calcTotal();
      }
    }, 500);
  }

  function calcTotal() {
    let count = 1;
    timer2 = setTimeout(function() {
      const soldsList = $("td.itemssold");
      const salesList = $("td.totalsales");
      const items = $("td.listing");
      // 获取不到则循环获取，计算到10时释放
      if (count++ >= 10) {
        clearTimeout();
        timer2 = null;
        return;
      }
      if (soldsList.length === 0) {
        clearTimeout(timer2);
        timer2 = null;
        calcTotal();
        return;
      }

      let id = "",
        href = "";
      for (let i = 0; i < items.length; i++) {
        href = $(items[i])
          .find(".textual-display")
          .attr("href");
        href.replace(/.+itm\/(\d+)/g, ($1, $2) => {
          id = $2;
          idsArr.push(id);
          $(items[i]).find(".listing-text").append(`
          <div style="color: red;margin-top: 5px; font-size: 12px;">${id}</div>
        `);
        });
      }

      // const query = location.search.substr(1)
      // const paramsArr = query.split('&')
      // let queryObj = {}
      // for (let i = 0; i < paramsArr.length; i++) {
      //   const [key, value] = paramsArr[i].split('=')
      //   queryObj[key] = value
      // }

      // $('#custom-current-pag').text(queryObj.offset / queryObj.limit + 1) // 设置页码
      $("#url-total-num").text(items.length); // 设置item总数
      $("#url-unopen-num").text(items.length); // 设置未打开数量
      openedNum = 0;
      $("#url-opened-num").text(openedNum); // 重置已打开数量
      $("#custom-popup-2-result").text(idsArr.join(",")); // 显示item

      let soldsSum = 0;
      let salesSum = 0;
      // 计算总销售量
      for (let i = 0; i < soldsList.length; i++) {
        // 123,456 小心这种格式
        soldsSum += Number(
          $(soldsList[i])
            .text()
            .replace(",", "")
        );
      }

      // 计算总销售额，逗号隔开 123,456,789.12
      for (let i = 0; i < salesList.length; i++) {
        let num = $(salesList[i])
          .text()
          .substr(4);
        num = Number(num.replace(",", ""));
        num = isNaN(num) ? 0 : num; // 防止NaN
        salesSum += num;
      }
      $("#custom-popup-total-price").text(formatNum(salesSum.toFixed(2)));
      $("#custom-popup-total-num").text(formatNum(soldsSum.toFixed(0)));
      count = 1;
    }, 300);
  }

  function formatNum(num) {
    let str = num + "";
    var intSum = str
      .substring(0, str.indexOf("."))
      .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
    var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
    return intSum + dot;
  }

  // 控制popup伸缩
  $("#custom-popup-3-slide").on("click", function() {
    const html = $(this).html();
    try {
      const text = html.indexOf("收") !== -1 ? "展</br>开" : "收</br>缩";
      $(this).html(text);
      $(".custom-popup-3").toggleClass("popup-hide");
      localStorage.researchConditionOpenStatus =
        html.indexOf("收") !== -1 ? "0" : "1";
    } catch (err) {
      console.error(err);
    }
  });

  // 批量打开功能
  // 保存打开数量和间隔时间
  $("#custom-batch-open-num").on("change", function() {
    localStorage.customBatchOpenNum = $(this).val();
  });
  $("#custom-batch-open-interval").on("change", function() {
    localStorage.customBatchOpenInterval = $(this).val();
  });

  /**
   * @date 2020/07/16 09:46
   * @description 打开链接
   */
  $("#custom-batch-open-button").click(() => {
    const num = Number($("#custom-batch-open-num").val() || 1);
    const interval = Number($("#custom-batch-open-interval").val() || 10);

    if (idsArr.length === 0) {
      alert("Item数量为0");
      return;
    }

    const openedItems = idsArr.slice(0, num);
    batchOpen(openedItems, interval);
    openedNum += openedItems.length;
    idsArr.splice(0, num);
    $("#custom-popup-2-result").text(idsArr.join(","));
    $("#url-opened-num").text(openedNum);
    $("#url-unopen-num").text(idsArr.length);
  });

  /**
   * @date 2020/07/16 09:32
   * @description 批量打开
   * @param { Array } items
   * @param { Number } interval ms
   */
  function batchOpen(items, interval = 200) {
    let count = 0;
    const len = items.length;
    let timer = setInterval(() => {
      if (count >= len) {
        clearTimeout(timer);
        timer = null;
      } else {
        const item = items[count++];
        // 链接形式如下
        // https://www.ebay.com.au/itm/233662029450?_trkparms=itm%3A233662029450
        window.open(
          `https://www.ebay.com.au/itm/${item}?_trkparms=itm%3A${item}`
        );
      }
    }, interval);
  }

  /**
   * @create 2021/02/23 15:10
   * @desc 自定义时间左右加箭头，点击设置时间段删/增一个月
   */
  function makeLeftRightArrow() {
    const params = getUrlParam();
    let start = params.startDate,
      end = params.endDate;
    const html = `
      <div class="arrow-container">
        <span id="leftArrow" class="custom-arrow"><</span>
        <div style="display: flex">
          <span id="rightArrow" class="custom-arrow">></span>

          <span class="custom-input">
            分类：<input id="custom-category" type="text" placeholder="请输入分类ID" />
          </span>
          <span id="customSearch" class="custom-arrow" style="width: auto; padding: 0 10px; margin-left: 20px;">搜索</span>
        </div>
      </div>
    `;
    $("section .research-container").css({ position: "relative" });
    $("section .research-container").prepend(html);

    $("#leftArrow").click(changeDate("subtract"));
    $("#rightArrow").click(changeDate("add"));

    function changeDate(type = "subtract") {
      return function() {
        // 格式为dd/mm/yyyy形式，moment会将dd识别为月
        // 故需要格式化一下
        let startDate = formatDate($(".from-container input").val()); // params.startDate
        let endDate = formatDate($(".to-container input").val()); // params.endDate

        startDate = moment(startDate)
          [type](1, "months")
          .format("DD/MM/YYYY");
        endDate = moment(endDate)
          [type](1, "months")
          .format("DD/MM/YYYY");
        start = moment(startDate)
          [type](1, "months")
          .valueOf();
        end = moment(endDate)
          [type](1, "months")
          .valueOf();

        $(".from-container input").val(startDate);
        $(".to-container input").val(endDate);
      };
    }

    $("#customSearch").click(function() {
      const params = getUrlParam();
      let startDate = formatDate($(".from-container input").val()); // params.startDate
      let endDate = formatDate($(".to-container input").val()); // params.endDate

      startDate = moment(startDate).valueOf();
      endDate = moment(endDate).valueOf();

      params.startDate = startDate;
      params.endDate = endDate;
      const categoryId = $("#custom-category").val();
      if (categoryId) {
        params.categoryId = categoryId;
      }
      const query = Object.keys(params).map(key => `${key}=${params[key]}`);
      location.replace(
        `${location.origin}${location.pathname}?${query.join("&")}`
      );
    });
  }

  function formatDate(data) {
    const [d, m, y] = data.split("/");
    return `${y}-${m}-${d}`;
  }
})(window, document);
</script>

<style lang="scss" scoped>
.research-wrapper {
  padding: 15px;
}
.sort-wrapper {
}
.sort-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sort-item {
  display: flex;

  &__label {
    width: 70px;
    text-align: right;
  }
}
/deep/.el-form-item {
  margin-bottom: 5px;
}
</style>
