 const biz = require('../../../utils/biz.js')

Component({
  properties: {
    model: {
      type:Object,
      observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
      //  console.log("----obser",value) // 旧数据和新数据
        this.Fn(value)
      }
    },
    parent: {
      type:Object,
      // observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
      // //  console.log("----obser",value) // 旧数据和新数据
      //   this.Fn(value)
      // }
    },
    company: {
      type:Object
      // observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
      // //  console.log("----obser",value) // 旧数据和新数据
      // //  this.Fn(value)
      // }
    },
    top: {
      type:Boolean
      // observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
      // //  console.log("----obser",value) // 旧数据和新数据
      // //  this.Fn(value)
      // }
    },
    idFlag:{
      type:String
      // observer:function(value){ //每次父组件向子组件传值的时候都会调用这个函数
      // //  console.log("----obser",value) // 旧数据和新数据
      // //  this.Fn(value)
      // }
    }
    
  },

  data: {
    open: false,
    isBranch: false,
    isGetData: false,
    modelPart:''
  },

  methods: {
    toggle: function(e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },

    clickButton: function(e) {
      var path = e.currentTarget.dataset.path;

      this.triggerEvent('tapitem', { path: path,idFlag:this.data.idFlag }, { bubbles: true, composed: true });


      // this.data.modelPart=this.data.model;


      // console.log("-------modelPart--ssss--", this.data.modelPart);
      // this.setTree( this.data.modelPart,list);
      // // this.data.modelPart.forEach((s) => {
      // //   console.log()
      
      // console.log("-------modelPart--new--", this.data.modelPart);
       
      // });
    },
    test:function(e){
        // console.log("----eeeeee-----");
        // 判断当前页面是否有子组件，如果有，调用子组件方法 如果没有   则滚动
        let myComponent = this.selectComponent("#myTree");
        if(myComponent){
          // console.log("--------into---myComponenet");
        myComponent.test();
        }else{

          let query = this.createSelectorQuery(this);
          query.selectViewport().scrollOffset();
          query.selectAll(".card").boundingClientRect();
          query.exec(function (res) {



            // console.log("-----res--scroll-999-",res);
            // console.log("-----res--scroll-00111-",res[1][0].top);
  
            // let scrollTop = 0;
            // if(res[3]){
            //  scrollTop = res[0].scrollTop + res[3].top
            // }else{
            //  scrollTop = res[0].scrollTop;
            // }
            // wx.pageScrollTo({
            //   scrollTop: scrollTop - res[1].height - res[2].height,
            //   duration: 300
            // });
  
            wx.pageScrollTo({
              scrollTop: res[1][0].top+res[0].scrollTop,
              duration: 300
            });
          });
          
        }

       

    },

    clickPerson: function(e) {
      var id = e.currentTarget.dataset.id
      // console.log("---click person---",id);

      let that = this;
            wx.navigateTo({
                  url: '/pages/person/person?id=' + e.currentTarget.dataset.id+'&&company='+JSON.stringify(this.data.company),
            })

    //  this.triggerEvent('tapitem', { itemid: id }, { bubbles: true, composed: true });


    },


    clickAddPerson: function(e) {
      var id = e.currentTarget.dataset.id
       console.log("---click person--addd-",this.data.parent);

      if(this.data.parent==null){
        const ll={
          id:'',
          name:'无父级'
        }
        this.setData({
          parent:ll
        })
      }
   
      // this.triggerEvent('clickAddPerson', { path: path,idFlag:this.data.idFlag }, { bubbles: true, composed: true });


      let that = this;
            // wx.navigateTo({
            //       url: '/pages/person/addPerson?parengId=' + e.currentTarget.dataset.id+'&&company='+JSON.stringify(this.data.company),
            // })
            if(biz.checkLogin()){
            wx.navigateTo({
              url: '/pages/person/addPerson?parentId=' + this.data.parent.id+'&&parentName='+this.data.parent.name+'&&companyId='+this.data.company.id+'&&companyName='+this.data.company.name
        }) }
      else{
            var comp = this.selectComponent(".login")
            if (comp) {
                  comp.show()
                    } else {
                  console.log("fatal:can't find login dialog")
                }
              return  

      }

    //  this.triggerEvent('tapitem', { itemid: id }, { bubbles: true, composed: true });


    },
    
    Fn(e){
      //  console.log('....ok....',e);
      //  console.log("----isBranch",this.data.isBranch);
      //  console.log("----isGetData---",this.data.isGetData);
      //  console.log("----isBranch---e---",!e && typeof(e)!="undefined" && e!=0);
      if(!(!e && typeof(e)!="undefined" && e!=0)){
        this.setData({
          isGetData: true,
        });

     //   console.log("----isGetData--sss-",this.data.isGetData);

      // this.setData({
      //   isBranch: Boolean(e.children && e.children.length),
      // });
    }
    //  console.log("----isBranch---2",this.data.isBranch);

    },

    tapItem: function(e) {
      var itemid = e.currentTarget.dataset.itemid;
    //  console.log('组件里点击的id: ' + itemid);
      this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true });
    }
  },

  ready: function(e) {
    if(this.data.model!=null&&this.data.model.length){
    this.setData({
      isBranch: Boolean(this.data.model.children && this.data.model.children.length),
    });

    
  }
  },
})