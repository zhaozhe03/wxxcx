// pages/userOrder/userOrder.js
var del = require("../orderList/orderList.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {             
    // arr:[
    //   {
    //     name:"zhaozhe",
    //     phone:13912345678,
    //     jop:"世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name:"guoshuai",
    //     phone:15812345678,
    //     jop:"北京世纪明德"
    //   },
    //   {
    //     name:"liuzhenda",
    //     phone:13612345678,
    //     jop:"世纪明德"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    //   {
    //     name: "zhaozhe",
    //     phone: 13912345678,
    //     jop: "世纪明德（北京）教育科技有限公司"
    //   },
    // ],
    pic:'￥19900',
    hidden:true,
    headerText:"人员信息登记表"
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
      tip:'您确定要删除,'+obj.name+',电话：'+obj.phone+'的用户么',
      hidden:false
    })
  },
  confirm:function(){
    var arr = this.del(this.data.indexDel)
    this.setData({
      hidden:true,
      arr:arr
    })
  },
  cancel:function(){
    this.setData({
      hidden:true
    })
  },
  del: function (delIndex) {
    var temArray = [];
    var arr = this.data.arr
    for (var i = 0; i < arr.length; i++) {
      if (i != delIndex) {
        temArray.push(arr[i]);
      }
    }
    return temArray;
  },
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
  }

})



// openModel: function(e) {
//   let id = e.target.dataset.id;
//   this.setData({
//     titles: this.data.tables[0],
//     cols: this.data.tables[id],
//     id: id,
//     show: true
//   });
// },
// dataChange: function(e) {
//   let cols = this.data.cols;
//   cols[e.target.dataset.id] = e.detail.value;
//   console.log(cols);
//   this.setData({
//     cols: cols
//   });

// },
// editModel(e) {
//   let tables = this.data.tables;
//   tables[this.data.id] = this.data.cols;

//   this.setData({
//     tables: tables,
//     show: false
//   });

// },
