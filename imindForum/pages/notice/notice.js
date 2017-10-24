// pages/notice/notice.js
// microblog.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    // indicatorDots:false,
    vertical: false,
    // vertical1:true,
    autoplay: true,
    autoplay1: false,
    interval: 3000,
    duration: 1200,
    action: "",
    hidden: true,
    nocancel: true,
    price: "",
    autherPIc: "",
    autherName: "",
    microblogPicsInfo: {}
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      noticeID: options.noticeID
    })
    // 论坛详情
    var url = getApp().url;
    wx.request({
      url: url + '/institution/getArticleById.do?articleId=' + options.noticeID,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("论坛详情页")
        console.log(res)
        that.setData({
          microblogPicsInfo: res.data.data.Img,
          createDate: res.data.data.createDate,
          autherPIc: res.data.data.headImage,
          autherName: res.data.data.userName,
          action: res.data.data.info,
        })

        var article = that.data.action;
        var htmlpS = "<p style='line-height:2'>";
        var htmlp = "</p><br><p style='line-height:2;margin:20px 0'>";
        var htmlpE = "</P><br>"
        var result = article.replace(new RegExp("\n", "gm"), htmlp);
        WxParse.wxParse('article', 'html', htmlpS + result + htmlpE, that, 5);
      }
    })
  },
  //分享当前页
  onShareAppMessage: function () {
    var that = this
    return {
      title: '明德在线',
      desc: '途中的点滴，我与你分享',
      path: '/pages/notice/notice?noticeID=' + that.data.newsID,
      success: function (res) {
        // 分享成功 
      },
      fail: function (res) {
        // 分享失败 
      }
    }
  },
  bindUp: function () {
    this.setData({
      hidden: false
    })
  }
})