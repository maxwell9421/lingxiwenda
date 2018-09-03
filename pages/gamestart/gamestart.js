Page({

  /**
   * 页面的初始数据
   */
  data: {
    Question: [{ //1
        "question": "微信行为里最不受欢迎的行为中，我最不喜欢的是?",
        _items: [{
            name: "A",
            value: "动不动就发60秒超长语音"
          },
          {
            name: "B",
            value: "频繁更换微信头像和名字"
          },
          {
            name: "C",
            value: "群发投票、祝福等消息 "
          },
          {
            name: "D",
            value: "红包从来只发不抢"
          }
        ]
      },
      { //2
        "question": "朋友圈里我更喜欢发布？",
        _items: [{
            name: "A",
            value: "分享链接"
          },
          {
            name: "B",
            value: "吃喝玩乐"
          },
          {
            name: "C",
            value: "魔性自拍"
          }
        ]
      },
      { //3
        "question": "我拍照时最喜欢的动作是？",
        _items: [{
            name: "A",
            value: "撩人的比心"
          },
          {
            name: "B",
            value: "二哈气质的剪刀手"
          },
          {
            name: "C",
            value: "给老干部专用的严肃系列爸妈"
          },
          {
            name: "D",
            value: "各种风格我都能驾驭"
          }
        ]
      },
      { //4
        "question": "走在路上看到井盖，我会",
        _items: [{
            name: "A",
            value: "绕开井盖走"
          },
          {
            name: "B",
            value: "直接踩过去"
          },
          {
            name: "C",
            value: "跳一跳到井盖上加分"
          },
          {
            name: "D",
            value: "各种风格我都能驾驭"
          }
        ]
      },
      { //5
        "question": "作为一个有“仪式感”的人，我经常",
        _items: [{
            name: "A",
            value: "干大事之前上个厕所"
          },
          {
            name: "B",
            value: "吃饭前用相机给食物开光"
          },
          {
            name: "C",
            value: "学习前先拿出手机刷一会儿"
          },
        ]
      },
      { //6
        "question": "起床闹铃响了，我会",
        _items: [{
            name: "A",
            value: "鲤鱼打挺马上起床"
          },
          {
            name: "B",
            value: "关掉闹钟再睡一会儿"
          },
        ]
      },
      { //7
        "question": "成长岁月中最怀念的是哪个阶段？",
        _items: [{
            name: "A",
            value: "还没上学时"
          },
          {
            name: "B",
            value: "小学时光"
          },
          {
            name: "C",
            value: "中学时光"
          },
          {
            name: "D",
            value: "大学时光"
          }
        ]
      },
      { //8
        "question": "以下哪个我最可能会尝试？",
        _items: [{
            name: "A",
            value: "泸州老窖香水"
          },
          {
            name: "B",
            value: "老干妈唇膏"
          },
          {
            name: "C",
            value: "崂山白花蛇草水"
          },
          {
            name: "D",
            value: "还是喝口82年雪碧压压惊吧"
          }
        ]
      },
      { //9
        "question": "我认为的最佳损友是啥样的？",
        _items: [{
            name: "A",
            value: "谈钱从来不绕弯子"
          },
          {
            name: "B",
            value: "说话可以不必过脑子"
          },
          {
            name: "C",
            value: "对ta生气不过5秒"
          },
          {
            name: "D",
            value: "当面损，背面夸"
          }
        ]
      },
      { //10
        "question": "我最看重什么感情？",
        _items: [{
            name: "A",
            value: "亲情"
          },
          {
            name: "B",
            value: "友情"
          },
          {
            name: "C",
            value: "爱情"
          },
        ]
      }
    ],
    qorder: [],
    radioState: false,
    questionIndex: 0,
    index: 0,
    UserScene: null,
    userType: true,
    _avatarUrl: "",
    _nickName: "",
    example: {
      classNames: 'wux-animate--fadeInLeft',
      enter: true,
      exit: true,
      in: true,
    },
    show: true,
    status: '',
  },
  switchChange(e) {
    const {
      model
    } = e.currentTarget.dataset
    console.log("switchChange：", e)
    this.setData({
      [model]: e.detail.value,
    })
  },
  onClick() {
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
    var that = this;
    //处理场景值 随机题目序号
    console.log("game start :")
    if (!this.data.qorder.length){
    this.getRandomNumber(this.data.qorder)
      console.log("问题随机顺序：",this.data.qorder)
    }

    if (wx.getStorageSync("userScene").split('*')[0] == 1) {
      this.setData({
        userType: false,
        _nickName: wx.getStorageSync("_nickName"),
        _avatarUrl: wx.getStorageSync("_avatarUrl"),
      })
    }
    //处理问题索引
    console.log('current Index->', this.data.qorder[this.data.questionIndex])
    this.setData({
      index: this.data.qorder[this.data.questionIndex]
    })
    console.log('current questionIndex->', this.data.questionIndex)

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
    wx.removeStorage({
      key: 'qorder',
      key:'userScene',
      success: function(res) {},
    })
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
  radioChange: function(e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e)
    //动画数据
    this.setData({
      'example.in': !this.data.show,
      show: !this.data.show,
    })
    //数据处理
    wx.setStorage({
      key: "answer*" + this.data.index,
      data: e.detail.value,
    })
    var newIndex = this.data.questionIndex * 1 + 1
    //页面跳转
    if (newIndex == 10) {
      wx.showLoading({
        title: '提交数据中',
      })
      //处理提交数据
      var _answer = "";
      for (var i = 0; i < 10; i++) {
        _answer = _answer + wx.getStorageSync("answer*" + i) + "*"
      }
      console.log(_answer)
      //请求后台
      wx.request({
        url: 'https://oqiz.youxiaochi.cn/test/insertAnswer.php', //此处填写你后台请求地址
        method: 'POST',
        data: {
          openid: wx.getStorageSync("openid"),
          nickName: wx.getStorageSync("nickName"),
          avatarUrl: wx.getStorageSync("avatarUrl"),
          answer: _answer,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          // success
          console.log('submit success');
          //打印请求返回的结果
          console.log("待提交至后台的新数据",res);
          wx.reLaunch({
            url: '../result/result' + "?answerNum=" + res.data.openid + "*" + res.data.answerNum
          })
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    } else {
      this.setData({
        questionIndex: newIndex,
        radioState: false,
        userScene: "0*",
      })

      this.onLoad();
    }
  },
  _radioChange: function(e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e)
    //动画数据
    this.setData({
      'example.in': !this.data.show,
      show: true
    })
    //数据处理
    wx.setStorage({
      key: "answer*" + this.data.index,
      data: e.detail.value,
    })

    var newIndex = this.data.questionIndex * 1 + 1
    //页面跳转
    if (newIndex == 10) {
      //处理提交数据
      wx.showLoading({
        title: '提交数据中',
      })
      var _answer = "";
      for (var i = 0; i < 10; i++) {
        _answer = _answer + wx.getStorageSync("answer*" + i) + "*"
      }
      console.log(_answer)
      console.log("待提交的场景值：", wx.getStorageSync("userScene").split('*')[2])
      //请求后台
      wx.request({
        url: 'https://oqiz.youxiaochi.cn/test/insert_Answer.php', //此处填写你后台请求地址
        method: 'POST',
        data: {
          openid: wx.getStorageSync("openid"),
          nickName: wx.getStorageSync("nickName"),
          avatarUrl: wx.getStorageSync("avatarUrl"),
          answer: _answer,
          qerAnswerNum: wx.getStorageSync("userScene").split('*')[2]
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          // success
          console.log('submit success');
          wx.hideLoading();
          wx.reLaunch({
            url: '../result/result' + "?userScene=" + wx.getStorageSync("userScene").split('*')[2] + "*" + res.data.answerNum
          })
          //打印请求返回的结果
          console.log(res.data);
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    } else {
      this.setData({
        questionIndex: newIndex,
        radioState: false,
      })
      this.onLoad();
    }
  },
  //排序生成10个不重复随机数
  getRandomNumber: function(qorder) {
    var count = 10;
    var original = new Array;
    for (var i = 0; i < count; i++) {
      original[i] = i;
    }
    var d1 = new Date().getTime();
    original.sort(function() {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < count; i++) {
      qorder[i] = original[i]
      console.log("随机数字", qorder[i])
    }
  }
})