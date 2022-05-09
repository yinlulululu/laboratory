// pages/labAdmin/addLad/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddress: false,
    showStatus: false,
    statusActions: [{
        name: '完好',
      },
      {
        name: '损坏',
      }
    ],
    addressActions: [],
    name: '', // 仪器名称
    address: '', // 仪器所在地址
    status: '', // 仪器状态
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

  // 仪器地址列表
  getInsOptionList() {
    const db = wx.cloud.database()
    db.collection('lab_list')
      .get({
        success: res => {
          const _option = res.data.map((item) => {
            return {
              name: item.name,
            }
          })
          this.setData({
            addressActions: [..._option]
          })

        }
      })
  },


  // 选择仪器地址弹窗
  async onShowAddress() {
    await this.getInsOptionList()
    this.setData({
      showAddress: true
    })
  },

  // 仪器地址
  onSelectAddress(e) {
    this.setData({
      address: e.detail.name,
      showAddress: false
    })
  },

  // 选择仪器状态弹窗
  onShowStatus() {
    this.setData({
      showStatus: true
    })
  },
  // 选择仪器
  onSelectStatus(e) {
    this.setData({
      showStatus: false,
      status: e.detail.name
    })
  },



  //选择图片
  afterRead(event) {
    const {
      file
    } = event.detail;
    this.setData({
      fileList: [{
        url: file.url,
        deletable: true,
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
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo-ins${ Date.now()}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          });
          const newFileList = data.map(item => ({
            url: item.fileID,
            deletable: true,
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
      address,
      status,
      fileList
    } = this.data
    if (!name || !address || !status || !fileList.length) {
      wx.showToast({
        title: '请完善表单项',
        icon: 'error'
      })
      return
    }
    let _ins_status = ''
    if (status === '完好') {
      _ins_status = '1'
    } else {
      _ins_status = '2'
    }
    const _paramsAdd = {
      ins_name: name,
      ins_address: address,
      ins_image: fileList[0].url,
      ins_status: _ins_status
    }
    const _paramsEdit = {
      _id: this.data._id,
      ins_name: name,
      ins_address: address,
      ins_image: fileList[0].url,
      ins_status: _ins_status
    }
    wx.showToast({
      title: '添加中',
      icon: 'loading'
    })
    wx.cloud.callFunction({
      name: this.data.oid === '1' ? 'editIns' : 'addIns',
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
          url: '/pages/insAdmin/index'
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
      url: '/pages/insAdmin/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (!options.oid) return
    const detail = await JSON.parse(decodeURIComponent(options.data))
    this.setData({
      name: detail.ins_name,
      address: detail.ins_address,
      status: detail.ins_status === '1' ? '完好' : '损坏',
      fileList: [{
        url: detail.ins_image
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