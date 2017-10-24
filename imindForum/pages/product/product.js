// pages/product/product.js
//获取应用实例
const app = getApp()

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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    wx.navigateTo({
      url: '../organization/organization',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
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
          console.log(JSON.stringify(res));
          app.getUserInfo();

        }
      })
    } else {
      console.log('不支持 wx.openSetting');
    }

  },
})