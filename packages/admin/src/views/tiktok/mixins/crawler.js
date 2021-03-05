export default {
  data () {
    return {
      dimensionList: [ // 维度列表
        { value: 1, label: '综合' },
        { value: 2, label: '视频' },
        { value: 3, label: '用户' },
        { value: 4, label: '直播' },
        { value: 5, label: '商品' },
        { value: 6, label: '话题' }
      ],
      fansNumList: [ // 粉丝数列表
        { value: '0-10000', label: '<1万' },
        { value: '10000-100000', label: '1-10万' },
        { value: '100000-1000000', label: '10-100万' },
        { value: '1000000-5000000', label: '100-500万' },
        { value: '5000000-10000000', label: '500-1000万' },
        { value: '10000000', label: '>1000万' }
      ],
      likeNumList: [ // 点赞数列表
        { value: '', label: '不限' },
        { value: '0-10000', label: '<1万' },
        { value: '10000-100000', label: '1-10万' },
        { value: '100000-1000000', label: '10-100万' },
        { value: '1000000-5000000', label: '100-500万' },
        { value: '5000000-10000000', label: '500-1000万' },
        { value: '10000000', label: '>1000万' }
      ],
      worksNumList: [ // 作品数列表
        { value: '', label: '不限' },
        { value: '10-50', label: '10-50' },
        { value: '50-100', label: '50-100' },
        { value: '100-150', label: '100-150' },
        { value: '150-200', label: '150-200' },
        { value: '200', label: '>200' }
      ],
      isOpenWindowList: [ // 是否开通橱窗列表
        { value: '', label: '不限' },
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      areaList: [ // 地区列表
        { value: '', label: '不限' },
        { value: 1, label: '广州' },
        { value: 2, label: '北京' },
        { value: 3, label: '上海' },
        { value: 4, label: '杭州' }
      ],
      percentageOfFansList: [ // 占粉比列表
        { value: '', label: '不限' },
        { value: '40-50', label: '40-50%' },
        { value: '50-60', label: '50-60%' },
        { value: '60-70', label: '60-70%' },
        { value: '70-80', label: '70-80%' },
        { value: '80-90', label: '80-90%' },
        { value: '90-100', label: '90-100%' }
      ],
      ageList: [ // 年龄段列表
        { value: '', label: '不限' },
        { value: '0-18', label: '<18' },
        { value: '18-23', label: '18-23' },
        { value: '23-24', label: '23-24' },
        { value: '24-30', label: '24-30' },
        { value: '30-40', label: '30-40' },
        { value: '40-50', label: '40-50' },
        { value: '50', label: '>50' }
      ]
    }
  }
}
