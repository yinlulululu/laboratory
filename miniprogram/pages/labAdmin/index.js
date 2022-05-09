// pages/labAdmin/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  //获取数据
  getAddressList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('lab_list')
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            addressList: res.data
          });
        }
      })
  },


  // 添加实验室
  onOpenAddDialog() {
    wx.navigateTo({
      url: '/pages/labAdmin/addLab/index',
    })
  },

  // 删除实验室
  removeLab(e) {
    console.log(e.currentTarget.dataset.index)
    wx.cloud.callFunction({
      name: 'deleteLab',
      data: {
        _id: e.currentTarget.dataset.index
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        this.getAddressList()
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

  // 编辑实验室
  editLab(e) {
    wx.navigateTo({
      url: '/pages/labAdmin/addLab/index?oid=1&data=' + JSON.stringify(this.data.addressList[e.currentTarget.dataset.index])
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
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