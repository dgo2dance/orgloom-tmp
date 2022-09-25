var data = {
      //云开发环境id
      env: 'zf-shcud',
      //分享配置
      share_title: '在光迹，查组织，欢迎查看光迹',
      share_img: '/images/poster.jpg', //可以是网络地址，本地文件路径要填绝对位置
      share_poster:'https://mmbiz.qpic.cn/mmbiz_jpg/nJPznPUZbhpA064Cl78xxvzBYTDa6O1Kl7RY1K6TerBaXcUf5AoN6x7s8q7xHgeu0Cl5qarPzE6ibbQZasWRErg/640',//必须为网络地址
      //客服联系方式
      kefu: {
            weixin: 'xuhuai66',
            qq: '1604026596',
            gzh: 'https://mmbiz.qpic.cn/mmbiz_png/nJPznPUZbhpKCwnibUUqnt7BQXr3MbNsasCfsBd0ATY8udkWPUtWjBTtiaaib6rTREWHnPYNVRZYgAesG9yjYOG7Q/640', //公众号二维码必须为网络地址
            phone: '' //如果你不设置电话客服，就留空
      },
      //默认启动页背景图，防止请求失败完全空白 
      //可以是网络地址，本地文件路径要填绝对位置
      bgurl: '/images/startBg01.jpg',
      //校区
      campus: [{
                  name: '重大A区',
                  id: 0
            },
            {
                  name: '重大B区',
                  id: 1
            },
            {
                  name: '重大C区',
                  id: 2
            },
            {
                  name: '虎溪校区',
                  id: 3
            },
      ],
      //配置学院，建议不要添加太多，不然前端不好看
      college: [{
                  name: '最热',
                  id: -1
            },
            {
                  name: '关注',
                  id: 0
            },
            {
                  name: 'IT',
                  id: 0
            },
            {
                  name: '地产',
                  id: 0
            },
            {
                  name: '医疗',
                  id: 0
            },
            {
                  name: '制造',
                  id: 0
            },
      ],

      collegeMan: [{
            name: '男生',
            id: -1
      },
      {
            name: '最新',
            id: 0
      },
      {
            name: '圈子',
            id: 0
      },
      {
            name: '群组',
            id: 0
      },
      {
            name: '视频',
            id: 0
      },
      {
            name: '助力',
            id: 0
      },
],
}
//下面的就别动了
function formTime(creatTime) {
      let date = new Date(creatTime),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}

function days() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) {
            month = '0' + month;
      }
      if (day < 10) {
            day = '0' + day;
      }
      let date = year + "" + month + day;
      return date;
}
module.exports = {
      data: JSON.stringify(data),
      formTime: formTime,
      days: days
}