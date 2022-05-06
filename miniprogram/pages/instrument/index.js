// pages/instrument/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ins_option: [{
        text: '全部仪器',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      },
    ],
    ins_value: 0,
    insList: [{
      ins_name: '烧杯',
      ins_address: '农大新区兽医学院',
      ins_status: '1', // 1 完好 2 损坏
      ins_img: ''
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})