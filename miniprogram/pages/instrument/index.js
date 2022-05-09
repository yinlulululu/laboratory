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
    insList: [],
    ins_status_value: '',
    ins_status_option: [{
      text: '全部状态',
      value: ''
    }, {
      text: '完好',
      value: '1'
    }, {
      text: '损坏',
      value: '2'
    }]
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
            ins_option: [...this.data.ins_option, ..._option]
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
    const _ = db.command


    db.collection('lab_instrument_list')
      .where(
        _.or([{
          ins_address: db.RegExp({
            regexp: this.data.ins_value,
          }),
          ins_status: db.RegExp({
            regexp: this.data.ins_status_value,
          }),
        }])
      )
      .get({
        success: res => {
          console.log(res.data)
          wx.hideLoading()
          this.setData({
            insList: res.data
          })
        }
      })
  },

  // 选择仪器地址
  handleChangeIns(e) {
    this.setData({
      ins_value: e.detail
    })
    this.getInsList()
  },

  // 选择仪器状态
  handleChangeStatus(e) {
    this.setData({
      ins_status_value: e.detail
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