// pages/insAdmin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: []
  },


  //获取数据
  getNoticeList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('lab_notice_list')
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            noticeList: res.data
          });
        }
      })
  },


  // 添加公告
  onOpenAddDialog() {
    wx.navigateTo({
      url: '/pages/noticeAdmin/addNotice/index',
    })
  },

  // 删除公告
  removeNotice(e) {
    wx.cloud.callFunction({
      name: 'deleteNotice',
      data: {
        _id: e.currentTarget.dataset.index
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        this.getNoticeList()
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

  // 编辑公告
  editNotice(e) {
    wx.navigateTo({
      url: '/pages/noticeAdmin/addNotice/index?oid=1&data=' + JSON.stringify(this.data.noticeList[e.currentTarget.dataset.index])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList()
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