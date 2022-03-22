// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //轮播图配置
        autoplay: true,
        interval: 3000,
        duration: 1200
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        const data = {
            "swiperDatas": [{
                    "id": 3,
                    "imgurl": "../../images/home/3.png"
                },
                {
                    "id": 4,
                    "imgurl": "../../images/home/4.png"
                }
            ]
        };
        that.setData({
            swiperDatas: data.swiperDatas
        })
    },

    // 路由跳转
    navigateTo(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
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