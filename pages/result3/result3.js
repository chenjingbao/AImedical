// pages/result1/result1.js
var app = getApp();
function getCookieFromStorage() {
  var value = wx.getStorageSync("cookie")
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

  // 下载图片
  downloadFile: function (imgItem) {
    var that = this
    var cookie = getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + 'app/get_image_3/',
      header: header,
      success: function (res) {

        console.log("从服务器下载图片地址：", res)
        console.log(res.data)
        that.setData({
          result1: res.data
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