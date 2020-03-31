<template>
  <div class="emergency_index_content">
    <div class="emergency_index_nav_all">
      <nav class="emergency_index_nav">
        <div class="emergency_index_nav_left">
          <div class="emergency_index_nav_choose" style="padding-right:0">
            <img src="../../../../assets/image/yingji/index-c.png" alt />
            <router-link to="/meetIndex">首页</router-link>
          </div>
          <div class="emergency_index_nav_choose">|</div>
          <div class="emergency_index_nav_choose">
            <router-link to="/meetThing">管理</router-link>
          </div>
          <div>智慧旅游应急平台</div>
        </div>
        <div class="emergency_index_nav_right">
          <p>{{nowTime}}</p>
        </div>
      </nav>
    </div>
    <div id="my_map"></div>
    <!-- 左边列表 -->
    <div class="emergency_index_content_left">
      <div class="emergency_index_content_left_content">
        <div class="emergency_index_content_left_search">
          <input type="text" v-model="name" placeholder="搜索景点、设备、设施关键字" />
          <button type="button" @click="getLeftList()">搜索</button>
        </div>
        <div class="emergency_index_content_left_list_content">
          <div
            class="emergency_index_content_left_list"
            v-for="(item, index) in twomeetThingLists"
            :key="index"
          >
            <div class="emergency_index_content_left_list_top">
              <div class="emergency_index_content_left_list_id">
                <img src="../../../../assets/image/yingji/list.png" alt />
                <div>编号：{{item.id}}</div>
              </div>
              <div>时间：{{item.inputTime}}</div>
              <div>名称：{{item.eventName}}</div>
              <div>地点：{{item.occurredSite}}</div>
              <div>详情：{{item.eventContent}}</div>
            </div>

            <div class="emergency_index_content_left_list_bottom">
              <!-- <div>{{item.eventStatus}}</div> -->
              <div class="emergency_index_content_left_list_bottom_status">
                <span></span>
                <span>未处理</span>
              </div>
              <button type="button" @click="nowHandle(item.id)">立即处理</button>
            </div>
          </div>
          <button class="emergency_index_content_left_list_btn" type="button" @click="getMore">查看更多</button>
        </div>
      </div>
    </div>
    <!-- 右边列表 -->
    <div class="emergency_index_content_right">
      <!-- 事件 -->
      <div class="emergency_index_content_right_event">
        <div class="emergency_index_content_right_event_all">
          <div>
            <div class="emergency_index_content_right_event_info_icon">
              <img src="../../../../assets/image/yingji/info.png" alt />
            </div>
            <div>事件</div>
          </div>
          <div style="display:flex;align-items: center;flex-wrap:wrap">
            <p
              @click="isWaited=true;isalreadyHanlle=false;isalreadyHanlle2=false;"
              :style="isWaited?'color:#0A76E3':''"
            >处理中：{{eventNoprocessed}}</p>
            <p
              @click="isalreadyHanlle2=true;isalreadyHanlle=false;isWaited=false;"
              :style="isalreadyHanlle2?'color:#0A76E3':''"
            >已处理：{{eventNoprocessed2}}</p>
            <p
              @click="isalreadyHanlle=true;isWaited=false;isalreadyHanlle2=false;"
              :style="isalreadyHanlle?'color:#0A76E3':''"
            >审核完成：{{eventProcessed}}</p>
            <!-- <p>已处理：{{eventProcessed}}</p> -->
          </div>
        </div>
      </div>
      <!-- 已处理事件列表 -->
      <div v-if="isalreadyHanlle" class="emergency_index_content_right_event_list_content_already">
        <div
          class="emergency_index_content_right_event_list_content emergency_index_content_right_event_list_content2"
        >
          <div
            class="emergency_index_content_right_event_list emergency_index_content_right_event_list2"
          >
            <div>事件编号：{{alreadymeetThingLists[0].id}}</div>
            <div>事件名称：{{alreadymeetThingLists[0].eventName}}</div>
            <div>时间：{{alreadymeetThingLists[0].creatTime}}</div>
            <div>地点：{{alreadymeetThingLists[0].occurredSite}}</div>
            <div>描述：{{alreadymeetThingLists[0].eventContent}}</div>
          </div>
          <div class="emergency_index_content_right_event_list_btn3">
            <button type="button" class="btnActive">进度</button>
            <button type="button" @click="getEventDetail(alreadymeetThingLists[0].id)">查看详情</button>
          </div>
          <div class="emergency_index_content_right_event_list_btn_content">
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{alreadymeetThingLists[0].examineTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span>事件审核完成</span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{alreadymeetThingLists[0].finishTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span>事件处理完成</span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{alreadymeetThingLists[0].handleTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span>预案处理完成</span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{alreadymeetThingLists[0].inputTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class></span>
                </span>
                <span>上报信息</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="emergency_index_content_left_list_btn"
          type="button"
          @click="isMoreAlready = true"
          style="width: 80%;margin: 0 auto;margin-top:20px;display: block;"
        >查看更多</button>
      </div>
      <!-- 处理中事件列表 -->
      <div v-if="isWaited" class="emergency_index_content_right_event_list_content_already">
        <div
          class="emergency_index_content_right_event_list_content emergency_index_content_right_event_list_content2"
        >
          <div
            class="emergency_index_content_right_event_list emergency_index_content_right_event_list2"
          >
            <div>编号：{{centermeetThingLists[0].id}}</div>
            <div>名称：{{centermeetThingLists[0].eventName}}</div>
            <div>时间：{{centermeetThingLists[0].creatTime}}</div>
            <div>地点：{{centermeetThingLists[0].occurredSite}}</div>
            <div>详情：{{centermeetThingLists[0].eventContent}}</div>
          </div>
          <div class="emergency_index_content_right_event_list_btn3">
            <button type="button" class="btnActive">进度</button>
            <button type="button" @click="getEventDetail(centermeetThingLists[0].id)">查看详情</button>
          </div>
          <div class="emergency_index_content_right_event_list_btn_content">
            <div>
              <div>
                <span class="circle_little" style="background:#E97659"></span>
                <span style="color:#E97659">应急事件处理中</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span></span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{centermeetThingLists[0].handleTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span>处理完成</span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{centermeetThingLists[0].inputTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <!-- <span class="circle_little_bottom"></span> -->
                </span>
                <span>上报信息</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="emergency_index_content_left_list_btn"
          type="button"
          @click="isMoreCenter = true"
          style="width: 80%;margin: 0 auto;margin-top:20px;display: block;"
        >查看更多</button>
      </div>
      <!-- 处理中2事件列表 -->
      <div v-if="isalreadyHanlle2" class="emergency_index_content_right_event_list_content_already">
        <div
          class="emergency_index_content_right_event_list_content emergency_index_content_right_event_list_content2"
        >
          <div
            class="emergency_index_content_right_event_list emergency_index_content_right_event_list2"
          >
            <div>编号：{{already2meetThingLists[0].id}}</div>
            <div>名称：{{already2meetThingLists[0].eventName}}</div>
            <div>时间：{{already2meetThingLists[0].creatTime}}</div>
            <div>地点：{{already2meetThingLists[0].occurredSite}}</div>
            <div>详情：{{already2meetThingLists[0].eventContent}}</div>
          </div>
          <div class="emergency_index_content_right_event_list_btn3">
            <button type="button" class="btnActive">进度</button>
            <button type="button" @click="getEventDetail(already2meetThingLists[0].id)">查看详情</button>
          </div>
          <div class="emergency_index_content_right_event_list_btn_content">
            <div>
              <div>
                <span class="circle_little" style="background:#E97659"></span>
                <span style="color:#E97659">应急事件审核中</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span></span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{already2meetThingLists[0].handleTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <span class="circle_little_bottom"></span>
                </span>
                <span>处理完成</span>
              </div>
            </div>
            <div>
              <div>
                <span class="circle_little"></span>
                <span>{{already2meetThingLists[0].inputTime}}</span>
              </div>
              <div>
                <span class="circle_little_out">
                  <!-- <span class="circle_little_bottom"></span> -->
                </span>
                <span>上报信息</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="emergency_index_content_left_list_btn"
          type="button"
          @click="isMoreAlready2 = true"
          style="width: 80%;margin: 0 auto;margin-top:20px;display: block;"
        >查看更多</button>
      </div>
    </div>
    <!-- 未处理事件查看更多 -->
    <el-dialog title="全部消息" custom-class="check_more" :visible.sync="isMore" width="60%">
      <div v-if="isMore" class="emergency_index_content_middle">
        <div class="emergency_index_content_middle_title">
          <div class="emergency_index_content_middle_title_left">
            <input type="text" v-model="middleName" placeholder="请输入消息" />
            <button @click="getUntreatedMore()">搜索</button>
          </div>
        </div>
        <div class="emergency_index_content_middle_content">
          <div
            class="emergency_index_content_middle_lists"
            v-for="(item, index) in meetThingLists"
            :key="index"
          >
            <div>
              <span>【事件编号】&emsp; {{item.id}}</span>
              <span style="margin-left:30px">【事件名称】&emsp; {{item.eventName}}</span>
              <span style="margin-left:30px">【事件时间】&emsp; {{item.inputTime}}</span>
            </div>
            <div>
              <span>【事件地点】&emsp; {{item.occurredSite}}</span>
            </div>
            <div>
              <span>【上报部门】&emsp; 保安部</span>
              <span style="margin-left:30px">【上报人】&emsp; {{item.inputName}}</span>
            </div>
            <div>
              <span>【事件详情】&emsp; {{item.eventContent}}</span>
            </div>
            <div style="margin-top:20px;justify-content: space-between">
              <div></div>
              <button class="already_check_more" style="width:100px" @click="nowHandle(item.id)">去处理</button>
            </div>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next ,total"
          :page-size="2"
          :total="UntreatedAccount"
          @current-change="untreatedChangePage"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 已处理事件列表 -->
    <el-dialog title="全部消息" custom-class="check_more" :visible.sync="isMoreAlready" width="50%">
      <div v-if="isMoreAlready" class="emergency_index_content_middle">
        <div class="emergency_index_content_middle_title">
          <div class="emergency_index_content_middle_title_left">
            <input type="text" v-model="alreadyName" placeholder="请输入消息" />
            <button @click="getmoreAlready()">搜索</button>
          </div>
        </div>
        <div class="emergency_index_content_middle_content">
          <div
            class="emergency_index_content_middle_lists"
            v-for="(item, index) in alreadymeetThingLists"
            :key="index"
          >
            <div>
              <span>【事件编号】&emsp; {{item.id}}</span>
              <span style="margin-left:30px">【事件名称】&emsp; {{item.eventName}}</span>
              <span style="margin-left:30px">【事件时间】&emsp; {{item.inputTime}}</span>
            </div>
            <div>
              <span>【事件地点】&emsp; {{item.occurredSite}}</span>
            </div>
            <div>
              <!-- <span>【上报部门】&emsp; 保安部</span> -->
              <span>【上报人】&emsp; {{item.inputName}}</span>
            </div>
            <div>
              <span>【事件详情】&emsp; {{item.eventContent}}</span>
            </div>
            <div style="margin-top:20px;margin-left:10%">
              <span class="already_circle"></span>
              <span class="already_line"></span>
              <span class="already_circle"></span>
              <span class="already_line"></span>
              <span class="already_circle"></span>
              <span class="already_line"></span>
              <span class="already_circle"></span>
            </div>
            <div style="margin-top:20px;">
              <div style="text-align:center">
                <p>{{item.inputTime}}</p>
                <p>上报信息</p>
              </div>
              <div style="text-align:center">
                <p>{{item.handleTime}}</p>
                <p>预案处理完成</p>
              </div>
              <div style="text-align:center">
                <p>{{item.finishTime}}</p>
                <p>事件处理完成</p>
              </div>
              <div style="text-align:center">
                <p>{{item.examineTime}}</p>
                <p>事件审核完成</p>
              </div>
            </div>
            <div style="margin-top:20px;justify-content: space-between">
              <div></div>
              <button class="already_check_more" @click="getEventDetail(item.id)">查看更多</button>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next ,total"
            :page-size="2"
            :total="eventProcessed"
            @current-change="alreadyChangePage"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 处理中事件列表 -->
    <el-dialog title="全部消息" custom-class="check_more" :visible.sync="isMoreCenter" width="50%">
      <div v-if="isMoreCenter" class="emergency_index_content_middle">
        <div class="emergency_index_content_middle_title">
          <div class="emergency_index_content_middle_title_left">
            <input type="text" v-model="centerName" placeholder="请输入消息" />
            <button @click="getmoreCenter()">搜索</button>
          </div>
        </div>
        <div class="emergency_index_content_middle_content">
          <div
            class="emergency_index_content_middle_lists"
            v-for="(item, index) in centermeetThingLists"
            :key="index"
          >
            <div>
              <span>【事件编号】&emsp; {{item.id}}</span>
              <span style="margin-left:30px">【事件名称】&emsp; {{item.eventName}}</span>
              <span style="margin-left:30px">【事件时间】&emsp; {{item.inputTime}}</span>
            </div>
            <div>
              <span>【事件地点】&emsp; {{item.occurredSite}}</span>
            </div>
            <div>
              <!-- <span>【上报部门】&emsp; 保安部</span> -->
              <span>【上报人】&emsp; {{item.inputName}}</span>
            </div>
            <div>
              <span>【事件详情】&emsp; {{item.eventContent}}</span>
            </div>
            <div style="margin-top:20px;margin-left:16%">
              <span class="already_circle"></span>
              <span class="center_line2"></span>
              <span class="already_circle"></span>
              <span class="center_line2"></span>
              <span class="already_circle" style="background:#E97659"></span>
              <!-- <span class="already_line"></span>
              <span class="already_circle" style="background:#E97659"></span>-->
            </div>
            <div style="margin-top:20px;">
              <div style="text-align:center">
                <p>{{item.inputTime}}</p>
                <p>上报信息</p>
              </div>
              <div style="text-align:center">
                <p>{{item.handleTime}}</p>
                <p>预案处理完成</p>
              </div>
              <div style="text-align:center" v-if="item.finishTime == null">
                <p style="color:#E97659">{{item.finishTime}}</p>
                <p style="color:#E97659">事件处理中</p>
              </div>
              <div style="text-align:center" v-else>
                <p style="color:#E97659">{{item.finishTime}}</p>
                <p style="color:#E97659">事件处理完成</p>
              </div>
              <!-- <div style="text-align:center">
                <p style="color:#E97659">{{item.examineTime}}</p>
                <p style="color:#E97659">事件审核完成</p>
              </div>-->
            </div>
            <div style="margin-top:20px;justify-content: space-between">
              <div></div>
              <button class="already_check_more" @click="getEventDetail(item.id)">查看更多</button>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next ,total"
            :page-size="2"
            :total="eventNoprocessed"
            @current-change="centerChangePage"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 处理中2事件列表 -->
    <el-dialog title="全部消息" custom-class="check_more" :visible.sync="isMoreAlready2" width="50%">
      <div v-if="isMoreAlready2" class="emergency_index_content_middle">
        <div class="emergency_index_content_middle_title">
          <div class="emergency_index_content_middle_title_left">
            <input type="text" v-model="centerName" placeholder="请输入消息" />
            <button @click="getmoreCenter()">搜索</button>
          </div>
        </div>
        <div class="emergency_index_content_middle_content">
          <div
            class="emergency_index_content_middle_lists"
            v-for="(item, index) in already2meetThingLists"
            :key="index"
          >
            <div>
              <span>【事件编号】&emsp; {{item.id}}</span>
              <span style="margin-left:30px">【事件名称】&emsp; {{item.eventName}}</span>
              <span style="margin-left:30px">【事件时间】&emsp; {{item.inputTime}}</span>
            </div>
            <div>
              <span>【事件地点】&emsp; {{item.occurredSite}}</span>
            </div>
            <div>
              <!-- <span>【上报部门】&emsp; 保安部</span> -->
              <span>【上报人】&emsp; {{item.inputName}}</span>
            </div>
            <div>
              <span>【事件详情】&emsp; {{item.eventContent}}</span>
            </div>
            <div style="margin-top:20px;margin-left:10%">
              <span class="already_circle"></span>
              <span class="center_line"></span>
              <span class="already_circle"></span>
              <span class="center_line"></span>
              <span class="already_circle"></span>
              <span class="center_line"></span>
              <span class="already_circle" style="background:#E97659"></span>
              <!-- <span class="already_line"></span>
              <span class="already_circle" style="background:#E97659"></span>-->
            </div>
            <div style="margin-top:20px;">
              <div style="text-align:center">
                <p>{{item.inputTime}}</p>
                <p>上报信息</p>
              </div>
              <div style="text-align:center">
                <p>{{item.handleTime}}</p>
                <p>预案处理完成</p>
              </div>
              <div style="text-align:center">
                <p>{{item.finishTime}}</p>
                <p>事件处理完成</p>
              </div>
              <div style="text-align:center">
                <p style="color:#E97659">{{item.examineTime}}</p>
                <p style="color:#E97659">事件审核中</p>
              </div>
              <!-- <div style="text-align:center">
                <p style="color:#E97659">{{item.examineTime}}</p>
                <p style="color:#E97659">事件审核完成</p>
              </div>-->
            </div>
            <div style="margin-top:20px;justify-content: space-between">
              <div></div>
              <button class="already_check_more" @click="getEventDetail(item.id)">查看更多</button>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next ,total"
            :page-size="2"
            :total="eventNoprocessed2"
            @current-change="already2ChangePage"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 预案处理 -->
    <el-dialog
      title="添加"
      custom-class="dialog_handle dialog_plan"
      :visible.sync="isShowPlan"
      width="50%"
    >
      <el-row :span="24" :gutter="20" style="margin-bottom:20px">
        <el-col :span="16">
          <el-input size="small" v-model="planName" placeholder="请输入关键字：预案名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="small" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <!-- <div style="margin-bottom:20px;cursor: pointer;">
        <i class="el-icon-refresh" style="margin-right:5px;color:#5086B8"></i>刷新
      </div>-->
      <div class="emergency_index_content_middle_PersonHandle">
        <table>
          <tr class="emergency_index_table_title">
            <td></td>
            <td>预案名称</td>
            <td>预案级别</td>
            <td>预案类型</td>
            <td>应急机构</td>
            <td>编制单位</td>
            <td>所属分组</td>
            <td>备注</td>
          </tr>
          <tr v-if="meetPlanList.length == ''">
            <td colspan="7" class="noinfo">没有找到匹配的记录</td>
          </tr>
          <tr v-for="(item, index) in meetPlanList" :key="index">
            <td style="width:3%">
              <el-radio v-model="planId" :label="item.id" :key="item.id">
                <br />
              </el-radio>
            </td>
            <td style="width:8%">{{item.planName}}</td>
            <td style="width:8%">{{item.planLevel | levelPlan}}</td>
            <td style="width:12%">{{item.planType | planType}}</td>
            <td style="width:12%" v-if="item.emsOrginId[0].organName ==null">/</td>
            <td style="width:12%" v-else>
              <span v-for="(org, index) in item.emsOrginId" :key="index">{{org.organName}};</span>
            </td>
            <td style="width:10%">{{item.compileUnit}}</td>
            <td style="width:10%">{{item.groupType}}</td>
            <td style="width:10%">{{item.remark}}</td>
          </tr>
        </table>
      </div>
      <span class="dialog_footer">
        <el-button size="small" @click="bindPlan()">确认</el-button>
      </span>
    </el-dialog>
    <!-- 展示人员 -->
    <el-dialog
      title="添加"
      custom-class="dialog_handle dialog_plan"
      :visible.sync="isPerson"
      width="50%"
    >
      <div class="emergency_index_content_middle_PersonHandle">
        <table>
          <tr class="emergency_index_table_title">
            <td></td>
            <td>姓名</td>
            <td>性别</td>
            <td>职位</td>
            <td>办公电话</td>
            <td>邮箱</td>
            <td>虚拟号</td>
          </tr>
          <tr v-if="personPlanList.length == ''">
            <td colspan="7" class="noinfo">没有找到匹配的记录</td>
          </tr>
          <tr v-for="(item, index) in personPlanList" :key="index">
            <td style="width:3%">
              <el-checkbox v-model="personPlanListTagtest" :label="item" :key="item.id">
                <br />
              </el-checkbox>
            </td>
            <td style="width:8%">{{item.name}}</td>
            <td style="width:8%">{{item.sex | sex}}</td>
            <td style="width:12%">{{item.position}}</td>
            <td style="width:10%">{{item.telephone}}</td>
            <td style="width:10%">{{item.email}}</td>
            <td style="width:10%">{{item.vphone}}</td>
          </tr>
        </table>
      </div>
      <span class="dialog_footer">
        <el-button size="small" @click="isPerson=false;">确认</el-button>
      </span>
    </el-dialog>
    <!-- 机构处理 -->
    <el-dialog
      title="添加"
      custom-class="dialog_handle dialog_plan"
      :visible.sync="isOrged"
      width="50%"
      style="margin-bottom: 5px"
    >
      <el-row :span="24" :gutter="20" style="margin-bottom:20px">
        <el-col :span="16">
          <el-input size="small" v-model="orgName" placeholder="请输入关键字：机构名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="small" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <div class="emergency_index_content_middle_PersonHandle">
        <table>
          <tr class="emergency_index_table_title">
            <td></td>
            <td>机构名称</td>
            <td>机构职责</td>
            <td>机构主要负责人</td>
            <td>机构联系电话</td>
            <td>机构地址</td>
          </tr>
          <tr v-if="orgList.length == ''">
            <td colspan="7" class="noinfo">没有找到匹配的记录</td>
          </tr>
          <tr v-for="(item, index) in orgList" :key="index">
            <td style="width:3%">
              <el-checkbox-group v-model="orgId">
                <el-checkbox :label="item.oId" :key="item.oId">
                  <br />
                </el-checkbox>
              </el-checkbox-group>
            </td>
            <td style="width:12%">{{item.organName}}</td>
            <td style="width:8%">{{item.organDuty}}</td>
            <td style="width:12%">{{item.organPeople}}</td>
            <td style="width:10%">{{item.organPhone}}</td>
            <td style="width:10%">{{item.organAddress}}</td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOrged = false">取 消</el-button>
        <el-button type="primary" @click="chooseOrg()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击左侧立即处置跳出弹框 -->
    <el-dialog title="立即处置" custom-class="dialog_handle" :visible.sync="isHanlle" width="50%">
      <div class="handle_info">
        <table class="event_thing_table">
          <tr>
            <td>事件编号：</td>
            <td>{{eventList.id}}</td>
            <td>申请时间：</td>
            <td colspan="2">{{eventList.creatTime}}</td>
          </tr>
          <tr>
            <td>事件名称：</td>
            <td>{{eventList.eventName}}</td>
            <td>事件紧急程度：</td>
            <td colspan="2">很紧急</td>
          </tr>
          <tr>
            <td>上报人：</td>
            <td>{{eventList.inputName}}</td>
            <td></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>事件地点：</td>
            <td colspan="4">{{eventList.occurredSite}}</td>
          </tr>
          <tr>
            <td>事件描述：</td>
            <td colspan="4">{{eventList.eventContent}}</td>
          </tr>
          <tr>
            <td>处理方式：</td>
            <td colspan="4">
              <select
                class="select_process_mode"
                v-model="processMode"
                @change="changeProcess()"
                size="small"
                placeholder="请选择"
              >
                <option
                  v-for="item in  processModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></option>
              </select>
              <button
                type="button"
                v-if="isPlanBtn"
                class="process_mode_plan"
                @click="getMeetPlanList"
              >选择预案</button>
            </td>
          </tr>
          <tr v-if="isChooseedplan">
            <td rowspan="3" style="border:none">预案处理：</td>
            <td style="text-align:right">预案名称：</td>
            <td style="text-align:left">{{planInfo.planName}}</td>
            <td style="text-align:right">预案级别：</td>
            <td style="text-align:left">{{planInfo.planLevel | levelPlan}}</td>
          </tr>
          <tr v-if="isChooseedplan">
            <td>预案类型：</td>
            <td>{{planInfo.planType | planType}}</td>
            <td>预案机构：</td>
            <td>
              <span v-for="(item, index) in planInfo.emsOrginId" :key="index">{{item.organName}};</span>
            </td>
          </tr>
          <tr v-if="isChooseedplan">
            <td rowspan="3" style="text-align:right">应急人员：</td>
            <td colspan="4" rowspan="3" style="width:60%">
              <div @click="aa" style="width:90%">
                <el-input size="small" style="width:100%">
                  <template slot="append" style="background-color: #F4F1F4;">
                    <i class="el-icon-plus" style="color:#8BBEEB;font-weight: 800;"></i>
                  </template>
                </el-input>
              </div>
              <span class="tag_all" v-for="tag in personPlanListTagtest" :key="tag.name">
                <el-tag>{{tag.name}}[{{tag.telephone}}]</el-tag>
                <img
                  class="tag_close"
                  src="../../../../assets/image/yingji/close_2.png"
                  @click="closeTagPlan(tag)"
                />
              </span>
            </td>
          </tr>
          <tr v-if="isChooseedplan">
            <td style="border:none"></td>
          </tr>
          <tr v-if="isChooseedplan">
            <td style="border:none"></td>
          </tr>
          <tr v-if="isChooseedplan">
            <td rowspan="2">短信编辑：</td>
            <td rowspan="2" colspan="4" style="padding: 10px;box-sizing: border-box;">
              <el-input type="textarea" v-model="planContent"></el-input>
            </td>
          </tr>
          <tr v-if="isChooseedOrg">
            <td rowspan="2">应急处理：</td>
            <td style="text-align:right">应急机构：</td>
            <td colspan="4" style="text-align:left;width:65%">
              <div style="width:90%;padding-bottom:10px" @click="getOrgList()">
                <el-input size="small" style="width:100%">
                  <template slot="append" style="background-color: #F4F1F4;">
                    <i class="el-icon-plus" style="color:#8BBEEB;font-weight: 800;"></i>
                  </template>
                </el-input>
              </div>
              <span class="tag_all" v-for="tag in orgChooseList" :key="tag.oId">
                <el-tag>{{tag.organName}}</el-tag>
                <img
                  class="tag_close"
                  src="../../../../assets/image/yingji/close_2.png"
                  @click="closeTagOrg(tag,tag.oId)"
                />
              </span>
            </td>
          </tr>
          <tr v-if="isChooseedOrg">
            <td style="text-align:right">应急人员：</td>
            <td colspan="4" style="text-align:left;width:65%">
              <div style="width:90%;padding-bottom:10px" @click="aa">
                <el-input size="small" style="width:100%">
                  <template slot="append" style="background-color: #F4F1F4;">
                    <i class="el-icon-plus" style="color:#8BBEEB;font-weight: 800;"></i>
                  </template>
                </el-input>
              </div>
              <span class="tag_all" v-for="tag in personPlanListTagtest" :key="tag.id">
                <el-tag>{{tag.name}}[{{tag.telephone}}]</el-tag>
                <img
                  class="tag_close"
                  src="../../../../assets/image/yingji/close_2.png"
                  @click="closeTagPer(tag,tag.oId)"
                />
              </span>
            </td>
          </tr>
          <tr v-if="isChooseedOrg">
            <td rowspan="3">短信编辑：</td>
            <td rowspan="3" colspan="4" style="padding:10px">
              <el-input type="textarea" v-model="planContent"></el-input>
            </td>
          </tr>
        </table>
        <span class="dialog_footer">
          <el-button size="small" @click="sendSmsPlan()">确认</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 事件详情 -->
    <el-dialog title="查看详情" custom-class="dialog_handle" :visible.sync="isDetail" width="50%">
      <div class="handle_info">
        <table class="event_thing_table">
          <tr>
            <td>事件编号：</td>
            <td>{{eventDetails.id}}</td>
            <td>申请时间：</td>
            <td colspan="2">{{eventDetails.creatTime}}</td>
          </tr>
          <tr>
            <td>事件名称：</td>
            <td>{{eventDetails.eventName}}</td>
            <td>事件紧急程度：</td>
            <td colspan="2">{{eventDetails.eventUrgent}}</td>
          </tr>
          <tr>
            <td>上报人：</td>
            <td>{{eventDetails.inputName}}</td>
            <!-- <td>上报部门：</td>
            <td colspan="2">保安部</td>-->
            <td></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>事件地点：</td>
            <td colspan="4">{{eventDetails.occurredSite}}</td>
          </tr>
          <tr>
            <td>事件描述：</td>
            <td colspan="4">{{eventDetails.eventContent}}</td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td>处理方式：</td>
            <td colspan="4">预案处理</td>
          </tr>
          <tr v-else>
            <td>处理方式：</td>
            <td colspan="4">应急处理</td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td rowspan="3" style="border:none">预案处理：</td>
            <td style="text-align:right">预案名称：</td>
            <td style="text-align:left">{{planInfo.planName}}</td>
            <td style="text-align:right">预案级别：</td>
            <td style="text-align:left">{{planInfo.planLevel | levelPlan}}</td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td>预案类型：</td>
            <td>{{planInfo.planType | planType}}</td>
            <td>预案机构：</td>
            <td>
              <span v-for="(item, index) in planInfo.emsOrginId" :key="index">{{item.organName}};</span>
            </td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td rowspan="3" style="text-align:right">应急人员：</td>
            <td colspan="4" rowspan="3" style="width:60%">
              <el-tag
                v-for="tag in eventPeopleLists"
                :key="tag.name"
                :type="tag.type"
                size="small"
              >{{tag.name}}[{{tag.telephone}}]</el-tag>
            </td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td style="border:none"></td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td style="border:none"></td>
          </tr>
          <tr v-if="isPlanedHandleed">
            <td rowspan="3">短信内容：</td>
            <td rowspan="3" colspan="4">{{eventDetails.smsContent}}</td>
          </tr>
          <tr v-if="isPersonHandleed">
            <td rowspan="2">应急处理：</td>
            <td style="text-align:right">应急机构：</td>
            <td colspan="3" style="text-align:left;width:65%">
              <el-tag
                size="small"
                v-for="tag in orgChooseList"
                :key="tag.organName"
                :type="tag.type"
              >{{tag.organName}}</el-tag>
            </td>
          </tr>
          <tr v-if="isPersonHandleed">
            <!-- <td rowspan="2"></td>s -->
            <td style="text-align:right">应急人员：</td>
            <td colspan="3" style="text-align:left;width:65%">
              <el-tag
                size="small"
                v-for="tag in eventPeopleLists"
                :key="tag.name"
                :type="tag.type"
              >{{tag.name}}[{{tag.telephone}}]</el-tag>
            </td>
          </tr>
          <!-- <tr v-if="isPersonHandleed">
            <td></td>
            
          </tr> -->
          <tr v-if="isPersonHandleed">
            <td rowspan="1">短信内容：</td>
            <td colspan="6">{{eventDetails.smsContent}}</td>
          </tr>
          <tr v-if="isPersonHandleed">
            <td>事件处理结果：</td>
            <td colspan="4">{{eventDetails.eventTotal}}</td>
          </tr>
        </table>
        <span class="dialog_footer">
          <el-button size="small" @click="isDetail=false">确认</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      nowTime: "",
      map: "",
      name: "",
      alreadyName: "",
      alreadyCurrent: 1,
      middleName: "",
      isChooseedplan: false,
      isChooseedOrg: false,
      isMoreAlready: false,
      isMoreAlready2: false,
      isMore: false,
      isHanlle: false,
      isalreadyHanlle: false,
      isalreadyHanlle2: false,
      isWaited: true,
      isPersonHandle: false,
      isMoreCenter: false,
      isOrged: false,
      isShowPlan: false,
      isDetail: false,
      isPlanedHandleed: false,
      isPersonHandleed: false,
      isPerson: false,
      eventDetails: "",
      planName: "",
      orgName: "",
      orgChooseList: [],
      UntreatedAccount: 0,
      untreatedCurrent: 1,
      centerName: "",
      centerCurrent: 1,
      // isPlaned: 0,
      planInfo: "",
      idLeft: "",
      twomeetThingLists: [],
      meetThingLists: [],
      alreadymeetThingLists: [],
      already2meetThingLists: [],
      centermeetThingLists: [],
      eventList: "",
      allMeetThingLists: [],
      personList: [],
      allpersonLists: [],
      orgList: [],
      personPlanList: [],
      personPlanListTag: [],
      // personPlanListTagTest:[],
      personPlanListTagtest: [],
      personPlanListTagBefore: [],
      meetPlanList: [],
      planContent: "",
      // 事件已处理未处理
      eventProcessed: 0,
      eventNoprocessed: 0,
      eventNoprocessed2: 0,
      // 选择预案
      planId: [],
      orgId: [],
      eventPeopleLists:[],
      // 立即处理选择 预案类别
      processMode: "",
      processModes: [
        {
          value: "预案处理",
          label: "预案处理"
        },
        {
          value: "应急处理",
          label: "应急处理"
        },
        {
          value: "不处理",
          label: "不处理"
        }
      ],
      isPlanBtn: false
    };
  },
  methods: {
    //   获取当前时间
    getNowTime() {
      let myDate = new Date();
      myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      myDate.getDate(); //获取当前日(1-31)
      myDate.getDay();
      let week;
      if (myDate.getDay() == 0) {
        week = "星期日";
      } else if (myDate.getDay() == 1) {
        week = "星期一";
      } else if (myDate.getDay() == 2) {
        week = "星期二";
      } else if (myDate.getDay() == 3) {
        week = "星期三";
      } else if (myDate.getDay() == 4) {
        week = "星期四";
      } else if (myDate.getDay() == 5) {
        week = "星期五";
      } else if (myDate.getDay() == 6) {
        week = "星期六";
      }
      this.nowTime =
        myDate.getFullYear() +
        "-" +
        myDate.getMonth() +
        "-" +
        myDate.getDate() +
        week;
    },
    async getThingLists() {
      let res1 = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=1&pagSize=999&eventName=${this.middleName}`
      );
      console.log(res1);
      if (res1.data.msg == "success") {
        this.allMeetThingLists = res1.data.data.list;
      }
    },
    async getLeftList() {
      let res2 = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=1&pagSize=999&eventName=${this.name}`
      );
      if (res2.data.msg == "success") {
        let meetThingLists11 = [];
        res2.data.data.list.forEach(ele => {
          if (ele.eventStatus == 0) {
            meetThingLists11.push(ele);
          }
        });
        this.twomeetThingLists = meetThingLists11.slice(0, 2);
        // console.log(this.twomeetThingLists[0].id);
        // this.idLeft = this.twomeetThingLists[0].id;
        // this.getEventList();
      }
    },
    getMore() {
      this.isMore = true;
      this.middleName = "";
      this.getUntreatedMore();
    },
    // 获取更多未处理
    async getUntreatedMore() {
      let res2 = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=${this.untreatedCurrent}&pagSize=2&eventName=${this.middleName}&eventStatus=0`
      );
      if (res2.data.msg == "success") {
        this.meetThingLists = res2.data.data.list;
        this.UntreatedAccount = res2.data.data.total;
        setTimeout(() => {
          this.initMap();
        }, 1000);
      }
    },
    initMap() {
      this.map = new T.Map("my_map");
      this.map.centerAndZoom(new T.LngLat(122.323867, 29.97176), 12);
      //   添加点
      let arrayObj = [];
      this.meetThingLists.forEach(element => {
        console.log(element);
        var marker = new T.Marker(
          new T.LngLat(element.eventLng, element.eventLat)
        );
        let that = this;
        marker.id = element.id;
        marker.title = element.eventName;
        arrayObj.push(marker);
        marker.addEventListener("click", function(e) {
          that.nowHandle(e.target.id);
          // var markerInfoWin = new T.InfoWindow();
          // let sContent =
          //   "<div><div>事件编号：" +
          //   e.target.id +
          //   "</div>" +
          //   "<div>事件名称：" +
          //   e.target.title +
          //   "</div><div><button @click='" +
          //   that.nowHandle(e.target.id) +
          //   "'>立即处置</button></div></div>";
          // markerInfoWin.setContent(sContent);
          // marker.openInfoWindow(markerInfoWin);
        }); // 将标注添加到地图中
      });
      // console.log(this.meetThingLists);
      var markers = new T.MarkerClusterer(this.map, { markers: arrayObj });
    },
    // 分页
    untreatedChangePage(val) {
      this.untreatedCurrent = val;
      this.getUntreatedMore();
    },
    // 获取更多审核已完成3
    async getmoreAlready() {
      let resA = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=${this.alreadyCurrent}&pagSize=2&eventName=${this.alreadyName}&eventStatus=3`
      );
      if (resA.data.msg == "success") {
        this.alreadymeetThingLists = resA.data.data.list;
        this.eventProcessed = resA.data.data.total;
      }
    },
    // 分页
    alreadyChangePage(val) {
      this.alreadyCurrent = val;
      this.getmoreAlready();
    },
    // 获取更多处理中1
    async getmoreCenter() {
      let resA = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=${this.centerCurrent}&pagSize=2&eventName=${this.centerName}&eventStatus=1`
      );
      // let resB = await this.$http.get(
      //   `/emer/listEmergencyEvent?pagNumber=${this.centerCurrent}&pagSize=2&eventName=${this.centerName}&eventStatus=2`
      // );
      // console.log(resA.data.data.list);
      // if (resA.data.msg == "success"&&resB.data.msg == "success") {
      //   this.centermeetThingLists = resA.data.data.list.concat( resB.data.data.list);
      //   this.eventNoprocessed = resA.data.data.total+resA.data.data.total;
      // }
      if (resA.data.msg == "success") {
        this.centermeetThingLists = resA.data.data.list;
        this.eventNoprocessed = resA.data.data.total;
      }
    },
    // 分页
    centerChangePage(val) {
      this.centerCurrent = val;
      this.getmoreCenter();
    },
    // 获取更多处理完成2
    async getmoreAlready2() {
      let resA = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=${this.centerCurrent}&pagSize=2&eventName=${this.centerName}&eventStatus=2`
      );
      if (resA.data.msg == "success") {
        this.already2meetThingLists = resA.data.data.list;
        this.eventNoprocessed2 = resA.data.data.total;
      }
    },
    // 分页
    already2ChangePage(val) {
      this.centerCurrent = val;
      this.getmoreAlready2();
    },
    // 查看事件详情
    async getEventDetail(id) {
      this.isDetail = true;
      let res = await this.$http.get(`/emer/getEmergencyEvent?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.eventDetails = res.data.data;
        if (this.eventDetails.planId2 == null) {
          this.isPlanedHandleed = false;
          this.isPersonHandleed = true;
          this.idLeft = id;
          this.findOrgAll();
        } else {
          this.isPlanedHandleed = true;
          this.isPersonHandleed = false;
          this.planId = this.eventDetails.planId2;
          this.findPlan();
        }
      }
    },
    // 弹窗选择处理方式
    changeProcess() {
      if (this.processMode == "预案处理") {
        this.isPlanBtn = true;
        // this.isChooseedplan = true;
        this.isChooseedOrg = false;
        this.personPlanListTagtest = [];
      } else if (this.processMode == "应急处理") {
        this.isPlanBtn = false;
        this.isChooseedplan = false;
        this.isChooseedOrg = true;
        this.personPlanListTagtest = [];
      }
    },
    findLeft() {
      this.meetThingLists = [];
      this.getLeftList();
    },
    midSearch() {
      this.eventNoprocessed = 0;
      this.eventProcessed = 0;
      this.getThingLists();
    },
    // 左边立即处置
    nowHandle(i) {
      this.idLeft = i;
      this.isHanlle = true;
      this.isalreadyHanlle = false;
      this.isChooseedplan = false;
      this.isChooseedOrg = false;
      this.personPlanListTag = [];
      this.planContent = "";
      this.orgChooseList = [];
      this.processMode = "";
      this.personPlanListTagtest = [];
      // this.isWaited = false;
      this.getEventList();
    },
    async getEventList() {
      let res = await this.$http.get(
        `/emer/getEmergencyEvent?id=${this.idLeft}`
      );
      // console.log(res.data.data);
      if (res.data.msg == "success") {
        this.eventList = res.data.data;
      }
    },
    // 获取人员列表
    async getPersonList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPeople?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.personList = res.data.data.list;
      }
    },
    // 获取应急预案列表
    async getMeetPlanList() {
      this.isShowPlan = true;
      this.planId = "";
      let res = await this.$http.get(
        `/emer/listEmergencyPlan?pagNumber=1&pagSize=999&planName=${this.planName}`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.meetPlanList = res.data.data.list;
      }
    },
    // 获取机构列表
    async getOrgList() {
      this.isOrged = true;
      let res = await this.$http.get(
        `/emer/listEmergencyOrganByGroupByName?pagNumber=1&pagSize=999&organName=${this.orgName}`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.orgList = res.data.data.list;
      }
    },
    changeBtnWait(i, id) {
      console.log(i, id);
      this.btnIndex = i + id;
    },
    // 关联预案
    async bindPlan() {
      let res = await this.$http.post(
        `/emer/updateEmergencyEvent`,
        qs.stringify({
          id: this.idLeft,
          planId2: this.planId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        // 查找预案
        this.findPlan();
      }
    },
    // 选择机构,人工处理
    async chooseOrg() {
      console.log(this.orgId);
      let res = await this.$http.post(
        `/emer/insertEventWithOrgan`,
        qs.stringify({
          eventId: this.idLeft,
          organId: this.orgId.toString()
          // organId: '1,40',
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        // 查找机构
        this.findOrgAll();
      }
      // });
    },
    // 查找预案
    async findPlan() {
      let res = await this.$http.get(
        `/emer/getEmergencyPlanById?pid=${this.planId}`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.planInfo = res.data.data;
        // 查找预案
        this.isShowPlan = false;
        this.findOrg(res.data.data.emsOrginId[0].oId);
      }
    },
    // 关联预案
    async findOrg(id) {
      let res = await this.$http.get(`/emer/getEmergencyOrganById?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        // 查找预案
        // this.isPlaned = 1;
        this.isShowPlan = false;
        this.isChooseedplan = true;
        // this.isHanlle = true;
        this.personPlanList = res.data.data.peopleIdList;
        this.personPlanListTag = this.personPlanList;
        let resA = await this.$http.get(
        `/emer/listEventAndPeople?eventId=${this.idLeft}`
      );
      console.log(resA);
      if (resA.data.msg == 'success') {
        this.eventPeopleLists = resA.data.data
      }
      }
    },
    personHandle() {
      this.isPersonHandle = true;
      this.isPlaned = 0;
    },
    // 查找事件并找出机构和对应的人
    async findOrgAll() {
      this.personPlanListTag = [];
      let res = await this.$http.get(
        `/emer/selectEventWithOrganById?id=${this.idLeft}`
      );
      let resA = await this.$http.get(
        `/emer/listEventAndPeople?eventId=${this.idLeft}`
      );
      console.log(resA);
      if (resA.data.msg == 'success') {
        this.eventPeopleLists = resA.data.data
      }
      console.log(res.data.data.emergencyOrgans);
      if (res.data.msg == "success") {
        this.orgChooseList = res.data.data.emergencyOrgans;
        let allOrgId = [];
        this.allpersonLists = [];
        res.data.data.emergencyOrgans.forEach(element => {
          allOrgId.push(element.oId);
        });
        allOrgId.forEach(async ele => {
          let resOrg = await this.$http.get(
            `/emer/getEmergencyOrganById?id=${ele}`
          );
          console.log(resOrg);

          if (resOrg.data.msg == "success") {
            this.allpersonLists = resOrg.data.data.peopleIdList.concat(
              this.allpersonLists
            );
            this.personPlanListTag = this.allpersonLists;
            this.personPlanList = this.personPlanListTag;
            // console.log(this.personPlanListTag);
          }
        });
        // this.isHanlle = true;
        this.isOrged = false;
        // this.isPersonHandle = true;
        // console.log(this.allpersonLists);
      }
    },
    aa() {
      this.isPerson = true;

      // console.log(this.personPlanListTag);
      // console.log(this.personPlanList);
    },
    // 移除预案人员
    closeTagPlan(tag) {
      this.personPlanListTagtest.splice(
        this.personPlanListTagtest.indexOf(tag),
        1
      );
      console.log(this.personPlanListTagtest);
      console.log(this.personPlanList);
    },
    // 移除机构人员
    closeTagPer(tag) {
      this.personPlanListTag.splice(this.personPlanListTag.indexOf(tag), 1);
    },
    // 移除机构
    async closeTagOrg(tag, id) {
      this.orgChooseList.splice(this.orgChooseList.indexOf(tag), 1);
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteByOid?oid=${id}`);
      console.log(res);
      this.findOrgAll();
    },
    // 点击确认发送短信
    async sendSmsPlan() {
      if (this.processMode == "") {
        this.$message({
          type: "warning",
          message: "请选择处理方式"
        });
      } else if (this.planContent == "") {
        this.$message({
          type: "warning",
          message: "请输入短信内容"
        });
      } else {
        this.personPlanListTagtest.forEach(async element => {
          let res = await this.$http.get(
            `/emer/sendMagSms?content=${this.planContent}&mobile=${element.telephone}`
          );
          let resD = await this.$http.post(`/emer/saveEmerEventPeople`,qs.stringify({
          eventId:this.idLeft,
          peopleId:element.pid
        })
        )
        });
        let resC = await this.$http.post(
          `/emer/updateEmergencyEvent`,
          qs.stringify({
            id: this.idLeft,
            handleTimeDto: new Date(),
            eventStatus: 1,
            smsContent: this.planContent
          })
        );
        
        console.log(resC);
        if (resC.data.msg == "success") {
          this.$message({
            type: "success",
            message: "上报成功"
          });
          this.isHanlle = false;
          this.getmoreCenter();
          this.getUntreatedMore();
          this.getLeftList();
        } else {
          this.$message({
            type: "error",
            message: "上报失败"
          });
        }
      }
    },
    // 点击确认发送短信
    async sendSmsOrg() {
      if (this.processMode == "") {
        this.$message({
          type: "warning",
          message: "请选择处理方式"
        });
      } else if (this.planContent == "") {
        this.$message({
          type: "warning",
          message: "请输入短信内容"
        });
      } else {
        this.personPlanListTag.forEach(async element => {
          let res = await this.$http.get(
            `/emer/sendMagSms?content=${this.planContent}+【普陀应急】&mobile=${element.telephone}`
          );
          let resD = await this.$http.post(`/emer/saveEmerEventPeople`,qs.stringify({
          eventId:this.idLeft,
          peopleId:element.pid
        })
        );
        });
        let resC = await this.$http.post(
          `/emer/updateEmergencyEvent`,
          qs.stringify({
            id: this.idLeft,
            handleTimeDto: new Date(),
            eventStatus: 1,
            smsContent: this.planContent + "【普陀应急】"
          })
        );
        if (resC.data.msg == "success") {
          this.$message({
            type: "success",
            message: "上报成功"
          });
          this.getmoreCenter();
          this.getUntreatedMore();
          this.getLeftList();
          this.isHanlle = false;
        } else {
          this.$message({
            type: "error",
            message: "上报失败"
          });
        }
      }
    }
  },
  mounted() {
    this.getNowTime();
    // this.loadMap();
    this.getmoreCenter();
    this.getUntreatedMore();
    this.getmoreAlready();
    this.getmoreAlready2();
    this.getThingLists();
    this.getLeftList();
  }
};
</script>
<style>
/* 地图 */

/* #app .emergency_index_content .tdt-infowindow-content-wrapper, .tdt-infowindow-tip {
    background: #fff !important;
} */
a{
  text-decoration: none;
  color: #fff;
}
.emergency_index_content >>> .tdt-container .tdt-infowindow-content-wrapper,
.tdt-infowindow-tip {
  background: #fff !important;
}
.emergency_index_content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
#my_map {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.emergency_index_nav_all {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
.emergency_index_nav {
  width: 100%;
  height: 100%;
  background-color: #5e87b0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2%;
  box-sizing: border-box;
}
.emergency_index_nav_left {
  display: flex;
  align-items: center;
}
.emergency_index_nav_left > div {
  font-size: 24px;
  font-family: SourceHanSansCN;
  color: #fff;
}
.emergency_index_nav_left > div.emergency_index_nav_choose {
  color: #fff;
  padding-right: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.emergency_index_nav_left > div.emergency_index_nav_choose:nth-of-type(1) img {
  width: 25%;
  margin-right: 10%;
}
.emergency_index_nav_left > div.emergency_index_nav_choose:nth-of-type(1) a {
  color: #000;
}
/* 左边框框 */
.emergency_index_content_left {
  /* width: 20%; */
  width: 260px;
  /* height: 92%; */
  height: calc(100% - 50px);
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
}
.emergency_index_content_left_content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.emergency_index_content_left_search {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.emergency_index_content_left_search input {
  width: 65%;
  height: 30px;
  border: 1px solid rgba(153, 153, 153, 1);
  opacity: 0.57;
  border-radius: 5px;
  outline: none;
  padding-left: 5%;
}
.emergency_index_content_left_search button {
  width: 25%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: rgba(64, 158, 255, 1);
  border: none;
  border-radius: 5px;
  text-align: center;
  outline: none;
  cursor: pointer;
}
/* 事件列表 */
.emergency_index_content_left_list_content {
  width: 100%;
  height: 92%;
  padding: 10px;
  padding-bottom: 20px;
  padding-top: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}
/*滚动条样式*/
.emergency_index_content_left_list_content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.emergency_index_content_left_list_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_left_list_content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.emergency_index_content_left_list {
  width: 100%;
  background: rgba(94, 135, 176, 1);
  border-radius: 10px 10px 10px 10px;
  box-sizing: border-box;
  border: 1px solid rgba(182, 187, 193, 1);
  margin-bottom: 20px;
}
.emergency_index_content_left_list_top {
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 10px;
  box-sizing: border-box;
}
.emergency_index_content_left_list_top > div {
  margin: 10px 0;
}
.emergency_index_content_left_list_top
  > div.emergency_index_content_left_list_id {
  height: 36px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.emergency_index_content_left_list_top
  > div.emergency_index_content_left_list_id
  img {
  width: 30px;
  margin-right: 5%;
}
.emergency_index_content_left_list_bottom {
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
}
.emergency_index_content_left_list_bottom_status > span {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(3, 193, 119, 1);
}
.emergency_index_content_left_list_bottom_status > span:nth-of-type(1) {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 10px;
  background: rgba(71, 188, 162, 1);
  border-radius: 50%;
}
.emergency_index_content_left_list_bottom button {
  width: 50%;
  height: 34px;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  border: none;
  margin-left: 10%;
  color: #fff;
  outline: none;
  cursor: pointer;
}
.emergency_index_content_left_list_btn {
  width: 100%;
  /* height: 8%; */
  height: 40px;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
}
/* 右边框框 */
.emergency_index_content_right {
  /* width: 20%; */
  width: 280px;
  height: calc(100% - 50px);
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
}
.emergency_index_content_right_message_icon_all {
  width: 12%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 12%; /* 让div的高等于宽 */
  background: rgba(94, 135, 176, 1);
  border-radius: 5px;
  position: absolute;
  right: 8%;
  top: 10%;
  cursor: pointer;
}
.emergency_index_content_right_message_icon {
  /* display: flex; */
  text-align: center;
}
.emergency_index_content_right_message_icon img {
  width: 60%;
  margin-top: 10%;
}
.emergency_index_content_right_message_point {
  width: 20%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 20%;
  background-color: red;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
}
.emergency_index_content_right_message_list_title {
  position: relative;
  padding: 10px;
  background: rgba(94, 135, 176, 1);
  border-radius: 5px 5px 0px 0px;
}
.emergency_index_content_right_message_list_title > div {
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: SourceHanSansCN;
}
.emergency_index_content_right_message_list_title
  .emergency_index_content_right_message_list_title_close {
  position: absolute;
  right: 5%;
  top: 10px;
  cursor: pointer;
  width: 8%;
}
.emergency_index_content_right_message_list_title_close img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_message_list {
  width: 60%;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 5px;
  position: absolute;
  right: 25%;
  top: 10%;
}
.emergency_index_content_right_message_list_content {
  width: 100%;
}
.emergency_index_content_right_message_list_content > div {
  width: 100%;
  padding-left: 5%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 8% 0;
  color: #333;
  font-size: 14px;
  font-family: SourceHanSansCN;
}
.emergency_index_content_right_message_list_content > div > span {
  display: inline-block;
  width: 4%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 4%;
  background-color: red;
  border-radius: 50%;
}
.emergency_index_content_right_message_list_content_btn {
  display: block;
  border: none;
  outline: none;
  color: #fff;
  width: 60%;
  margin: 10% auto;
  height: 0;
  padding-bottom: 15%;
  padding-top: 4%;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  cursor: pointer;
}
.emergency_index_content_right_event_all {
  display: flex;
  width: 80%;
  height: 80px;
  /* position: relative; */
  margin-left: 10%;
  margin-top: 20px;
  /* position: absolute;
  left: 10%;
  top: 10%; */
  background: rgba(94, 135, 176, 1);
  border-radius: 5px;
  border: 1px solid rgba(199, 199, 199, 1);
}
.emergency_index_content_right_event_all > div:nth-of-type(1) {
  width: 35%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_info_icon {
  width: 25%;
  margin-left: 20%;
  margin-right: 5%;
}
.emergency_index_content_right_event_info_icon img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) {
  width: 65%;
  height: 100%;
  background-color: #fff;
  font-size: 13px;
  border-radius: 0px 5px 5px 0px;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) p {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) p:hover {
  text-decoration: underline;
}
/* 事件列表 */
.emergency_index_content_right_event_list_content {
  width: 80%;
  margin-left: 10%;
  /* position: absolute;
  top: 25%;
  left: calc((100% - 80%) / 2); */
  margin-top: 10px;
}
.emergency_index_content_right_event_list_content2 {
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px;
}
.emergency_index_content_right_event_list_content_already {
  width: 100%;
  height: 85%;
  overflow-x: hidden;
  overflow-y: scroll;
}
/*滚动条样式*/
.emergency_index_content_right_event_list_content_already::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.emergency_index_content_right_event_list_content_already::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_right_event_list_content_already::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.emergency_index_content_right_event_list {
  width: 100%;
  background-color: #5e87b0;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px;
  padding: 5%;
  box-sizing: border-box;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_list2 {
  width: 100%;
  background-color: #5e87b0;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px 10px 0 0;
  padding: 5%;
  box-sizing: border-box;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_list > div {
  margin: 5% 0;
}
.emergency_index_content_right_event_list_title {
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-bottom: 5%;
}
.emergency_index_content_right_event_list_title_img {
  width: 15%;
  margin-right: 8%;
}
.emergency_index_content_right_event_list_title_img img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_event_list_btn {
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
}
.emergency_index_content_right_event_list_btn button {
  width: 30%;
  padding: 4% 0;
  border: none;
  outline: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn button:nth-of-type(1) {
  color: #666;
  background-color: #fff;
  border: 1px solid rgba(182, 187, 193, 1);
}
.emergency_index_content_right_event_list_btn button:nth-of-type(2) {
  width: 60%;
  background: rgba(64, 158, 255, 1);
}
/* 三个按钮 */
.emergency_index_content_right_event_list_btn2 {
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
  padding: 0 5%;
}
.emergency_index_content_right_event_list_btn2 > button {
  width: 30%;
  padding: 2% 0;
  outline: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  color: #666;
  background-color: #fff;
  border: 1px solid rgba(182, 187, 193, 1);
}
.emergency_index_content_right_event_list_btn2 > button.btnActive {
  background: rgba(64, 158, 255, 1);
  border: none;
  color: #fff;
}
/* 两个按钮 */
.emergency_index_content_right_event_list_btn3 {
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
  padding: 0 5%;
}
.emergency_index_content_right_event_list_btn3 > button {
  width: 45%;
  padding: 2% 0;
  outline: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  color: #666;
  background-color: #fff;
  border: 1px solid rgba(182, 187, 193, 1);
}
.emergency_index_content_right_event_list_btn3 > button.btnActive {
  background: rgba(64, 158, 255, 1);
  border: none;
  color: #fff;
}
.emergency_index_content_right_event_list_btn_content {
  margin: 10% 0;
  padding: 0 5%;
}
.emergency_index_content_right_event_list_btn_content > div {
  /* margin: 5% 0; */
  /* display: flex;
  align-items: center; */
}
.emergency_index_content_right_event_list_btn_content > div span {
  font-size: 13px;
  color: #9e9e9e;
}
.emergency_index_content_right_event_list_btn_content > div span.circle_little {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: rgba(204, 204, 204, 1);
  border-radius: 50%;
  margin-right: 10px;
}
.emergency_index_content_right_event_list_btn_content
  > div
  span.circle_little_out {
  display: inline-block;
  width: 14px;
  text-align: center;
  margin-right: 10px;
}
.emergency_index_content_right_event_list_btn_content
  > div
  > div
  > span:nth-of-type(2) {
  vertical-align: top;
}
.emergency_index_content_right_event_list_btn_content
  > div
  span.circle_little_bottom {
  display: inline-block;
  width: 1px;
  height: 23px;
  background: rgba(223, 223, 223, 1);
}
.emergency_index_content_right_event_list_btn_content > div > span > span {
  height: 17px;
  padding-top: 22px;
}
.emergency_index_content_right_event_list_btn_content > div > button {
  background: rgba(64, 158, 255, 1);
  color: #fff;
  border: none;
  outline: none;
  padding: 3% 10%;
  border-radius: 5px;
  /* color: chartreuse */
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn_content > button {
  display: block;
  width: 60%;
  margin: 10% auto;
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 3% 0;
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(1) {
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(2) {
  background: #cbcbcb;
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(3) {
  background: #a1a1a1;
}
/* 中间弹出框 */
.emergency_index_content_middle_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
.emergency_index_content_middle {
  /* width: 50%;
  height: 80%;
  position: absolute;
  left: calc((100% - 50%) / 2);
  top: calc((100% - 80%) / 2);
  z-index: 50;
  background-color: #f4f2f0; */
}
.emergency_index_content_middle_title {
  width: 100%;
  /* height: 12%; */
  height: 30px;
  /* padding: 2% 5%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.emergency_index_content_middle_title_right {
  width: 2%;
  cursor: pointer;
}
.emergency_index_content_middle_title_right img {
  width: 100%;
  cursor: pointer;
}
.emergency_index_content_middle_title_left {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
}
.emergency_index_content_middle_title_left div {
  margin-right: 5%;
}
.emergency_index_content_middle_title_left input {
  width: 60%;
  height: 100%;
  padding-left: 2%;
  margin-right: 3%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
.emergency_index_content_middle_title_left button {
  width: 15%;
  height: 100%;
  border: none;
  color: #fff;
  background-color: #409efc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.emergency_index_content_middle_content {
  width: 100%;
  height: 88%;
  /* border: 1px solid #000; */
  overflow-x: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.emergency_index_content_middle_content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.emergency_index_content_middle_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_middle_content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.emergency_index_content_middle_lists {
  width: 100%;
  margin: 2% auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2%;
}
.emergency_index_content_middle_lists > div {
  margin-bottom: 1%;
  display: flex;
  align-items: center;
}
.emergency_index_content_middle_content div span.already_circle {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: rgba(204, 204, 204, 1);
  border-radius: 50%;
}
.emergency_index_content_middle_content div span.already_line {
  display: block;
  width: 23%;
  margin: 0 10px;
  height: 1px;
  background: rgba(223, 223, 223, 1);
}
.emergency_index_content_middle_content div span.center_line {
  display: block;
  width: 23%;
  margin: 0 10px;
  height: 1px;
  background: rgba(223, 223, 223, 1);
}
.emergency_index_content_middle_content div span.center_line2 {
  display: block;
  width: 35%;
  margin: 0 10px;
  height: 1px;
  background: rgba(223, 223, 223, 1);
}
.emergency_index_content_middle_content div p {
  color: #9e9e9e;
  font-size: 13px;
}
.already_check_more {
  background: rgba(64, 158, 255, 1);
  border-radius: 3px;
  padding: 5px 10px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.emergency_index_content_middle_lists > div:nth-of-type(2) {
  display: flex;
  font-size: 15px;
}
.emergency_index_content_middle_lists > div > span {
  font-weight: bold;
}
.emergency_index_content_middle_lists > div > div {
  width: 50%;
}
/* 人工处理 */
.emergency_index_content_middle_PersonHandle table {
  width: 100%;
  border-collapse: collapse;
}
.emergency_index_content_middle_PersonHandle table tr {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
.emergency_index_content_middle_PersonHandle table tr td {
  text-align: center;
  border: 1px solid #ccc;
}

/* 点击左边立即处置弹窗 */
.event_thing_table {
  width: 100%;
  border: 1px solid #ccc;
}
.event_thing_table td {
  height: 30px;
  line-height: 30px;
  /* text-align: left; */
  border: 1px solid #ccc;
  padding-left: 10px;
}
.event_thing_table tr td:nth-of-type(1) {
  text-align: right;
}
.event_thing_table tr td:nth-of-type(3) {
  text-align: right;
}
.handle_info {
  margin: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgba(223, 223, 223, 1);
}
.dialog_footer {
  display: block;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.select_process_mode {
  width: 200px;
  height: 80%;
  padding-left: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #535353;
  outline: none;
  cursor: pointer;
}
.process_mode_plan {
  /* width: 48px; */
  /* height:15px; */
  margin-left: 20px;
  padding: 5px 10px;
  border: none;
  background: rgba(92, 92, 218, 1);
  border-radius: 2px;
  font-family: Microsoft YaHei;
  color: #fff;
}
.emergency_index_content .tdt-infowindow-content-wrapper,
.tdt-infowindow-tip {
  background: #fff !important;
}
/* 立即处理 */
.dialog_handle .el-dialog__header {
  border: 0;
}
.dialog_handle .el-dialog__body {
  padding: 0;
}
.dialog_handle .el-icon-close:before {
  color: #286fb7;
}
.dialog_handle .el-dialog__title {
  font-size: 16px;
  color: #286fb7;
  font-weight: bold;
  font-family: Microsoft YaHei;
}
.dialog_plan .el-dialog__body {
  padding: 5px;
  margin: 10px;
  border: 1px solid #ccc;
}
/* tag */
.tag_all {
  display: inline-block;
  font-family: Microsoft YaHei;
  font-weight: 400;
  /* color: #007eff; */
  position: relative;
  margin-right: 5px;
  margin-top: 5px;
}
.tag_close {
  display: block;
  position: absolute;
  right: -2px;
  top: -4px;
  width: 15px;
  text-align: center;
  /* line-height: 20px; */
  background-color: #5b9efc;
  color: #fff;
  border-radius: 50%;
}
/* 查看更多对话框 */
.check_more {
  background: #f4f1f4 !important;
}
.check_more .el-dialog__header {
  border: 0;
}
.check_more .el-dialog__body {
  padding-top: 15px;
}
.check_more .el-icon-close:before {
  color: #676767;
}
</style>