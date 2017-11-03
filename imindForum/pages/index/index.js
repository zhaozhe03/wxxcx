//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    hidden:true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.getMeetingList()
  },
  //分享当前页
  onShareAppMessage: function () {
    return {
      title: '明德论坛',
      desc: '成长的路上，总有你相伴', // 分享描述
      path: '/pages/index/index?id=' + getApp().globalData.userInfo.nickName,
      success: function (res) {
        // 分享成功 
      },
      fail: function (res) {
        // 分享失败 
      }
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  confirm: function () {
    this.setData({
      hidden: true,
    })
    if (wx.openSetting) {
      wx.openSetting({
        success: (res) => {
          app.getUserInfo();
        }
      })
    } else {
    }

  },
  tapPro:function(e){
    var index = e.currentTarget.dataset.itemIndex
    wx.navigateTo({
      url: "../product/product?proId=" + this.data.arrPro[index].id + "&price=" + this.data.arrPro[index].price
    })
  },
  getMeetingList:function(){
    var that = this
    wx.request({
      url: app.url + "/institution/getWxProduct.do", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          arrPro:res.data.data.wxProductList,
          imageHeader: res.data.data.mainProduct.imgUrl,
          idHeader: res.data.data.mainProduct.id,
          priceHeader: res.data.data.mainProduct.price
        })
      }
    })
  },
  topPro:function(){
    wx.navigateTo({
      url: "../product/product?proId=" + this.data.idHeader + "&price=" + this.data.priceHeader
    })
  }
   
})
