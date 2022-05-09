// pages/labAdmin/addLad/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    oid: '',
    _id: ''
  },

  // 公告内容
  onChangeInfo(e) {
    this.setData({
      info: e.detail
    })
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },


  // 提交
  submit() {
    const {
      info
    } = this.data
    if (!info) {
      wx.showToast({
        title: '请完善表单项',
        icon: 'error'
      })
      return
    }

    const _paramsAdd = {
      info,
      time: this.formatDate(new Date())
    }
    const _paramsEdit = {
      _id: this.data._id,
      info,
      time: this.formatDate(new Date())
    }
    wx.showToast({
      title: '添加中',
      icon: 'loading'
    })
    console.log(_paramsAdd)
    wx.cloud.callFunction({
      name: this.data.oid === '1' ? 'editNotice' : 'addNotice',
      data: this.data.oid === '1' ? {
        ..._paramsEdit
      } : {
        ..._paramsAdd
      },
      success: res => {
        wx.showToast({
          title: this.data.oid === '1' ? '修改成功' : '添加成功',
          icon: 'success'
        })
        wx.navigateTo({
          url: '/pages/noticeAdmin/index'
        })
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  //返回
  back() {
    this.data = {}
    wx.navigateTo({
      url: '/pages/noticeAdmin/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (!options.oid) return
    const detail = await JSON.parse(decodeURIComponent(options.data))
    this.setData({
      info: detail.info,
      oid: '1',
      _id: detail._id
    })
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