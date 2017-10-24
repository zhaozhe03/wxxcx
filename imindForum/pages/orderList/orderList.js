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
    this.setData({
      orderList: JSON.parse(options.arr).reverse(),
    })
    console.log(this.data.orderList)
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
      url: '../userOrder/userOrder?arr='+JSON.stringify(this.data.orderList)
    })
  },
  attention:function(e){
    var that = this
    var delIndex = e.currentTarget.dataset.itemIndex
    var temArray = that.del(delIndex)
    that.setData({
      orderList: temArray,
      hideCommitSuccessToast:false
    })
    
  },
  //删除指定索引用户
  del: function (delIndex) {
    var that = this
    var temArray = [];
    var arr = that.data.orderList
    for (var i = 0; i < arr.length; i++) {
      if (i != delIndex) {
        temArray.push(arr[i]);
      }
    }
    return temArray;
  },
  navGetTo:function(){
    wx.navigateTo({
      url: "../userAdd/userAdd?arr=" + JSON.stringify(this.data.orderList)
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
    
    // setTimeout(function(e){
    //   var margin_right = 0
    //   var wxstyle = "margin-right:" + margin_right + "px;";
    //   list[index].wxstyle = wxstyle
    //   if(that.data.delS=true){
    //   that.setData({
    //     orderList: list
    //   })
    //   }else{
    //     that.setData({
    //       delS:false
    //     })
    //   }
    // },3000)
  },
  //通过指定用户索引修改用户获取
  reCreate:function(e){
    var that = this;
    var recIndex = e.currentTarget.dataset.itemIndex;
    var user = that.getUserByID(recIndex)
    that.setData({
      userhidden:false,
      user: user,
      index: recIndex
    })

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
  //人员信息修改
  changeConfirm:function(){
    var that = this
    var user=that.data.user;
    var arr = that.data.orderList;
    var index = that.data.index
    arr.splice(index,1,user)
    // for(var i=0;i<=arr.length;i++){
    //   if(i==index){
    //     arr[i] = user;
    //   }
    //   break
    // }
    if (that.data.judge == 1){
      return
      console.log(111)
    }else{
      that.setData({
        orderList: arr,
        userhidden: true
      })
    }
  }
  , 
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
  }
})