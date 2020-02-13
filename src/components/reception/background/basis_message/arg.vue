<template>
  <div class="basis_arg_all_content">
    <Navbar></Navbar>
    <div class="basis_arg_content">
      <div class="basis_arg_content_right_content">
        <div class="basis_arg_content_right_content_title">
          <input type="text" placeholder="请输入农家乐名称" v-model="unitName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
        </div>
        <div class="basis_arg_content_right_content_table">
          <table>
            <tr class="basis_arg_content_right_content_table_title">
              <td>农家乐名称</td>
              <td>农家乐等级</td>
              <td>农家乐地址</td>
              <td>联系电话</td>
              <td>经度</td>
              <td>纬度</td>
              <td>操作</td>
            </tr>
            <tr>
              <td v-show="argList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in argList" :key="index">
              <td style="width:12%">{{item.agritainmentName}}</td>
              <td style="width:8%">{{item.level | scenicLevel}}</td>
              <td style="width:18%">{{item.address}}</td>
              <td style="width:12%">{{item.tel}}</td>
              <td style="width:10%">{{item.lng}}</td>
              <td style="width:10%">{{item.lat}}</td>
              <td style="width:10%">
                <i class="el-icon-edit basis_edit" @click="change(item.agritainmentId)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.agritainmentId)">删除</i>
              </td>
            </tr>
          </table>
        </div>
        <div class="basis_arg_content_right_content_page">
          <div class="basis_arg_content_right_content_page_left">
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
                  <el-form-item label="农家乐名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="农家乐等级" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择农家乐等级">
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
                <el-form-item label="农家乐地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input v-model="ruleForm.tel"></el-input>
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
                  <el-form-item label="农家乐名称" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="农家乐等级" prop="region">
                    <el-select v-model="ruleFormChange.region" placeholder="请选择农家乐等级">
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
                <el-form-item label="农家乐地址" prop="address">
                  <el-input v-model="ruleFormChange.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input v-model="ruleFormChange.tel"></el-input>
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
      allAccount: 20,
      //   页面条数
      pageSize: 15,
      //   当前页数
      currentPage: 1,
      isadded: false,
      isedited: false,
      unitName: "",
      argList: [],
      editArgList: [],
      ruleForm: {
        name: "",
        address: "",
        region: "",
        lat: "",
        lng: "",
        tel: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入农家乐名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入农家乐地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择农家乐等级", trigger: "change" }
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
        tel: ""
      },
      rulesChange: {
        name: [
          { required: true, message: "请输入农家乐名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入农家乐地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择农家乐等级", trigger: "change" }
        ],
        lat: [{ required: true, message: "请输入经度", trigger: "change" }],
        lng: [{ required: true, message: "请输入纬度", trigger: "change" }]
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
      this.getArgList();
      console.log(this.currentPage);
    },
    // 查找
    find() {
      this.getArgList();
      this.$message({
        type: "success",
        message: "查询成功!"
      });
    },
    // 获取农家乐列表
    async getArgList() {
      let res = await this.$http.get(
        `/base/listBaseFormHouse?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&unitName=${this.unitName}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.argList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
    },
    // 添加农家乐列表
    async addArgList() {
      let res = await this.$http.post(
        `	/base/saveBaseFormHouse`,
        qs.stringify({
          agritainmentName: this.ruleForm.name,
          address: this.ruleForm.address,
          lat: this.ruleForm.lat,
          lng: this.ruleForm.lng,
          tel: this.ruleForm.tel,
          level: this.ruleForm.region
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.getArgList();
        this.isadded = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取编辑农家乐列表
    async getEditArgList(id) {
      console.log(id);
      let res = await this.$http.get(`/base/getBaseFormHouseById?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editHotelList = res.data.data;
        this.ruleFormChange.name = this.editHotelList.agritainmentName;
        this.ruleFormChange.address = this.editHotelList.address;
        this.ruleFormChange.region = this.editHotelList.level.toString();
        this.ruleFormChange.lng = this.editHotelList.lng;
        this.ruleFormChange.lat = this.editHotelList.lat;
        this.ruleFormChange.tel = this.editHotelList.tel;
        console.log(this.editHotelList);
      }
    },
    // 编辑农家乐列表
    async editArgLists() {
      console.log(this.editHotelList);
      this.editHotelList.agritainmentName = this.ruleFormChange.name;
      this.editHotelList.address = this.ruleFormChange.address;
      this.editHotelList.level = this.ruleFormChange.region;
      this.editHotelList.lng = this.ruleFormChange.lng;
      this.editHotelList.lat = this.ruleFormChange.lat;
      this.editHotelList.tel = this.ruleFormChange.tel;
      let res = await this.$http.post(
        `/base/updatePtFormHouse`,
        qs.stringify(this.editHotelList)
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.isedited = false;
        this.getArgList();
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
    async delArgList(id) {
      console.log(id);
      let res = await this.$http.delete(`/base/deletePtFormHouse?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.getArgList();
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
          this.addArgList();
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
          this.delArgList(id);
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
      this.getEditArgList(id);
    },
    // 编辑
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editArgLists();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.getArgList();
  },
  created() {
    console.log(this.allAccount);
    console.log(this.currentPage);
  }
};
</script>
<style>
.basis_arg_all_content {
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.basis_arg_content {
  margin-left: calc(210px);
  height: 1080px;
  background-color: #fff;
  position: relative;
}
.basis_arg_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.basis_arg_content_right_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.basis_arg_content_right_content_title {
  display: flex;
  align-items: center;
}
.basis_arg_content_right_content_title input {
  width: 180px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ddd;
}
.basis_arg_content_right_content_title button {
  padding: 3px 15px;
  margin: 0 10px;
  /* height: 20px; */
  text-align: center;
  color: #fff;
  border: none;
  background-color: #0095ff;
  cursor: pointer;
}
.basis_arg_content_right_content_table {
  width: 100%;
}
.basis_arg_content_right_content_table table {
  width: 95%;
  margin-top: 20px;
  font-size: 13px;
  border-collapse: collapse;
}
.basis_arg_content_right_content_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.basis_arg_content_right_content_table_title > td {
}
.basis_arg_content_right_content_table_title > td:nth-of-type(1) {
  border-top-left-radius: 10px;
  border-top: none;
  border-left: none;
}
.basis_arg_content_right_content_table table tr td {
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