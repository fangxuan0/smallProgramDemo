//logs.js
const util = require('../../utils/util.js')
const app = getApp()

var API_URL = "http://t.yushu.im/v2/movie/search"

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady : ()=>{
    wx.setNavigationBarTitle({
      title: '搜索',
    })
  },

  /**
   * 显示电影详情页
   */
  goToMovieDetail: function (e) {
    // console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    app.globalData.duanDetail = item;
    wx.navigateTo({
      url: '../movieDetail/movieDetail'
    })
  },

  /**
   * 搜索电影
   */
  search : function (e){
    var that = this;
    if(!e.detail.value){
      return;
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: API_URL + "?q=" + e.detail.value,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        that.setData({
          list : res.data.subjects
        })
      }
    })
  }
})
