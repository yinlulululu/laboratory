// pages/labAdmin/addLad/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showStartTime: false,
    showEndTime: false,
    showCategory: false,
    actions: [{
        name: '农大新区',
        subname: '内蒙古自治区呼和浩特市赛罕区东影南路'
      },
      {
        name: '农大西区',
        subname: '内蒙古自治区呼和浩特市赛罕区昭乌达路306号内蒙古农大西校区'
      },
      {
        name: '农大东区',
        subname: '内蒙古自治区呼和浩特市赛罕区林苑路',
      },
    ],
    name: '', // 实验室名称
    seat: '', // 实验室座位数量
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    categoryName: '', // 分类校区
    address: '', // 地址
    latitude: '',
    longitude: '',
    fileList: [],
    oid: '',
    _id: ''
  },

  // 实验室名称
  onChangeName(e) {
    this.setData({
      name: e.detail
    })
  },
  // 座位数量
  onChangeSeats(e) {
    this.setData({
      seat: e.detail
    })
  },

  // 开始时间弹窗
  onShowStart() {
    this.setData({
      showStartTime: true
    })
  },

  // 关闭时间弹窗
  closeStartTime() {
    this.setData({
      showStartTime: false
    })
  },
  // 确认开始时间
  confirmStartTime(e) {
    this.setData({
      startTime: e.detail,
      showStartTime: false
    })
  },

  // 结束时间弹窗
  onShowEnd() {
    this.setData({
      showEndTime: true
    })
  },

  // 关闭结束时间弹窗
  closeEndTime() {
    this.setData({
      showEndTime: false
    })
  },
  // 确认结束时间
  confirmEndTime(e) {
    this.setData({
      endTime: e.detail,
      showEndTime: false
    })
  },

  // 选择校区
  onShowCategoryName() {
    this.setData({
      showCategory: true
    })
  },
  // 选择校区
  onSelect(e) {
    console.log(e)
    this.setData({
      showCategory: false,
      categoryName: e.detail.name
    })
  },

  // 选择地址
  onShowAddress() {
    const _this = this
    wx.chooseLocation({
      success: function (res) {
        _this.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(res)
      }
    })
  },

  //选择图片
  afterRead(event) {
    console.log(event)
    const {
      file
    } = event.detail;
    this.setData({
      fileList: [{
        url: file.url
      }]
    })
    this.uploadToCloud()
  },

  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const {
      fileList
    } = this.data;
    if (!fileList.length) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo-lab${Date.now()}}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          });
          const newFileList = data.map(item => ({
            url: item.fileID
          }));
          this.setData({
            cloudPath: data,
            fileList: newFileList
          });
        })
        .catch(e => {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },


  // 提交
  submit() {
    const {
      name,
      seat,
      address,
      categoryName,
      latitude,
      longitude,
      startTime,
      endTime,
      fileList
    } = this.data
    console.log(this.data)
    if (!name || !seat || !address || !categoryName || !latitude || !longitude || !startTime || !endTime || !fileList.length) {
      wx.showToast({
        title: '请完善表单项',
        icon: 'error'
      })

      return
    }
    let _category_id = ''
    if (categoryName === '农大新区') {
      _category_id = '1'
    } else if (categoryName === '农大西区') {
      _category_id = '2'
    } else {
      _category_id = '3'
    }
    let _seats = []
    for (let i = 0; i < seat; i++) {
      _seats.push({
        selected: '0',
        sid: String(i + 1)
      })
    }
    const _paramsAdd = {
      name,
      address,
      category_id: _category_id,
      img_src: fileList[0].url,
      latitude,
      longitude,
      time: `${startTime} - ${endTime}`,
      seat: _seats
    }
    const _paramsEdit = {
      _id: this.data._id,
      name,
      address,
      category_id: _category_id,
      img_src: fileList[0].url,
      latitude,
      longitude,
      time: `${startTime} - ${endTime}`,
      seat: _seats
    }
    wx.showToast({
      title: '添加中',
      icon: 'loading'
    })
    wx.cloud.callFunction({
      name: this.data.oid === '1' ? 'editLab' : 'addLab',
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
          url: '/pages/labAdmin/index'
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
      url: '/pages/labAdmin/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (!options.oid) return
    const detail = await JSON.parse(decodeURIComponent(options.data))
    this.setData({
      name: detail.name,
      seat: detail.seat.length,
      startTime: detail.time.split(' - ')[0],
      endTime: detail.time.split(' - ')[1],
      categoryName: detail.category_id === '1' ? '农大新区' : detail.category_id === '2' ? '农大西区' : '农大东区',
      address: detail.address,
      longitude: detail.longitude,
      latitude: detail.latitude,
      fileList: [{
        url: detail.img_src
      }],
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