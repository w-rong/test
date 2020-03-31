<template>
  <div class="basis_scenic_all_content">
    <Navbar></Navbar>
    <div class="basis_scenic_content">
      <div class="basis_scenic_bg" v-if="isBridge"></div>
      <div class="basis_scenic_content_right_content">
        <div class="basis_scenic_content_right_content_title">
          <input type="text" placeholder="请输入文物商店名称" v-model="unitName" />
          <button type="button" @click="find()">查询</button>
          <button type="button" @click="add()">新增数据</button>
          <!-- <button type="button" @click="derive()">导出</button>
          <button type="button" @click="showLead()">导入</button>-->
        </div>
        <!-- 列表展示 -->
        <div class="basis_scenic_content_right_content_table">
          <table>
            <tr class="basis_scenic_content_right_content_table_title">
              <td style="width:12%">文物商店名称</td>
              <td style="width:20%">文物商店地址</td>
              <td style="width:10%">联系电话</td>
              <td style="width:10%">经度</td>
              <td style="width:10%">纬度</td>
              <td style="width:10%">操作</td>
            </tr>
            <tr>
              <td v-show="scenicList.length == ''" colspan="8" class="noinfo">没有找到匹配的记录</td>
            </tr>
            <tr v-for="(item, index) in scenicList" :key="index">
              <td>{{item.heritageShopName}}</td>
              <td>{{item.address}}</td>
              <td>{{item.tel}}</td>
              <td>{{item.lng}}</td>
              <td>{{item.lat}}</td>
              <td>
                <i class="el-icon-edit basis_edit" @click="change(item.heritageShopId)">编辑</i>
                <i class="el-icon-delete basis_del" @click="del(item.heritageShopId)">删除</i>
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
                  <el-form-item label="文物商店名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="文物商店地址" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="margin-left:10px;margin-top:5px">
                  <el-button type="primary" plain size="small" @click="isMap=true">选择地址</el-button>
                  <el-button type="primary" plain size="small" @click="searchLatLng">生成经纬度</el-button>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input v-model="ruleForm.leaderPhone"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="图片地址">
                  <el-col :span="12" style="margin-right:10px">
                    <el-input v-model="ruleForm.imgUrl"></el-input>
                  </el-col>
                  <el-upload
                    class="upload-demo"
                    action="http://47.96.94.56:8082/upload/uploadPic"
                    multiple
                    name="picPath"
                    :before-upload="beforeUploadImg"
                    :headers="token"
                    :on-success="uploadSuccess"
                  >
                    <el-button type="primary" plain size="small">选择图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="文物商店介绍">
                  <el-input v-model="ruleForm.introduce"></el-input>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="文物商店名称" prop="name">
                    <el-input v-model="ruleFormChange.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="文物商店地址" prop="address">
                    <el-input v-model="ruleFormChange.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="margin-left:10px;margin-top:5px">
                  <el-button type="primary" plain size="small" @click="isMap=true">选择地址</el-button>
                  <el-button type="primary" plain size="small" @click="searchLatLng1">生成经纬度</el-button>
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
              <el-col :span="22">
                <el-col :span="12">
                  <el-form-item label="联系电话">
                    <el-input v-model="ruleFormChange.leaderPhone"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="22">
                <el-form-item label="图片地址">
                  <el-col :span="12" style="margin-right:10px">
                    <el-input v-model="ruleFormChange.imgUrl"></el-input>
                  </el-col>
                  <el-upload
                    class="upload-demo"
                    action="http://47.96.94.56:8082/upload/uploadPic"
                    multiple
                    name="picPath"
                    :before-upload="beforeUploadImg"
                    :headers="token"
                    :on-success="uploadSuccess"
                  >
                    <el-button type="primary" plain size="small">选择图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="文物商店介绍">
                  <el-input v-model="ruleFormChange.introduce"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormChange('ruleFormChange')">确定</el-button>
            <el-button @click="isedited=false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 选择地点弹框 -->
        <el-dialog title="选择地点" :visible.sync="isMap" width="60%" :modal-append-to-body="true">
          <Map @fun="getAddrss" @add="getDizhi"></Map>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="chooseAddress()">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 导出弹窗 -->
    <el-dialog title="导入文件" :visible.sync="isLead" width="30%">
      <el-upload
        class="upload-demo"
        action="http://47.96.94.56:8082/excel/setErrorFile"
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
import Map from "../choose_address/map";
import qs from "qs";
export default {
  data() {
    return {
      isMap: false,
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
        lng: "",
        introduce: "",
        imgUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入文物商店名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入文物商店地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择文物商店等级", trigger: "change" }
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
        leaderPhone: "",
        introduce: "",
        imgUrl: ""
      },
      rulesChange: {
        name: [
          { required: true, message: "请输入文物商店名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入文物商店地址", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择文物商店等级", trigger: "change" }
        ],
        lat: [{ required: true, message: "请输入经度", trigger: "change" }],
        lng: [{ required: true, message: "请输入纬度", trigger: "change" }]
      },
      ruleFormMax: {
        name: "",
        maxVolume: ""
      },
      rulesMax: {
        name: [{ required: true, message: "请选择文物商店", trigger: "blur" }],
        maxVolume: [
          {
            required: true,
            message: "请输入文物商店最大承载量",
            trigger: "blur"
          }
        ]
      },
      token: {}
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
      this.ruleForm.lat = data[1];
      this.ruleForm.lng = data[0];
      this.ruleFormChange.lat = data[1];
      this.ruleFormChange.lng = data[0];
      console.log(data);
    },
    getDizhi(data) {
      this.ruleForm.address = data;
      this.ruleFormChange.address = data;
      console.log(data);
    },
    searchLatLng() {
      let geocoder = new T.Geocoder();
      geocoder.getPoint(this.ruleForm.address, this.searchResult);
    },
    searchLatLng1() {
      let geocoder = new T.Geocoder();
      geocoder.getPoint(this.ruleFormChange.address, this.searchResult);
    },
    searchResult(result) {
      if (result.getStatus() == 0) {
        this.ruleForm.lat = result.location.lat;
        this.ruleForm.lng = result.location.lon;
        this.ruleFormChange.lat = result.location.lat;
        this.ruleFormChange.lng = result.location.lon;
      } else {
        this.$message.error("请输入正确的地址");
      }
    },
    // 获取地址
    chooseAddress() {
      this.isMap = false;
    },
    beforeUploadImg(file) {
      // console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "png";
      const extension2 = testmsg === "jpg";
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 png、jpg格式!",
          type: "warning"
        });
      }
    },
    uploadSuccess(response, file, fileList) {
      this.ruleForm.imgUrl = response.msg;
      this.ruleFormChange.imgUrl = response.msg;
      console.log(response.msg);
    },
    // 导出
    async derive() {
      window.location.href =
        "http://47.96.94.56:8082/excel/getExcelBaseHeritageShop";
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
    showLead() {
      this.isLead = true;
      this.token = { Authorization: localStorage.getItem("Authorization") };
    },
    leadEnter() {
      this.isLead = false;
      this.getScenicList();
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
    // 获取文物商店列表
    async getScenicList() {
      if (this.unitName != "") {
        this.currentPage = 1;
      }
      let res = await this.$http.get(
        `/base/listBaseHeritageShop?pagNumber=${this.currentPage}&pagSize=${this.pageSize}&unitName=${this.unitName}`
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
    // 添加文物商店列表
    async addScenicList() {
      let res = await this.$http.post(
        `/base/saveBaseHeritageShop`,
        qs.stringify({
          heritageShopName: this.ruleForm.name,
          address: this.ruleForm.address,
          lat: this.ruleForm.lat,
          lng: this.ruleForm.lng,
          tel: this.ruleForm.leaderPhone,
          synopsis: this.ruleForm.introduce,
          pic: this.ruleForm.imgUrl
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
    // 获取编辑文物商店列表
    async getEditScenicList(id) {
      let res = await this.$http.get(`/base/getBaseHeritageShop?id=${id}`);
      console.log(res);
      if (res.data.msg == "success") {
        this.editScenicList = res.data.data;
        this.ruleFormChange.name = this.editScenicList.heritageShopName;
        this.ruleFormChange.address = this.editScenicList.address;
        this.ruleFormChange.lng = this.editScenicList.lng;
        this.ruleFormChange.lat = this.editScenicList.lat;
        this.ruleFormChange.leaderPhone = this.editScenicList.tel;
        this.ruleFormChange.introduce = this.editScenicList.synopsis;
        this.ruleFormChange.imgurl = this.editScenicList.pic;
        // console.log(this.editScenicList);
      }
    },
    // 编辑文物商店列表
    async editScenicLists() {
      // console.log(this.editScenicList);
      let res = await this.$http.post(
        `/base/updateBaseHeritageShop`,
        qs.stringify({
          heritageShopId: this.editScenicList.heritageShopId,
          heritageShopName: this.ruleFormChange.name,
          address: this.ruleFormChange.address,
          lat: this.ruleFormChange.lat,
          lng: this.ruleFormChange.lng,
          tel: this.ruleFormChange.leaderPhone,
          synopsis: this.ruleFormChange.introduce,
          pic: this.ruleFormChange.imgurl
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
    // 删除文物商店列表
    async delScenicList(id) {
      console.log(id);
      let res = await this.$http.delete(
        `/base/deleteBaseHeritageShop?id=${id}`
      );
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
    }
  },
  mounted() {
    this.token = { Authorization: localStorage.getItem("Authorization") };
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