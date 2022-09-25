// pages/tmpl/fulltext/fulltext.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '',
      observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
          this.Fn(value)
        }
    },
    limit: {
      type: Number,
      value: 100
    },
    selectable: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: '',
    showAll: false,
    showText:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    Fn(e){
      //  console.log("----isBranch",this.data.isBranch);
      //  console.log("----isGetData---",this.data.isGetData);
      //  console.log("----isBranch---e---",!e && typeof(e)!="undefined" && e!=0);

      var text = this.data.text, limit = this.data.limit

      var showAll = text.length > limit
      var showText = text.length > limit? text.substring(0, limit): text;
      this.setData({
        showText:showText,
        showAll:showAll 
      })

      // if(!(!e && typeof(e)!="undefined" && e!=0)){
      //   this.setData({
      //     isGetData: true,
      //   });
      // }
    }
  },
  ready: function(e) {
    if(this.data.model!=null&&this.data.model.length){
    this.setData({
      isBranch: Boolean(this.data.model.children && this.data.model.children.length),
    });

    
  }
  },

  observers: {
    'text, limit': function (field) {
      var text = this.data.text, limit = this.data.limit
      var showAll = text.length > limit
      var showText = text.length > limit? text.substring(0, limit): text;
      this.setData({
        showText:showText
      })
      var showList = getShowList(text, limit)
      this.setData({ 
        showList:showList,
        showAll:showAll })
    },
  },
})

function getShowList(text, limit) {
  var show = text.length > limit? text.substring(0, limit): text
//  return decorateText(show)
  return show
}

// "123 #456# 789" => {{text:'123'}, {tag:true, text:'#456#'}, {text:'789'}}
// 算法: 以 ‘#’ 分割字符串，偶数段为普通文本，奇数段为 ‘#’ 环绕的文本
// 如果该段为最后一段说名只包围了左边,放弃.
function decorateText(text) {
  var styled = []
  if (text) {
    var array = text.split('#')
    for(var i = 0; i < array.length; i++) {
      if (i%2 == 0) {
        if (array[i]) {
          styled.push({ text: array[i] })
        }
      } else if (i < array.length-1) {
        styled.push({tag:true, text: '#' + array[i] + '#'})
      } else {
        styled.push({text: '#' + array[i]})
      }
    }
  }
  return styled
}

function hashtag(text) {
  var regex = /#[^#]+#/g
  if (text) {
    return text.match(regex)
  }
  return null
}

module.exports = {
  decorateText: decorateText,
}