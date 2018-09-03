// pages/result/result.js
import {
  $wuxCountUp
} from '../../dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeURL: null,
    Scene: null,
    userType: true,
    userScore: 0,
    _nickName: null,
  },
  start() {
    this.c2.start(() => {
      wx.showToast({
        title: '已完成',
      })
    })
  },
  reset() {
    this.c2.reset()
  },
  update(score) {
    this.c2.update(score)
  },
  pauseResume() {
    this.c2.pauseResume()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //加载计数器
    this.c2 = new $wuxCountUp(0, this.data.userScore, 2, 2, {
      printValue(value) {
        this.setData({
          c2: value,
        })
      }
    })
    this.c2.start()
    console.log("game result :", options)

    //处理场景值结果
    if (options.userScene) {
      console.log("game result userScene:", options.userScene)
      this.setData({
        userType: false,
        _nickName: wx.getStorageSync("_nickName"),
        _avatarUrl: wx.getStorageSync("_avatarUrl"),
        avatarUrl: wx.getStorageSync("avatarUrl")
      })
      //请求灵犀结果
      wx.request({
        url: 'https://oqiz.youxiaochi.cn/test/getLingxiValue.php',
        method: 'POST',
        data: {
          answerNum1: options.userScene.split('*')[0],
          answerNum2: options.userScene.split('*')[1]
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          // success
          console.log('submit success');
          //打印请求返回的结果
          console.log(res.data.score);
          that.setData({
            userScore: res.data.score
          })
          //计数器显示
          console.log("查看用户灵犀值：", that.data.userScore)
          that.update(that.data.userScore)

        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })

    }


    //处理answerNum
    if (options.answerNum) {
      that.setData({
        Scene: "1*" + options.answerNum,
      })
      wx.showLoading({
        title: '加载中',
      })
      //获取二维码
      wx.request({
        url: 'https://oqiz.youxiaochi.cn/qrcode/getQRcodeurl.php', //接口地址
        data: {
          scene: options.answerNum,
          answerNum: options.answerNum.split('*')[1]
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log("获取后台数据:", res.data)
          that.setData({
            qrcodeURL: res.data.codeURL,
          })
          wx.hideLoading();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log(res);
    return {
      title: '灵犀问答：快来测测我们的默契程度吧',
      path: "/pages/index/index" + "?scene=" + this.data.Scene,
      imageUrl: this.data.qrcodeURL,
    }
  },
  qrcodeTap: function(e) {
    console.log("当前二维码url：", this.data.qrcodeURL)
    wx.previewImage({
      current: this.data.qrcodeURL, // 当前显示图片的http链接
      urls: [this.data.qrcodeURL], // 需要预览的图片http链接列表
    })
  },
  saveQrCode:function(e){
    wx.saveImageToPhotosAlbum({
      success(res) {
        console.log("保存二维码成功:",res.data)
      }
    })
  },
  toGamePage: function(e) {
    wx.removeStorage({
      key: 'userScene',
      success: function(res) {},
    })

    wx.redirectTo({
      url: '../game/game',
    })
  },
  toGamestartPage:function(e){
    wx.removeStorage({
      key: 'userScene',
      success: function (res) { },
    })
    wx.reLaunch({
      url: "../gamestart/gamestart" + "?questionIndex=0&scene=0*",
    })
  }
})