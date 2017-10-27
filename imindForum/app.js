

App({
  topBarlist: [],
  lastRequsetTime: 0,
  flashTime: 300,
  url: 'https://xcxtodo.mingde.com',
  wxSearchData: [],
  globalData: {
    appid: 'wx4fcfa2dd242276f4',//appid需自己提供，此处的appid我随机编写  
    secret: '9bb09bc80ade372ffefe57333f0a6d69',//secret需自己提供，此处的secret我随机编写  
    COLLECT_IMAGE_KEY: 'COLLECT_IMAGE_ID'
  },
  onLaunch: function () {
    var that = this
    console.log((new Date() - that.lastRequsetTime) / 1000 / 1000 / 60 > 300)
   var passTime = (new Date() - that.lastRequsetTime) / 1000 / 1000 / 60;
    if (passTime > that.flashTime || that.lastRequsetTime == 0) {
      // 重新请求数据
    } else {
      // 使用之前的值
    }
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo()
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://xcxtodo.mingde.com/banner/getOpenid.do?code=' + res.code + "&type=" + "hyxcx",
            data: {},
            method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              that.globalData.openid = res.data.data
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
})