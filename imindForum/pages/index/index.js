//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    hidden:true,
    arrPro:[
      {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛世纪明德北京教育论坛世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      },
      {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      },
      {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      }, {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      }, {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      }, {
        img: "../../images/640.jpg",
        title: "世纪明德北京教育论坛",
        text: "很多刚做APP界面的设计师，经常会因为字号，字体颜色，间距而困扰。拿到设计需求后，开始进行设计，不知道从何去调整界面的字号和行间距等。容易碰到的问题是页面和页面的字号调着调着就大小或颜色不统一了。并且容易导致设计稿反复得修改。设计出来的效果图文字左右间距层次不齐，导致与预期不符等。"
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("1?11111111111111111111111111111111111111111111111111111")
    this.getMeetingList()
    app.url
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  bindOrder:function(){
    wx.navigateTo({
      url: '../organization/organization',
    })
  },
  getUserInfo: function(e) {
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
  tapPro:function(e){
    var index = e.currentTarget.dataset.itemIndex
    wx.navigateTo({
      url:"../product/product?proId="+index
    })
  },
  getMeetingList:function(){
    wx.request({
      url: app.url + "/institution/getWxProduct.do", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("首页产品列表")
        console.log(res.data)
      }
    })
  }
   
})
