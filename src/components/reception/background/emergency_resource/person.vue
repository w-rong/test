<template>
  <div class="emergency_person_all_content">
    <Navbar></Navbar>
    <div class="emergency_person_content">
      <div class="emergency_person_content_right_content">
        <div class="emergency_person_content_right_content_title">
          <input type="text" placeholder="请输入人员名称" v-model="peopleName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_person_content_right_content_table">
          <table>
            <tr class="emergency_person_content_right_content_table_title">
              <td>人员姓名</td>
              <td>性别</td>
              <td>部门</td>
              <td>职位</td>
              <td>岗位</td>
              <td>办公电话</td>
              <td>手机</td>
              <td>邮箱</td>
              <td>虚拟号</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="personList.length == ''" colspan="10" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in personList" :key="index">
              <td style="width:8%">{{item.name}}</td>
              <td style="width:6%">{{item.sex | sex}}</td>
              <td style="width:10%">{{item.department}}</td>
              <td style="width:10%">{{item.position}}</td>
              <td style="width:10%">{{item.station}}</td>
              <td style="width:10%">{{item.telephone}}</td>
              <td style="width:10%">{{item.phone}}</td>
              <td style="width:10%">{{item.email}}</td>
              <td style="width:10%">{{item.vphone}}</td>
              <td style="width:12%">
                <i class="el-icon-edit basis_edit" @click="change(item.pid)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.pid)">删除</i>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="人员姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                      <el-option label="男" value="0"></el-option>
                      <el-option label="女" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <!-- <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-input v-model="ruleForm.department"></el-input>
                  </el-form-item>
                </el-col>
              </el-col> -->
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="应急机构">
                    <el-input v-model="ruleForm.org"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-left:10px">
                  <el-button type="primary" plain size="small" @click="addOrg()">选择应急机构</el-button>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="职位">
                    <el-input v-model="ruleForm.position"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位">
                    <el-input v-model="ruleForm.station"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item
                    label="办公电话"
                    prop="telephone"
                    :rules="[  {validator:nameRule1, trigger:'blur', message: '只能是数字'}]"
                  >
                    <el-input
                      v-model="ruleForm.telephone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机" prop="phone">
                    <el-input
                      v-model="ruleForm.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="虚拟号">
                    <el-input v-model="ruleForm.vphone"></el-input>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="人员姓名" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleFormChange.sex" placeholder="请选择性别">
                      <el-option label="男" value="0"></el-option>
                      <el-option label="女" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <!-- <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-input v-model="ruleFormChange.department"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-col> -->
              <!-- <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="应急机构">
                    <el-input v-model="ruleFormChange.org"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-left:10px">
                  <el-button type="primary" plain size="small" @click="addOrg">选择应急机构</el-button>
                </el-col>
              </el-col>-->
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="职位">
                    <el-input v-model="ruleFormChange.position"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位">
                    <el-input v-model="ruleFormChange.station"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item
                    label="办公电话"
                    prop="telephone"
                    :rules="[  {validator:nameRule1, trigger:'blur', message: '只能是数字'}]"
                  >
                    <el-input
                      v-model="ruleFormChange.telephone"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机" prop="phone">
                    <el-input
                      v-model="ruleFormChange.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model="ruleFormChange.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="虚拟号">
                    <el-input v-model="ruleFormChange.vphone"></el-input>
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
import qs from "qs";
export default {
  data() {
    let nameRule1 = (rule, value, callback) => {
      let regExp = /^[0-9]*$/;
      if (regExp.test(value) === false) {
        callback(new Error("不通过正则"));
      } else {
        callback();
      }
    };
    return {
      nameRule1: (rule, value, callback) => {
        let regExp = /^[0-9]*$/;
        if (regExp.test(value) === false) {
          callback(new Error("不通过正则"));
        } else {
          callback();
        }
      },
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
      personList: [],
      editPersonList: [],
      creatTime: "",
      ruleForm: {
        name: "",
        sex: "",
        department: "",
        position: "",
        station: "",
        telephone: "",
        phone: "",
        email: "",
        vphone: "",
        org: ""
      },
      dialogRules: {
        telephone: [
          { required: true, message: "请输入原因", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字符", trigger: "blur" },
          { message: "只能输入数字" }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        sex: [{ required: true, message: "请选择人员性别", trigger: "change" }]
      },
      ruleFormChange: {
        name: "",
        sex: "",
        department: "",
        position: "",
        station: "",
        telephone: "",
        phone: "",
        email: "",
        vphone: "",
        org: ""
      },
      rulesChange: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        sex: [{ required: true, message: "请选择人员性别", trigger: "change" }]
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
      // console.log(this.pageSize);
    },
    // 上一页，下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonList();
      // console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getOrgList();
    },
    // 查找
    find() {
      this.getPersonList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
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
    // 添加人员列表
    async addPersonList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyPeople`,
        qs.stringify({
          name: this.ruleForm.name,
          sex: this.ruleForm.sex,
          department: this.ruleForm.department,
          position: this.ruleForm.position,
          station: this.ruleForm.station,
          telephone: this.ruleForm.telephone,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          vphone: this.ruleForm.vphone,
          originId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getPersonList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑人员列表
    async getEditPersonList(id) {
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(`/emer/getEmergencyPeople?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editPersonList = res.data.data;
        this.ruleFormChange.name = this.editPersonList.name;
        this.ruleFormChange.sex = this.editPersonList.sex.toString();
        this.ruleFormChange.department = this.editPersonList.department;
        this.ruleFormChange.position = this.editPersonList.position;
        this.ruleFormChange.station = this.editPersonList.station;
        this.ruleFormChange.telephone = this.editPersonList.telephone;
        this.ruleFormChange.phone = this.editPersonList.phone;
        this.ruleFormChange.email = this.editPersonList.email;
        this.ruleFormChange.vphone = this.editPersonList.vphone;
        this.orgId = this.editPersonList.originId;
        console.log(this.editPersonList);
      }
    },
    // 编辑人员列表
    async editPersonLists(id) {
      let res = await this.$http.post(
        `/emer/updateEmergencyPeople`,
        qs.stringify({
          pid: this.editId,
          name: this.ruleFormChange.name,
          sex: this.ruleFormChange.sex,
          department: this.ruleFormChange.department,
          position: this.ruleFormChange.position,
          station: this.ruleFormChange.station,
          telephone: this.ruleFormChange.telephone,
          phone: this.ruleFormChange.phone,
          email: this.ruleFormChange.email,
          vphone: this.ruleFormChange.vphone,
          originId: this.orgId
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getPersonList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除人员列表
    async delPersonList(id) {
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteEmergencyPeople?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getPersonList();
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
          this.addPersonList();
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
      this.ruleForm.sex = "";
      this.ruleForm.department = "";
      this.ruleForm.position = "";
      this.ruleForm.station = "";
      this.ruleForm.telephone = "";
      this.ruleForm.phone = "";
      this.ruleForm.email = "";
      this.ruleForm.vphone = "";
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
      this.getEditPersonList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editPersonLists();
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
    this.getPersonList();
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