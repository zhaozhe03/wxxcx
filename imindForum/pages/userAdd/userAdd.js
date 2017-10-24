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
    console.log(options)
    this.setData({
      arr:JSON.parse(options.arr)
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
    if (this.data.tip =="以上信息不能为空"){

    } else if (this.data.tip == '请填入正确的联系方式') {
      this.setData({
        mobile: null,
        showtoast: 0
      })
    } else {
    this.setData({
      name: null,
      idCard: null,
      job:null,  
      mobile: null,
      workplace:this.data.workplace,
      title:this.data.title,
      dutyParagraph:this.data.dutyParagraph,
      showtoast:1
    })
    }
  },
  
  adduser:function(){
    var that = this
    // wx.request({
    //   url: url + '/banner/xcxImglist.do',
    //   method: 'post',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       venuesItems: res.data.data,
    //     })
    //   }
    // });
    // wx.switchTab({
    //   url: 'userAdd'
    // });
    that.formReset()
    if (that.data.showtoast==1){
      wx.showToast({
        title: '添加成功',
        image: "../../images/addSuc.png",
        duration: 1500,
        mask: true,
        complete: function () {
          that.setData({
            showtoast:0
          })
          console.log(that.data.showtoast)
        }
      })
    }
    
  },
  ToOrder:function(){
    wx.redirectTo({
      url: '../orderList/orderList?arr='+JSON.stringify(this.data.arr),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  confirm:function(e){
    this.setData({
      hidden:true
    })
  }
})



