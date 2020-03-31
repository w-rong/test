<template>
  <div class="basis_scenic_all_content">
    <Navbar></Navbar>
    <div class="basis_scenic_content">
      <div class="basis_scenic_bg" v-if="isBridge"></div>
      <div class="basis_scenic_content_right_content">
        <div class="basis_scenic_content_right_content_title">
          <input type="text" placeholder="请输入餐厅团购名称" v-model="unitName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
          <button type="button" @click="derive()">导出</button>
          <button type="button" @click="showLead()">导入</button>
        </div>
        <!-- 列表展示 -->
        <div class="basis_scenic_content_right_content_table">
          <table>
            <tr class="basis_scenic_content_right_content_table_title">
              <td style="width:12%">餐厅团购名称</td>
              <td style="width:10%">餐厅名称</td>
              <td style="width:10%">价格</td>
              <td style="width:10%">操作</td>
            </tr>
            <tr>
              <td v-show="scenicList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in scenicList" :key="index">
              <td>{{item.groupBuyName}}</td>
              <td>{{item.restaurantName}}</td>
              <td>{{item.price}}</td>
              <td>
                <i class="el-icon-edit basis_edit" @click="change(item.groupBuyId)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.groupBuyId)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <!-- 分页 -->
        <div class="basis_scenic_content_right_content_page">
          <div class="basis_scenic_content_right_content_page_left">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="15"
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
                  <el-form-item label="餐厅团购名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="餐厅名称">
                    <el-input v-model="ruleForm.lat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="价格">
                    <el-input v-model="ruleForm.lng"></el-input>
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
                  <el-form-item label="餐厅团购名称" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="餐厅名称">
                    <el-input v-model="ruleFormChange.lat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="价格">
                    <el-input v-model="ruleFormChange.lng"></el-input>
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
    <!-- 导出弹窗 -->
    <el-dialog title="导入文件" :visible.sync="isLead" width="30%">
      <el-upload
        class="upload-demo"
        action="http://47.96.94.56:8082/excel/importBaseGroupBuy"
        multiple
        name="uploadFile"
        :before-upload="beforeUpload"
        :headers="token"
      >
        <el-button type="primary" plain>导入</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isLead = false">取 消</el-button>
        <el-button type="primary" @click="leadEnter()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import navbar from "../background_navbar/navbar";
import Navbar from "../background_navbar/Navbar copy";
import qs from "qs";
export default {
  data() {
    return {
      isBridge: false,
      //  总条数
      allAccount: 0,
      //   页面条数
      pageSize: 15,
      //   当前页数
      currentPage: 1,
      isadded: false,
      isedited: false,
      isMaxed: false,
      isSceniced: false,
      unitName: "",
      editScenicId: "",
      scenicList: [],
      editScenicList: [],
      aid: "",
      scenicInfo: "",
      isLead: false,
      ruleForm: {
        name: "",
        address: "",
        region: "",
        leader: "",
        leaderPhone: "",
        lat: "",
        lng: ""
      },
      rules: {
        name: [{ required: true, message: "请输入餐厅团购名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入餐厅团购地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择餐厅团购等级", trigger: "change" }
        ],
        lat: [{ required: true, message: "请输入纬度", trigger: "change" }],
        lng: [{ required: true, message: "请输入经度", trigger: "change" }]
      },
      ruleFormChange: {
        name: "",
        address: "",
        region: "",
        lat: "",
        lng: "",
        leader: "",
        leaderPhone: ""
      },
      rulesChange: {
        name: [{ required: true, message: "请输入餐厅团购名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入餐厅团购地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择餐厅团购等级", trigger: "change" }
        ],
        lat: [{ required: true, message: "请输入经度", trigger: "change" }],
        lng: [{ required: true, message: "请输入纬度", trigger: "change" }]
      },
      ruleFormMax: {
        name: "",
        maxVolume: ""
      },
      rulesMax: {
        name: [{ required: true, message: "请选择餐厅团购", trigger: "blur" }],
        maxVolume: [
          { required: true, message: "请输入餐厅团购最大承载量", trigger: "blur" }
        ]
      },
      token: {}
    };
  },
  components: {
    navbar,
    Navbar
  },
  methods: {
    // 导出
    async derive() {
      window.location.href = 'http://47.96.94.56:8082/excel/getExcelBaseGroupBuy'
    },
    beforeUpload(file) {
      // console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
      }
      return extension || extension2;
    },
    showLead(){
      this.isLead = true
      this.token = { Authorization: localStorage.getItem("Authorization") };
    },
    leadEnter(){
      this.isLead = false
      this.getScenicList()
    },
    //   每页条数改变
    handleSizeChange(val) {
      console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getScenicList();
      console.log(this.currentPage);
    },
    // 查找
    find() {
      this.getScenicList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取餐厅团购列表
    async getScenicList() {
      if (this.unitName!='') {
        this.currentPage = 1
      }
      let res = await this.$http.get(
        `/base/listBaseGroupBuy?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&unitName=${this.unitName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.scenicList = res.data.data.list;
        this.allAccount = res.data.data.total;
        // this.$message({
        //   type: "success",
        //   message: "查询成功!"
        // });
      } else {
        // this.$message.error(res.data.msg);
      }
    },
    // 添加餐厅团购列表
    async addScenicList() {
      let res = await this.$http.post(
        `/base/saveBaseGroupBuy`,
        qs.stringify({
          groupBuyName: this.ruleForm.name,
          restaurantName: this.ruleForm.lat,
          price: this.ruleForm.lng,
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getScenicList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑餐厅团购列表
    async getEditScenicList(id) {
      let res = await this.$http.get(`/base/getBaseGroupBuy?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editScenicList = res.data.data;
        this.ruleFormChange.name = this.editScenicList.groupBuyName;
        this.ruleFormChange.lng = this.editScenicList.price;
        this.ruleFormChange.lat = this.editScenicList.restaurantName;
        // console.log(this.editScenicList);
      }
    },
    // 编辑餐厅团购列表
    async editScenicLists() {
      // console.log(this.editScenicList);
      let res = await this.$http.post(
        `/base/updateBaseGroupBuy`,
        qs.stringify({
          groupBuyId:this.editScenicList.groupBuyId,
          groupBuyName: this.ruleFormChange.name,
          restaurantName: this.ruleFormChange.lat,
          price: this.ruleFormChange.lng,
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getScenicList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除餐厅团购列表
    async delScenicList(id) {
      console.log(id);
      let res = await this.$http.delete(`/base/deleteBaseGroupBuy?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getScenicList();
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
          this.addScenicList();
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
      this.ruleForm.address = "";
      this.ruleForm.lat = "";
      this.ruleForm.lng = "";
      this.ruleForm.region = "";
      this.ruleForm.tel = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delScenicList(id);
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
      this.getEditScenicList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editScenicLists();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getScenicList();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.basis_scenic_all_content {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}
.basis_scenic_content {
  margin-left: calc(210px);
  height: calc(100% - 50px);
  overflow-y: auto;
  background-color: #fff;
  position: relative;
}
.basis_scenic_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.basis_scenic_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.basis_scenic_content_right_content_title {
  display: flex;
  align-items: center;
}
.basis_scenic_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.basis_scenic_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.basis_scenic_content_right_content_table {
  width: 100%;
}
.basis_scenic_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.basis_scenic_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.basis_scenic_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.basis_scenic_content_right_content_table table tr td {
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
/* 未找到 */
.noinfo {
  color: rgba(51, 51, 51, 0.753);
  font-size: 15px;
  background-color: #f0f0f0;
}
</style>