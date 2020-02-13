<template>
  <div class="emergency_org_all_content">
    <Navbar></Navbar>
    <div class="emergency_org_content">
      <div class="emergency_org_content_right_content">
        <div class="emergency_org_content_right_content_title">
          <input type="text" placeholder="请输入机构名称" v-model="orgName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="emergency_org_content_right_content_table">
          <table>
            <tr class="emergency_org_content_right_content_table_title">
              <td>机构名称</td>
              <td>机构职责</td>
              <td>机构主要负责人</td>
              <td>机构联系电话</td>
              <td>机构地址</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="orgList.length == ''" colspan="6" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in orgList" :key="index">
              <td style="width:12%">{{item.organName}}</td>
              <td style="width:8%">{{item.organDuty}}</td>
              <td style="width:12%">{{item.organPeople}}</td>
              <td style="width:10%">{{item.organPhone}}</td>
              <td style="width:10%">{{item.organAddress}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="emergency_org_content_right_content_page">
          <div class="emergency_org_content_right_content_page_left">
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
                  <el-form-item label="机构名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构职责" prop="duty">
                    <el-input v-model="ruleForm.duty"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="机构负责人">
                    <el-input v-model="ruleForm.person"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构联系电话">
                    <el-input
                      v-model="ruleForm.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="机构地址">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="传真">
                    <el-input v-model="ruleForm.fax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编">
                    <el-input v-model="ruleForm.zipCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="隶属关系">
                    <el-input v-model="ruleForm.relation"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行政级别">
                    <el-input v-model="ruleForm.level"></el-input>
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
                  <el-form-item label="机构名称" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构职责" prop="duty">
                    <el-input v-model="ruleFormChange.duty"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="机构负责人">
                    <el-input v-model="ruleFormChange.person"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构联系电话">
                    <el-input
                      v-model="ruleFormChange.phone"
                      maxlength="11"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="机构地址">
                  <el-input v-model="ruleFormChange.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="传真">
                    <el-input v-model="ruleFormChange.fax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编">
                    <el-input v-model="ruleFormChange.zipCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="隶属关系">
                    <el-input v-model="ruleFormChange.relation"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行政级别">
                    <el-input v-model="ruleFormChange.level"></el-input>
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
      orgName: "",
      editId: "",
      orgList: [],
      editOrgList: [],
      creatTime: "",
      ruleForm: {
        name: "",
        duty: "",
        person: "",
        phone: "",
        address: "",
        fax: "",
        zipCode: "",
        relation: "",
        level: ""
      },
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        duty: [{ required: true, message: "请输入机构职责", trigger: "blur" }]
      },
      ruleFormChange: {
        name: "",
        duty: "",
        person: "",
        phone: "",
        address: "",
        fax: "",
        zipCode: "",
        relation: "",
        level: ""
      },
      rulesChange: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        duty: [{ required: true, message: "请输入机构职责", trigger: "blur" }]
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
      this.getOrgList();
      console.log(this.currentPage);
    },
    // 查找
    find() {
      this.getOrgList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取机构列表
    async getOrgList() {
      let res = await this.$http.get(
        `/emer/listEmergencyOrgan?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&organName=${this.orgName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.orgList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 添加机构列表
    async addOrgList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyOrgan`,
        qs.stringify({
          organName: this.ruleForm.name,
          organDuty: this.ruleForm.duty,
          organPeople: this.ruleForm.person,
          organPhone: this.ruleForm.phone,
          organAddress: this.ruleForm.address,
          fax: this.ruleForm.fax,
          relation: this.ruleForm.relation,
          organizationLevel: this.ruleForm.level,
          zipCode: this.ruleForm.zipCode
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getOrgList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑机构列表
    async getEditOrgList(id) {
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(`/emer/getEmergencyOrganById?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editOrgList = res.data.data;
        this.ruleFormChange.name = this.editOrgList.organName;
        this.ruleFormChange.duty = this.editOrgList.organDuty;
        this.ruleFormChange.person = this.editOrgList.organPeople;
        this.ruleFormChange.phone = this.editOrgList.organPhone;
        this.ruleFormChange.address = this.editOrgList.organAddress;
        this.ruleFormChange.fax = this.editOrgList.fax;
        this.ruleFormChange.zipCode = this.editOrgList.zipCode;
        this.ruleFormChange.relation = this.editOrgList.relation;
        this.ruleFormChange.level = this.editOrgList.organizationLevel;
        console.log(this.editOrgList);
      }
    },
    // 编辑机构列表
    async editOrgLists(id) {
      let res = await this.$http.post(
        `	/emer/updateEmergencyOrgan`,
        qs.stringify({
          id: this.editId,
          organName: this.ruleFormChange.name,
          organDuty: this.ruleFormChange.duty,
          organPeople: this.ruleFormChange.person,
          organPhone: this.ruleFormChange.phone,
          organAddress: this.ruleFormChange.address,
          fax: this.ruleFormChange.fax,
          zipCode: this.ruleFormChange.zipCode,
          relation: this.ruleFormChange.relation,
          organizationLevel: this.ruleFormChange.level
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getOrgList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除机构列表
    async delOrgList(id) {
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteEmergencyOrgan?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getOrgList();
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
          this.addOrgList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.isadded = true;
      this.ruleForm. name= "";
      this.ruleForm.  duty= "";
      this.ruleForm.  person= "";
      this.ruleForm.  phone= "";
      this.ruleForm.  address= "";
      this.ruleForm.  fax= "";
      this.ruleForm.  zipCode= "";
      this.ruleForm.  relation= "";
      this.ruleForm.  level= ""
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delOrgList(id);
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
      this.getEditOrgList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editOrgLists();
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
    this.getOrgList();
    // this.getDate();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_org_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.emergency_org_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.emergency_org_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_org_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_org_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_org_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.emergency_org_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_org_content_right_content_table {
  width: 100%;
}
.emergency_org_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_org_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_org_content_right_content_table_title > td {
}
.emergency_org_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_org_content_right_content_table table tr td {
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