<template>
  <div class="emergency_plan_all_content">
    <Navbar></Navbar>
    <div class="emergency_plan_content">
      <div class="emergency_plan_content_right_content">
        <div class="emergency_plan_content_right_content_title">
          <input type="text" placeholder="请输入预案名称" v-model="peopleName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_plan_content_right_content_table">
          <table>
            <tr class="emergency_plan_content_right_content_table_title">
              <td>预案名称</td>
              <td>预案级别</td>
              <td>预案类型</td>
              <td>编制时间</td>
              <td>编制单位</td>
              <td>所属分组</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="meetPlanList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in meetPlanList" :key="index">
              <td style="width:12%">{{item.planName}}</td>
              <td style="width:8%">{{item.planLevel | levelPlan}}</td>
              <td style="width:12%">{{item.planType | planType}}</td>
              <td style="width:10%">{{item.compileTime}}</td>
              <td style="width:10%">{{item.compileUnit}}</td>
              <td style="width:10%">{{item.groupType}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="emergency_plan_content_right_content_page">
          <div class="emergency_plan_content_right_content_page_left">
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
                <el-form-item label="预案名称" prop="planName">
                  <el-input v-model="ruleForm.planName"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="编制日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="ruleForm.CompileTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="预案级别">
                  <el-select
                    style="width: 100%;"
                    v-model="ruleForm.PlanLevel"
                    placeholder="请选择预案级别"
                  >
                    <el-option label="请选择" value="0"></el-option>
                    <el-option label="国家级" value="1"></el-option>
                    <el-option label="省级" value="2"></el-option>
                    <el-option label="地市级" value="3"></el-option>
                    <el-option label="区县级" value="4"></el-option>
                    <el-option label="风险源级" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预案类型">
                  <el-select style="width: 100%;" v-model="ruleForm.PlanType" placeholder="请选择预案类型">
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
                <el-col :span="12">
                  <el-form-item label="编制单位">
                    <el-input v-model="ruleForm.CompileUnit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属分组">
                    <el-input v-model="ruleForm.groupType"></el-input>
                  </el-form-item>
                </el-col>
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
                <el-form-item label="备注">
                  <el-input v-model="ruleForm.remark"></el-input>
                </el-form-item>
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
                <el-form-item label="预案名称" prop="planName">
                  <el-input v-model="ruleFormChange.planName"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="编制日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="ruleFormChange.CompileTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="预案级别">
                  <el-select
                    style="width: 100%;"
                    v-model="ruleFormChange.PlanLevel"
                    placeholder="请选择预案级别"
                  >
                    <el-option label="请选择" value="0"></el-option>
                    <el-option label="国家级" value="1"></el-option>
                    <el-option label="省级" value="2"></el-option>
                    <el-option label="地市级" value="3"></el-option>
                    <el-option label="区县级" value="4"></el-option>
                    <el-option label="风险源级" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预案类型">
                  <el-select
                    style="width: 100%;"
                    v-model="ruleFormChange.PlanType"
                    placeholder="请选择预案类型"
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
                <el-col :span="12">
                  <el-form-item label="编制单位">
                    <el-input v-model="ruleFormChange.CompileUnit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属分组">
                    <el-input v-model="ruleFormChange.groupType"></el-input>
                  </el-form-item>
                </el-col>
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
                <el-form-item label="备注">
                  <el-input v-model="ruleFormChange.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormChange('ruleFormChange')">确定</el-button>
            <el-button @click="isedited=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 选择机构弹框 -->
        <el-dialog title="选择机构" :visible.sync="isOrged" width="60%" :modal-append-to-body="true">
          <div class="emergency_plan_content_right_content_table">
            <table>
              <tr class="emergency_plan_content_right_content_table_title">
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
          <div class="emergency_plan_content_right_content_page">
            <div class="emergency_plan_content_right_content_page_left">
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
      isOrged: false,
      peopleName: "",
      editId: "",
      orgId: "",
      orgInfo: "",
      orgList: [],
      meetPlanList: [],
      editMeetPlanList: [],
      creatTime: "",
      ruleForm: {
        planName: "",
        CompileTime: "",
        CompileUnit: "",
        groupType: "",
        PlanLevel: "",
        PlanType: "",
        remark: "",
        org: ""
      },
      rules: {
        planName: [
          { required: true, message: "请输入预案名称", trigger: "blur" }
        ]
      },
      ruleFormChange: {
        planName: "",
        CompileTime: "",
        CompileUnit: "",
        groupType: "",
        PlanLevel: "",
        PlanType: "",
        remark: "",
        org: ""
      },
      rulesChange: {
        planName: [
          { required: true, message: "请输入预案名称", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    navbar,
    Navbar
  },
  methods: {
    //   每页条数改变
    handleSizeChange() {
      console.log(this.pageSize);
    },
    // 上一页，下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMeetPlanList();
      console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getOrgList();
    },
    // 查找
    find() {
      this.getMeetPlanList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取应急预案列表
    async getMeetPlanList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPlan?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&planName=${this.peopleName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.meetPlanList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
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
    // 添加应急预案列表
    async addMeetPlanList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyPlan`,
        qs.stringify({
          planName: this.ruleForm.planName,
          compileTime: this.ruleForm.CompileTime,
          compileUnit: this.ruleForm.CompileUnit,
          groupType: this.ruleForm.groupType,
          planLevel: this.ruleForm.PlanLevel,
          planType: this.ruleForm.PlanType,
          remark: this.ruleForm.remark,
          orginId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getMeetPlanList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑应急预案列表
    async getEditMeetPlanList(id) {
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(`/emer/getEmergencyPlanById?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editMeetPlanList = res.data.data;
        console.log(this.editMeetPlanList);
        // this.ruleFormChange.planName = 1223
        this.ruleFormChange.planName = this.editMeetPlanList.planName;
        this.ruleFormChange.CompileTime = this.editMeetPlanList.compileTime;
        this.ruleFormChange.CompileUnit = this.editMeetPlanList.compileUnit;
        this.ruleFormChange.groupType = this.editMeetPlanList.groupType;
        this.ruleFormChange.PlanLevel = this.editMeetPlanList.planLevel.toString();
        this.ruleFormChange.PlanType = this.editMeetPlanList.planType.toString();
        this.ruleFormChange.remark = this.editMeetPlanList.remark;
      }
    },
    // 编辑应急预案列表
    async editMeetPlanLists(id) {
      let res = await this.$http.post(
        `	emer/updateEmergencyPlan`,
        qs.stringify({
          id: this.editId,
          planName: this.ruleFormChange.planName,
          // compileTime: this.ruleFormChange.CompileTime,
          compileUnit: this.ruleFormChange.CompileUnit,
          groupType: this.ruleFormChange.groupType,
          planLevel: this.ruleFormChange.PlanLevel,
          planType: this.ruleFormChange.PlanType,
          remark: this.ruleFormChange.remark,
          orginId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getMeetPlanList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除应急预案列表
    async delMeetPalnList(id) {
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteEmergencyPlan?id=${id}`);
      // console.log(res);
      if (res.data.msg == "success") {
        this.getMeetPlanList();
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
          this.addMeetPlanList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.isadded = true;
      this.ruleForm.planName = "";
      this.ruleForm.CompileTime = "";
      this.ruleForm.CompileUnit = "";
      this.ruleForm.groupType = "";
      this.ruleForm.PlanLevel = "";
      this.ruleForm.PlanType = "";
      this.ruleForm.remark = "";
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
          this.delMeetPalnList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    change(id) {
      // this.editScenicId = id;
      this.isedited = true;
      this.getEditMeetPlanList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editMeetPlanLists();
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
    this.getMeetPlanList();
    // this.getDate();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_plan_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.emergency_plan_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.emergency_plan_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_plan_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_plan_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_plan_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.emergency_plan_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_plan_content_right_content_table {
  width: 100%;
}
.emergency_plan_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_plan_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_plan_content_right_content_table_title > td {
}
.emergency_plan_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_plan_content_right_content_table table tr td {
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