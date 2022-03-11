<template>
  <div style="display: none">抖音拉单插件</div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
const API_URL =
  "https://callback.erp.bz-bss.com/tiktok/tiktok-selection-alliance-order?token=e8bf1231-b9c7-4e7e-b9b7-ef8835c8345a";
const utils = {
  fetch: function(url, params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        type: "GET",
        data: params,
        success(res) {
          resolve(res);
        },
        error(e) {
          reject(e.responseText);
        }
      });
    });
  },
  post: function(url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        type: "POST",
        data: {
          rawData: JSON.stringify(data)
        },
        success(res) {
          resolve(res);
        },
        error(e) {
          reject(e.responseText);
        }
      });
    });
  },
  /**
   * @description 封装ajax请求
   * @return { Promise }
   */
  fetchList: function(items) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API_URL + "/ebay/ebay-rank-item-data",
        type: "POST",
        data: {
          data: JSON.stringify(items)
        },
        success(res) {
          res = JSON.parse(res);
          resolve(res.data);
        },
        error(e) {
          reject(e.responseText);
        }
      });
    });
  },
  /**
   * @desc 获取查询字符指定名称的值
   * @param { String } queryKey
   */
  getQueryKeyValue: function(queryKey, query) {
    query = query || location.search.substr(1);
    const queryArr = query.split("&");
    let queryObj = {};
    queryArr.forEach(item => {
      const [key, value] = item.split("=");
      queryObj[key] = value;
    });
    return queryObj[queryKey];
  }
};

export default {
  data() {
    return {
      href: location.href,
      startDate: "2020-12-11 00:00:00", // 开始拉单日期
      list: [], // 列表
      timer: null,
      userId: ""
    };
  },
  mounted() {
    console.log("======== 初始化抖音拉单插件 ========");
    this.init();
  },
  methods: {
    init: async function() {
      const userInfo = await utils.fetch(
        "https://buyin.jinritemai.com/index/getUser"
      );
      this.userId = userInfo.data.origin_uid;
      this.crawlOrderList(); // 付款订单
      this.crawlOrderList(3); // 结算订单
      this.crawlLiveRoomList();

      // 一小时执行一次
      setInterval(() => {
        this.crawlOrderList();
        this.crawlOrderList(3);
        this.crawlLiveRoomList();
      }, 1000 * 60 * 60);
    },
    /**
     * @create 2021/01/06 15:46
     * @desc 功能1，拉取页面订单
     * @example 示例地址：https://buyin.jinritemai.com/dashboard/dataCenter/order
     * 步骤：
     * ① 开始时间为2021-01-04 00:00:00，结束时间为 当前年-月-日 23:59:59
     * ② 从第一页，每页1000单去查，查到时传给后台，直到该条件下所有条数为止
     * ③ 延时5秒（防止接口检测），继续第二步，直到查完所有时间
     * @modify 2021/03/11 09:20
     * @modifyDesc 拉单时间段设置为近60天内的
     */
    crawlOrderList: async function(timeType = 1) {
      // 只拉取截止到当前快照的时间
      const now = moment();
      const end_time = parseInt(moment(now).valueOf() / 1000);
      const start_time = parseInt(
        moment(now)
          .subtract(74, "days")
          .valueOf() / 1000
      ); // 当前时间往前推60天
      // 时间分组
      let page = 0;
      const PAGE_SIZE = 200;
      const data = await utils.fetch(
        "https://buyin.jinritemai.com/api/author/order/details",
        {
          // author_app_id: 1128,
          // user_id: 4010627395486685,
          start_time,
          end_time,
          page: ++page,
          pageSize: PAGE_SIZE,
          time_type: timeType // 时间类型：1: 付款时间，3: 结算时间
        }
      );
      if (!data || Number(data.total) === 0) {
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
      // 入库
      this.putInStorage(data.data);
      let total = data.total;
      // 总条数小于(PAGE_SIZE + PAGE_SIZE * (page - 1))，说明数据获取完了
      if (total <= PAGE_SIZE) {
        return;
      }
      this.timer = setInterval(async () => {
        if (total <= PAGE_SIZE + PAGE_SIZE * (page - 1)) {
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        const data = await utils.fetch(
          "https://buyin.jinritemai.com/api/author/order/details",
          {
            // author_app_id: 1128,
            // user_id: 4010627395486685,
            start_time,
            end_time,
            page: ++page,
            pageSize: PAGE_SIZE,
            time_type: timeType // 时间类型：1: 付款时间，2: 结算时间
          }
        );
        if (!data.data) {
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        this.putInStorage(data.data);
      }, 5000);

      // 订单状态 order_status = { REFUND: '订单退款退货', PAY_SUCC: '订单付款' }
      // 商品来源，只有小店一个 promotion_source = { 4: '小店' }
      /********** 字段说明 **********/
      // {
      //   account_type: "快速账户" // 买家账号类型
      //   commission_rate: 2000, // 佣金率，需除以100
      //   confirm_time: 1, // 确认时间
      //   estimated_comission: 1422, // 预估佣金收入，除以100
      //   estimated_inst_comission: 0, // 预估佣金收入-机构，除以100
      //   estimated_user_comission: 1422, // 预估佣金收入-达人，除以100
      //   order_id: "4749414968096020393", // 订单id
      //   order_status: "PAY_SUCC", // 订单状态
      //   pay_time: 1609904373, // 支付时间，秒
      //   platform_service_fee: 158, // 技术服务费，除以100
      //   product_detail: "https://haohuo.jinritemai.com/views/product/detail?id=3435386238826362085", // 产品详情地址
      //   product_id: "3435386238826362085", // 产品id
      //   product_name: "瑜伽服秋冬款女外穿紧身运动套装高腰提臀跑步速干蜜桃臀健身裤", // 产品名称
      //   promotion_source: 4, // 商品来源
      //   real_comission: 0, // 实际佣金??
      //   settle_inst_comission: 0, // 结算佣金收入-机构
      //   settle_time: 1, // 结算时间
      //   settle_user_comission: 0, // 结算佣金收入-达人
      //   total_commission: 1580, // 总佣金，除以100
      //   total_pay_amount: 7900, // 实际支付金额，除以100
      //   user_name: "Mooki瑜伽（早上9:30直播）", // 直播名称
      //   user_profit_ratio: 10000 // 分成比例-达人，除以100
      // }
    },
    /**
     * @create 2021/01/06 16:19
     * @desc 功能2，拉取直播场次列表和各场次直播数据
     * @example 实例地址
     * 直播场次列表：https://buyin.jinritemai.com/dashboard/livedata/index
     * 直播场次详情：https://buyin.jinritemai.com/dashboard/livedata/detail?room_id=6914455303702448909
     * 步骤：
     * ① 获取直播场次列表
     * ② 定时每间隔5s获取各场次直播数据
     *
     * @modify 2021/03/11 09:29
     * @modifyDesc 直播间数据每次只爬4条（昨天跟今天）
     */
    crawlLiveRoomList: async function() {
      // 直播场次列表
      const data = await utils.fetch(
        "https://buyin.jinritemai.com/api/livepc/data/list/",
        {
          page: 0,
          size: 20,
          aggregated_data: 1
        }
      );
      const rooms = (data.data || {}).rooms || [];
      // 直播间列表入库
      utils.post(
        `https://callback.erp.bz-bss.com/tiktok/tiktok-settle-room-data?token=e8bf1231-b9c7-4e7e-b9b7-ef8835c8345a&user_id=${this.userId}`,
        {
          data: data.data
        }
      );

      // 每隔5秒去爬直播间的详情数据
      rooms.forEach((room, i) => {
        setTimeout(
          id => {
            this.crawlLiveRoomDashboardInfo(id); // 爬取看板数据
            this.crawlLiveRoomProductList(id); // 爬取商品列表
          },
          i * 2000,
          room.room_id
        );
      });
    },
    /**
     * @create 2021/01/11 16:21
     * @desc 订单入库
     */
    putInStorage: function(data) {
      utils
        .post(
          `https://callback.erp.bz-bss.com/tiktok/tiktok-selection-alliance-order?token=e8bf1231-b9c7-4e7e-b9b7-ef8835c8345a&user_id=${this.userId}`,
          data
        )
        .then(res => {
          res = JSON.parse(res);
          if (res.code === -1) {
            return Promise.reject(res.message);
          }
          console.log("入库成功");
        })
        .catch(err => console.error(err));
    },
    /**
     * @create 2021/02/25 14:07
     * @desc 爬取单个直播间详情商品信息
     * @param { String } room_id 直播间id
     */
    crawlLiveRoomDashboardInfo(room_id) {
      utils
        .fetch(
          `https://buyin.jinritemai.com/api/livepc/data/room/overview/?room_id=${room_id}`
        )
        .then(data => {
          // console.log(`直播间: ${room.room_id}`, data)
          // 单个直播间详情入库
          utils.fetch(
            `https://callback.erp.bz-bss.com/tiktok/tiktok-live-room-data?token=e8bf1231-b9c7-4e7e-b9b7-ef8835c8345a&user_id=${
              this.userId
            }&rawData=${JSON.stringify({
              data: {
                ...data.data,
                room_id
              }
            })}`
          );
        });
    },
    /**
     * @create 2021/02/25 14:09
     * @desc 爬取单个直播间详情整体看板信息
     * @param { String } room_id 直播间id
     */
    crawlLiveRoomProductList(room_id) {
      utils
        .fetch(
          `https://buyin.jinritemai.com/api/livepc/data/room/product/list/?room_id=${room_id}&page=1&size=100&sort_field=bind_time`
        )
        .then(data => {
          console.log(`商品列表: ${room_id}`, data);
          // 单个直播间详情入库
          utils.fetch(
            `https://callback.erp.bz-bss.com/tiktok/tiktok-live-room-product-stats-data?token=e8bf1231-b9c7-4e7e-b9b7-ef8835c8345a&user_id=${
              this.userId
            }&rawData=${JSON.stringify({
              data: data.data.products,
              room_id
            })}`
          );
        });
    }
  }
};
</script>
