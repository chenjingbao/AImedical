// pages/homepage/homepage.js
// 取出 cookies
var app = getApp();
function getSessionIDFromResopnse(res) {
  var cookie = res.header['Set-Cookie']
  console.log('get cookie from response ' + cookie)
  return cookie
}
// 将 cookies 存取到 storage
function setCookieToStorage(cookie) {
  try {
    wx.setStorageSync("cookie", cookie)
  } catch (e) {
    console.log(e)
  }
}

//把cookies从storage提取出来
function getCookieFromStorage(){
  var value=wx.getStorageSync("cookie")
  return value
}

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
  
  authorize() {
    console.log('开始登录')
    var that =this
    wx.login({
      success(res) {
        var code = res.code
        var appId = app.globalData.appId
        var nickname = app.globalData.userInfo.nickName
        var avatarUrl=app.globalData.userInfo.avatarUrl
        var appSecret = app.globalData.appSecret

        console.log(code, appId, nickname,avatarUrl,appSecret)
        console.log("登录成功", res)
        wx.request({
          url: app.globalData.serverUrl+"app/login/",
       
          data: {
            code: res.code,
            appId:appId,
            nickname:nickname,
            avatarUrl:avatarUrl,
            appSecret:appSecret
          },
          header:{
            "content-type":"application/json"
          },
          success(res) {
            
            console.log(res)
            wx.showToast({
              title: '授权成功',
            })
            //将cookie取出
            var cookie=getSessionIDFromResopnse(res)
            //将cookie保存到storage
            setCookieToStorage(cookie)
            //获取cookie
            // var get_cookie=getCookieFromStorage()
            // console.log(get_cookie)
            that.setData({
              isLogin:true,
              userInfo:app.globalData.userInfo,
              hasUserInfo:true
            })
            // app.setAuthStatus(true)

          }
        })
      }
    })
  },

  logout: function(){
    var that=this
    var cookie=getCookieFromStorage()
    var header={}
    header.Cookie=cookie
    wx.request({
      url: app.globalData.serverUrl+'app/logout/',
      method:"GET",
      header:header,
      success: function(res){
        that.setData({
          isLogin:false,
          userInfo:null,
          hasUserInfo:false
        })
        setCookieToStorage('')
        app.setAuthStatus(false)
        wx.showToast({
          title: '注销成功',
        })
      }
    })
  },

  //获取状态
  getStatusFromRemote:function(){
    var that=this
    var cookie=getCookieFromStorage()
    var header={}
    header.Cookie=cookie
    wx.request({
      url: app.globalData.serverUrl+'app/get_status/',
      method:"GET",
      header:header,
      success:function(res){
        if(res.data.data.is_authorized==1){
          console.log("登陆状态")
          wx.showToast({
            title: '登陆状态',
          })
        }else{
          console.log("Session 过期,未登录状态")
          wx.showToast({
            title: '未登录状态',
          })
        }
      }
    })
  },


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