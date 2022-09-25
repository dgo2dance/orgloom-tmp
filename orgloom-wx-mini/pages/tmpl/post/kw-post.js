// pages/tmpl/post/kw-post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    mr: {
      type: String,
      value: "0rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImage: function(e) {
      onClickImage(this, e)
    },
  }

})

  
function onClickImage(view, e) {
  var index = e.target.dataset.idx;
  var src = e.target.dataset.src;
  console.log("---onClickImage---"+src);
  console.log("---onClickImage---"+JSON.stringify(view));

  var images = getOriginImages(src)
 // var images = getOriginImages(view.item.images)
  wx.previewImage({
    urls: images,
    current: images[0],
  })
}


function getOriginImages(src) {
  var array = []
  array.push(src)
  /*
  images.map( item => {
      var i = item.indexOf('?')
      if (i > 0) {
        array.push(item.substring(0, i))
      } else {
        array.push(item)
      }
  })
  */
  return array
}

