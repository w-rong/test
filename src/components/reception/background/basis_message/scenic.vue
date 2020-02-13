<template>
  <div class="basis_scenic_all_content">
    <Navbar></Navbar>
    <div class="basis_scenic_content">
      <div class="basis_scenic_bg" v-if="isBridge"></div>
      <div class="basis_scenic_content_right_content">
        <div class="basis_scenic_content_right_content_title">
          <input type="text" placeholder="请输入景区名称" v-model="unitName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
          <button type="button" @click="isMaxed=true">设置景区最大承载量</button>
        </div>
        <!-- 列表展示 -->
        <div class="basis_scenic_content_right_content_table">
          <table>
            <tr class="basis_scenic_content_right_content_table_title">
              <td style="width:12%">景点名称</td>
              <td style="width:8%">景区等级</td>
              <td style="width:20%">景区地址</td>
              <td style="width:10%">负责人</td>
              <td style="width:10%">负责人电话</td>
              <td style="width:10%">经度</td>
              <td style="width:10%">纬度</td>
              <td style="width:10%">操作</td>
            </tr>
            <tr>
              <td v-show="scenicList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in scenicList" :key="index">
              <td>{{item.unitName}}</td>
              <td>{{item.level | scenicLevel}}</td>
              <td>{{item.address}}</td>
              <td>{{item.leader}}</td>
              <td>{{item.leaderPhone}}</td>
              <td>{{item.lng}}</td>
              <td>{{item.lat}}</td>
              <td>
                <i class="el-icon-edit basis_edit" @click="change(item.scenicId)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.scenicId)">删除</i>
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
                  <el-form-item label="景点名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="景点等级" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择景点等级">
                      <el-option label="未评级" value="0"></el-option>
                      <el-option label="A" value="1"></el-option>
                      <el-option label="AA" value="2"></el-option>
                      <el-option label="AAA" value="3"></el-option>
                      <el-option label="AAAA" value="4"></el-option>
                      <el-option label="AAAAA" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="景点地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="负责人">
                    <el-input v-model="ruleForm.leader"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="负责人电话">
                    <el-input v-model="ruleForm.leaderPhone"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="纬度" prop="lat">
                    <el-input v-model="ruleForm.lat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经度" prop="lng">
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
                  <el-form-item label="景点名称" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="景点等级" prop="region">
                    <el-select v-model="ruleFormChange.region" placeholder="请选择景点等级">
                      <el-option label="未评级" value="0"></el-option>
                      <el-option label="A" value="1"></el-option>
                      <el-option label="AA" value="2"></el-option>
                      <el-option label="AAA" value="3"></el-option>
                      <el-option label="AAAA" value="4"></el-option>
                      <el-option label="AAAAA" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="景点地址" prop="address">
                  <el-input v-model="ruleFormChange.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="负责人">
                    <el-input v-model="ruleFormChange.leader"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="负责人电话">
                    <el-input v-model="ruleFormChange.leaderPhone"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="纬度" prop="lat">
                    <el-input v-model="ruleFormChange.lat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经度" prop="lng">
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
        <!-- 设置景区最大承载量弹框 -->
        <el-dialog
          title="设置景区最大承载量"
          :visible.sync="isMaxed"
          width="60%"
          :modal-append-to-body="true"
        >
          <el-form
            :model="ruleFormMax"
            :rules="rulesMax"
            ref="ruleFormMax"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
          >
            <el-row :span="24">
              <el-row :span="24" :gutter="20">
                <el-col :span="12">
                  <el-form-item label="景点名称" prop="name">
                    <el-input v-model="ruleFormMax.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-button type="primary" plain size="small" @click="isSceniced = true">选择景点</el-button>
                </el-col>
              </el-row>
              <el-col :span="24">
                <el-form-item label="最大承载量" prop="maxVolume">
                  <el-input v-model="ruleFormMax.maxVolume"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormMax('ruleFormMax')">确定</el-button>
            <el-button @click="isMaxed=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 选择景区弹框 -->
        <el-dialog title="选择景区" :visible.sync="isSceniced" width="60%" :modal-append-to-body="true">
          <div class="basis_scenic_content_right_content_table">
            <table>
              <tr class="basis_scenic_content_right_content_table_title">
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
        name: [{ required: true, message: "请输入景点名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入景点地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择景点等级", trigger: "change" }
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
        name: [{ required: true, message: "请输入景点名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入景点地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择景点等级", trigger: "change" }
        ],
        lat: [{ required: true, message: "请输入经度", trigger: "change" }],
        lng: [{ required: true, message: "请输入纬度", trigger: "change" }]
      },
      ruleFormMax: {
        name: "",
        maxVolume: ""
      },
      rulesMax: {
        name: [{ required: true, message: "请选择景点", trigger: "blur" }],
        maxVolume: [
          { required: true, message: "请输入景区最大承载量", trigger: "blur" }
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
    // 获取景区列表
    async getScenicList() {
      let res = await this.$http.get(
        `/base/listBaseScenic?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&unitName=${this.unitName}`
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
    // 添加景区列表
    async addScenicList() {
      let res = await this.$http.post(
        `/base/savePtBaseScenic`,
        qs.stringify({
          unitName: this.ruleForm.name,
          address: this.ruleForm.address,
          lat: this.ruleForm.lat,
          lng: this.ruleForm.lng,
          level: this.ruleForm.region,
          leader: this.ruleForm.leader,
          leaderPhone: this.ruleForm.leaderPhone
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
    // 获取编辑景区列表
    async getEditScenicList(id) {
      let res = await this.$http.get(`/base/getPtBaseScenic?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editScenicList = res.data.data;
        this.ruleFormChange.name = this.editScenicList.unitName;
        this.ruleFormChange.address = this.editScenicList.address;
        this.ruleFormChange.region = this.editScenicList.level;
        this.ruleFormChange.lng = this.editScenicList.lng;
        this.ruleFormChange.lat = this.editScenicList.lat;
        this.ruleFormChange.leader = this.editScenicList.leader;
        this.ruleFormChange.leaderPhone = this.editScenicList.leaderPhone;
        console.log(this.editScenicList);
      }
    },
    // 编辑景区列表
    async editScenicLists() {
      console.log(this.editScenicList);
      this.editScenicList.unitName = this.ruleFormChange.name;
      this.editScenicList.address = this.ruleFormChange.address;
      this.editScenicList.level = this.ruleFormChange.region;
      this.editScenicList.lng = this.ruleFormChange.lng;
      this.editScenicList.lat = this.ruleFormChange.lat;
      this.editScenicList.leader = this.ruleFormChange.leader;
      this.editScenicList.leader = this.ruleFormChange.leader;
      this.editScenicList.leaderPhone = this.ruleFormChange.leaderPhone;
      let res = await this.$http.post(
        `/base/updatePtBaseScenic`,
        qs.stringify(this.editScenicList)
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
    // 删除景区列表
    async delScenicList(id) {
      console.log(id);
      let res = await this.$http.delete(`/base/deletePtBaseScenic?id=${id}`);
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
    // 选择景区
    chooseSce() {
      console.log(this.scenicInfo);
      this.aid = this.scenicInfo.scenicId;
      this.ruleFormMax.name = this.scenicInfo.unitName;
      this.isSceniced = false;
    },
    // 设置景区最大承载量
    submitFormMax(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setMax();
          this.isMaxed = false;
          this.currentPage = 1;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 设置景区最大承载量
    async setMax() {
      let res = await this.$http.post(
        "/scenic/setScenicTouristMaxVolume",
        qs.stringify({
          aid: this.aid,
          maxVolume: this.ruleFormMax.maxVolume
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.getScenicList();
        this.$message({
          type: "success",
          message: "设置成功!"
        });
      }
    }
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
  /* height: 100%; */
  background-color: #f4f4f4;
}
.basis_scenic_content {
  margin-left: calc(210px);
  height: 1080px;
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