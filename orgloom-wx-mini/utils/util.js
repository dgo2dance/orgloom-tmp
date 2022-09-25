const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function isWhiteSpace(str) {
  return !str || (!/\S/.test(str))
}


function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; //20160614134947
}

function objLength(input) {
  var type = toString(input);
  var length = 0;
  if (type != "[object Object]") {
    //throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key != "number") {
        length++;
      }

    }
  }
  return length;
}
//验证是否是手机号码
function vailPhone(number) {
  let flag = false;
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (number.length != 11) {
    flag = flag;
  }else if (!myreg.test(number)) {
    flag = flag;
  }else{
    flag = true;
  }
  return flag;
}
//验证是否西班牙手机(6开头 9位数)
function ifSpanish(number) {
  let flag = false;
  let myreg = /^([6|7|9]{1}(\d+){8})$/;
  if (number.length != 9) {
    flag = flag;
  } else if (!myreg.test(number)) {
    flag = flag;
  } else {
    flag = true;
  }
  return flag;
}
//浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
//浮点型加法函数   
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//浮点型乘法
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = "";
  for (var name in obj) {
    names += name + obj[name];
  }
  return names;
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
//去除所有:
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}
//转换星星分数
function convertStarArray(score) {
  //1 全星,0 空星,2半星 
  var arr = []
  for (var i = 1; i <= 5; i++) {
    if (score >= i) {
      arr.push(1)
    } else if (score > i-1 && score < i + 1) {
      arr.push(2)
    } else {
      arr.push(0)
    }
  }
  return arr
}


 function  deepTree(list) {
    
  let cloneData = JSON.parse(JSON.stringify(list))  ;

  // cloneData.unshift({
  //     name: "一级无上级",
  //     id: 0
  // });

  cloneData.forEach((e) => {

      e.label=e.name;
      e.value=e.id;

  });

const newList = [];
const map = {};

cloneData.forEach((e) => (map[e.id] = e));

cloneData.forEach((e) => {
  const parent = map[e.parentId];

  if (parent) {
    (parent.children || (parent.children = [])).push(e);
  } else {
    newList.push(e);
  }
});

const fn = (cloneData) => {
  cloneData.map((e) => {
    if (e.children instanceof Array) {
      e.children = orderBy(e.children, "orderNum");

      fn(e.children);
    }
  });
};

fn(newList);

return orderBy(newList, "orderNum");
}


function setPath(list){

 let cloneData = JSON.parse(JSON.stringify(list))  ;

  // cloneData.unshift({
  //     name: "一级无上级",
  //     id: 0
  // });

  cloneData.forEach((e) => {

    if(e.path==undefined){
    e.path=e.id;
    }
    if(e.children){
      e.children.forEach((m)=>{
        m.path=e.path+','+m.id
      })
    e.children=setPath (e.children);
    }

  });

  return cloneData;

}


 function setChildrenCount(list){

  let cloneData = JSON.parse(JSON.stringify(list))  ;
 
   // cloneData.unshift({
   //     name: "一级无上级",
   //     id: 0
   // });
 
   cloneData.forEach((e) => {
 
     
     if(e.children){
     e.children= setChildrenCount (e.children);
     let m=0;
     e.children.forEach((u)=>{
       m=u.childrenCount+m
     })
     
     e.childrenCount=m+e.children.length;
     } else{
       e.childrenCount=0;
     }
 
   });
 
   return cloneData;
 
 }

 function orderBy(list,key) {
return list.sort((a, b) => a[key] - b[key]);
}

// 从当前页面发送数据到目的页面，使用全局变量实现
// 需要用 getTransitData 方法提取
function setTransitData(key, value) {
  var g = getApp().globalData
  g.transit[key] = value
}

function getTransitData(key) {
  var g = getApp().globalData
  var v = g.transit[key]
  g.transit[key] = null
  return v
}

module.exports = {
  formatTime: formatTime,
   getCurrentTime: getCurrentTime,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  ifSpanish: ifSpanish,
  div: div,
  mul: mul,
  accAdd: accAdd,
  convertStarArray: convertStarArray,
  deepTree:deepTree,
  setPath:setPath,
  setChildrenCount:setChildrenCount,
  isWhiteSpace:isWhiteSpace,
  sendRequest: setTransitData,
  getRequest: getTransitData
}
