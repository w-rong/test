<template>
  <div class="emergency_person_all_content">
    <Navbar></Navbar>
    <div class="emergency_person_content">
      <div class="emergency_person_content_right_content">
        <div class="emergency_person_content_right_content_title">
          <input type="text" placeholder="请输入录入人姓名" v-model="peopleName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_person_content_right_content_table">
          <table>
            <tr class="emergency_person_content_right_content_table_title">
              <td>添加人</td>
              <td>预案类别</td>
              <td>预警内容</td>
              <td>突发事件地点</td>
              <td>经度</td>
              <td>纬度</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="thingList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in thingList" :key="index">
              <td style="width:12%">{{item.createPeople}}</td>
              <td style="width:8%">{{item.warningType | planType}}</td>
              <td style="width:12%">{{item.warningContent}}</td>
              <td style="width:10%">{{item.warningAddress}}</td>
              <td style="width:10%">{{item.warningLng}}</td>
              <td style="width:10%">{{item.warningLat}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="emergency_person_content_right_content_page">
          <div class="emergency_person_content_right_content_page_left">
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
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="添加人" prop="name">
                  <el-input style="width: 100%;" v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事故类别" prop="WarningType">
                  <el-select
                    style="width: 100%;"
                    v-model="ruleForm.WarningType"
                    placeholder="请选择事故类别"
                  >
                    <el-option label="请选择" value="0"></el-option>
                    <el-option label="自然灾害" value="1"></el-option>
                    <el-option label="事故灾害" value="2"></el-option>
                    <el-option label="公共卫生事件" value="3"></el-option>
                    <el-option label="社会安全事件" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="预警内容" prop="WarningContent">
                  <el-input v-model="ruleForm.WarningContent"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="StartTime">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.StartTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="EndTime">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.EndTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="应急机构">
                    <el-input v-model="ruleForm.org"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-left:10px">
                  <el-button type="primary" plain size="small" @click="addOrg()">选择应急机构</el-button>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="发生地点" prop="occurredSite">
                    <el-input v-model="ruleForm.occurredSite"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="margin-left:10px">
                  <el-button type="primary" size="small" plain @click="ismaped = true">选择发生地点</el-button>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="纬度" prop="eventLat">
                    <el-input disabled v-model="ruleForm.eventLat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经度" prop="eventLng">
                    <el-input disabled v-model="ruleForm.eventLng"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
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
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item label="添加人" prop="name">
                  <el-input style="width: 100%;" v-model="ruleFormChange.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="事故类别" prop="WarningType">
                  <el-select
                    style="width: 100%;"
                    v-model="ruleFormChange.WarningType"
                    placeholder="请选择事故类别"
                  >
                    <el-option label="请选择" value="0"></el-option>
                    <el-option label="自然灾害" value="1"></el-option>
                    <el-option label="事故灾害" value="2"></el-option>
                    <el-option label="公共卫生事件" value="3"></el-option>
                    <el-option label="社会安全事件" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="预警内容" prop="WarningContent">
                  <el-input v-model="ruleFormChange.WarningContent"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="StartTime">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleFormChange.StartTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="EndTime">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleFormChange.EndTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="应急机构">
                    <el-input v-model="ruleFormChange.org"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-left:10px">
                  <el-button type="primary" plain size="small" @click="addOrg()">选择应急机构</el-button>
                </el-col>
              </el-col>-->
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="发生地点" prop="occurredSite">
                    <el-input v-model="ruleFormChange.occurredSite"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="margin-left:10px">
                  <el-button type="primary" size="small" plain @click="ismaped = true">选择发生地点</el-button>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="纬度" prop="eventLat">
                    <el-input disabled v-model="ruleFormChange.eventLat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经度" prop="eventLng">
                    <el-input disabled v-model="ruleFormChange.eventLng"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
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
        <!-- 选择机构弹框 -->
        <el-dialog title="选择机构" :visible.sync="isOrged" width="60%" :modal-append-to-body="true">
          <div class="emergency_person_content_right_content_table">
            <table>
              <tr class="emergency_person_content_right_content_table_title">
                <td></td>
                <td>机构名称</td>
                <td>机构职责</td>
                <td>机构主要负责人</td>
                <td>机构联系电话</td>
                <td>机构地址</td>
              </tr>
              <tr>
                <td v-show="orgList.length == ''" colspan="6" class="noinfo">没有找到匹配的记录</td>
              </tr>
              <tr v-for="(item, index) in orgList" :key="index">
                <td style="width:3%">
                  <el-radio v-model="orgInfo" :label="item"><br></el-radio>
                </td>
                <td style="width:12%">{{item.organName}}</td>
                <td style="width:8%">{{item.organDuty}}</td>
                <td style="width:12%">{{item.organPeople}}</td>
                <td style="width:10%">{{item.organPhone}}</td>
                <td style="width:10%">{{item.organAddress}}</td>
              </tr>
            </table>
          </div>
          <div class="emergency_person_content_right_content_page">
            <div class="emergency_person_content_right_content_page_left">
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
            <el-button type="primary" @click="chooseOrg()">确定</el-button>
            <el-button @click="isOrged=false">取消</el-button>
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
      isOrged: false,
      peopleName: "",
      editId: "",
      orgId: "",
      orgInfo: "",
      orgList: [],
      thingList: [],
      editPersonList: [],
      creatTime: "",
      ruleForm: {
        name: "",
        WarningType: "",
        WarningContent: "",
        StartTime: "",
        EndTime: "",
        SMSContent: "",
        eventLat: "",
        eventLng: "",
        occurredSite: "",
        org: ""
      },
      rules: {
        WarningContent: [
          { required: true, message: "请输入预警内容", trigger: "blur" }
        ],
        WarningType: [
          { required: true, message: "请选择事故类别", trigger: "change" }
        ],
        SMSContent: [
          { required: true, message: "请输入短信信息", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入添加人", trigger: "blur" }],
        // StartTime: [
        //   {
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change"
        //   }
        // ],
        // EndTime: [
        //   {
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change"
        //   }
        // ],
        occurredSite: [
          { required: true, message: "请选择发生地点", trigger: "blur" }
        ],
        eventLat: [
          { required: true, message: "请选择纬度", trigger: "change" }
        ],
        eventLng: [{ required: true, message: "请选择经度", trigger: "change" }]
      },
      ruleFormChange: {
        name: "",
        WarningType: "",
        WarningContent: "",
        StartTime: "",
        EndTime: "",
        SMSContent: "",
        eventLat: "",
        eventLng: "",
        occurredSite: "",
        org: ""
      },
      rulesChange: {
        WarningContent: [
          { required: true, message: "请输入预警内容", trigger: "blur" }
        ],
        WarningType: [
          { required: true, message: "请选择事故类别", trigger: "change" }
        ],
        // SMSContent: [
        //   { required: true, message: "请输入短信信息", trigger: "blur" }
        // ],
        name: [{ required: true, message: "请输入添加人", trigger: "blur" }],
        occurredSite: [
          { required: true, message: "请选择发生地点", trigger: "blur" }
        ],
        eventLat: [
          { required: true, message: "请选择纬度", trigger: "change" }
        ],
        eventLng: [{ required: true, message: "请选择经度", trigger: "change" }]
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
      this.getThingList();
      console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getOrgList();
    },
    // 查找
    find() {
      this.getThingList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取机构列表
    async getOrgList() {
      let res = await this.$http.get(
        `/emer/listEmergencyOrgan?pagNumber=${this.currentPage1}&pagSize=${this.pageSize}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.orgList = res.data.data.list;
        this.allAccount1 = res.data.data.total;
      }
    },
    addOrg() {
      this.isOrged = true;
      this.getOrgList();
    },
    // 选择应急机构
    chooseOrg() {
      this.orgId = this.orgInfo.id;
      // console.log(this.orgId);
      // console.log(this.orgInfo);
      // console.log(this.orgInfo.organId);
      this.ruleForm.org = this.orgInfo.organName;
      this.ruleFormChange.org = this.orgInfo.organName;
      this.isOrged = false;
    },
    // 获取突发事件列表
    async getThingList() {
      let res = await this.$http.get(
        `/emer/listEmergencyWarning?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&createPeople=${this.peopleName}`
        // &createPeople=${this.peopleName}
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.thingList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 添加突发事件列表
    async addThingList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyWarning`,
        qs.stringify({
          createPeople: this.ruleForm.name,
          warningType: this.ruleForm.WarningType,
          warningContent: this.ruleForm.WarningContent,
          warningLat: this.ruleForm.eventLat,
          warningLng: this.ruleForm.eventLng,
          warningAddress: this.ruleForm.occurredSite,
          startTime: this.ruleForm.StartTime,
          endTime: this.ruleForm.EndTime,
          orginId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getThingList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑突发事件列表
    async getEditEmerThingList(id) {
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(`/emer/getEmergencyWarningById?id=${id}`);
      // console.log(res);
      if (res.data.msg == "success") {
        this.editPersonList = res.data.data;
        this.ruleFormChange.name = this.editPersonList.createPeople;
        this.ruleFormChange.WarningType = this.editPersonList.warningType.toString();
        this.ruleFormChange.WarningContent = this.editPersonList.warningContent;
        this.ruleFormChange.eventLat = this.editPersonList.warningLat;
        this.ruleFormChange.eventLng = this.editPersonList.warningLng;
        this.ruleFormChange.occurredSite = this.editPersonList.warningAddress;
        this.ruleFormChange.StartTime = this.editPersonList.startTime;
        this.ruleFormChange.EndTime = this.editPersonList.endTime;
        console.log(this.editPersonList);
      }
    },
    // 编辑突发事件列表
    async editEmerThingLists(id) {
      let res = await this.$http.post(
        `/emer/updateEmergencyWarning`,
        qs.stringify({
          id: this.editId,
          createPeople: this.ruleFormChange.name,
          warningType: this.ruleFormChange.WarningType,
          warningContent: this.ruleFormChange.WarningContent,
          warningLat: this.ruleFormChange.eventLat,
          warningLng: this.ruleFormChange.eventLng,
          warningAddress: this.ruleFormChange.occurredSite,
          startTime: this.ruleFormChange.StartTime,
          endTime: this.ruleFormChange.EndTime,
          orginId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getThingList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除突发事件列表
    async delPersonList(id) {
      console.log(id);
      let res = await this.$http.delete(
        `/emer/deleteEmergencyWarning?id=${id}`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.getThingList();
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
          this.addThingList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.isadded = true;
      this.ruleForm.name = "";
      this.ruleForm.WarningType = "";
      this.ruleForm.WarningContent = "";
      this.ruleForm.StartTime = "";
      this.ruleForm.EndTime = "";
      this.ruleForm.SMSContent = "";
      this.ruleForm.eventLat = "";
      this.ruleForm.eventLng = "";
      this.ruleForm.occurredSite = "";
      this.ruleForm.org = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delPersonList(id);
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
      this.getEditEmerThingList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editEmerThingLists();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取当前时间
    getDate() {
      let myDate = new Date();
      console.log(myDate);
      //获取当前年
      let year = myDate.getFullYear();
      //获取当前月
      let month = myDate.getMonth() + 1;
      //获取当前日
      let date = myDate.getDate();
      //获取当前时间
      this.creatTime = year + "-" + month + "-" + date;
    }
  },
  mounted() {
    this.getThingList();
    // this.getDate();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_person_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.emergency_person_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.emergency_person_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_person_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_person_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_person_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.emergency_person_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_person_content_right_content_table {
  width: 100%;
}
.emergency_person_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_person_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_person_content_right_content_table_title > td {
}
.emergency_person_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_person_content_right_content_table table tr td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px 0;
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