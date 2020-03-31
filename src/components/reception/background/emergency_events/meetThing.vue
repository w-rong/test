<template>
  <div class="emergency_events_thing_all_content">
    <Navbar></Navbar>
    <div class="emergency_events_thing_content">
      <div class="emergency_events_thing_content_right_content">
        <div class="emergency_events_thing_content_right_content_title">
          <input type="text" placeholder="请输入应急事件名称" v-model="unitName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_events_thing_content_right_content_table">
          <table>
            <tr class="emergency_events_thing_content_right_content_table_title">
              <!-- <td>创建人</td> -->
              <!-- <td>创建时间</td> -->
              <td>事件名称</td>
              <td>发生时间</td>
              <td>事件内容</td>
              <td>事件等级</td>
              <td>事件类型</td>
              <td>事件状态</td>
              <td>发生地点</td>
              <td>经度</td>
              <td>纬度</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="meetThingList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in meetThingList" :key="index">
              <!-- <td style="width:8%">{{item.inputName}}</td> -->
              <!-- <td style="width:10%">{{item.creatTime | time}}</td> -->
              <td style="width:8%">{{item.eventName}}</td>
              <td style="width:8%">{{item.occurredTime}}</td>
              <td style="width:16%">{{item.eventContent}}</td>
              <td style="width:8%">{{item.eventLevel | eventLevel}}</td>
              <td style="width:10%">{{item.eventType | eventType}}</td>
              <td style="width:12%">{{item.eventStatus | eventStatus}}</td>
              <td style="width:12%">{{item.occurredSite}}</td>
              <td style="width:8%">{{item.eventLng}}</td>
              <td style="width:8%">{{item.eventLat}}</td>
              <td style="width:12%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="emergency_events_thing_content_right_content_page">
          <div class="emergency_events_thing_content_right_content_page_left">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="15"
              :current-page="currentPage"
              layout="total, prev, pager, next"
              :total="allAccount"
            ></el-pagination>
          </div>
        </div>
        <!-- 新增弹框 -->
        <el-dialog title="新增数据" :visible.sync="isadded" width="60%" :modal-append-to-body="true">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-row :span="24"> -->
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="上报人" prop="inputName">
                  <el-input v-model="ruleForm.inputName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事件名称" prop="eventName">
                  <el-input v-model="ruleForm.eventName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="发生时间" prop="occurredTime">
                  <el-date-picker
                    placeholder="选择时间"
                    type="datetime"
                    v-model="ruleForm.occurredTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-form-item label="事件内容" prop="eventContent">
                <el-input v-model="ruleForm.eventContent"></el-input>
              </el-form-item>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="事件类型" prop="eventType">
                  <el-select v-model="ruleForm.eventType" placeholder="请选择事件类型">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="自然灾害" value="1"></el-option>
                    <el-option label="事故灾害" value="2"></el-option>
                    <el-option label="公共卫生事件" value="3"></el-option>
                    <el-option label="社会安全事件" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事件等级" prop="eventLevel">
                  <el-select v-model="ruleForm.eventLevel" placeholder="请选择事件类型">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="特别重大" value="1"></el-option>
                    <el-option label="重大" value="2"></el-option>
                    <el-option label="较大" value="3"></el-option>
                    <el-option label="一般" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="事件紧急状态" prop="eventUrgent" label-width="200">
                  <el-select v-model="ruleForm.eventUrgent" placeholder="请选择事件紧急状态">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="一般事件" value="一般事件"></el-option>
                    <el-option label="紧急事件" value="紧急事件"></el-option>
                    <el-option label="重大事件" value="重大事件"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :span="22">
              <el-form-item label="事件总结">
                <el-input v-model="ruleForm.eventTotal"></el-input>
              </el-form-item>
            </el-row> -->
            <el-row :span="22" :gutter="20">
              <el-col :span="12">
                <el-form-item label="发生地点" prop="occurredSite">
                  <el-input v-model="ruleForm.occurredSite"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="small" plain @click="ismaped = true">选择发生地点</el-button>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="纬度" prop="eventLat">
                  <el-input v-model="ruleForm.eventLat"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经度" prop="eventLng">
                  <el-input v-model="ruleForm.eventLng"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-row> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="isadded=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title="修改数据" :visible.sync="isedited" width="60%" :modal-append-to-body="true">
          <el-form
            :model="ruleFormChange"
            :rules="rulesChange"
            ref="ruleFormChange"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-row :span="24"> -->
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="上报人" prop="inputName">
                  <el-input v-model="ruleFormChange.inputName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事件名称" prop="eventName">
                  <el-input v-model="ruleFormChange.eventName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="发生时间" prop="occurredTime">
                  <el-date-picker
                    placeholder="选择时间"
                    v-model="ruleFormChange.occurredTime"
                    type="datetime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-form-item label="事件内容" prop="eventContent">
                <el-input v-model="ruleFormChange.eventContent"></el-input>
              </el-form-item>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="事件类型" prop="eventType">
                  <el-select v-model="ruleFormChange.eventType" placeholder="请选择事件类型">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="自然灾害" value="1"></el-option>
                    <el-option label="事故灾害" value="2"></el-option>
                    <el-option label="公共卫生事件" value="3"></el-option>
                    <el-option label="社会安全事件" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事件等级" prop="eventLevel">
                  <el-select v-model="ruleFormChange.eventLevel" placeholder="请选择事件类型">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="特别重大" value="1"></el-option>
                    <el-option label="重大" value="2"></el-option>
                    <el-option label="较大" value="3"></el-option>
                    <el-option label="一般" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="事件紧急状态" prop="eventUrgent" label-width="200">
                  <el-select v-model="ruleFormChange.eventUrgent" placeholder="请选择事件紧急状态">
                    <!-- <el-option label="未评级" value="0"></el-option> -->
                    <el-option label="一般事件" value="一般事件"></el-option>
                    <el-option label="紧急事件" value="紧急事件"></el-option>
                    <el-option label="重大事件" value="重大事件"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="事件状态" prop="eventStatus">
                  <el-select v-model="ruleFormChange.eventStatus" placeholder="请选择事件状态">
                    <el-option label="未处理" value="0"></el-option>
                    <el-option label="处理中" value="1"></el-option>
                    <el-option label="已处理" value="2"></el-option>
                    <el-option label="审核完成" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :span="22">
                <el-col :span="12">
                  <el-form-item label="应急预案">
                    <el-input v-model="ruleFormChange.plan"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-left:10px">
                  <el-button type="primary" plain size="small" @click="addPlan()">选择应急机构</el-button>
                </el-col>
            </el-row>-->
            <el-row :span="22">
              <el-form-item label="事件总结">
                <el-input v-model="ruleFormChange.eventTotal"></el-input>
              </el-form-item>
            </el-row>
            <el-row :span="22" :gutter="20">
              <el-col :span="12">
                <el-form-item label="发生地点" prop="occurredSite">
                  <el-input v-model="ruleFormChange.occurredSite"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="small" plain @click="ismaped = true">选择发生地点</el-button>
              </el-col>
            </el-row>
            <el-row :span="22">
              <el-col :span="12">
                <el-form-item label="纬度" prop="eventLat">
                  <el-input v-model="ruleFormChange.eventLat"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经度" prop="eventLng">
                  <el-input v-model="ruleFormChange.eventLng"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-row> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormChange('ruleFormChange')">确定</el-button>
            <el-button @click="isedited=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 选择地点弹框 -->
        <el-dialog title="选择地点" :visible.sync="ismaped" width="60%" :modal-append-to-body="true">
          <Map @fun="getAddrss" @add="getDizhi"></Map>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="chooseAddress()">确定</el-button>
          </span>
        </el-dialog>
        <!-- 选择应急预案弹框 -->
        <el-dialog title="选择应急预案" :visible.sync="isPlaned" width="60%" :modal-append-to-body="true">
          <div class="emergency_events_thing_content_right_content_table">
            <table>
              <tr class="emergency_events_thing_content_right_content_table_title">
                <td></td>
                <td>预案名称</td>
                <td>预案级别</td>
                <td>预案类型</td>
                <td>编制时间</td>
                <td>编制单位</td>
                <td>所属分组</td>
              </tr>
              <tr>
                <td v-show="meetPlanList.length == ''" colspan="7" class="noinfo">没有找到匹配的记录</td>
              </tr>
              <tr v-for="(item, index) in meetPlanList" :key="index">
                <td style="width:3%">
                  <el-radio v-model="planInfo" :label="item">
                    <br />
                  </el-radio>
                </td>
                <td style="width:12%">{{item.planName}}</td>
                <td style="width:8%">{{item.planLevel | levelPlan}}</td>
                <td style="width:12%">{{item.planType | planType}}</td>
                <td style="width:10%">{{item.compileTime}}</td>
                <td style="width:10%">{{item.compileUnit}}</td>
                <td style="width:10%">{{item.groupType}}</td>
              </tr>
            </table>
          </div>
          <div class="emergency_events_thing_content_right_content_page">
            <div class="emergency_events_thing_content_right_content_page_left">
              <el-pagination
                @current-change="handleCurrentChange1"
                :page-size="15"
                :current-page="currentPage1"
                layout="total, prev, pager, next"
                :total="allAccount1"
              ></el-pagination>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="choosePlan()">确定</el-button>
            <el-button @click="isPlaned=false">取消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "../background_navbar/navbar";
import Navbar from "../background_navbar/yingjiNavbar";
import Map from "../choose_address/map";
import qs from "qs";
export default {
  data() {
    return {
      isBridge: false,
      //  总条数
      allAccount: 20,
      allAccount1: 20,
      //   页面条数
      pageSize: 15,
      //   当前页数
      currentPage: 1,
      currentPage1: 1,
      isadded: false,
      isedited: false,
      ismaped: false,
      isPlaned: false,
      id: "",
      thingLat: "",
      thingLng: "",
      unitName: "",
      planId: "",
      planInfo: "",
      meetPlanList: [],
      meetThingList: [],
      editMeetThingList: [],
      ruleForm: {
        inputName: "",
        eventName: "",
        eventContent: "",
        eventTotal: "",
        occurredSite: "",
        eventType: "",
        eventLevel: "",
        eventLat: "",
        eventLng: "",
        occurredTime: "",
        plan: "",
        eventUrgent: ""
      },
      rules: {
        inputName: [
          { required: true, message: "请输入上报人姓名", trigger: "blur" }
        ],
        eventName: [
          { required: true, message: "请输入事件名称", trigger: "blur" }
        ],
        eventContent: [
          { required: true, message: "请输入事件内容", trigger: "blur" }
        ],
        eventTotal: [
          { required: true, message: "请输入事件总结", trigger: "blur" }
        ],
        occurredSite: [
          { required: true, message: "请选择发生地点", trigger: "blur" }
        ],
        eventType: [
          { required: true, message: "请选择事件类型", trigger: "change" }
        ],
        eventUrgent: [
          { required: true, message: "请选择事件紧急状态", trigger: "change" }
        ],
        eventLevel: [
          { required: true, message: "请选择事件等级", trigger: "change" }
        ],
        eventLat: [
          { required: true, message: "请选择纬度", trigger: "change" }
        ],
        eventLng: [
          { required: true, message: "请选择经度", trigger: "change" }
        ],
        occurredTime: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      ruleFormChange: {
        inputName: "",
        eventName: "",
        eventContent: "",
        eventTotal: "",
        occurredSite: "",
        eventType: "",
        eventLevel: "",
        eventLat: "",
        eventLng: "",
        occurredTime: "",
        plan: "",
        eventStatus: "",
        eventUrgent: "",
        examineTimeDto: ""
      },
      rulesChange: {
        inputName: [
          { required: true, message: "请输入上报人姓名", trigger: "blur" }
        ],
        eventName: [
          { required: true, message: "请输入事件名称", trigger: "blur" }
        ],
        eventContent: [
          { required: true, message: "请输入事件内容", trigger: "blur" }
        ],
        eventTotal: [
          { required: true, message: "请输入事件总结", trigger: "blur" }
        ],
        occurredSite: [
          { required: true, message: "请选择发生地点", trigger: "blur" }
        ],
        eventType: [
          { required: true, message: "请选择事件类型", trigger: "change" }
        ],
        eventUrgent: [
          { required: true, message: "请选择事件紧急状态", trigger: "change" }
        ],
        eventLevel: [
          { required: true, message: "请选择事件等级", trigger: "change" }
        ],
        eventStatus: [
          { required: true, message: "请选择事件状态", trigger: "change" }
        ],
        eventLat: [
          { required: true, message: "请选择纬度", trigger: "change" }
        ],
        eventLng: [
          { required: true, message: "请选择经度", trigger: "change" }
        ],
        occurredTime: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    navbar,
    Navbar,
    Map
  },
  methods: {
    // 获取地图经纬度
    getAddrss(data) {
      console.log(data);
      // alert(data)
      this.thingLng = data[0];
      this.thingLat = data[1];
      // console.log(data,this.thingLat,this.thingLng)
    },
    getDizhi(data) {
      this.ruleForm.occurredSite = data;
      this.ruleFormChange.occurredSite = data;
    },
    // 获取地址
    chooseAddress() {
      this.ismaped = false;
      this.ruleForm.eventLng = this.thingLng;
      this.ruleForm.eventLat = this.thingLat;
      this.ruleFormChange.eventLng = this.thingLng;
      this.ruleFormChange.eventLat = this.thingLat;
    },
    //   每页条数改变
    handleSizeChange() {
      console.log(this.pageSize);
    },
    // 上一页，下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMeetThingList();
      console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getMeetPlanList();
    },
    // 查找
    find() {
      this.getMeetThingList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取应急事件列表
    async getMeetThingList() {
      let res = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&eventName=${this.unitName}&eventStatus=0`
        // &eventName=${this.unitName}
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.meetThingList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    addPlan() {
      this.isPlaned = true;
      this.getMeetPlanList();
    },
    // 选择应急预案
    choosePlan() {
      this.planId = this.planInfo.id;
      // console.log(this.planInfo);
      this.ruleForm.plan = this.planInfo.planName;
      this.ruleFormChange.plan = this.planInfo.planName;
      this.isPlaned = false;
    },
    // 获取应急预案列表
    async getMeetPlanList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPlan?pagNumber=${this.currentPage1}&pagSize=${this.pageSize}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.meetPlanList = res.data.data.list;
        this.allAccount1 = res.data.data.total;
      }
    },
    // 添加应急事件列表
    async addmeetThingList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyEvent`,
        qs.stringify({
          eventContent: this.ruleForm.eventContent,
          eventName: this.ruleForm.eventName,
          eventTotal: this.ruleForm.eventTotal,
          occurredSite: this.ruleForm.occurredSite,
          occurredTimeDto: this.ruleForm.occurredTime,
          eventType: this.ruleForm.eventType,
          eventLevel: this.ruleForm.eventLevel,
          eventLat: this.ruleForm.eventLat,
          eventLng: this.ruleForm.eventLng,
          inputName: this.ruleForm.inputName,
          eventUrgent: this.ruleForm.eventUrgent
          // planId2: this.planId
          // occurredTime: this.ruleForm.occurredTime
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getMeetThingList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑应急事件列表
    async getEditMeetThingList(id) {
      console.log(id);
      this.id = id;
      let res = await this.$http.get(`/emer/getEmergencyEvent?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editMeetThingList = res.data.data;
        this.ruleFormChange.eventContent = this.editMeetThingList.eventContent;
        this.ruleFormChange.eventName = this.editMeetThingList.eventName;
        this.ruleFormChange.eventTotal = this.editMeetThingList.eventTotal;
        this.ruleFormChange.occurredSite = this.editMeetThingList.occurredSite;
        this.ruleFormChange.eventType = this.editMeetThingList.eventType.toString();
        this.ruleFormChange.eventLevel = this.editMeetThingList.eventLevel.toString();
        this.ruleFormChange.eventLat = this.editMeetThingList.eventLat;
        this.ruleFormChange.eventLng = this.editMeetThingList.eventLng;
        this.ruleFormChange.eventStatus = this.editMeetThingList.eventStatus.toString();
        this.ruleFormChange.occurredTime = this.editMeetThingList.occurredTime;
        this.ruleFormChange.eventUrgent = this.editMeetThingList.eventUrgent;
        this.ruleFormChange.inputName = this.editMeetThingList.inputName;
      }
    },
    // 编辑应急事件列表
    async editMeetThingLists() {
      if (this.ruleFormChange.eventStatus.toString() == "3") {
        this.ruleFormChange.examineTimeDto = new Date();
        var res = await this.$http.post(
          `/emer/updateEmergencyEvent`,
          qs.stringify({
            id: this.id,
            eventContent: this.ruleFormChange.eventContent,
            eventName: this.ruleFormChange.eventName,
            eventTotal: this.ruleFormChange.eventTotal,
            occurredSite: this.ruleFormChange.occurredSite,
            eventType: this.ruleFormChange.eventType,
            eventLevel: this.ruleFormChange.eventLevel,
            eventLat: this.ruleFormChange.eventLat,
            eventLng: this.ruleFormChange.eventLng,
            eventStatus: this.ruleFormChange.eventStatus,
            occurredTimeDto: new Date(this.ruleFormChange.occurredTime),
            eventUrgent: this.ruleFormChange.eventUrgent,
            examineTimeDto: this.ruleFormChange.examineTimeDto,
            inputName: this.ruleFormChange.inputName
          })
        );
      } else {
        var res = await this.$http.post(
          `/emer/updateEmergencyEvent`,
          qs.stringify({
            id: this.id,
            eventContent: this.ruleFormChange.eventContent,
            eventName: this.ruleFormChange.eventName,
            eventTotal: this.ruleFormChange.eventTotal,
            occurredSite: this.ruleFormChange.occurredSite,
            eventType: this.ruleFormChange.eventType,
            eventLevel: this.ruleFormChange.eventLevel,
            eventLat: this.ruleFormChange.eventLat,
            eventLng: this.ruleFormChange.eventLng,
            eventStatus: this.ruleFormChange.eventStatus,
            occurredTimeDto: new Date(this.ruleFormChange.occurredTime),
            eventUrgent: this.ruleFormChange.eventUrgent,
            inputName: this.ruleFormChange.inputName
          })
        );
      }
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getMeetThingList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除农家乐列表
    async delMeetThingList(id) {
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteEmergencyEvent?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getMeetThingList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      } else {
        // this.$message.error("删除失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addmeetThingList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.isadded = true;
      this.ruleForm.eventName = "";
      this.ruleForm.eventContent = "";
      this.ruleForm.eventTotal = "";
      this.ruleForm.occurredSite = "";
      this.ruleForm.eventType = "";
      this.ruleForm.occurredSite = "";
      this.ruleFormeventLevel = "";
      this.ruleForm.eventLat = "";
      this.ruleForm.eventLng = "";
      this.ruleForm.occurredTime = "";
      this.ruleForm.plan = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delMeetThingList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    change(id) {
      this.editScenicId = id;
      this.isedited = true;
      this.getEditMeetThingList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editMeetThingLists();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.getMeetThingList();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_events_thing_all_content {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}
.emergency_events_thing_content {
  margin-left: calc(210px);
  height: calc(100% - 50px);
  overflow-y: auto;
  background-color: #fff;
  position: relative;
}
.emergency_events_thing_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_events_thing_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_events_thing_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_events_thing_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.emergency_events_thing_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_events_thing_content_right_content_table {
  width: 100%;
}
.emergency_events_thing_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_events_thing_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_events_thing_content_right_content_table_title > td {
}
.emergency_events_thing_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_events_thing_content_right_content_table table tr td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px 0;
  line-height: 20px;
}
.basis_edit {
  color: #0095ff;
  cursor: pointer;
}
.basis_del {
  color: red;
  cursor: pointer;
}
</style>