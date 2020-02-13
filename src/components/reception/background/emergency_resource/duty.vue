<template>
  <div class="emergency_duty_all_content">
    <Navbar></Navbar>
    <div class="emergency_duty_content">
      <div class="emergency_duty_content_right_content">
        <div class="emergency_duty_content_right_content_title">
          <input type="text" placeholder="请输入值班人员姓名" v-model="dutyPeopleName" />
          <el-date-picker v-model="dutyTime" type="date" placeholder="选择日期"></el-date-picker>
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_duty_content_right_content_table">
          <table>
            <tr class="emergency_duty_content_right_content_table_title">
              <td>值班人员姓名</td>
              <td>值班时间</td>
              <td>所在单位</td>
              <td>办公电话</td>
              <td>手机号码</td>
              <td>住宅电话</td>
              <td>地址</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="dutyList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in dutyList" :key="index">
              <td style="width:8%">{{item.shiftPeopleName}}</td>
              <td style="width:8%">{{item.shiftDate}}</td>
              <td style="width:12%">{{item.organization}}</td>
              <td style="width:10%">{{item.telephone}}</td>
              <td style="width:10%">{{item.phone}}</td>
              <td style="width:10%">{{item.homePhone}}</td>
              <td style="width:10%">{{item.address}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="emergency_duty_content_right_content_page">
          <div class="emergency_duty_content_right_content_page_left">
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="人员姓名" prop="name">
                    <el-input v-model="ruleForm.name" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="值班时间" prop="dutyTime">
                    <el-date-picker v-model="ruleForm.dutyTime" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-input v-model="ruleForm.department" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input
                      v-model="ruleForm.telephone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机">
                    <el-input
                      v-model="ruleForm.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="住宅电话">
                    <el-input
                      v-model="ruleForm.homePhone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="住址">
                    <el-input v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="isadded=false">取消</el-button>
          </span>
          <div class="emergency_duty_content_right_content_title" style="margin-bottom:10px">
            <input type="text" placeholder="请输入人员名称" v-model="peopleName" />
            <button type="button" @click="findPer()">查询</button>
            <button type="button" @click="choosePer()">选择</button>
          </div>
          <div
            class="emergency_duty_content_right_content_table emergency_duty_content_right_content_table_person"
          >
            <table>
              <tr class="emergency_duty_content_right_content_table_title">
                <td></td>
                <td>人员姓名</td>
                <td>性别</td>
                <td>部门</td>
                <td>职位</td>
                <td>岗位</td>
                <td>办公电话</td>
                <td>手机</td>
                <td>邮箱</td>
                <td>虚拟号</td>
              </tr>
              <tr>
                <td v-show="personList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
              </tr>
              <tr v-for="(item, index) in personList" :key="index">
                <td style="width:5%">
                  <el-radio v-model="perId" :label="item.pid"><br></el-radio>
                </td>
                <td style="width:12%">{{item.name}}</td>
                <td style="width:8%">{{item.sex | sex}}</td>
                <td style="width:12%">{{item.department}}</td>
                <td style="width:10%">{{item.position}}</td>
                <td style="width:10%">{{item.station}}</td>
                <td style="width:10%">{{item.telephone}}</td>
                <td style="width:10%">{{item.phone}}</td>
                <td style="width:10%">{{item.email}}</td>
                <td style="width:10%">{{item.vphone}}</td>
              </tr>
            </table>
          </div>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="人员姓名" prop="name">
                    <el-input v-model="ruleFormChange.name" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="值班时间" prop="dutyTime">
                    <el-date-picker
                      v-model="ruleFormChange.dutyTime"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-input v-model="ruleFormChange.department" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input
                      v-model="ruleFormChange.telephone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机">
                    <el-input
                      v-model="ruleFormChange.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="住宅电话">
                    <el-input
                      v-model="ruleFormChange.homePhone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="住址">
                    <el-input v-model="ruleFormChange.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormChange('ruleFormChange')">确定</el-button>
            <el-button @click="isedited=false">取消</el-button>
          </span>
          <div class="emergency_duty_content_right_content_title" style="margin-bottom:10px">
            <input type="text" placeholder="请输入人员名称" v-model="peopleName" />
            <button type="button" @click="findPer()">查询</button>
            <button type="button" @click="choosePer()">选择</button>
          </div>
          <div
            class="emergency_duty_content_right_content_table emergency_duty_content_right_content_table_person"
          >
            <table>
              <tr class="emergency_duty_content_right_content_table_title">
                <td></td>
                <td>人员姓名</td>
                <td>性别</td>
                <td>部门</td>
                <td>职位</td>
                <td>岗位</td>
                <td>办公电话</td>
                <td>手机</td>
                <td>邮箱</td>
                <td>虚拟号</td>
              </tr>
              <tr>
                <td v-show="personList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
              </tr>
              <tr v-for="(item, index) in personList" :key="index">
                <td style="width:5%">
                  <el-radio v-model="perId" :label="item.pid"><br></el-radio>
                </td>
                <td style="width:12%">{{item.name}}</td>
                <td style="width:8%">{{item.sex | sex}}</td>
                <td style="width:12%">{{item.department}}</td>
                <td style="width:10%">{{item.position}}</td>
                <td style="width:10%">{{item.station}}</td>
                <td style="width:10%">{{item.telephone}}</td>
                <td style="width:10%">{{item.phone}}</td>
                <td style="width:10%">{{item.email}}</td>
                <td style="width:10%">{{item.vphone}}</td>
              </tr>
            </table>
          </div>
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
      //   页面条数
      pageSize: 15,
      //   当前页数
      currentPage: 1,
      isadded: false,
      isedited: false,
      dutyPeopleName: "",
      dutyTime: "",
      peopleName: "",
      editId: "",
      perId: "",
      personList: [],
      editPersonList: [],
      editDutyList: [],
      dutyList: [],
      creatTime: "",
      ruleForm: {
        name: "",
        dutyTime: "",
        department: "",
        telephone: "",
        phone: "",
        homePhone: "",
        address: ""
      },
      rules: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }]
        // dutyTime: [
        //   {
        //     required: true,
        //     message: "请选择值班日期",
        //     trigger: "change"
        //   }
        // ]
      },
      ruleFormChange: {
        name: "",
        dutyTime: "",
        department: "",
        telephone: "",
        phone: "",
        homePhone: "",
        address: ""
      },
      rulesChange: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
        dutyTime: [
          {
            required: true,
            message: "请选择值班日期",
            trigger: "change"
          }
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
      this.getDutyList();
      console.log(this.currentPage);
    },
    // 查找
    find() {
      this.getDutyList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    findPer() {
      this.getEditDutyList();
    },
    // 选择人员
    choosePer() {
      this.getEditPersonList();
    },
    // 获取值班人员列表
    async getDutyList() {
      let res = await this.$http.get(
        `/emer/listEmergencyShiftInfo?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&shiftPeopleName=${this.dutyPeopleName}&shiftDate=${this.dutyTime}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.dutyList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 获取人员列表
    async getPersonList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPeople?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&peopleName=${this.peopleName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.personList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 添加值班人员列表
    async addDutyList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyShiftInfo`,
        qs.stringify({
          shiftPeopleName: this.ruleForm.name,
          // shiftDate: this.ruleForm.dutyTime,
          organization: this.ruleForm.department,
          telephone: this.ruleForm.telephone,
          phone: this.ruleForm.phone,
          homePhone: this.ruleForm.homePhone,
          address: this.ruleForm.address
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getDutyList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑人员列表
    async getEditPersonList() {
      console.log(this.perId);
      let res = await this.$http.get(
        `/emer/getEmergencyPeople?id=${this.perId}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.editPersonList = res.data.data;
        this.ruleForm.name = this.editPersonList.name;
        this.ruleForm.department = this.editPersonList.department;
        this.ruleForm.telephone = this.editPersonList.telephone;
        this.ruleForm.phone = this.editPersonList.phone;
        this.ruleFormChange.name = this.editPersonList.name;
        this.ruleFormChange.department = this.editPersonList.department;
        this.ruleFormChange.telephone = this.editPersonList.telephone;
        this.ruleFormChange.phone = this.editPersonList.phone;
        console.log(this.editPersonList);
      }
    },
    // 获取值班编辑人员列表
    async getEditDutyList(id) {
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(
        `/emer/getEmergencyShiftInfoById?id=${id}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.editDutyList = res.data.data;
        this.ruleFormChange.name = this.editDutyList.shiftPeopleName;
        this.ruleFormChange.dutyTime = this.editDutyList.shiftDate;
        this.ruleFormChange.department = this.editDutyList.organization;
        this.ruleFormChange.telephone = this.editDutyList.telephone;
        this.ruleFormChange.phone = this.editDutyList.phone;
        this.ruleFormChange.homePhone = this.editDutyList.homePhone;
        this.ruleFormChange.address = this.editDutyList.address;
        // console.log(this.editDutyList);
      }
    },
    // 编辑值班人员列表
    async editDutyLists(id) {
      let res = await this.$http.post(
        `/emer/updateEmergencyShiftInfo`,
        qs.stringify({
          id: this.editId,
          shiftPeopleName: this.ruleFormChange.name,
          shiftDate: this.ruleFormChange.dutyTime,
          organization: this.ruleFormChange.department,
          telephone: this.ruleFormChange.telephone,
          phone: this.ruleFormChange.phone,
          homePhone: this.ruleFormChange.homePhone,
          address: this.ruleFormChange.address
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getDutyList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除值班人员列表
    async delDutyList(id) {
      console.log(id);
      let res = await this.$http.delete(
        `/emer/deleteEmergencyShiftInfo?id=${id}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.getDutyList();
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
          this.addDutyList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.getPersonList();
      this.isadded = true;
      this.ruleForm.name = "";
      this.ruleForm.dutyTime = "";
      this.ruleForm.department = "";
      this.ruleForm.telephone = "";
      this.ruleForm.phone = "";
      this.ruleForm.homePhone = "";
      this.ruleForm.address = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delDutyList(id);
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
      this.getEditDutyList(id);
      this.getPersonList();
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editDutyLists();
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
    this.getDutyList();
    // this.getDate();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_duty_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.emergency_duty_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.emergency_duty_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_duty_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_duty_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_duty_content_right_content_title input {
  width: 180px;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
  padding-left: 10px;
  border: 1px solid #ddd;
  margin-right: 10px;
}
.emergency_duty_content_right_content_title .el-input__icon {
  line-height: 32px;
}
.emergency_duty_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_duty_content_right_content_table {
  width: 100%;
}
.emergency_duty_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_duty_content_right_content_table_person table {
  width: 100%;
  /* margin: 0 auto; */
  margin: 0;
}
.emergency_duty_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_duty_content_right_content_table_title > td {
}
.emergency_duty_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_duty_content_right_content_table table tr td {
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