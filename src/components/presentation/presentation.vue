<template>
  <div class="Presentation">
    <div class="P_head">普陀文旅大数据报告</div>
    <div class="P_con">
      <div class="P_side">
        <div class="P_side_item">报告库</div>
      </div>
      <div class="P_container">
        <div class="P_title">报告库</div>
        <div class="P_detail">
          <div class="P_detail_top">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="qyeryformLabelAlign"
            >
              <el-form-item label="报告名称">
                <el-input v-model="qyeryformLabelAlign.ReportName" size="small"></el-input>
              </el-form-item>
              <el-form-item label="报告主题" style="margin-left: 70px;">
                <el-select
                  v-model="qyeryformLabelAlign.ReportTheme"
                  placeholder="选择报告主题"
                  @change="themeChangeDefault"
                >
                  <el-option
                    v-for="item in themeOptionsDefault"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
                <el-date-picker
                  @change="changeCycleDefault"
                  v-model="qyeryformLabelAlign.valueDataDefault"
                  :type="choseStyleDefault"
                  value-format="yyyy-MM"
                  placeholder="选择日期"
                  popper-class="presention_dateStyle"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-form-item>
              <br />

              <el-form-item label="报告状态">
                <el-select v-model="qyeryformLabelAlign.ReportStatus" placeholder="发布状态">
                  <el-option
                    v-for="item in fabuStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />

              <div class="P_detail_top_btn">
                <el-button type="primary" size="mini" style="margin-left:80px;" @click="queryDate">
                  查询
                  <img src="../../assets/image/report/search.png" alt class="reset" />
                </el-button>
                <el-button size="mini" @click="resetForm">
                  重置
                  <img src="../../assets/image/report/reset.png" alt class="reset" />
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:330px;"
                  @click="addPresentation"
                >新增报告</el-button>
              </div>
            </el-form>
          </div>
          <div class="P_detail_bottom">
            <el-table
              ref="multipleTable"
              :data="presentList"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="报告名称" prop="reportName"></el-table-column>
              <el-table-column prop="reportSubject" label="报告主题">
                <template slot-scope="scope">
                  <div v-if="scope.row.reportSubject == '1'">年报</div>
                  <div v-else-if="scope.row.reportSubject == '2'">月报</div>
                  <div v-else-if="scope.row.reportSubject == '3'">春节</div>
                  <div v-else-if="scope.row.reportSubject == '4'">五一</div>
                  <div v-else-if="scope.row.reportSubject == '5'">国庆</div>
                </template>
              </el-table-column>
              <el-table-column prop="reportCycle" label="报告周期"></el-table-column>
              <el-table-column prop="isPublish" label="报告状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.isPublish==1">已发布</div>
                  <div v-if="scope.row.isPublish==0">未发布</div>
                </template>
              </el-table-column>
              <el-table-column prop="createUser" label="创建人" width="100"></el-table-column>
              <el-table-column prop="createTime" label="添加时间"></el-table-column>
              <el-table-column label="操作" width="230">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                  <div>
                    <el-button type="primary" size="mini" @click="PCpreview(scope.row.id)">预览</el-button>
                    <el-button type="primary" size="mini" @click="release(scope.row.id)">发布</el-button>
                    <el-button type="primary" size="mini" @click="withdraw(scope.row.id)">撤回</el-button>
                    <el-button type="primary" size="mini" @click="delPresentation(scope.row.id)">删除</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="ddPresention(scope.row.bigDataInterfaceId, scope.row.reportSubject, scope.row.reportCycle)"
                    >钉钉预览</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="sizeChange"
              @current-change="currChange"
              :current-page="currPage"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增报告 -->
    <el-dialog title="新增报告" width="50%" :visible.sync="addDialog">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item
          label="报告名称 "
          prop="ReportName"
          :rules="[ { required: true, message: '报告名称'}]"
        >
          <el-input v-model="formLabelAlign.ReportName" size="small"></el-input>
        </el-form-item>
        <br />
        <el-form-item
          label="报告主题"
          prop="ReportTheme"
          :rules="[ { required: true, message: '报告主题'}]"
        >
          <el-select
            v-model="formLabelAlign.ReportTheme"
            placeholder="选择报告主题"
            value-key="id"
            @change="themeChange"
          >
            <el-option
              v-for="item in themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <el-date-picker
            @change="changeCycle"
            v-model="valueData"
            :type="choseStyle"
            value-format="yyyy-MM"
            :picker-options="pickerOptions1"
            popper-class="presention_dateStyle"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="addPreData" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增预览 -->
    <!-- <div class="presentYL"  v-if="showPCpresentshow"  v-loading="loadingAdd" element-loading-background="rgba(0, 0, 0, 0.6)">
            <test class="presentYL_con" ref="addPreview" @complateCoutn="complateCout" @transmitId="getTestId" @hideLoading="loading == false" :ReportName="formLabelAlign.ReportName" :ReportTheme="formLabelAlign.ReportTheme" :valueData="valueData"/>
            <div class="presentYL_btn_con">
                <el-button @click="showPCpresentshow = false" class="presentYL_btn_l">取 消</el-button>
                <el-button type="primary" class="presentYL_btn_r" @click="confirmPreview">确 定</el-button>
            </div>
    </div>-->

    <el-scrollbar
      wrapStyle="position: absolute;width: 100%;"
      style="width: 100%; position: absolute"
      :wrap-style="wrapStyle"
      class="presentYL1"
      v-if="showPCpresentshow"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <!-- v-loading="loadingAdd" -->

      <test
        class="presentYL_con"
        ref="addPreview"
        @complateCoutn="complateCout"
        @transmitId="getTestId"
        @hideLoading="loading == false"
        :ReportName="formLabelAlign.ReportName"
        :ReportTheme="formLabelAlign.ReportTheme"
        :valueData="valueData"
      />
      <div class="presentYL_btn_con">
        <el-button @click="showPCpresentshow = false" class="presentYL_btn_l">取 消</el-button>
        <el-button type="primary" class="presentYL_btn_r" @click="confirmPreview">确 定</el-button>
      </div>
    </el-scrollbar>
    <!-- pc预览 -->
    <!-- <div class="presentYL" v-if="PCpresentshow"  v-loading="loadingPC" element-loading-background="rgba(0, 0, 0, 0.6)">
            <preview class="presentYL_con" style="" ref="viewPreview" @transmitId="getTestId" @hideLoading="loadingPC == false"/>
            <div class="presentYL_btn_con">
                <el-button type="primary" class="presentYL_btn_r" @click="PCpresentshow = false">确 定</el-button>
            </div>
    </div>-->
    <!-- <el-scrollbar
      wrapStyle="position: absolute;width: 100%;"
      style="position: absolute; width: 100%;"
      :wrap-style="wrapStyle"
      class="presentYL1"
      v-if="PCpresentshow"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >-->
    <!-- v-loading="loadingPC" -->
    <el-dialog width="80%" :visible.sync="PCpresentshow">
      <div>
        <preview
          class="presentYL_con"
          ref="viewPreview"
          @transmitId="getTestId"
          :reportId="reportId"
          @hideLoading="loadingPC == false"
        />
        <div class="presentYL_btn_con">
          <el-button type="primary" class="presentYL_btn_r" @click="PCpresentshow = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- </el-scrollbar> -->
    <!-- 二维码 -->
    <el-dialog title="钉钉二维码" width="550px" :visible.sync="myCodeShow">
      <div style="height:300px;">
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import test from "@/components/test.vue";
import preview from "@/components/PCpreview.vue";
import QRCode from "qrcodejs2";
export default {
  components: {
    test,
    preview
  },
  data() {
    return {
      wrapStyle: {
        position: "absolute"
      },
      reportAdd: "",
      reportId: "",
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      myCodeShow: false,
      loadingAdd: true,
      loadingPC: true,
      addDialog: false,
      showPCpresentshow: false,
      PCpresentshow: false,
      showLoading: false,
      fabuStatus: [
        {
          id: 1,
          value: "true",
          label: "发布"
        },
        {
          id: 2,
          value: "false",
          label: "未发布"
        }
      ],
      pagesize: 3,
      currPage: 1,
      total: 0,
      labelPosition: "right",
      qyeryformLabelAlign: {
        ReportName: "",
        ReportTheme: "",
        ReportStatus: "",
        valueDataDefault: new Date()
      },
      formLabelAlign: {
        ReportName: "",
        ReportTheme: ""
      },
      valueData: "",
      valueDataDefault: new Date(),
      choseStyle: "date",
      choseStyleDefault: "date",
      value: "",
      valueStatus: "",
      themeValueDefault: "",
      valueTheme: "",
      valueDate: "",
      themeOptionsDefault: [
        {
          id: 1,
          value: "1",
          label: "年报"
        },
        {
          id: 2,
          value: "2",
          label: "月报"
        },
        {
          id: 5,
          value: "5",
          label: "春节"
        },
        {
          id: 3,
          value: "3",
          label: "五一"
        },
        {
          id: 4,
          value: "4",
          label: "国庆"
        }
      ],
      themeOptions: [
        {
          id: 1,
          value: "1",
          label: "年报"
        },
        {
          id: 2,
          value: "2",
          label: "月报"
        },
        {
          id: 5,
          value: "5",
          label: "春节"
        },
        {
          id: 3,
          value: "3",
          label: "五一"
        },
        {
          id: 4,
          value: "4",
          label: "国庆"
        }
      ],
      BigDataInterfaceId: "",
      presentList: [],
      presentationList: [],
      link: "https://baidu.com"
    };
  },
  methods: {
    // 弹窗选择主题
    themeChange(data) {
      console.log(data);
      if (data == "月报") {
        this.choseStyle = "month";
      } else {
        this.choseStyle = "year";
      }
    },
    // 选择主题
    themeChangeDefault(data) {
      if (data == "月报") {
        this.choseStyleDefault = "month";
      } else {
        this.choseStyleDefault = "year";
      }
    },
    //
    changeCycle(data) {
      this.valueData = data;
    },
    changeCycleDefault(data) {
      this.valueData = data;
    },
    // 获取报告
    async getPresentation() {
      var res = await this.$http.post(
        `/report/getBigDataReportList`,
        qs.stringify({
          pageNo: this.currPage,
          pageSize: this.pagesize,
          reportName: this.qyeryformLabelAlign.ReportName,
          reportSubject: this.qyeryformLabelAlign.ReportTheme,
          queryDate: this.qyeryformLabelAlign.ReportCycle
        })
      );
      console.log(res);
      let { data } = res.data;
      if (res.data.msg == "success") {
        if (data.list.length != 0) {
          data.list.forEach((item, index) => {
            // if (item.reportTheme == 2) {
            //   item.reportCycle =
            //     item.reportCycle.split("-")[0] +
            //     "-" +
            //     item.reportCycle.split("-")[1];
            // } else {
            //   item.reportCycle = item.reportCycle.split("-")[0];
            // }
            if (item.creationTime) {
              item.creationTime = item.creationTime.split("T")[0];
            }
          });
        }
        this.presentList = data.list;
        // console.log(data.list)
        this.total = data.total;
      }
    },
    sizeChange(size) {
      this.pagesize = size;
      this.getPresentation();
    },
    currChange(page) {
      this.currPage = page;
      this.getPresentation();
    },
    // 重置
    resetForm() {
      this.qyeryformLabelAlign.ReportName = "";
      this.qyeryformLabelAlign.ReportTheme = "";
      this.qyeryformLabelAlign.ReportStatus = "";
      this.qyeryformLabelAlign.valueDataDefault = "";
      this.getPresentation();
    },
    // 新增
    addPresentation() {
      this.formLabelAlign.ReportName = "";
      this.formLabelAlign.ReportTheme = "";
      this.valueData = "";
      this.addDialog = true;
    },
    // 确认新增
    async addPreData() {
      if (
        this.formLabelAlign.ReportName == "" ||
        this.formLabelAlign.ReportTheme == "" ||
        this.valueData == undefined
      ) {
        this.$message({
          message: "添加失败，不能为空",
          type: "error"
        });
        return false;
      }
      this.addDialog = false;
      var that = this;
      this.showPCpresentshow = true;
    },
    complateCout(count) {
      if (count == 12) {
        this.loadingAdd = false;
      }
    },
    // 二维码
    qrcodeScan(url) {
      //生成二维码
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 200, // 二维码宽度
        height: 200, // 二维码高度
        text: url
      });
    },
    // 钉钉预览
    ddPresention(id, themeId, time) {
      console.log(time);
      var timeArr = time.split("-");
      console.log(timeArr);
      this.myCodeShow = true;
      if (themeId == 1 || themeId == 2) {
        if (themeId == 1) {
          this.$nextTick(function() {
            this.qrcodeScan(
              `http://47.96.94.56:260/#/currency?time=${timeArr[0]}`
            );
          });
        } else {
          this.$nextTick(function() {
            this.qrcodeScan(
              `http://47.96.94.56:260/#/currency?time=${timeArr[0]}&time=${timeArr[1]}`
            );
          });
        }
      } else if (themeId == 3) {
        this.$nextTick(function() {
          this.qrcodeScan(`http://47.96.94.56:260/?time=${timeArr}#/spring`);
          // this.qrcodeScan(`http://101.71.28.52:29/?${id}#/mayDay`)
        });
      } else if (themeId == 4) {
        this.$nextTick(function() {
          this.qrcodeScan(`http://47.96.94.56:260/?time=${timeArr}#/mayDay`);
          // this.qrcodeScan(`http://101.71.28.52:29/?${id}#/nationalDay`)
        });
      } else if (themeId == 5) {
        this.$nextTick(function() {
          this.qrcodeScan(
            `http://47.96.94.56:260/?time=${timeArr}#/nationalDay`
          );
          // this.qrcodeScan(`http://101.71.28.52:29/?${id}#/spring`)
        });
      }
    },
    // 发布
    async release(id) {
      var taht = this;
      this.$confirm("确认发布?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.post(
            `/report/publishReport`,
            qs.stringify({
              id: id,
              pubType: 1
            })
          );
          if (res.data.msg == "操作成功") {
            this.getPresentation();
            this.$message({
              type: "success",
              message: "发布成功"
            });
          } else {
            this.$message.error(message);
            return;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "发布失败"
          });
        });
    },
    // 撤回
    withdraw(id) {
      var taht = this;
      this.$confirm("确认撤回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.post(
            `/report/publishReport`,
            qs.stringify({
              id: id,
              pubType: 0
            })
          );
          if (res.data.msg == "操作成功") {
            this.getPresentation();
            this.$message({
              type: "success",
              message: "撤回成功"
            });
          } else {
            this.$message.error(message);
            return;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    async delPresentation(id) {
      var taht = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.post(
            `/report/deleteReport`,
            qs.stringify({
              id: id
            })
          );
          if (res.data.msg == "删除成功") {
            this.currPage = 1;
            this.getPresentation();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            this.$message.error(message);
            return;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查询
    async queryDate() {
      this.getPresentation();
    },
    // 确认添加预览
    async confirmPreview() {
      //子组件入库
      // this.$refs.addPreview.addReportForm();
      console.log(this.valueData)
      console.log(this.ReportTheme)
      if (this.formLabelAlign.ReportTheme != "月报") {
        this.valueData = this.valueData.substring(0, 4);
      }
      console.log(this.valueData)
      let res = await this.$http.post(
        `/report/getBigDataReportDetail`,
        qs.stringify({
          queryDate: this.valueData,
          reportSubject: this.formLabelAlign.ReportTheme
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.reportAdd = res.data.data;
        console.log(this.reportAdd);
        let resAdd = await this.$http.post(
          `/report/createBigDataReport`,
          qs.stringify({
            reportName: this.formLabelAlign.ReportName,
            reportSubject: this.formLabelAlign.ReportTheme,
            queryDate: this.valueData,
            scenicPassenger: JSON.stringify(this.reportAdd.scenicPassenger),
            areaPassenger: JSON.stringify(this.reportAdd.areaPassenger),
            city: JSON.stringify(this.reportAdd.city),
            commentDistribute: JSON.stringify(this.reportAdd.commentDistribute),
            placeNums: JSON.stringify(this.reportAdd.placeNums),
            portraitConsume: JSON.stringify(this.reportAdd.portraitConsume),
            province: JSON.stringify(this.reportAdd.province),
            gongAn: JSON.stringify(this.reportAdd.gongAn)
          })
        );
        console.log(resAdd);
        if (resAdd.data.msg == "创建成功") {
          this.showPCpresentshow = false;
          this.getPresentation();
        }
      }
    },
    // PC预览
    async PCpreview(bigId) {
      this.reportId = bigId;
      this.PCpresentshow = true;
      var res = await this.$http.get(
        `/report/getBigDataReportView`,
        qs.stringify({
          reportId: bigId
        })
      );
      let { data, isSuccess } = res.data;
      if (isSuccess) {
        this.presentationList = data;
        console.log(data);
        this.$refs.viewPreview.PCprev(data);
        var that = this;
        setTimeout(function() {
          that.loadingPC = false;
        }, 2000);
      }
    },
    // 获取返回id添加
    async getTestId(id) {
      console.log(this.valueData);
      this.BigDataInterfaceId = id;
      if (id) {
        var res = await this.$http.post(
          `/api/BigDataManagement/CreateBigDataManagementAsync`,
          qs.stringify({
            ReportName: this.formLabelAlign.ReportName,
            ReportTheme: Number(this.formLabelAlign.ReportTheme),
            ReportCycle: this.valueData, //报告周期
            ReportStatus: false,
            BigDataInterfaceId: id
          })
        );
        let { isSuccess, message } = res.data;
        if (isSuccess) {
          this.getPresentation();
          this.showPCpresentshow = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.addDialog = false;
        } else {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      }
    },
    // 预览保存
    pcDownLoad() {
      this.$refs.viewPreview.getImg();
    }
  },
  mounted() {
    this.getPresentation();
    this.resetForm();
    // this.qrcodeScan()
  }
};
</script>

<style>
.el-select-dropdown__list {
  background: #fff;
  color: #333;
}
.el-select-dropdown__item {
  color: #333;
  background: #fff;
}
.el-select-dropdown__item.hover {
  background: #f0f0f0;
  color: #151e2f;
}
.el-scrollbar__view {
  width: 100%;
}
.el-scrollbar {
  position: static;
}
.el-picker-panel.presention_dateStyle {
  background-color: #fff;
  color: #333;
}
.presention_dateStyle .el-date-table td.disabled div,
.el-picker-panel.presention_dateStyle .el-month-table td.disabled .cell {
  color: #cfcfcf;
  background-color: #fff;
}
.presention_dateStyle .el-picker-panel__content {
  color: #333;
}
.presention_dateStyle .el-date-table th {
  color: #333;
}
.presention_dateStyle .el-date-picker__header {
  color: #333;
}
.presention_dateStyle .el-date-picker__header-label {
  color: #333;
}
.presention_dateStyle .el-icon-arrow-left:before,
.presention_dateStyle .el-icon-d-arrow-left:before,
.presention_dateStyle .el-icon-arrow-right:before,
.presention_dateStyle .el-icon-d-arrow-right:before {
  color: #333;
}
.el-table {
  /* padding-bottom: 66px; */
}
.el-table:before {
  height: 0;
}
.el-input__inner {
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.el-table::before {
  height: 0;
}
.myCode {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}
#qrcode {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
}
.el-input--prefix .el-input__inner {
  color: #dcdfe6;
  background-color: #fff;
}
.el-input--prefix .el-input__inner {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #333;
}
.Presentation .el-icon-arrow-left:before,
.Presentation .el-icon-d-arrow-left:before,
.Presentation .el-icon-arrow-right:before,
.Presentation .el-icon-d-arrow-right:before {
  color: #555;
}
.presentLoading,
.presentYL {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0;
  top: 0;
}
.presentYL1 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0;
  top: 0;
}
.presentYL {
  /* padding-top: 80px; */
  box-sizing: border-box;
}
.presentYL_con {
  width: 80%;
  margin: 0 auto;
}
.presentYL_btn_con {
  padding-top: 30px;
  width: 190px;
  margin: 0 auto;
}
.presentYL_btn_l {
  float: left;
  margin-bottom: 20px;
}
.presentYL_btn_r {
  float: right;
  margin-bottom: 20px;
}
.presentLoading img {
  display: block;
  width: 100%;
  height: 100%;
}
.Presentation .el-dialog__header {
  border: none;
}
.Presentation .el-pagination {
  position: absolute;
  bottom: 30px;
  text-align: right;
  width: 100%;
}
.Presentation .el-pagination .el-input {
  height: 32px;
}
.Presentation .el-button--mini {
  margin: 0 auto;
  border-radius: 5px;
}
.Presentation .el-table__row {
  font-size: 14px;
}
.el-dialog__header {
  border: 1px solid #c9c9c9;
}
.Presentation {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.P_head {
  width: 100%;
  height: 107px;
  background: url("../../assets/image/report/word_head.png") no-repeat;
  background-size: 100% 100%;
  line-height: 107px;
  padding-left: 52px;
  box-sizing: border-box;
  font-size: 46px;
  color: #fff;
}
.P_con {
  width: 100%;
  flex: 1;
  display: flex;
}
.P_side {
  /* width: 280px; */
  width: 15%;
  height: 100%;
  background-color: #151e2f;
  padding-top: 35px;
  box-sizing: border-box;
}
.P_side_item {
  width: 85%;
  height: 54px;
  border-radius: 26px;
  margin: 0 auto;
  font-size: 24px;
  color: #fff;
  text-align: center;
  line-height: 54px;
  background-color: #30b6ff;
}
.P_container {
  /* flex: 1; */
  width: 85%;
  height: 100%;
  background-color: #f2f2f2;
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.P_title {
  width: 119px;
  height: 53px;
  background-color: #fff;
  text-align: center;
  line-height: 53px;
  font-size: 22px;
  color: #3281b9;
  border-radius: 10px 10px 0px 0px;
}
.P_detail {
  width: 100%;
  flex: 1;
  /* height: 100%; */
  background-color: #fff;
  padding: 29px 25px 0 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.Presentation .el-form-item__label {
  font-size: 16px;
  color: #333;
}
.P_detail_top {
  width: 100%;
  height: 210px;
  background-color: #e7eef4;
  border-radius: 5px;
}
.P_detail_top_btn {
  margin-top: 10px;
}
.P_detail_top_btn .reset {
  /* width: 15px; */
  /* height: 15px; */
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
}
.P_detail_bottom {
  width: 100%;
  margin-top: 28px;
  /* flex: 1; */
  height: calc(100% - 210px);
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.Presentation .el-input {
  width: 200px;
  height: 38px;
}
.Presentation input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #333;
}
.Presentation .el-input__inner {
  /* width: 100%; */
  width: 200px;
  height: 100%;
  color: #333;
}
.Presentation .el-form {
  padding: 15px 0 19px 58px;
  box-sizing: border-box;
}
.Presentation .el-form-item {
  display: inline-block;
  margin-bottom: 29px;
}
.Presentation .el-table {
  color: #333333;
  font-size: 16px;
}
.Presentation .el-table th {
  background-color: #dce3f0;
  color: #333333;
}
.Presentation .cell .el-button {
  margin: 0 auto;
  display: inline-block;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
}
.el-select-dropdown__item {
  width: 100%;
}
.Presentation .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month input{
  color: #000;
}
@media screen and (max-width: 1400px) {
  .P_head {
    width: 100%;
    height: 50px;
    background: url("../../assets/image/report/word_head.png") no-repeat;
    background-size: 100% 100%;
    line-height: 50px;
    padding-left: 52px;
    box-sizing: border-box;
    font-size: 27px;
    color: #fff;
  }
  .P_container {
    /* flex: 1; */
    width: 85%;
    /* height: calc(100% - 200px); */
    overflow-y: auto;
    background-color: #f2f2f2;
    padding: 30px 30px 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .el-table {
    /* padding-bottom: 66px; */
  }
}
</style>
