// pages/userOrder/userOrder.js
// var del = require("../orderList/orderList.js")
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderShow:false             ,
    pic:'￥19900',
    hidden:true,
    headerText:"人员信息登记表",
    pay:"支付"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.price == 0){
      this.setData({
        orderNumber: options.orderNumber,
        pic: "",
        totalPrice: null
      })
    }else{
      this.setData({
        orderNumber: options.orderNumber,
        pic: "￥" + options.price,
        totalPrice: options.price
      })
    }
    
    

    this.getorderList();
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
  tapModle: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      indexDel:index
    })
    this.uerDel(index)
  },
  uerDel: function (delIndex){
    var obj
    var arr = this.data.arr
    for(var i=0; i<arr.length; i++){
      if (i == delIndex){
        obj = arr[i]
      }
    }
    this.setData({
      obj: obj,
      tip: '您确定要删除,' + obj.name + ',电话：' + obj.mobile+'的用户么',
      hidden:false
    })
  },
  confirm:function(){
    
    this.setData({
      hidden:true,
    })
    this.delUser(this.data.indexDel)
  },
  cancel:function(){
    this.setData({
      hidden:true
    })
  },
  // },
  queryMultipleNodes:function(e){
    if (5<=e.detail.scrollLeft<70) {
      this.setData({
        headerText: " 人员信息",
        textIndex:false
      })
    }
    if(80<e.detail.scrollLeft<150){
      this.setData({
        headerText:" 人员信息",
        textIndex:false
      })
    }
    if (160 <= e.detail.scrollLeft ){
      this.setData({
        headerText: " 所在单位",
        textIndex:true
      })
    }
  },

  getorderList:function(){
    var that = this
    wx.request({
      url: app.url + "/institution/getContactsByOrder.do",
      data: {
        openId: app.globalData.openid,//openId
        orderNumber: that.data.orderNumber,//订单编号
      },
      success: function (res) {
        
        that.setData({
          arr: res.data.data.contactsList,
          pic: res.data.data.order.price
        })
       
      }
    })
  },
  delUser:function(index){
    var that = this
    var temArray = [];
    wx.request({
      url:app.url+ "/institution / deleteContacts.do",
      data:{
        openId: app.globalData.openid,//openId
        contactsId:that.data.arr[index].id//联系人id

      },
      success:function(res){
        
        temArray: res.data.data.contactsList
        
      }
    })
  },
  changeUser:function(index){
    var that = this
    wx.request({
      url: app.url +"/institution/updateContacts.do",
      data:{

      },
    })
  }, 
  sendOrder:function(){
    var that = this
    wx.request({
      url: app.url + "/banner/orderPay.do",
      data:{
        openid: app.globalData.openid,//openId
        paytype:5,//支付方式
        underorder: that.data.orderNumber,//订单号
        totalPrice: that.data.pic,//总价格
        title:"233"
      },
      success:function(res){
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success: function (res) {
              that.setData({
                pay:"已支付",
                pic:""
              })
          },
          fail: function (res) {

          }
        })
      }, fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})




