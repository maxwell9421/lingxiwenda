//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameInfo: "从题库中随机选择10道问题，并选择最适合自己的答案，作答完毕后分享给好友作答，灵犀机器人会比对你们的两份答案，测试出你和好友之间的默契程度。",
    openid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    //入口处场景值解码
    if (options.scene) {
      console.log("index options.scene：", options.scene);
      wx.request({
        url: 'https://oqiz.youxiaochi.cn/test/getQerinfo.php',
        method: 'POST',
        data: {
          answerNum1: options.scene.split('*')[2],
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // success
          console.log('submit success');

        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          //本地缓存提问者信息
          wx.setStorage({
            key: "_avatarUrl",
            data: res.data.avatarUrl,
          })
          wx.setStorage({
            key: "_nickName",
            data: res.data.nickName,
          })
        }
      })
      try{
        wx.setStorageSync("userScene", options.scene)
      }catch(e){
        console.log("本地缓存场景值失败：",e);
      }

      //*是我们定义的参数链接方式
    }
    //登录获取openid
    wx.login({
      success: function(res) {
        console.log("获取登录code:")
        //发送请求
        wx.request({
          url: 'https://oqiz.youxiaochi.cn/test/getopenID.php', //接口地址
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function(res) {
            that.data.openid = res.data.openid;
            console.log("获取后台返回openid&session_key:")
            wx.setStorage({
              key: 'openid',
              data: that.data.openid,
            })
          }
        })
      }
    })
    //授权
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        app.userInfo = res.userInfo;
        wx.setStorage({
          key: 'nickName',
          data: app.userInfo.nickName
        })
        wx.setStorageSync('avatarUrl', app.userInfo.avatarUrl)
        //入口检查并跳转
        if (wx.getStorageSync("userScene") && wx.getStorageSync("_avatarUrl")!=null ) {
          wx.redirectTo({
            url: '../gamestart/gamestart' + "?questionIndex=0" + "&" + "userScene=" + wx.getStorageSync("userScene"),
          })
          console.log("这里成功使用scene跳转")
        }else{
          console.log("没有使用scene跳转")
          wx.removeStorageSync("userScene")
        wx.reLaunch({
          url: '../game/game',
        })
        }
      },
      fail: function() {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '提示',
          content: '您需要进行信息授权，才可以继续进行！',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  onShareAppMessage: function() {

  },
  //明白了按钮点击
  bindGetUserInfo: function(e) {
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        app.userInfo = res.userInfo;
        console.log("获取用户数据成功:", app.userInfo)
        wx.setStorage({
          key: 'nickName',
          data: app.userInfo.nickName
        })
        wx.setStorageSync('avatarUrl', app.userInfo.avatarUrl)
        if (wx.getStorageSync("userScene") && wx.getStorageSync("_avatarUrl") != null) {
          wx.redirectTo({
            url: '../gamestart/gamestart' + "?questionIndex=0" + "&" + "userScene=" + wx.getStorageSync("userScene"),
          })
          console.log("明白了按钮这里成功使用scene跳转")
        }else{
          console.log("明白了没有使用scene跳转")
          wx.removeStorageSync("userScene")
          wx.reLaunch({
          url: '../game/game',
        })
      }
      },
      fail: function() {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '提示',
          content: '您需要进行信息授权，才可以继续进行！',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting({

              })
            }
          }
        })
      }
    })
  },
  //end
})