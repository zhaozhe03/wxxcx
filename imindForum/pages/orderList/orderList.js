var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    userhidden:true,
    // orderList:[
    //   {
    //     name:1111,
    //     mobile:13947894561,
    //     workplace:"北京世纪明德教育科技有限公司"
    //   },
    //   {
    //     name: 1111,
    //     mobile: 13947894562,
    //     workplace: "北京世纪明德教育科技有限公司"
    //   },
    //   {
    //     name: 1111,
    //     mobile: 13947894563,
    //     workplace: "北京世纪明德教育科技有限公司"
    //   },
    //   {
    //     name: 1111,
    //     mobile: 13947894564,
    //     workplace: "北京世纪明德教育科技有限公司"
    //   },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderNumber: options.orderNumber,
      proId: options.proId
    })
    console.log(this.data.orderNumber)
    this.getOrderList(options.orderNumber)
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
    wx.showToast({
      title: '左滑编辑用户',
      image: "../../images/toleft.png",
      duration: 2000,
      mask: true,
      success: function () {
      }
    })
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
  sendOrder:function(){
    wx.redirectTo({
      url: '../userOrder/userOrder?orderNumber=' + this.data.orderNumber
    })
  },
  attention:function(e){
    var that = this
    var index = e.currentTarget.dataset.itemIndex
    var delIndex = that.data.orderList[index].id
    that.del(delIndex)
  },
  //通过指定用户索引修改用户获取
  reCreate: function (e) {
    var that = this
    var list = that.data.orderList
    var index = e.currentTarget.dataset.itemIndex
    var userIndex = that.data.orderList[index].id
    var user = {}
    for(var i=0;i<=list.length;i++){
      if(i==index){
        user=list[i]
      }
    }
    this.setData({
      userhidden:false,
      user:user,
      userIndex
    })
  },
  //删除指定索引用户
  del: function (delIndex) {
    var that = this
    wx.request({
      url: app.url + "/institution/deleteContacts.do", 
      data:{
        openId: app.globalData.openid,
        contactsId:delIndex
      },
      success:function(res){
        console.log("删除联系人")
        console.log(res)
        that.getOrderList(that.data.orderNumber)
      }
    })
  },
  //修改联系人
  reChange:function(){
    var that = this
    var user = that.data.user;
    wx.request({
      url: app.url + "/institution/updateContacts.do",
      data: {
        openId: app.globalData.openid,//openId
        proid: that.data.proId,//产品id
        id: that.data.userIndex,//联系人id
        name: user.name,//联系人姓名,
        mobile: user.mobile,//联系人电话
        workplace: user.workplace,//工作单位
        title: user.title,//发票抬头
        dutyParagraph: user.dutyParagraph,//税号
      },
      success: function (res) {
        if (res.data.success == 1) {
          that.getOrderList(that.data.orderNumber)
        }
      }
    })
  },
  //人员信息修改
  changeConfirm: function () {
    var that=this
    that.reChange()
    that.setData({
      userhidden:true
    })
  }, 
  navGetTo:function(){
    wx.navigateTo({
      url: "../userAdd/userAdd?orderNumber=" + this.data.orderNumber
    })
  },
  //滑动事件
  touchS:function(e){
    var starX = e.touches[0].clientX;
    this.setData({
      starX:starX
    })
  },
  touchM:function(e){
    var moveX = e.touches[0].clientX;
    console.log(moveX)
    var margin_left = 0
    var changeX = moveX - this.data.starX;
    console.log(changeX)
    if(changeX>0){
      changeX = 0
    }
    if (changeX>-60){
      margin_left = changeX
    }else{
      margin_left = -60
    }
    
    var margin_right = -margin_left
    var index = e.currentTarget.dataset.index;
    var list = this.data.orderList;
    var wxstyle = "margin-right:" + margin_right + "px;";
    list[index].wxstyle = wxstyle
    this.setData({
      orderList: list,
      index:index
    })
    
  },
  touchE:function(e){
    var that = this;
    var endX = e.changedTouches[0].clientX;
    var index = e.currentTarget.dataset.index;
    var list = that.data.orderList;
    var lenth = that.data.orderList.length
  },
  
  //获取指定用户信息
  getUserByID:function(index){
    var that = this
    var list = that.data.orderList;
    for(var i=0;i<=list.length;i++){
      if (i == index){
        return list[i]
      }
    }
    
  },
 
  //弹出框表单添加
  formBindsubmit: function (e) {
    var that = this
    if (e.detail.value.name.length == 0 || e.detail.value.idCard.length == 0 || e.detail.value.job.length == 0 || e.detail.value.mobile.length == 0 || e.detail.value.workplace.length == 0 || e.detail.value.title.length == 0 || e.detail.value.dutyParagraph.length == 0) {
      that.setData({
        tip: '以上信息不能为空',
        name: '',
        idCard: '',
        job: '',
        mobile: '',
        workplace: '',
        title: '',
        dutyParagraph: '',
        hidden: false,
        judge: 1
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(e.detail.value.mobile))) {
        that.setData({
          tip: '请填入正确的联系方式',
          mobile: '',
          hidden: false,
          judge: 1
        })
      } else {
        var user = {};
        user.name = e.detail.value.name
        user.idCard = e.detail.value.idCard
        user.job = e.detail.value.job
        user.mobile = e.detail.value.mobile
        user.workplace = e.detail.value.workplace
        user.title = e.detail.value.title
        user.dutyParagraph = e.detail.value.dutyParagraph
        that.setData({
          user:user,
          hidden: true,
          judge: 0
        })
        
      }
    }
  },
  confirm: function (e) {
    this.setData({
      hidden: true,
      judge: 1
    })
  },
  changeCancel:function(e){
    var that = this
    var index = that.data.index
    var arr = that.data.orderList
    for(var i=0;i<=arr.length;i++){
      if(i == index){
        arr[index].wxstyle = 0
        break
      }
    }
    that.setData({
      userhidden:true,
      orderList:arr
    })
  },
  getOrderList: function (orderNumber){
    var that = this
    wx.request({
      url: app.url + "/institution/getContactsByOrder.do", //仅为示例，并非真实的接口地址
      data:{
        openId: app.globalData.openid,
        orderNumber: orderNumber
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("首页产品列表")
        console.log(res)
        that.setData({
          orderList: res.data.data.contactsList
        })
      }
    })
  }
})
