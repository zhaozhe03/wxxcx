// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    myList: [
      {
        img: '../../images/order.png',
        title: "订单信息"
      },
      {
        img: '../../images/TFN.png',
        title: "税票信息"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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

  },
  navgetTo:function(e){
    var index = e.currentTarget.dataset.itemIndex;
    switch(index){
      case 0:{
        wx.navigateTo({
          url: '../userOrderList/userOrderList',
        })
        break;
      }
      case 1:{
        wx.navigateTo({
          url: '../TFN/TFN',
        })
        break;
      }
    }

  }
})