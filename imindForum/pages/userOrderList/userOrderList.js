// pages/userOrderList/userOrderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.url + "/institution/getOrderByInstitution.do?openId=" + app.globalData.openid ,
      success:function(res){
        that.setData({
          oderList:res.data.data
        })
        that.getoderList(that.data.oderList)
      }
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
  toList:function(e){
    var that = this
    var index = e.currentTarget.dataset.itemIndex
    wx.navigateTo({
      url: '../userOrder/userOrder?orderNumber=' + that.data.oderList[index].ordernumber +"&price="+ that.data.oderList[index].price,
    })
  },
  getoderList:function(arr){
    var that = this
    var list = []
    for(var i=0;i<arr.length;i++){
      if (!arr[i].price==0){
        list.push(arr[i])
      }
    }
    that.setData({
      oderList: list
    })
  }
})