// pages/app1/app1.js
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
    needUploadFiles: [],
    result: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //选择图片上传
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      //指定原图，压缩图
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        console.log(res.tempFilePaths),
          //返回选定的照片的本地路径列表
          that.setData({
            needUploadFiles: that.data.needUploadFiles.concat(res.tempFilePaths),
            result: null
          });
      },
    })
  },

  //上传图片文件
  uploadFiles: function () {
    var that = this
    that.setData({
      newBackupedFiles: []
    })
    // 读取文件路径
    for (var i = 0; i < this.data.needUploadFiles.length; i++) {
      var filePath = this.data.needUploadFiles[i]
      // console.log("filePath: ",filePath)
      wx.uploadFile({
        url: app.globalData.serverUrl + 'app/post_image/',
        filePath: filePath,
        name: 'test',
        success: function (res) {
          console.log("upload files ", res)
          // 取出文件的名字和 nmd5
          var res = JSON.parse(res.data)
          var md5 = res.data[0].md5
          var name = res.data[0].name
          var newImageItem = {
            "md5": md5,
            "name": name
          }
          // that.downloadFile(newImageItem)
          that.predictimage(newImageItem)
          wx.showToast({
            title: '上传成功',
          })

        },
        fail: function (res) {
          console.log("upload image fail", res);
          wx.showToast({
            title: '上传失败',
          })
        }
      })
    }

    // 把上传的列表清空
    this.setData({
      needUploadFiles: []
    })
  },

  // 下载图片
  downloadFile: function (imgItem) {
    // 通过函数的参数 imgItem，将 md5 传进来
    var that = this;
    wx.downloadFile({
      url: app.globalData.serverUrl + 'app/get_image/' + "?md5=" + imgItem.md5,
      success: function (res) {

        // 临时路径
        var filepath = res.tempFilePath
        // var tmpPath = imgItem.md5

        var newDownloadedBackupedFiles = that.data.downloadedBackupedFiles

        // 取出图片路径
        imgItem.path = filepath

        console.log("从服务器下载图片地址：", filepath)

      }
    })
  },

  predictimage: function (imgItem) {
    // 通过函数的参数 imgItem，将 md5 传进来
    var that = this;
    var predict_result;
    var cookie = getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    // console.log("1:",predict_result)
    wx.request({
      url: app.globalData.serverUrl + 'app/predict_image_3/' + "?md5=" + imgItem.md5,
      header: header,
      success: function (res) {
        // console.log("预测结果：",res.data.predict)
        // result:res.data.predict
        that.setData({
          result: res.data.predict
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