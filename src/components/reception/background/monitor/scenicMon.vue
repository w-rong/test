<template>
  <div class="scenic_mon_all_content">
    <Navbar></Navbar>
    <div class="scenic_mon_content">
      <div class="scenic_mon_content_right_content">
        <div class="scenic_mon_content_right_content_title">
          <!-- <input type="text" placeholder="请输入景区监控姓名" v-model="dutyPeopleName" />
          
          <button type="button" @click="find()">查询</button>-->
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="scenic_mon_content_right_content_table">
          <table>
            <tr class="scenic_mon_content_right_content_table_title">
              <td>景区名称</td>
              <td>景区监控点位名称</td>
              <td>appKey</td>
              <td>appSecret</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="scenicMonList.length == ''" colspan="5" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in scenicMonList" :key="index">
              <td style="width:8%">{{item.scenicName}}</td>
              <td style="width:8%">{{item.monitoringplatformName}}</td>
              <td style="width:12%">{{item.appKey}}</td>
              <td style="width:10%">{{item.appSecret}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.id)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.id)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="scenic_mon_content_right_content_page">
          <div class="scenic_mon_content_right_content_page_left">
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
        <el-dialog title="新增数据" :visible.sync="isadded" width="40%" :modal-append-to-body="true">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
          >
            <el-row :span="24">
              <el-row :span="24" :gutter="20">
                <el-col :span="16">
                  <el-form-item label="景区名称" prop="scenicName">
                    <el-input v-model="ruleForm.scenicName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" plain size="small" @click="isSceniced=true">选择景区</el-button>
                </el-col>
              </el-row>
              <el-col :span="20">
                <el-form-item label="景区监控点位名称" prop="monitoringplatformName">
                  <el-input v-model="ruleForm.monitoringplatformName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="appKey">
                  <el-input v-model="ruleForm.appKey"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="appSecret">
                  <el-input v-model="ruleForm.appSecret"></el-input>
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
            size="small"
          >
            <el-row :span="24">
              <el-row :span="24" :gutter="20">
                <el-col :span="16">
                  <el-form-item label="景区名称" prop="scenicName">
                    <el-input v-model="ruleFormChange.scenicName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" plain size="small" @click="isSceniced=true">选择景区</el-button>
                </el-col>
              </el-row>
              <el-col :span="20">
                <el-form-item label="景区监控点位名称" prop="monitoringplatformName">
                  <el-input v-model="ruleFormChange.monitoringplatformName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="appKey">
                  <el-input v-model="ruleFormChange.appKey"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="appSecret">
                  <el-input v-model="ruleFormChange.appSecret"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormChange('ruleFormChange')">确定</el-button>
            <el-button @click="isedited=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 选择景区弹框 -->
        <el-dialog title="选择景区" :visible.sync="isSceniced" width="60%" :modal-append-to-body="true">
          <div class="scenic_mon_content_right_content_table">
            <table>
              <tr class="scenic_mon_content_right_content_table_title">
                <td style="width:8%"></td>
                <td style="width:12%">景点名称</td>
                <td style="width:8%">景区等级</td>
                <td style="width:20%">景区地址</td>
                <td style="width:10%">负责人</td>
                <td style="width:10%">负责人电话</td>
                <td style="width:10%">经度</td>
                <td style="width:10%">纬度</td>
              </tr>
              <tr>
                <td v-show="scenicList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
              </tr>
              <tr v-for="(item, index) in scenicList" :key="index">
                <td style="text-align:center">
                  <el-radio v-model="scenicInfo" :label="item"><br></el-radio>
                </td>
                <td>{{item.unitName}}</td>
                <td>{{item.level | scenicLevel}}</td>
                <td>{{item.address}}</td>
                <td>{{item.leader}}</td>
                <td>{{item.leader_phone}}</td>
                <td>{{item.lng}}</td>
                <td>{{item.lat}}</td>
              </tr>
            </table>
            <!-- 分页 -->
            <div class="scenic_mon_content_right_content_page">
              <div class="scenic_mon_content_right_content_page_left">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange1"
                  :current-page="currentPage1"
                  :page-size="15"
                  layout="total, prev, pager, next"
                  :total="allAccount1"
                ></el-pagination>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="chooseSce()">确定</el-button>
            <el-button @click="isSceniced=false">取消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "../background_navbar/navbar";
import Navbar from "../background_navbar/moniterNavbar";
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
      isSceniced: false,
      dutyPeopleName: "",
      dutyTime: "",
      peopleName: "",
      editId: "",
      perId: "",
      scenicInfo: "",
      aid: "",
      scenicList: [],
      editScenicMonList: [],
      scenicMonList: [],
      creatTime: "",
      ruleForm: {
        scenicName: "",
        monitoringplatformName: "",
        appKey: "",
        appSecret: ""
      },
      rules: {
        scenicName: [
          { required: true, message: "请选择景区", trigger: "blur" }
        ],
        monitoringplatformName: [
          { required: true, message: "请输入景区监控点位名称", trigger: "blur" }
        ]
      },
      ruleFormChange: {
        scenicName: "",
        monitoringplatformName: "",
        appKey: "",
        appSecret: ""
      },
      rulesChange: {
        scenicName: [
          { required: true, message: "请选择景区", trigger: "blur" }
        ],
        monitoringplatformName: [
          { required: true, message: "请输入景区监控点位名称", trigger: "blur" }
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
      this.getScenicMonList();
      console.log(this.currentPage);
    },
    // 上一页，下一页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getScenicList();
    },
    // 查找
    find() {
      this.getScenicMonList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    findPer() {
      this.getEditScenicMonList();
    },
    // 选择景区
    chooseSce() {
      console.log(this.scenicInfo);
      this.aid = this.scenicInfo.scenicId;
      this.ruleForm.scenicName = this.scenicInfo.unitName;
      this.ruleFormChange.scenicName = this.scenicInfo.unitName;
      this.isSceniced = false;
    },
    // 获取景区监控列表
    async getScenicMonList() {
      let res = await this.$http.get(
        `/base/listPtScenicMonitorPlatform?pagNumber=${this.currentPage}&pagSize=${this.pageSize}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.scenicMonList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 获取景区列表
    async getScenicList() {
      let res = await this.$http.get(
        `/base/listBaseScenic?pagNumber=${this.currentPage1}&pagSize=${this.pageSize}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.scenicList = res.data.data.list;
        this.allAccount1 = res.data.data.total;
        // this.$message({
        //   type: "success",
        //   message: "查询成功!"
        // });
      } else {
        // this.$message.error(res.data.msg);
      }
    },
    // 添加景区监控列表
    async addScenicMonList() {
      let res = await this.$http.post(
        `/base/savePtScenicMonitorPlatform`,
        qs.stringify({
          appKey: this.ruleForm.appKey,
          appSecret: this.ruleForm.appSecret,
          monitoringplatformName: this.ruleForm.monitoringplatformName,
          scenicId: this.aid,
          scenicName: this.ruleForm.scenicName
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getScenicMonList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑景区监控列表
    async getEditScenicMonList(id) {
      this.getScenicList();
      this.editId = id;
      console.log(id);
      let res = await this.$http.get(
        `/base/getPtScenicMonitorPlatformById?id=${id}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.editScenicMonList = res.data.data;
        this.ruleFormChange.appKey = this.editScenicMonList.appKey;
        this.ruleFormChange.appSecret = this.editScenicMonList.appSecret;
        this.ruleFormChange.monitoringplatformName = this.editScenicMonList.monitoringplatformName;
        this.ruleFormChange.scenicName = this.editScenicMonList.scenicName;
        this.aid = this.editScenicMonList.scenicId;
        // console.log(this.editScenicMonList);
      }
    },
    // 编辑景区监控列表
    async editScenicMonLists(id) {
      let res = await this.$http.post(
        `/base/updatePtScenicMonitorPlatform`,
        qs.stringify({
          id: this.editId,
          appKey: this.ruleFormChange.appKey,
          appSecret: this.ruleFormChange.appSecret,
          monitoringplatformName: this.ruleFormChange.monitoringplatformName,
          scenicId: this.aid,
          scenicName: this.ruleFormChange.scenicName
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getScenicMonList();
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        // this.$message.error("修改失败!");
        this.$message.error(res.data.msg);
      }
    },
    // 删除景区监控列表
    async delScenicMonList(id) {
      console.log(id);
      let res = await this.$http.post(
        `/base/deletePtScenicMonitorPlatform`,
        qs.stringify({
          id: id
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.getScenicMonList();
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
          this.addScenicMonList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加打开弹框
    add() {
      this.getScenicList();
      this.isadded = true;
      this.ruleForm.scenicName = "";
      this.ruleForm.monitoringplatformName = "";
      this.ruleForm.appKey = "";
      this.ruleForm.appSecret = "";
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delScenicMonList(id);
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
      this.getEditScenicMonList(id);
      this.getScenicList();
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editScenicMonLists();
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
    this.getScenicMonList();
    // this.getScenicList()
    // this.getDate();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.scenic_mon_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.scenic_mon_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.scenic_mon_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.scenic_mon_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.scenic_mon_content_right_content_title {
  display: flex;
  align-items: center;
}
.scenic_mon_content_right_content_title input {
  width: 180px;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
  padding-left: 10px;
  border: 1px solid #ddd;
  margin-right: 10px;
}
.scenic_mon_content_right_content_title .el-input__icon {
  line-height: 32px;
}
.scenic_mon_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.scenic_mon_content_right_content_table {
  width: 100%;
}
.scenic_mon_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.scenic_mon_content_right_content_table_person table {
  width: 100%;
  /* margin: 0 auto; */
  margin: 0;
}
.scenic_mon_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.scenic_mon_content_right_content_table_title > td {
}
.scenic_mon_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.scenic_mon_content_right_content_table table tr td {
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