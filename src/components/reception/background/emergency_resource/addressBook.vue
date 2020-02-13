<template>
  <div class="emergency_address_all_content">
    <Navbar></Navbar>
    <div class="emergency_address_content">
      <div class="emergency_address_content_right_content">
        <div class="emergency_address_content_right_content_title">
          <input type="text" placeholder="请输入人员名称" v-model="peopleName" />
          <button type="button" @click="find()">查询</button>
          <!-- <button type="button" @click="add()">新增数据</button> -->
        </div>
        <div class="emergency_address_content_right_content_table">
          <table>
            <tr class="emergency_address_content_right_content_table_title">
              <td>姓名</td>
              <td>性别</td>
              <td>联系方式</td>
              <!-- <td>操作</td> -->
            </tr>
            <tr>
              <td v-show="personList.length == ''" colspan="3" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in personList" :key="index">
              <td style="width:12%">{{item.name}}</td>         
              <td style="width:12%">{{item.sex | sex}}</td>         
              <td style="width:10%">{{item.phone}}</td>
              <!-- <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td> -->
            </tr>
          </table>
        </div>
        <div class="emergency_address_content_right_content_page">
          <div class="emergency_address_content_right_content_page_left">
            <el-pagination
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
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="ruleForm.phone" maxlength="11" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
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
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleFormChange.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="ruleFormChange.phone" maxlength="11" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item> 
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
      peopleName: "",
      editId:'',
      addressList: [],
      personList:[],
      editAddressList: [],
      creatTime: "",
      ruleForm: {
        name: "",
        phone: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
      ruleFormChange: {
        name: "",
        phone: "",
      },
      rulesChange: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      }
    };
  },
  components: {
    navbar,
    Navbar
  },
  methods: {
    // 上一页，下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getAddressList();
      this.getPersonList()
      // console.log(this.currentPage);
    },
    // 查找
    find() {
      // this.getAddressList();
      this.getPersonList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取通讯录列表
    async getAddressList() {
      let res = await this.$http.get(
        `	/emer/listEmergencyMailList?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&personName=${this.peopleName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.addressList = res.data.data.list;
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
    // 添加通讯录列表
    async addPersonList() {
      let res = await this.$http.post(
        `/emer/saveEmergencyMailList`,
        qs.stringify({
          personName: this.ruleForm.name,
          phone: this.ruleForm.phone,
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getAddressList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑通讯录列表
    async getEditAddressList(id) {
      this.editId = id
      console.log(id);
      let res = await this.$http.get(`/emer/getEmergencyMailList?id=${id}`);
      // console.log(res);
      if (res.data.msg == "success") {
        this.editAddressList = res.data.data;
        this.ruleFormChange.name = this.editAddressList.personName;
        this.ruleFormChange.phone = this.editAddressList.phone;
      }
    },
    // 编辑通讯录列表
    async editAddressLists(id) {
      let res = await this.$http.post(
        `/emer/updateEmergencyMailList`,
        qs.stringify({
          id:this.editId,
          personName: this.ruleFormChange.name,
          phone: this.ruleFormChange.phone,
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getAddressList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除通讯录列表
    async delAddressList(id) {
      console.log(id);
      let res = await this.$http.delete(`/emer/deleteEmergencyMailList?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getAddressList();
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
      this.ruleForm.phone = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delAddressList(id);
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
      this.getEditAddressList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editAddressLists();
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
    // this.getAddressList();
    // this.getDate();
    this.getPersonList();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.emergency_address_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.emergency_address_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.emergency_address_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.emergency_address_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_address_content_right_content_title {
  display: flex;
  align-items: center;
}
.emergency_address_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.emergency_address_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.emergency_address_content_right_content_table {
  width: 100%;
}
.emergency_address_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.emergency_address_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.emergency_address_content_right_content_table_title > td {
}
.emergency_address_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.emergency_address_content_right_content_table table tr td {
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