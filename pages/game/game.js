// pages/game/game.js
import { $stopWuxRefresher } from '../../dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _logoUrl: "http://oqiz.youxiaochi.cn/image/logo.png",
    default_status1:false,
    default_status2: false,
    default_userData: [{
      data1: {
        avatarUrl: null,
        highscoreStr: null,
        decStr: "目前没有出题记录，来出一份儿吧！",
        createTime:"",
      },
      data2: {
        avatarUrl: null,
        highscoreStr: null,
        decStr: "目前没有答题记录，分享给好友试试吧！",
        createTime: "",
      },
    }],
    _avatarUrl: null,
    _nickName: null,
    example: {
      classNames: 'wux-animate--fadeIn',
      enter: true,
      exit: true,
      in: true,
    },
    show: true,
    status: true,
    sharescene:null
  },
  onClick(e) {
    console.log('onClick')
  },
  onEnter() {
    console.log('onEnter')
  },
  onEntering() {
    console.log('onEntering')
  },
  onEntered() {
    console.log('onEntered')
  },
  onExit() {
    console.log('onExit')
  },
  onExiting() {
    console.log('onExiting')
  },
  onExited() {
    console.log('onExited')
    this.setData({
      'example.in': true,
      show: true,
    })
  },
  onToggle() {
    this.setData({
      show: !this.data.show,
    })
  },
  onChange(e) {
    const {
      animateStatus
    } = e.detail

    switch (animateStatus) {
      case 'entering':
        this.setData({
          status: 'Entering…'
        })
        break
      case 'entered':
        this.setData({
          status: 'Entered!'
        })
        break
      case 'exiting':
        this.setData({
          status: 'Exiting…'
        })
        break
      case 'exited':
        this.setData({
          status: 'Exited!'
        })
        break
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      _avatarUrl: wx.getStorageSync('avatarUrl'),
      _nickName: wx.getStorageSync('nickName')
    })
    wx.showLoading({
      title: '加载中',
    })
    //获取后台用户记录
    wx.request({
      url: 'https://oqiz.youxiaochi.cn/test/getUserData.php',
      method: 'POST',
      data: {
        openid: wx.getStorageSync("openid")
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success
        console.log('submit success');
        wx.hideLoading();
      },
      fail: function (res) {
        console.log('submit fail');
        wx.hideLoading();
        // fail
      },
      complete: function (res) {
        wx.hideLoading();
        console.log("得到的用户记录：", res);
        that.setData({
          userData: res.data
        })
        console.log("默认记录状态：", that.data.userData)
        console.log("默认记录状态：", that.data.default_status)
        if (that.data.userData.data1 == null) {
          that.setData({ default_status1: true })
        }
        if (that.data.userData.data2 == null) {
          that.setData({ default_status2: true })
        }
        console.log("默认记录状态：", that.data.default_status1)
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
  onPulling() {
    console.log('onPulling')
  },
  onRefresh() {
    console.log('onRefresh')
    setTimeout(() => {
      this.onLoad()
      $stopWuxRefresher()
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log("分享信息:",res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      var _scene = "1*" + wx.getStorageSync("openid") + "*" + res.target.id
      this.setData({
        sharescene: _scene
      })
      console.log(this.data.sharescene)
      return {
        title: '灵犀问答：快来测测我们的默契程度吧',
        path: "/pages/index/index" + "?scene=" + this.data.sharescene,
      }
    }
    return {
      title: '灵犀问答：快来测测我们的默契程度吧',
      path: "/pages/index/index" + "?scene=" + res,
    }
  },

  gamestart: function(e) {
    wx.removeStorage({
      key: 'qorder',
      success: function(res) {},
    })
    wx.navigateTo({
      url: "../gamestart/gamestart" + "?questionIndex=0&scene=0*",
    })
  },
  gameinfoTap: function(e) {
    wx.showModal({
      title: '游戏说明',
      content: '从题库中随机选择10道问题，并选择最适合自己的答案，作答完毕后分享给好友作答，灵犀机器人会比对你们的两份答案，测试出你和好友之间的默契程度。',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  segmentChange: function(e) {
    console.log("segmentClick", e)
    if (e.detail.key == 0) {
      this.setData({
        status: true
      })
    } else {
      this.setData({
        status: false
      })
    }
    //动画
    this.setData({
      'example.in': !this.data.show,
      show: !this.data.show,
    })
  },
  shareCard:function(e){
    console.log("sharCardLongpress answerNum", e)
  }
})