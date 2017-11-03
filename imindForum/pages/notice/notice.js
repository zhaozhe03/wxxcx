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
    // 论坛详情
    var url = app.url;
    wx.request({
      url: url + '/institution/getArticleById.do?articleId=' + options.noticID,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          createDate: res.data.data.createTime.time,
          autherPIc: res.data.data.headImage,
          autherName: res.data.data.author,
          action: res.data.data.content,
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