var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    showtoast:0,
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.orderNumber')
    console.log(options.ordernumber)
    this.setData({
      orderNumber: options.ordernumber,
      proId: options.proId
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
  formBindsubmit: function (e) {
    if (e.detail.value.name.length == 0 || e.detail.value.idCard.length == 0 || e.detail.value.job.length == 0 || e.detail.value.mobile.length == 0 || e.detail.value.workplace.length == 0 || e.detail.value.title.length == 0 || e.detail.value.dutyParagraph.length == 0 ) {
      this.setData({
        tip: '以上信息不能为空',
        name: '',
        idCard: '',
        job:'',
        mobile: '',
        workplace: '',
        title:'',
        dutyParagraph:'',
        hidden:false,
        showtoast: 0
      })
    }else{ 
     if (!(/^1[34578]\d{9}$/.test(e.detail.value.mobile))) {
      this.setData({
        tip: '请填入正确的联系方式',
        mobile: '',
        hidden:false,
        showtoast: 0
      })
    }else{
      this.setData({
        tip: '',
        name: e.detail.value.name,
        idCard: e.detail.value.idCard,
        job: e.detail.value.job,
        mobile: e.detail.value.mobile,
        workplace: e.detail.value.workplace,
        title: e.detail.value.title,
        dutyParagraph: e.detail.value.dutyParagraph,
        hidden: true
      })
      var user = {};
      user.name = e.detail.value.name
      user.idCard = e.detail.value.idCard
      user.job = e.detail.value.job
      user.mobile = e.detail.value.mobile
      user.workplace = e.detail.value.workplace
      user.title = e.detail.value.title
      user.dutyParagraph = e.detail.value.dutyParagraph
      this.data.arr.push(user)
    }
    }
  },
  formReset: function () {
    var that = this 
    if (that.data.tip == "请填写正确的身份证"){
      that.setData({
        idCard:null,
        showtoast: 0
      })
    } else if (that.data.tip == "请填写手机号")
    {
      that.setData({
        mobile: null,
        showtoast: 0
      })
    } else if (that.data.tip == "该身份证已存在"){
      that.setData({
        idCard: null,
        showtoast: 0
      })
    }else{
      that.setData({
      name: null,
      idCard: null,
      job:null,  
      mobile: null,
      workplace: that.data.workplace,
      title: that.data.title,
      dutyParagraph: that.data.dutyParagraph,
      showtoast:1
    })
    }
  },
  
  adduser:function(){
    var that = this
    wx.request({
      url: app.url + '/institution/addContacts.do',
      data: {
        name:that.data.name,//联系人姓名
        dutyParagraph: that.data.dutyParagraph,//税号
        idCard: that.data.idCard,//身份证号
        job: that.data.job,//职务
        title: that.data.title,//发票抬头
        mobile: that.data.mobile,//联系人电话
        openId: app.globalData.openid,//openId
        orderNumber: that.data.orderNumber,//订单编号
        workplace: that.data.workplace//工作单位
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == 1){
          that.formReset()
          if (that.data.showtoast == 1) {
            wx.showToast({
              title: '添加成功',
              image: "../../images/addSuc.png",
              duration: 1500,
              mask: true,
              complete: function () {
                that.setData({
                  showtoast: 0
                })
              }
            })
          }
        }else{
            that.setData({
              tip: res.data.errorMsg,
              hidden:false
            })
            that.formReset()
        }
      }
    });
  },
  ToOrder:function(){
    var that = this
          wx.redirectTo({
            url: '../orderList/orderList?orderNumber=' + that.data.orderNumber + "&proId=" + this.data.proId,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
  },
  confirm:function(e){
    this.setData({
      hidden:true
    })
  }
})



