<template>

  <div>
        <div class="companyHeader">
            <div class="companyHeaderContent">
                <div class="top">
              <el-row :gutter="48">
                 <el-col :span="20">
                  <div class="top-content">
                    

                  <div class="top-content-a">
                    <div class="top-content-b">
                      <span><span class="top-content-c"><span class="top-content-d">
                        <div class="top-content-e">
                          <img class="top-content-f" :src="detail.logoIcon" />
                        </div></span>
                        <div class="top-content-g">
                        <div class="top-content-h">
                          <h1>{{detail.name}}</h1>
                          <p class="top-content-m"><span>{{detail.followCount}}</span>关注</p>
                        </div>
                        </div></span></span>
                    </div>
                
                  </div>


                    <!--
                    <div class="top-content-left">    
                      <img class="sc-1xxzpea-1 bISeuN" src="https://cdn.theorg.com/332276f2-2670-4c1f-81b2-ea845f2bf279_thumb.jpg" alt="Amazon logo" srcset="https://cdn.theorg.com/332276f2-2670-4c1f-81b2-ea845f2bf279_medium.jpg 2x, https://cdn.theorg.com/332276f2-2670-4c1f-81b2-ea845f2bf279_large.jpg 3x">  

                      <div class="name-s">
                          <div class="name">
                            <h1>Google</h1>
                            <p class="follower"><span>4,641</span> Followers</p>
                            
                          </div>
                      </div>
                    </div> 
                    -->


                  </div>
                  
                  
                  </el-col>
                 <el-col :span="4"><div class="top-content">
                   
                   
                    <aside class="top-content-right">

                      
                          <div class="top-aside-b" @click="handleFollow()">
                        <!--  <button class="top-button-a" style="min-width: 127px;">Following</button>  -->
                        <!--  <button  class="top-button-a">关注</button>  
                        style="{{favored?'color:'+theme.favorColor+';':''}}"  -->
                          <button v-bind:class="[followed?'top-button-b':'top-button-a']">{{followed? "取消关注": "关注" }}</button>
                          </div>


                    </aside>


                  
                   
                   </div></el-col>
              </el-row>
                </div>
            </div>

        </div>     



        <div class="companyNav">
            <div class="companyNavContent">
                <el-tabs v-model="activeName" @tab-click="handleClick">

                <el-tab-pane label="基本概况" name="first">
                      <el-row :gutter="48">
                      <el-col :span="24">
                        <div class="about"><h2>关于</h2></div>
                        </el-col>
                      </el-row>
                      <el-row>
                                <el-col :span="16">{{detail.visionRemark}}</el-col>
                                <el-col :span="8"> 

                                  <ul>
                                    <li>
                                      <div class="detail-left">网站</div>
                                      <div class="detail-right">
                                    <!--    <a :href="'http://'+detail.website">  -->
                                        <a :href="detail.website" target="_blank">
                                        {{detail.website}}
                                        </a>
                                        </div>
                                    </li>
                                    <li> 
                                      <div class="detail-left">行业</div>
                                   <!--    <div class="detail-right">{{detail.industryClassify}}</div>  -->
                                      <div class="detail-right">{{detail.industryValue}}</div> 
                                    </li>
                                     <li> 
                                      <div class="detail-left">员工数</div>
                                   <!--   <div class="detail-right">{{detail.employeesClassify}}</div>  -->

                                     <div class="detail-right">{{detail.employessValue}}</div> 
                                    </li>
                                     <li> 
                                      <div class="detail-left">位置</div>
                                      <div class="detail-right">{{detail.address}}</div>
                                    </li>
                                  </ul>

                                </el-col>
                      </el-row>

                  
                       <el-row :gutter="48">
                      <el-col :span="16">
                        <div class="about"><h2>组织展现</h2></div>
                          </el-col>
                        
                       
                      </el-row>
                    <el-row>
                                            <el-col :span="24">

                                             <div class="home">
                                               
                                                <Chart :dataSource="dataSource">
                                               
                                                </Chart>
                                                
                                              </div>

                                                 <div v-if="!dataSource.length">
                        <el-empty description="暂无组织人员，赶快添加啊" ></el-empty>
                        </div>  


                   </el-col>

                       
                    </el-row>

                    
                    
                </el-tab-pane>

                <el-tab-pane label="组织展现" name="second">
                    <el-row :gutter="48">
                      <el-col :span="16">
                        <div class="about"><h2>组织展现</h2></div>
                        </el-col>
                       <el-col :span="8">
                            <div class="org-button" @click="handleAddOrg()">
                              
                              <a>
                                  <el-row>
                                     <el-col :span="18">
                               <img src="../../assets/images/ic_add_2.png" style="width:13%;" /> 
                                    </el-col>
                                       <el-col :span="6">

                                      <div style="text-align:left">添加人员</div> 
                                       </el-col>
                                  </el-row>
                               </a>
                               
                               <!-- <a>
                               添加人员 
                               </a> -->
                            </div>  
                      
                        </el-col>
                      </el-row>
                    <el-row>
                                            <el-col :span="24">
                                                  <div class="home" >
                                                      <Chart :dataSource="dataSource">
                                                        <!--
                                                        <template v-slot="{ node, data }">
                                                          <div>{{ data.id }}</div>
                                                          <div>{{ node.level }}</div>
                                                        </template>
                                                        -->
                                                      </Chart>
                                                    </div>
                                              

                                               <div v-if="!dataSource.length">
                        <el-empty description="暂无组织人员，赶快添加啊" ></el-empty>
                        </div>  

                   </el-col>

                       
                    </el-row>
                </el-tab-pane>

                <!--
                <el-tab-pane label="产品" name="third">
                    <el-row :gutter="48">
                      <el-col :span="24">
                        <div class="about"><h2>产品</h2></div>
                        </el-col>
                      </el-row>
                    <el-row>
                                            <el-col :span="24">

                                          
                                            
                   </el-col>

                       
                    </el-row>
                </el-tab-pane>
                -->

                <!-- <el-tab-pane label="留言板" name="fourth">
                      <el-row :gutter="48">
                      <el-col :span="24">
                        <div class="about"><h2>留言板</h2></div>
                        </el-col>
                      </el-row>
                    <el-row>
                                            <el-col :span="24" >

                      
                      <CusdisVue 
                      :orgId="orgId" 
                      :host="cusdisUrl"
                      :page-id="orgId"
                      :app-id="appId"
                      :page-title="detail.name"
                      page-url=""
                      :userId="[userInfo==null?'':userInfo.id]"
                      :userName='username'
                      /> -->
<!-- 
                         <div
                            id="cusdis_thread"
                            lang="zh-cn"
                            :data-host="cusdisUrl"
                            :data-page-id="orgId"
                            :data-app-id="appId"
                            :data-page-title="detail.name"
                            data-page-url=""
                            data-theme=""
                            :data-user-id="[userInfo==null?'':userInfo.id]"
                            :data-user-name="username"
                            ref="cusdis"
                          >
                          </div> -->
                      
                      <!--           <child-react-comp ></child-react-comp> 
                      <reactContent />
                        //  
                      host="http://localhost:3000"

                        
                          <div style="margin-top:20px;font-size:20px;color: #777;
    text-align: center;">          正在赶来的路上，请稍候      </div> 

    -->
                                            
                   <!-- </el-col>

                       
                    </el-row>
                  
                </el-tab-pane> -->
                
<!--                 
                 <el-tab-pane label="交友圈" name="fivth">
                  
                  <el-row :gutter="48">
                      <el-col :span="16">
                        <div class="about"><h2>交友圈</h2></div>
                        </el-col>
                          <el-col :span="8">
                            <div class="org-button" @click="handleAdd()">

                               <a>
                                  <el-row>
                                     <el-col :span="20">
                               <img src="../../assets/images/ic_add_2.png" style="width:13%;" /> 
                                    </el-col>
                                       <el-col :span="4">

                                      <div style="text-align:left">加入</div> 
                                       </el-col>
                                  </el-row>
                               </a>

                            </div>  

                            

                        </el-col>
                      </el-row>
                    <el-row>


                       <el-col :span="24">

                        <div v-if="freeList.length">
                            <div v-for="(item,index) in freeList" :key="index">

                                            <div class="companyHeaderContent">
                                  <div class="top-free">
                                <el-row :gutter="48">
                                  <el-col :span="20">
                                    <div class="top-content">
                                      

                                    <div class="top-content-a">
                                      <div class="top-content-b">
                                        <span><span class="top-content-c"><span class="top-content-d">
                                          <div class="top-content-e-avatar">
                                            <el-avatar :size="size" :src="item.profileIcon"></el-avatar>
                                          <img class="top-content-f" :src="item.profileIcon" />   item.sexClassify
                                          </div></span>
                                          <div class="top-content-g">
                                          <div class="top-content-h-free">
                                            {{item.freeName}}
                                            <p class="top-content-m-free"><span>{{
                                              
                                              sex[item.sexClassify].value
                                              
                                              }} {{
                                              
                                              education[item.eduClassify].value
                                              
                                              }}  {{
                                              
                                              item.height
                                              
                                              }}cm</span> </p>
                                          </div>
                                          </div></span></span>
                                      </div>
                                  
                                    </div>



                                    </div>
                                    
                                    
                                    </el-col>
                                  <el-col :span="4"><div class="top-content">
                                    
                                    
                                      <aside class="top-content-right">

                                        
                                            <div class="top-aside-b" @click="handleView(item)">
                                              <button class="top-button-a">查看</button>
                                            </div>

                                        </aside>
                                        </div>
                                        </el-col>
                                  </el-row>
                                    </div>
                                </div>
                           </div>
                      </div>

                         <div v-else>
                        <el-empty description="暂无人员，赶快加入吧" ></el-empty>
                        </div>
 -->

             
                         
                        <!--
                          
                       <div style="margin-top:20px;font-size:20px;color: #777;text-align: center;">          
                         
                         每个人，都是一个自由粒子，只有勇于尝试，才能找到通往另一个粒子的康庄大道  
                         
                             
                             </div> 

                         <div style="margin-top:30px;text-align: center;" @click="handleFree()">      
                         <el-button type="attend" round size="large" plain>验证加入</el-button>
                               </div> 
                               -->
                     
                                  <!--
                       <div >          
                         
                         <img src="../../assets/images/love.png" style="width:100%;margin-top:20px;">   </div> 

                         -->
                                          
<!--                                             
                   </el-col>

                       
                    </el-row>

                </el-tab-pane> -->

                  <!--
                <el-tab-pane label="追薪" name="sixth">
                  
                  <el-row :gutter="48">
                      <el-col :span="24">
                        <div class="about"><h2>追薪</h2></div>
                        </el-col>
                      </el-row>
                    <el-row>
                       <el-col :span="24">

                                          
                                            
                   </el-col>

                       
                    </el-row>

                </el-tab-pane>
                -->

                <!--
                  <el-tab-pane label="追薪" name="fivth">
                  高薪
                </el-tab-pane>


                  <el-tab-pane label="知己" name="sixth">
                  知己
                </el-tab-pane>

                -->

                  <!--
                    <el-tab-pane label="热讯" name="seven">
                  热讯
                </el-tab-pane>

                    <el-tab-pane label="快讯" name="eight">
                  快讯
                </el-tab-pane>
                  -->
              
                </el-tabs>
            </div>

        </div>     


       

        <!--
          <div class="companySection">
            <div class="companySectionContent">
              companySectionContent
            </div>
        </div>     
        -->

  

         <el-dialog title="反馈建议"  v-model="suggestVisible" center>
                 
                    <el-form :model="form">
                      <div v-show="formFlag">
                        <el-form-item label="" :label-width="formLabelWidth">                
                          <el-radio v-model="form.radio" @change="radioChange" label="1">此人已不在这里工作</el-radio>
                        </el-form-item >

                        <el-form-item label="" :label-width="formLabelWidth">                
                          <el-radio v-model="form.radio" @change="radioChange" label="2">这就是我，我需要移除</el-radio>
                        </el-form-item >


                        <el-form-item label="" :label-width="formLabelWidth" >                
                          <el-radio v-model="form.radio" @change="radioChange" label="3">其他</el-radio>
                        </el-form-item >

                 
                        <el-form-item label="" :label-width="formLabelWidth" >   
                                  <div v-show="inputFlag" >             
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                          v-model="form.textarea">
                        </el-input>
                         </div>
                         </el-form-item >
                      </div>

                          <div class="dialog-finally" v-show="finalFlag">
                            <p>建议反馈成功</p>
            <el-button @click="suggestVisible = false">关闭</el-button>
          </div>

            </el-form>
          <div slot="footer" class="dialog-footer" v-show="footFlag">
            <el-button @click="suggestVisible = false">取 消</el-button>
            <el-button type="primary" @click="suggestConfirm">确 定</el-button>
          </div>
        </el-dialog>


          <el-dialog title="查看详情"  v-model="viewVisible" center>
                 
                    <el-form :model="form">
                         <el-form-item label="昵称:" :label-width="formLabelWidth">   
                           {{viewItem.freeName}}     
                           <!--        
                          <el-input v-model="viewItem.freeName"
                          placeholder="仅在自由圈显示的匿名昵称" disabled> </el-input>
                          -->
                    </el-form-item >

                    <el-form-item label="性别:" :label-width="formLabelWidth">                
                         
                             <!-- <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
                                                {{sex[viewItem.sexClassify].value}}
                            <!--
                            <el-radio v-model="viewItem.sexClassify" label="0" disabled>男</el-radio>
                            <el-radio v-model="viewItem.sexClassify" label="1" disabled>女</el-radio>
                            -->
                          
                        </el-form-item >

                        <el-form-item label="学历:" :label-width="formLabelWidth">    

                            {{education[viewItem.eduClassify].value}}
            
                         
                            <!-- <el-radio v-model="viewItem.eduClassify" label="0" disabled>大专</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="1" disabled>本科</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="2" disabled>研究生</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="3" disabled>其他</el-radio> -->
                          
                        </el-form-item >


                              <el-form-item label="身高:" :label-width="formLabelWidth">    

                            {{viewItem.height}}cm
            
                         
                            <!-- <el-radio v-model="viewItem.eduClassify" label="0" disabled>大专</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="1" disabled>本科</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="2" disabled>研究生</el-radio>
                            <el-radio v-model="viewItem.eduClassify" label="3" disabled>其他</el-radio> -->
                          
                        </el-form-item >


                    

                         <el-form-item label="出生日期:" :label-width="formLabelWidth">        
                           {{viewItem.birthdayDate}}   
                           <!--
                         <el-date-picker
                              v-model="viewItem.birthdayDate"
                              type="date"
                              placeholder="选择日期" >
                            </el-date-picker >
                            -->
                          </el-form-item >

                       <el-form-item label="微信号:" :label-width="formLabelWidth">      
                         {{viewItem.wechat}}          
                         <!-- <el-input v-model="viewItem.wechat"  disabled></el-input>-->
                        </el-form-item >

                         <el-form-item label="自我描述:" :label-width="formLabelWidth">      
                           {{viewItem.introduceRemark}}    
                           <!--      
                          <el-input 
                                  type="textarea"
                                  v-model="viewItem.introduceRemark" 
                                  @change="radioChange" 
                                  :rows="4"
                                  label="1" disabled></el-input>
                          -->
                        </el-form-item >

                           <el-form-item label="要求:" :label-width="formLabelWidth">      
                             {{viewItem.youRemark}}          
                          <!--
                          <el-input 
                                  type="textarea"
                                  v-model="viewItem.youRemark" 
                                  @change="radioChange" 
                                  :rows="4"
                                  label="1" disabled></el-input>
                          -->
                        </el-form-item >

            </el-form>
          <div slot="footer" class="dialog-footer" v-show="footFlag">
            <el-button @click="viewVisible = false">取 消</el-button>

          </div>
        </el-dialog>





           <el-dialog title="加入"  v-model="addFreeVisible" center>

             <el-steps :active="stepActive" finish-status="success" align-center>
              <el-step title="阅读加入须知"></el-step>
              <el-step title="填写基本信息"></el-step>
              <el-step title="填写要求信息"></el-step>
              <el-step title="填写验证信息"></el-step>
              <el-step title="等待认证审核"></el-step>
            </el-steps>

            <el-button style="margin-top: 12px;margin-left: 10px;margin-right: 30px;" @click="before">上一步</el-button>  

            <el-button style="margin-top: 12px;margin-left: 10px;" @click="next">下一步</el-button>

            

                    <div  class="text item  desc" v-show="addFirstFlag">
                    <p> <i class="el-icon-arrow-right"></i>  加入自由圈的必须条件为,为本组织人员，且是自由(单身)状态； </p>
                    <p> <i class="el-icon-arrow-right"></i>  你的信息需经过审核认证才能通过，审核人一般为组织内熟悉人员；</p>
                    <p> <i class="el-icon-arrow-right"></i>  自由圈是为了大家更好地交友，大家以加朋友认识新朋友为目的； </p>
                    <p> <i class="el-icon-arrow-right"></i>  加入自由圈后，你将获得本组织及其他组织人信息资料的权力，并可获取联系方式； </p>
                    <p> <i class="el-icon-arrow-right"></i>  你的资料安全性，会得到良好的保障； </p>

                    </div>

                    <el-form :model="form">
                      <div class="freeform" v-show="addformFlag">

                        <el-form-item label="昵称" :label-width="formLabelWidth">                
                          <el-input v-model="freeform.freeName"
                          placeholder="仅在自由圈显示的匿名昵称"></el-input>
                        </el-form-item >

                        <el-form-item label="性别" :label-width="formLabelWidth">                
                         
                             <!-- <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
                            <el-radio v-model="freeform.sexClassify" label="0">男</el-radio>
                            <el-radio v-model="freeform.sexClassify" label="1">女</el-radio>
                          
                        </el-form-item >

                        <el-form-item label="学历" :label-width="formLabelWidth">                
                         
                            <el-radio v-model="freeform.eduClassify" label="0">大专</el-radio>
                            <el-radio v-model="freeform.eduClassify" label="1">本科</el-radio>
                            <el-radio v-model="freeform.eduClassify" label="2">研究生</el-radio>
                            <el-radio v-model="freeform.eduClassify" label="3">其他</el-radio>
                          
                        </el-form-item >

                        <el-form-item label="身高(cm)" :label-width="formLabelWidth">                
                          <el-input v-model="freeform.height"></el-input>
                        </el-form-item >

                    

                         <el-form-item label="出生日期" :label-width="formLabelWidth">                
                         <el-date-picker
                              v-model="freeform.birthdayDate"
                              type="date"
                              placeholder="选择日期">
                            </el-date-picker>
                          </el-form-item >

                       <el-form-item label="微信号" :label-width="formLabelWidth">                
                          <el-input v-model="freeform.wechat" @change="radioChange" label="1"></el-input>
                        </el-form-item >
                      </div>

                     <div class="freeform" v-show="addformSecondFlag">
                         <el-form-item label="自我描述" :label-width="formLabelWidth">                
                          <el-input 
                                  type="textarea"
                                  v-model="freeform.introduceRemark" 
                                  @change="radioChange" 
                                  :rows="4"
                                  label="1"></el-input>
                        </el-form-item >

                           <el-form-item label="要求" :label-width="formLabelWidth">                
                          <el-input 
                                  type="textarea"
                                  v-model="freeform.youRemark" 
                                  @change="radioChange" 
                                  :rows="4"
                                  label="1"></el-input>
                        </el-form-item >
                        </div>
             <div class="freeform" v-show="addformThirdFlag">
                        <el-form-item label="认证描述" :label-width="formLabelWidth">                
                          <el-input 
                                  type="textarea"
                                  v-model="freeform.verifyRemark" 
                                  @change="radioChange" 
                                  :rows="4"
                                  label="1"
                                  placeholder="可以填写你的具体部门姓名或者工号编号等，有专门人员负责核实审核，审核周期在1-2天内"></el-input>
                        </el-form-item >

                  
                        
                        <div class="submmitButton" style="text-align:center"><el-button type="primary" @click="addFreeConfirm">确定提交</el-button></div>

                      </div>

                          <div class="dialog-finally" v-show="addFinalFlag">
                            <p>资料已经提交，等待审核中</p>
            <el-button @click="addFreeVisible = false">关闭</el-button>
          </div>
            </el-form>


          
          <div slot="footer" class="dialog-footer" v-show="footFlag">
            <el-button @click="addFreeVisible = false">取 消</el-button>
          <!--  <el-button type="primary" @click="addFreeConfirm">确 定</el-button> -->
          </div>
          
        </el-dialog>







         <el-dialog title="添加人员"  v-model="addOrgVisible" center>

                    <el-form :model="form">
                      <div class="freeform" v-show="addOrgFirstFlag">
                        <el-form-item label="名称" :label-width="formLabelWidth">                
                          <el-input v-model="orgform.name"
                          placeholder="人员名称"></el-input>
                        </el-form-item >
                        
                        <!--
                        <el-form-item label="父级" :label-width="formLabelWidth">                

                            <tree-select
                              v-model="testValue"
                              clearable
                              placeholder="请选择"
                              :treeData="unitTreeData"
                              :props="{ children: 'children', label: 'label' }"
                              nodeKey="id"
                             />
                        </el-form-item >
                        -->

                       <el-form-item label="上级" :label-width="formLabelWidth">                
                         <selectTreeVue   
                         placeholder="请选择" 
                         v-model="value" 
                         :options="treeData" 
                         @nodeClick="handleSelect" />
                       </el-form-item >



                       <el-form-item label="头像" :label-width="formLabelWidth">                
                        <el-upload
                              class="upload-demo"
                              ref="upload"
                              :action=domain
                              :class="{hide:hideUpload}"
                              :http-request=uploadImage
                              list-type="picture-card"
                              :before-upload="beforeUpload"
                              :on-change="onChange"
                              :on-remove="handleRemove"
                              >
                              <i class="el-icon-plus"></i>
                           <!--   <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                          </el-upload>

                       </el-form-item >

                         <el-form-item label="职位" :label-width="formLabelWidth">                
                          <el-input v-model="orgform.positionName"
                          placeholder="职位名称"></el-input>
                        </el-form-item >

                        <el-form-item label="标签" :label-width="formLabelWidth">                
                          <el-input v-model="orgform.tags"
                          placeholder="标签,多个以逗号分割"></el-input>
                        </el-form-item >

                      <div class="submmitButton" style="text-align:center"><el-button type="primary" @click="addOrgConfirm">确定提交</el-button></div>

                          </div>

                          <div class="dialog-finally" v-show="addOrgFlag">
                            <p>数据添加成功，后台审核中，审核通过，即可显示</p>
                            <el-button @click="addOrgVisible = false">关闭</el-button>
                          </div>
                    
                    </el-form>

          <div slot="footer" class="dialog-footer" v-show="footFlag">
            <el-button @click="addOrgVisible = false">取 消</el-button>
         <!--    <el-button type="primary" @click="addOrgConfirm">确 定</el-button>  -->
          </div>
        </el-dialog>


          <div class="footer" v-show="!flag">
            <loading />
          </div>
  </div>
</template>

<script>
import timeago from "timeago.js";
import Loading from "./components/Loading";
import SelectTree from "./components/treeSelect.vue";
import { deepTree } from "@/utils/index";
// import UploadImage from './components/UploadImage.vue';

import Chart from "@/components/vue-d3-org-chart-no/index";
import Vue from "vue";
import * as d3 from "d3";
// import type { DSVRowArray } from 'd3'
import data from "../../org.json";
import {
  getCompanyInfo,
  isFollow,
  addFollow,
  getOrgList,
  addAdvise,
  getFreeList,
  addFree,
  isAdd,
  uploadImageApi,
  addOrg
} from "@/api/orgHub";
import { mapGetters } from "vuex";
import { ReactInVue } from "vuera";
import Content from "./components/Content";
import { VueWrapper } from "vuera";
import {
  ElMessage,
  ElDialog,
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElSelect,
  ElOption
} from "element-plus";
import CusdisVue from "./vueCusdis/index.vue";

import selectTreeVue from "./components/tree.vue";

// import ChildReactComp from "./reactComp/index";
// const TreeSelect = () => import(/* webpackChunkName: "tree-select" */ "./components/tree-select/tree-select")
import TreeSelect from "./components/tree-select/tree-select";
export default {
  name: "OrgChart",
  data() {
    return {
      industry: [
        { key: 0, value: "互联网" },
        { key: 1, value: "金融" },
        { key: 2, value: "制造" },
        { key: 3, value: "医疗" },
        { key: 4, value: "地产" },
        { key: 5, value: "其他" }
      ],
      employess: [
        { key: 0, value: "1~50" },
        { key: 1, value: "50~200" },
        { key: 2, value: "200~1000" },
        { key: 3, value: "1000~10000" },
        { key: 4, value: "10000+" }
      ],
      sex: [{ key: 0, value: "男" }, { key: 1, value: "女" }],

      education: [
        { key: 0, value: "大专" },
        { key: 1, value: "本科" },
        { key: 2, value: "研究生" },
        { key: 3, value: "其他" }
      ],

      selectIndex: -1,
      show: false,
      detail: "",
      lastCursor: "",
      flag: true,
      orgId: "",
      activeName: "first",
      dataSource: "",
      followed: false,
      message: "这是来自Vue父组件的信息",
      userId: "",
      userNameTs: "",
      cusdisUrl: "",
      appId: "",
      suggestVisible: false,
      viewVisible: false,

      nodeData: "",
      form: {
        radio: "",
        textarea: ""
      },
      freeform: {
        name: "",
        textarea: ""
      },
      orgform: {
        name: "",
        pic: ""
      },
      formLabelWidth: "120px",
      inputFlag: false,
      finalFlag: false,
      footFlag: true,
      formFlag: true,
      freeList: "",
      addFreeVisible: false,
      stepActive: 0,
      addformFlag: false,
      addformSecondFlag: false,
      addformThirdFlag: false,
      addFinalFlag: false,
      addFirstFlag: true,
      viewItem: "",
      addOrgVisible: false,
      addOrgFlag: false,
      fileList: [],
      uploadDisabled: true,
      hideUpload: false,
      limitCount: 1,

      treeData: "",
      addOrgFirstFlag:true
    };
  },
  computed: {
    ...mapGetters(["username", "detailId", "userInfo"]),

    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    }
  },
  watch: {
    // 'nodeData'() {
    //   console.log("------orgchart-nodedata-",this.nodeData);
    // //    this.formatValue();
    // }
  },

  components: {
    Loading,
    Chart,
    CusdisVue,
    SelectTree,
    TreeSelect,
    selectTreeVue
  },
  created() {
    console.log("params", this.$route.params.id);

    console.log("-----env---config-----", process.env.VUE_APP_BASE_API);
    this.appId = process.env.VUE_APP_APP_ID;

    this.cusdisUrl = process.env.VUE_APP_CUSDIS_URL;
    //this.orgId=this.$route.query && this.$route.query.id;

    this.getCompanyInfo(this.$route.params.id);
    //  console.log('-----username--',username);
    this.isFollowed();
    this.getOrgList(this.$route.params.id);
    this.getFreeList(this.$route.params.id);

    /*
    d3.csv('org.csv').then((d) => {
     // console.log(d)
      console.log("--data--");
      console.log(data);
      this.dataSource = data
    })
    */

    // this.getNews()
    // window.addEventListener('scroll', this.getScroll)
  },
  updated() {
    //  alert("watch");
    //  const u = document.createElement('script');
    //       u.type = 'text/javascript';
    //     //  u.src = 'http://127.0.0.1:3000/js/widget/lang/zh-cn.js';
    //       u.src =  this.cusdisUrl +'/js/widget/lang/zh-cn.js';
    //      const s = document.createElement('script');
    //       s.type = 'text/javascript';
    //       // s.src = this.host+'http://127.0.0.1:3000/js/cusdis.es.js';
    //       s.src = this.cusdisUrl +'/js/cusdis.es.js';
    //       document.body.appendChild(s);
    //       document.body.appendChild(u);
  },
  mounted() {
    console.log("--------mounted-----", process.env.VUE_APP_BASE_API);

    this.cusdisUrl = process.env.VUE_APP_CUSDIS_URL;
    this.appId = process.env.VUE_APP_APP_ID;

    //  alert("mounted");

    // const u = document.createElement('script');
    //   u.type = 'text/javascript';
    // //  u.src = 'http://127.0.0.1:3000/js/widget/lang/zh-cn.js';
    //   u.src =  this.cusdisUrl +'/js/widget/lang/zh-cn.js';

    //  const s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   // s.src = this.host+'http://127.0.0.1:3000/js/cusdis.es.js';
    //   s.src = this.cusdisUrl +'/js/cusdis.es.js';
    //   document.body.appendChild(s);
    //   document.body.appendChild(u);

    this.$bus.$on("click", d => {
      this.add(d);
    });

    console.log("---------orgchart-------mounted");
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    handleRemove() {
      console.log("-----onRemove----", this.fileList.length);
      this.fileList.pop();
      this.hideUpload = this.fileList.length - 1 >= this.limitCount;
      console.log("---------", this.hideUpload);
    },

    onChange() {
      console.log("-----onChange----", this.fileList.length);
      this.hideUpload = this.fileList.length >= this.limitCount;
      console.log("---------", this.hideUpload);
    },
    // 上传图片
    uploadImage(req) {
      console.log("----uploadImage-----");
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      //  const keyName = "this.bucket +  "-" + Types.ObjectId().toString() +  '.' + fileType";

      const keyName = "2" + "." + filetype;
      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("key", keyName);
      //  axios.post('/api/uploadImage', formdata, config)
      uploadImageApi(formdata)
        .then(res => {
          console.log("---upload---Image---return---");
          this.fileList.push({
            name: res.data,
            url: res.data
          });

          console.log("------upload over---", this.fileList);
          this.hideUpload = this.fileList.length >= this.limitCount;

          this.orgform.pic = res.data;
          console.log("image upload succeed.", this.orgform.pic);
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    next() {
      if (this.stepActive++ > 3) this.stepActive = 0;
      if (this.stepActive == 0) {
        this.addFirstFlag = true;
        this.addformFlag = false;
        this.addFinalFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
      }
      if (this.stepActive == 1) {
        this.addFirstFlag = false;
        this.addformFlag = true;
        this.addFinalFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
      }
      if (this.stepActive == 2) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = true;
        this.addformThirdFlag = false;
        this.addFinalFlag = false;
      }

      if (this.stepActive == 3) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = true;
        this.addFinalFlag = false;
      }

      if (this.stepActive == 4) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
        this.addFinalFlag = true;
      }
    },

    before() {
      if (this.stepActive-- < 1) this.stepActive = 4;
      if (this.stepActive == 0) {
        this.addFirstFlag = true;
        this.addformFlag = false;
        this.addFinalFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
      }
      if (this.stepActive == 1) {
        this.addFirstFlag = false;
        this.addformFlag = true;
        this.addFinalFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
      }
      if (this.stepActive == 2) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = true;
        this.addformThirdFlag = false;
        this.addFinalFlag = false;
      }

      if (this.stepActive == 3) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = true;
        this.addFinalFlag = false;
      }

      if (this.stepActive == 4) {
        this.addFirstFlag = false;
        this.addformFlag = false;
        this.addformSecondFlag = false;
        this.addformThirdFlag = false;
        this.addFinalFlag = true;
      }
    },

    handleAdd: function(val) {
      console.log("----handleAdd---", this.username);
      if (this.username == undefined) {
        this.$router.push({
          path: "/login"
        });

        ElMessage.success({
          message: "请登录",
          type: "success"
        });

        return;
      } else {
        this.addFreeVisible = true;
      }
    },

    handleAddOrg: function(val) {
      console.log("----handleAddOrg---", this.username);
      if (this.username == undefined) {
        this.$router.push({
          path: "/login"
        });

        ElMessage.success({
          message: "请首先登录",
          type: "success"
        });

        return;
      } else {
        this.addOrgVisible = true;
      }
    },

    radioChange: function(val) {
      let that = this;
      if (val == 3) {
        this.inputFlag = true;
      } else {
        this.inputFlag = false;
      }

      console.log("---radio change----", val);
    },



     addOrgConfirm() {
      const param = this.orgform;
      param.companyId = this.orgId;
      param.companyName = this.detail.name;
      param.profileIcon=param.pic;
      param.userId = 0; // 后台赋值
      param.userName = this.userName;
      param.verifyClassify = 0;

      console.log("----addOrgConfirm Confirm----", JSON.stringify(param));

      addOrg(param)
        .then(res => {
          console.log("---add Org---");
          console.log(res);
          if (res.code === 1000) {
            console.log("add org success");
       //     this.addOrgVisible =false
            this.addOrgFirstFlag =false;
            this.addOrgFlag =true;
        //    this.getOrgList();
            // if (this.stepActive == 4) {
            //   this.addFirstFlag = false;
            //   this.addformFlag = false;
            //   this.addformSecondFlag = false;
            //   this.addformThirdFlag = false;
            //   this.addFinalFlag = true;
            // }
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });

      //  console.log("----suggest Confirm--uuu--",JSON.stringify(param));
    },


    addFreeConfirm() {
      const param = this.freeform;
      param.companyId = this.orgId;
      param.companyName = this.detail.name;
      param.userId = 0; // 后台赋值
      param.userName = this.userName;
      param.verifyClassify = 0;

      console.log("----addFreeConfirm Confirm----", JSON.stringify(param));

      addFree(param)
        .then(res => {
          console.log("---add Free---");
          console.log(res);
          if (res.code === 1000) {
            console.log("add free success");
            this.stepActive++;

            if (this.stepActive == 4) {
              this.addFirstFlag = false;
              this.addformFlag = false;
              this.addformSecondFlag = false;
              this.addformThirdFlag = false;
              this.addFinalFlag = true;
            }
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });

      //  console.log("----suggest Confirm--uuu--",JSON.stringify(param));
    },

    suggestConfirm() {
      const param = this.form;

      console.log("----suggest Confirm----", JSON.stringify(param));

      if (param.radio == 2) {
        param.textarea = "这就是我,需要移除";
      } else if (param.radio == 1) {
        param.textarea = "此人已不在这里工作";
      }
      param.adviseRemark = param.textarea;
      param.adviseClassify = param.radio;
      param.companyId = this.orgId;
      param.companyName = this.detail.name;
      param.orgId = this.nodeData.id;
      param.orgName = this.nodeData.name;

      addAdvise(param)
        .then(res => {
          console.log("---add Advise---");
          console.log(res);
          if (res.code === 1000) {
            console.log(res.data);
            this.finalFlag = true;
            this.footFlag = false;
            this.formFlag = false;
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });

      console.log("----suggest Confirm--uuu--", JSON.stringify(param));
    },

    add(d) {
      this.suggestVisible = true;

      this.finalFlag = false;
      this.footFlag = true;
      this.formFlag = true;

      this.nodeData = d;
      console.log("----mitt -", d);
      console.log("---mitt--orgChart--", this.suggestVisible);
    },

    getCompanyInfo(d) {
      this.orgId = this.detailId;

      const param = {
        id: this.detailId
      };
      console.log("get Company Info", param);
      getCompanyInfo(param)
        .then(res => {
          console.log("---getCompanyInfo---");
          console.log(res);
          if (res.code === 1000) {
            this.detail = res.data;
            this.detail.industryValue = this.industry[
              this.detail.industryClassify
            ].value;
            this.detail.employessValue = this.employess[
              this.detail.employeesClassify
            ].value;
            console.log(res.data);
            //   this.lastCursor = res.data.data[19].order
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });
    },

    getOrgList(d) {
      this.orgId = this.detailId;

      const param = {
        orgId: this.detailId
      };
      console.log("get org List", param);
      getOrgList(param)
        .then(res => {
          console.log("---get org List---");
          console.log(res);
          if (res.code === 1000) {
            this.dataSource = res.data;

            console.log(res.data);
            //   this.lastCursor = res.data.data[19].order

            this.treeData = deepTree(res.data);

            console.log("------set tree----list", this.treeData);
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });
    },

    setTreeList(d) {
      let cloneData = JSON.parse(JSON.stringify(d)); // 对源数据深度克隆
      console.log("---cloneData----", cloneData);
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },

    getFreeList(d) {
      this.orgId = this.detailId;

      const param = {
        orgId: this.detailId
      };
      console.log("get org List", param);
      getFreeList(param)
        .then(res => {
          console.log("---get org List---");
          console.log(res);
          if (res.code === 1000) {
            this.freeList = res.data;

            console.log(res.data);
            //   this.lastCursor = res.data.data[19].order
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });
    },

    // 取值
    getValue(value) {
      this.valueId = value;
      console.log(this.valueId);
    },

    /**
     * 处理加入自由圈验证
     */
    handleFree() {
      ElMessage.success({
        message: "正在加速赶来的路上，请稍候",
        duration: "900",
        type: "success"
      });
    },

    handleFollow() {
      console.log("---follow---handle---");

      const param = {
        companyId: this.orgId,
        followed: !this.followed
      };
      console.log("---followAdd---", param);
      addFollow(param)
        .then(res => {
          console.log("---follow---add---");
          console.log(res);
          if (res.code === 1000) {
            //  this.detail = res.data
            console.log(res.data);
            ElMessage.success({
              message: "处理成功",
              duration: "500",
              type: "success"
            });
            this.isFollowed();

            //   this.lastCursor = res.data.data[19].order
          } else {
            ElMessage.success({
              message: res.message,
              type: "success"
            });
          }
        })
        .finally(() => {
          //    this.SeriesLoading = false;
        });
    },

    handleSelect(data) {
      console.log("---hadleSelect---", JSON.parse(JSON.stringify(data)));
      const l=JSON.parse(JSON.stringify(data)).id;
      console.log("--hadleSelect---",l)
      if(l==0){
      this.orgform.parentId= null;
      }else{
       this.orgform.parentId= l;  
      }
      console.log("---end-",this.orgform.parentId);
    },

    handleView(item) {
      // 先判断当前是否已经加入 加入则可查看 否则提示不能看

      console.log("---view---handle---");

      this.isAdded(item);
    },

    isAdded(item) {
      console.log("---add---is---");

      console.log("---add---add---username--", this.username);

      console.log("---this.userName-----" + this.username);
      //        console.log('---this.userInfo---id--'+this.userInfo.id);

      if (this.username == undefined) {
        this.$router.push({
          path: "/login"
        });

        ElMessage.success({
          message: "请登录",
          type: "success"
        });
        return;
      }

      if (this.username != undefined) {
        // this.userNameTs=this.username;
        // this.userId=this.userInfo.id

        console.log("----this.userName is not undefined----");
        const param = {
          companyId: this.orgId
        };
        console.log("---add----Is---", param);
        isAdd(param)
          .then(res => {
            console.log("---add---is--end-", res);
            if (res.code === 1000) {
              if (!res.data) {
                ElMessage.success({
                  message: "请首先加入",
                  type: "success"
                });
              } else {
                console.log("---add---is--end----uuuuu---set visibleVisible--");

                this.viewItem = item;
                console.log(
                  "--this.viewItem.birthday--000----",
                  this.viewItem.birthdayDate
                );
                this.viewItem.birthdayDate = this.viewItem.birthdayDate.substring(
                  0,
                  10
                );
                // this.viewItem.birthdayDate=new Date(this.viewItem.birthdayDate).format("yyyy-MM-dd");
                console.log(
                  "--this.viewItem.birthday--",
                  this.viewItem.birthdayDate
                );

                this.viewVisible = true;
              }
            } else {
              // this.viewItem=item;
              // this.visibleVisible=true;
            }
          })
          .finally(() => {
            //    this.SeriesLoading = false;
          });
      }
    },

    isFollowed() {
      console.log("---follow---is---");

      console.log("---follow---add---username--", this.username);

      console.log("---this.userName-----" + this.username);
      //        console.log('---this.userInfo---id--'+this.userInfo.id);

      if (this.username != undefined) {
        // this.userNameTs=this.username;
        // this.userId=this.userInfo.id

        console.log("----this.userName is not undefined----");
        const param = {
          companyId: this.orgId
        };
        console.log("---followIs---", param);
        isFollow(param)
          .then(res => {
            console.log("---follow---is--end-");
            console.log(res);
            if (res.code === 1000) {
              this.followed = res.data;
            } else {
              ElMessage.success({
                message: res.message,
                type: "success"
              });
            }
          })
          .finally(() => {
            //    this.SeriesLoading = false;
          });
      }
    },

    getRouterData() {
      console.log("page", this.$route.params.id);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    throttle(func, wait) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        if (!timeout) {
          timeout = setTimeout(function() {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
    debounce(func, wait) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        var callNow = !timeout;
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.companyHeaderContent {
  /* margin: 10px 10px 10px 10px; */
  z-index: 999;
  background: #fff !important;
  margin: 0 auto;
}
@media screen and (min-width: 1201px) {
  .companyHeaderContent {
    width: 1200px;
  }
}
@media screen and (min-width: 991) {
  .companyHeaderContent {
    width: 860px;
  }
}
@media screen and (min-width: 769) {
  .companyHeaderContent {
    width: 718px;
  }
}

.top-content {
  margin: 0 auto;
  padding: 20px 0px 10px;
  max-width: 1024px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.name-s {
  min-width: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-top: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-left: 8px;
}

.name {
  min-width: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-top: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-left: 8px;
}

.follower {
  color: #919195;
  font-size: 16px;
  min-width: 120px;
  margin: 0 0 0 8px;
}

.top {
  margin: 0 auto;
  padding: 30px 100px 20px 0px;
  max-width: 1024px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.top-free {
  margin: 0 auto;
  max-width: 1024px;
  padding: 0px 100px 10px 0px;

  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.top-content-a {
  /* margin: 0 auto;
    padding: 56px 45px 40px; */
  max-width: 1024px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.top-content-e-avatar {
  padding-top: 8px;
  box-sizing: content-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.top-content-a .top-content-b {
  /*   max-width: calc(100% - 205px);*/
  -webkit-box-flex: 1;
  -ms-flex: 1 1;
  flex: 1 1;
}

.top-content-c {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  color: #0a0a0b;
}

.top-content-d {
  min-width: 56px;
  min-height: 56px;
}
.top-content-d {
  position: relative;
  overflow: visible !important;
}

.top-content-c img {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border: 1px solid #eaeaeb;
  width: 56px;
  height: 56px;
  border-radius: 14px;
}

.top-content-m {
  color: #919195;
  font-size: 16px;
  min-width: 120px;
  margin: 2px 0 0 8px;
}
.top-content-m-free {
  color: #919195;
  font-size: 16px;
  min-width: 120px;
}

.top-content-left {
  max-width: calc(100% - 205px);
  -webkit-box-flex: 1;
  -ms-flex: 1 1;
  flex: 1 1;
}

.top-content-h h1 {
  margin: 0 0 0 8px;
  font-size: 20px;
}
.top-content-h-free {
  margin: 0 0 0 8px;
  font-size: 16px;
}
.top-content-right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: 8px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  text-align: right;
}

.top-aside-b- > :first-child {
  margin-left: auto;
  margin-right: 10px;
}

.top-button-b {
  color: #0a0a0b;
  border: 1px solid #eaeaeb;
  background-color: #eeeeee;
  cursor: pointer;
}
.top-button-b {
  min-width: 0;
  border-radius: 40px;
}
.top-button-b {
  height: 40px;
  font-size: 18px;
  padding-left: 16px;
  padding-bottom: 2px;
  padding-right: 16px;
}
.top-button-b {
  color: #0a0a0b;
  border: 1px solid #eaeaeb;
}

.top-button-b {
  min-width: 0;
  border-radius: 40px;
}

.about {
  margin-bottom: 15px;
  padding-top: 18px;
}

.about h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  font-size: 24px;
}

.top-button-b {
  height: 40px;
  font-size: 18px;
  padding-left: 16px;
  padding-bottom: 2px;
  padding-right: 16px;
}

.detail-left {
  text-align: left;
  color: #77777c;
}

.detail-right {
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #707074;
  text-align: right;
  font-weight: 400;
}
.detail-right a {
  color: #1e2ff1;
}

ul li:first-child {
  padding-top: 0;
}
ul li {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-column-gap: 16px;
  line-height: 1.5;
  padding: 4px 0;
  border-bottom: 0 solid #eaeaeb;
}

/*
.top-button-a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    min-width: 160px;
    border-color: #eee;
    height: 50px;
    padding: 0 25px;
    font-size: 18px;
    border-radius: 10px;
    color: #0a0a0b;
    -webkit-transition: all .1s ease;
    -o-transition: all .1s ease;
    transition: all .1s ease;
    background-color: transparent;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
*/

.top-button-a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  min-width: 130px;
  height: 40px;
  border-color: #eee;
  border: 1px solid #eee;
  padding: 0 25px;
  font-size: 18px;
  border-radius: 60px;
  color: #0a0a0b;
  transition: all 0.1s ease;
  background-color: transparent;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
}
.top-content-left img {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border: 1px solid #eaeaeb;
}

.el-tabs__nav-wrap::after {
  height: 1px !important;
  background-color: var(--el-border-color-light);
  z-index: var(--el-index-normal);
}

.companyNav {
  margin-top: 0;
  top: 64px;
  /*  border-bottom: 1px solid transparent;
    -webkit-box-shadow: 0 9px 12px -10px rgb(33 33 38 / 10%);
    box-shadow: 0 9px 12px -10px rgb(33 33 38 / 10%); */
}
.companyNavContent {
  /* margin: 10px 10px 10px 10px; */
  z-index: 999;
  background: #fff !important;
  margin: 0 auto;
}
@media screen and (min-width: 1201px) {
  .companyNavContent {
    width: 1200px;
  }
}
@media screen and (min-width: 991) {
  .companyNavContent {
    width: 860px;
  }
}
@media screen and (min-width: 769) {
  .companyNavContent {
    width: 718px;
  }
}

.companyNav:before {
  content: "";
  width: 100%;
  height: 1px;
  border-bottom: 1px solid rgb(230, 225, 225);
  display: block;
  /* margin-left: 24px;
    margin-bottom: 10px; */
  position: absolute;
  top: 178px;
}

.companySectionContent {
  /* margin: 10px 10px 10px 10px; */
  z-index: 999;
  background: #fff !important;
  margin: 0 auto;
}
@media screen and (min-width: 1201px) {
  .companySectionContent {
    width: 960px;
  }
}
@media screen and (min-width: 991) {
  .companySectionContent {
    width: 860px;
  }
}
@media screen and (min-width: 769) {
  .companySectionContent {
    width: 718px;
  }
}

.el-button--attend {
  /*  color:#777; */
  background-color: #fff;
  width: 360px;
  font-size: 16px;
  border-color: #eee;
  border: 1px solid #eee;
  padding: 0 25px;
  font-size: 18px;
  border-radius: 60px;
  color: #0a0a0b;
  font-weight: normal;
}

.dialog-footer {
  text-align: right;
}

.dialog-finally {
  text-align: center;
  margin-top: 20px;
}
.dialog-finally p {
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
/*去掉tabs底部的下划线*/
.el-tabs__active-bar {
  background-color: transparent !important;
}

/*去掉切换时el-tab-pane底部的蓝色下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}

.companyNavContent >>> .el-tabs__nav-wrap::after {
  position: static !important;
}

.org-button {
  text-align: right;
  padding-top: 32px;
  line-height: 1.5;
  text-align: right;
  /* margin-bottom: 5px; */
  /* padding-top: 32px; */
  margin-bottom: 15px;
  padding-top: 35px;
  margin-right: 23px;
}
.desc {
  padding: 10px 40px 40px 40px;
}
.desc p {
  line-height: 48px;
}

.freeform {
  margin-top: 30px;
}

.home{
  width: 100%;
}

.hide .el-upload--picture-card {
  display: none !important;
}

/* .org-button a{

  display:inline-block;
		width: 100px;
		height:40px;
		background:url(../../assets/images/ic_add_2.png) no-repeat fixed 10px center;
		text-indent:35px;

} */

 /* .org-button a:before{
   content:url(../../assets/images/ic_add_2.png);
   display:block;
      width:10px;
      height:10px;
 } */

</style>

<style >
.hide .el-upload--picture-card {
  display: none !important;
}
</style>
