// pages/insAdmin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insList: []
  },


  //获取数据
  getInsList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('lab_instrument_list')
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            insList: res.data
          });
        }
      })
  },


  // 添加仪器
  onOpenAddDialog() {
    wx.navigateTo({
      url: '/pages/insAdmin/addIns/index',
    })
  },

  // 删除仪器
  removeIns(e) {
    wx.cloud.callFunction({
      name: 'deleteIns',
      data: {
        _id: e.currentTarget.dataset.index
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        this.getInsList()
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

  // 编辑仪器
  editIns(e) {
    wx.navigateTo({
      url: '/pages/insAdmin/addIns/index?oid=1&data=' + JSON.stringify(this.data.insList[e.currentTarget.dataset.index])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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