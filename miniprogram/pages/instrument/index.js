// pages/instrument/index1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ins_option: [{
      text: '全部仪器',
      value: ''
    }],
    ins_value: '',
    insList: [{
        ins_name: '烧杯',
        ins_address: '农大新区兽医',
        ins_status: '1', // 1 完好 2 损坏
        ins_img: 'cloud://yinlu-3bit0.7969-yinlu-3bit0-1302890904/lab/ins/1.png'
      },
      {
        ins_name: '烧杯',
        ins_address: '农大新医学院',
        ins_status: '1', // 1 完好 2 损坏
        ins_img: 'cloud://yinlu-3bit0.7969-yinlu-3bit0-1302890904/lab/ins/1.png'
      },
      {
        ins_name: '烧杯',
        ins_address: '农大新区9兽医学院',
        ins_status: '1', // 1 完好 2 损坏
        ins_img: 'cloud://yinlu-3bit0.7969-yinlu-3bit0-1302890904/lab/ins/1.png'
      },
      {
        ins_name: '烧杯',
        ins_address: '农大新兽医学院',
        ins_status: '1', // 1 完好 2 损坏
        ins_img: 'cloud://yinlu-3bit0.7969-yinlu-3bit0-1302890904/lab/ins/1.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInsOptionList()
    this.getInsList()
  },

  // 仪器地址列表
  getInsOptionList() {
    const db = wx.cloud.database()
    db.collection('lab_list')
      .get({
        success: res => {
          const _option = res.data.map((item) => {
            return {
              text: item.name,
              value: item.name
            }
          })
          this.setData({
            ins_option: [..._option, ...this.data.ins_option]
          })

        }
      })
  },

  // 仪器列表
  getInsList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('lab_instrument_list')
      // .where({
      //   ins_address: this.data.ins_value
      // })
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            insList: res.data
          })
        }
      })
  },

  // 选择仪器地址
  handleChangeIns(e) {

    console.log(this.data.ins_value)
    this.setData({
      ins_option: [{
        text: '全部仪器',
        value: ''
      }]
    })
    this.getInsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})