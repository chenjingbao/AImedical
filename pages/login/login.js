// pages/login/login.js
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tologin() {
    console.log('authorize')
    var that = this
    wx.login({
      success(res){
        var code=res.code
        var appId=app.globalData.appId
        var nickname=app.globalData.nickname
        console.log(code,appId,nickname)
        console.log("登录成功",res)
        
        wx.request({
          url: 'http://49.234.58.209/app/login/',
          data:{
            code:res.code
          },
          success(data){
            console.log(data)
          }
        })
      }
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

  }
})