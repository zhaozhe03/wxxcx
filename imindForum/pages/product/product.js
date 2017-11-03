// pages/product/product.js
//获取应用实例
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    hidden: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
      proId:options.proId,
      price: options.price
    })
    this.getProduct(options.proId)
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
  bindOrder: function () {
    this.selectInstitutionByOpenId()
    
  },
  getUserInfo: function (e) {
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
  selectInstitutionByOpenId:function(){
    var that = this
    wx.request({
      url: app.url + "/institution/getInstitutionByOpenId.do", 
      data:{
        openId: app.globalData.openid
      },
      success:function(res){
        if(res.data.success==1){
          that.creatOrder()
        }else{
          wx.navigateTo({
            url: '../organization/organization?proId=' + that.data.proId ,
          })
        }
      }
    })
  },
  creatOrder: function () {
    var that = this
    wx.request({
      url: app.url + "/institution/setOrder.do", //仅为示例，并非真实的接口地址
      data: {
        productId: this.data.proId,
        openId: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.success == 1) {

          wx.redirectTo({
            url: '../userAdd/userAdd?ordernumber=' + res.data.data.ordernumber + "&proId=" + that.data.proId + "&price=" + that.data.price,
          })
        } 
      }
    })
  },
  getProduct: function (proId){
    var that =this
    wx.request({
      url: app.url +"/institution/getWxProductInfo.do",
      data:{
        productId: proId
      },
      success:function(res){
        var abstractText = res.data.data.abstractText
        var htmlpS = "<p style='line-height:2'>";
        var htmlp = "</p><br><p style='line-height:2;margin:20px 0'>";
        var htmlpE = "</P><br>"
        var result = abstractText.replace(new RegExp("\n", "gm"), htmlp);
        WxParse.wxParse('abstractText', 'html', htmlpS + result + htmlpE, that, 5);
      }
    })
  }
})