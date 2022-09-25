<template>
<div>
                <div className="wrapper index-page">
                    <div className="container">

                        <div className="hero-page" data-aos="fade-in">
                                    <div className="bannar">
                                    <h1
                                        className="slogan"
                                        
                                    >
                                 每一个组织在这里 
                                    </h1>
                                    <div className="description">在光迹，看到组织的更多面</div>
                                    <button
                                        className="primary-button start-button"
                                        @click="click()"
                                    >
                                        开始查看
                                    </button>
                                    </div>
                                </div>
                                
                    </div>
                </div>
    
      <div className="wrapper solution-page">
        <div className="container">
          <div className="solution-groups">

     <div
      className="solution-item"
      style="flexDirection:row"
      
      data-aos="fade-in"
    >
      <img className="solution-image" src="../../assets/feat-01.png" /> 
      <div className="solution-content" style={style}>
        <div
          className="title"
        >
          优秀组织可视化展现，展现团队
        </div>
        <div className="brief">直观展现及查看想了解的组织，加入组织展现团队</div>
      </div>
    </div>

     <div
      className="solution-item"
      style="flexDirection:row-reverse"
      data-aos="fade-in"
    >
      <img className="solution-image" src="../../assets/solution-02.png" /> 
      <div className="solution-content"  style={style}>
        <div
          className="title"
        >
          联系组织人员
        </div>
        <div className="brief">与组织内，组织外人员更好地获取联系互动连接</div>
      </div>
    </div>
    
        </div>
      </div>
    </div>


      <footer>
        <div className="wrapper footer-bar">
          <div className="container">
            <div className="menu-container">
              <div className="logo">
                <img
                  src="../../assets/logo.svg"
                  style="max-width: 100%;display: block;margin: 10px;border: none;padding: 0;width:50px;" 
                />
              </div>
                

                <div key={menu.title} className="menu-group">
                  <div className="title">服务</div>
                  <div className="menus">
                  
                        <div className="tooltips" key={idx}>
                          <a
                            data-tip
                            data-for="address"
                            href="https://www.orgloom.cc"
                          
                          >
                             光迹
                          </a>
                          <!--
                          <ReactTooltip
                            id="address"
                            place="right"
                            effect="solid"
                            type="dark"
                          >
                            <span>{item.tooltip}</span>
                          </ReactTooltip>
                          -->
                        </div>
                   
                    
                  </div>
                </div>

                  <div key={menu.title} className="menu-group">
                  <div className="title">关于</div>
                  <div className="menus">
                  
                        <div className="tooltips" key={idx}>
                          <a
                            data-tip
                            data-for="address"
                            href="#"
                          
                          >
                             关于
                          </a>
                          <!--
                          <ReactTooltip
                            id="address"
                            place="right"
                            effect="solid"
                            type="dark"
                          >
                            <span>{item.tooltip}</span>
                          </ReactTooltip>
                          -->
                        </div>
                   
                    
                  </div>
                </div>


              
            </div>
          </div>
        </div>

        <div className="wrapper registration">
          <div className="container registration-container">
           
        

            <div className="registration">
              <span className="copyright">Copyright@2022 光迹</span>
              <a href="https://beian.miit.gov.cn/">
                <a className="beian" target="_blank" rel="noreferrer">
                  豫ICP备19047135号-2
                </a>
              </a>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802033527">
                <a className="beian-portal" target="_blank" rel="noreferrer">
                  <Image
                    src="https://cdn-official-website.juzibot.com/images/icons/beian.png"
                    alt="beian"
                    width="16"
                    height="16"
                  />
                  <!--
                  <span style="marginLeft: 4">
                        {t('registration-portal')}
                  </span>
                  -->
                </a>
              </a>
            </div>
          </div>
        </div>
      </footer>
   
</div>
</template>

<script>
import CartypeList from './components/CartypeList';
import {letter, CODE_OK, carType} from '@/config';
import {getBrandList} from '@/api/brand';
import {getCarModelList, getNewCarList} from '@/api/car';
import SeriesDialog from '@/views/car-model-lib/components/SeriesDialog';

export default {
    name: 'Home',
    data() {
        return {
            letters: letter,
            brandList: null,
            seriesList: null,
            newCarList: null,
            carouselImgs: [
                require('@/assets/carousel/carousel-img1.jpg'),
                require('@/assets/carousel/carousel-img2.jpg'),
                require('@/assets/carousel/carousel-img3.jpg'),
                require('@/assets/carousel/carousel-img4.jpg')
            ],
            brandImgs: [
                require('@/assets/logo/brand1.png'),
                require('@/assets/logo/brand2.png'),
                require('@/assets/logo/brand3.png'),
                require('@/assets/logo/brand4.png'),
                require('@/assets/logo/brand5.png'),
                require('@/assets/logo/brand6.png'),
                require('@/assets/logo/brand7.png'),
                require('@/assets/logo/brand8.png')
            ],
            brandName: ['奥迪', '奔驰', '宝马', '本田', '长城', '大众', '丰田', '福特'],
            formSearch: {
                brandId: '',
                seriesId: null
            },
            brandLoading: false,
            SeriesLoading: false
        };
    },
    components: {
        CartypeList,
        SeriesDialog
    },
    created() {
    //    this.getNewCarList();
    },
    methods: {
        toCarAssembly() {
            this.$router.push({
                path: '/car-assembly'
            });
        },
            click(item) {
    
        this.$router.push({
                name: 'home',
            
            });
            
        },
        getBrandList() {
            this.brandLoading = true;
            getBrandList().then(res=> {
                if (res.code === CODE_OK) {
                    this.brandList = this.formatBrandList(res.data.list);
                }
            }).finally(()=> {
                this.brandLoading = false;
            });
        },
        getCarModelList() {
            const param = {
                currPage: 1,
                pageSize: 200,
                brandId: this.formSearch.brandId
            };

            this.SeriesLoading = true;
            getCarModelList(param).then(res=> {
                if (res.code === CODE_OK) {
                    this.seriesList = this.formatSeriesList(res.data.list);
                }
            }).finally(()=> {
                this.SeriesLoading = false;
            });
        },
        getNewCarList() {
            getNewCarList().then(res=> {
                if (res.code === CODE_OK) {
                    this.newCarList = res.data.newList;
                }
            }).finally(()=> {
                this.brandLoading = false;
            });
        },
        formatBrandList(list) {
            const formatList = {};

            list.forEach(item=> {
                if (typeof formatList[item.preLetter] === 'undefined') {
                    formatList[item.preLetter] = [];
                }
                formatList[item.preLetter].push(item);
            });

            return formatList;
        },
        formatSeriesList(list) {
            const formatList = {};

            list.forEach(item=> {
                if (typeof formatList[item.basicParam.vendor] === 'undefined') {
                    formatList[item.basicParam.vendor] = [];
                }
                formatList[item.basicParam.vendor].push(item);
            });

            return formatList;
        },
        handleClickBrand() {
            if (this.brandList) {
                this.seriesList = null;
                return;
            }
            this.getBrandList();
        },
        handleClickSeries() {
            if (this.seriesList) {
                return;
            }
            this.getCarModelList();
        },
        onSearch() {
            this.$refs.seriesDialog.showDialog(this.formSearch.seriesId);
        },
        toLinkDetail(seriesId) {
            this.$refs.seriesDialog.showDialog(seriesId);
        },
        toLinkLib() {
            this.$router.push({
                name: 'carModelLib'
            });
        }
    }
};
</script>

<style lang="less">
.home-container {
    .header-card {
        margin: 15px 0;
        .el-card__body {
            padding: 0;
        }
    }
    .cartype-wrapper {
        width: 100%;
        text-align: center;
    }
    .search-wrapper {
        padding: 0 20px;
    }
    .assembly-card {
        .button-wrapper {
            display: flex;
            height: calc(100% - 35px);
            align-items: center;
            justify-content: center;
            .el-button {
                height: 60px;
                width: 200px;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 1px;
            }
        }
    }
    .row-wrapper {
        margin-top: 20px;
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
        }
        .button {
            padding: 0;
            min-height: 0;
        }
        .new-item {
            display: flex;
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 18px;
            &:nth-last-child(1){
                margin-bottom: 0;
            }
            .car-name {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #606266;
                .link {
                    &:hover {
                        color: #409EFF;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }
            .car-price {
                width: 70px;
                margin-left: 10px;
                color: #ff4444;
            }
        }
    }
    .brand-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}


.index-page {
  width: 100%;
  padding-top: calc(64px + 12px);
  height: 550px;
/*  background-image: url('https://cdn-official-website.juzibot.com/images/background.svg'); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: 900px;

  .hero-page {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    background-image: url('~@/assets/index-picture-2.png');
    background-size:contain;
    background-repeat: no-repeat;
    background-position: right;

    .bannar {
      padding-top: 72px;
      .slogan {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 56px;
        color: #364256;
      }

      .description {
        margin-top: 32px;
        max-width: 600px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 180%;
        color: #869bb9;
      }

      .start-button {
        margin-top: 54px;
      }
    }
  }

  .card-bannar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    grid-column-gap: 24px;

    .card {
      background: #ffffff;
      border: 1px solid #f2f6ff;
      box-sizing: border-box;
      box-shadow: 0px 20px 60px -20px rgba(5, 85, 255, 0.1);
      border-radius: 16px;
      padding: 48px 32px;

      .icon {
        width: 99px;
        height: 95px;
      }

      .title {
        padding: 0 8px;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 32px;
        color: #364256;
      }

      .subtitle {
        padding: 0 8px;
        margin-top: 8px;
        width: 100%;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 24px;
        text-align: justify;
        color: #54657e;
      }
    }
  }
}

.feature-page {
  background: #fbfbfd;
  order: 0;
  flex-grow: 0;
  padding: 44px 22px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}


.wrapper {
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .container {
    width: 1200px;
  }
}


button {
  user-select: none;
}

button.primary-button {
  height: 56px;
  padding: 16px 42px;
  background: #0555ff;
  background-image: linear-gradient(90deg, #1c60f3, #0555ff);
  box-shadow: 0px 35px 50px -15px rgba(52, 128, 239, 0.3);
  border-radius: 100px;
  color: #fff;
  border-color: unset !important;
  border-image: unset !important;
  border-width: 0 !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.8;
  }

  &:active {
    transform: translateY(1px);
    color: rgba(255, 255, 255, 0.95);
  }
}

.solution-page {
  .container {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    background-image: url('~@/assets/index-line.svg');
    background-position-x: center;
    background-position-y: 140px;
    background-repeat: no-repeat;

    .title {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      color: #384254;
      padding: 72px 0;
    }
  }

  .solution-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      user-select: none;
    }

    .solution-image {
      width: 560px;
      height: 440px;
      margin: 0 64px;
    }

    .solution-content {
      width: 514px;
      margin: 0 64px;

      .title {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        padding: 0;
        padding-bottom: 12px;

        background-position-y: 44px;
        background-position-x: -4px;
        background-repeat: no-repeat;
      }

      .brief {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 29px;
        color: #869bb9;
        margin-top: 8px;
      }
    }
  }
}

.solution-hero-page {
  width: 100vw;
  background-color: #fbfbfd;
  background-repeat: no-repeat;
  background-position-x: center;

  .container {
    padding-top: 200px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 600px;

    h1 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 56px;
      line-height: 78px;
      text-align: center;

      color: #364256;
      margin-bottom: 32px;
    }

    .subtitle {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 180%;
      width: 760px;
      /* identical to box height, or 29px */

      text-align: center;
      color: #54657e;
      margin-bottom: 40px;
    }
  }
}

.solution-challenge-page {
  background-color: #fbfbfd;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h1 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 56px;
      text-align: center;
      color: #364256;
    }

    .items {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 56px 0;

      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
          text-align: center;
          color: #364256;
          margin-top: 28px;
        }

        .subtitle {
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 300;
          font-size: 15px;
          line-height: 160%;
          text-align: center;
          color: #54657e;
          margin-top: 8px;
          width: 240px;
          height: 50px;
        }
      }
    }
  }
}

.solution-items-page {
  .container {
    padding: 72px 0 40px 0;
    h1 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 56px;
      text-align: center;
      color: #364256;
    }

    .items {
      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 36px 0;

        .left {
          .solutions-content {
            h5 {
              font-family: PingFang SC;
              font-style: normal;
              font-weight: 600;
              font-size: 24px;
              line-height: 34px;
              color: #364256;
            }

            .subtitle {
              font-family: PingFang SC;
              font-style: normal;
              font-weight: 300;
              font-size: 18px;
              line-height: 160%;
              color: #869bb9;
              margin-top: 24px;
            }
          }
          h3 {
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 600;
            font-size: 32px;
            line-height: 45px;
            color: #364256;
          }

          .items-bar {
            margin-top: 24px;
            .title {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              font-family: PingFang SC;
              font-style: normal;
              font-weight: 500;
              font-size: 18px;
              line-height: 24px;
              color: #54657e;

              .dot {
                width: 8px;
                height: 8px;
                background-color: #54657e;
                border-radius: 50%;
                margin-right: 6px;
              }
            }

            .subtitle {
              font-family: PingFang SC;
              font-style: normal;
              font-weight: 300;
              font-size: 18px;
              line-height: 150%;
              text-align: justify;
              color: #869bb9;
              margin-top: 8px;
              padding-left: 14px;
            }
          }
        }
      }
    }
  }
}

.case-detail-read-more {
  background: linear-gradient(180deg, #f7f7fb 0%, rgba(255, 255, 255, 0) 100%);
  padding: 72px 0 48px 0;
  .container {
    max-width: 1264px !important;
    width: 1264px !important;

    h1 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 45px;
      color: #364256;
      margin-left: 28px;
    }

    .items-box {
      width: 100%;
      margin: 0 auto;

      display: grid;
      grid-template-columns: repeat(3, minmax(200px, 1fr));
      // grid-row-gap: 48px;
      // grid-column-gap: 36px;
      margin: 36px 0;

      .company-item {
        padding: 24px;
        border-radius: 16px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #fff;
          box-shadow: 0px 20px 60px -20px rgba(5, 85, 255, 0.1);

          .read-more {
            color: #0555ff;
          }
        }
        .photo-bar {
          width: 100%;
          height: 200px;
          border-radius: 16px;
          overflow: hidden;

          img {
            width: 100%;
            height: 200px;
            object-fit: contain;
            transition: all 0.3s;
          }
        }

        h3 {
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 25px;
          color: #364256;
          margin-top: 18px;
        }

        .brief {
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 300;
          font-size: 14px;
          line-height: 160%;
          color: #54657e;
          margin: 8px 0;
          height: 44px;
        }

        .read-more {
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 160%;
          color: #869bb9;
        }
      }
    }
  }
}


.footer-bar {
  padding: 0;
  background: #fff;
  border-top: 1px solid #eee;

  .container > .menu-container {
    width: 100%;
    padding: 56px 22px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .menu-group {
      padding-top: 16px;

      .title {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        color: #aab9ca;
        margin-bottom: 24px;
      }

      .menus {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        a,
        div.tooltips {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #54657e;
          margin-bottom: 16px;

          // &:nth-child(4) {
          //   margin-bottom: 32px;
          // }
        }
      }
    }
  }
}

.wrapper.registration {
  padding: 0 22px;
  background: #f9f9f9;

  .registration-container {
    width: 100%;
    padding: 28px 0;

    .friendship-links,
    .registration {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .friendship-links {
      margin-bottom: 12px;
    }

    span,
    a {
      margin: 0 8px;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      color: #54657e;
      user-select: none;
    }

    .registration > span,
    .registration > a,
    .registration > a > span {
      color: #aab9ca;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}


</style>