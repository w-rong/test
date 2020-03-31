<template>
  <div class="tab2_con">
    <div class="top">
      <div class="top_item" @click="tab1Click()">
        <img src="../../../assets/image/nav_logo/tab2_1.png" alt />
        <p>旅游饭店运行监测系统</p>
      </div>
      <div class="top_item" @click="tab2Click()">
        <img src="../../../assets/image/nav_logo/tab2_2.png" alt />
        <p>口碑监测系统</p>
      </div>
      <div class="top_item" @click="tab3Click()">
        <img src="../../../assets/image/nav_logo/tab2_3.png" alt />
        <p>大数据分析报告系统</p>
      </div>
      <div class="top_item nomr" @click="tab4Click()">
        <img src="../../../assets/image/nav_logo/tab2_4.png" alt />
        <p>移动决策分析系统</p>
      </div>
    </div>
    <div class="bottom">
      <div class="left w278">
        <!-- 改成事实监控-->
        <div class="item_box" @click="tab5Click()">
          <img src="../../../assets/image/nav_logo/tab2_5.png" alt />
          <p>文旅视频监测系统</p>
        </div>
      </div>
      <div class="center">
        <div class="item_box" @click="tab6Click()">
          <img src="../../../assets/image/nav_logo/tab2_6.png" alt />
          <p>文旅项目管理系统</p>
        </div>
      </div>
      <div class="right w278">
        <div class="item_box" @click="tab7Click()">
          <img src="../../../assets/image/nav_logo/tab2_7.png" alt />
          <p>应急管理系统</p>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" custom-class="qr_code" title="请使用微信端扫码" width="30%">
      <span>
        <img src="../../../assets/image/nav_logo/qr.jpg" alt />
      </span>
      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tab2",
  data() {
    return {
      dialogVisible: false,
      tab1: ""
    };
  },
  methods: {
    async getRole() {
      let res = await this.$http.get(`sso/getAllSystemUrls`);
      // console.log(res.data);
      if (res.data.msg == "success") {
        this.urlLists = res.data.data;
        this.urlLists.forEach((ele, i) => {
          if (ele.systemName == "项目") {
            this.tab1 = ele.systemUrl;
          }
        });
      }
    },
    tab1Click() {
      const { href } = this.$router.resolve({
        path: "/hotel"
      });
      window.open(href, "_blank");
    },
    tab2Click() {
      const { href } = this.$router.resolve({
        path: "/wordMouth"
      });
      window.open(href, "_blank");
    },
    tab3Click() {
      const { href } = this.$router.resolve({
        path: "/reportAccount"
      });
      window.open(href, "_blank");
    },
    tab4Click() {
      this.dialogVisible = true;
    },
    tab5Click() {
      const { href } = this.$router.resolve({
        path: "/monitoring"
      });
      window.open(href, "_blank");
    },
    async tab6Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab1}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    tab7Click() {
      const { href } = this.$router.resolve({
        path: "/meetIndex"
      });
      window.open(href, "_blank");
    }
  },
  mounted() {
    this.getRole();
  },
};
</script>

<style>
.tab2_con {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tab2_con .top {
  width: 100%;
  height: 181px;
  display: flex;
}
.tab2_con li {
  list-style: none;
}
.tab2_con .top .top_item {
  flex: 1;
  margin-right: 23;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 2%;
}
.tab2_con .top .top_item.nomr {
  margin-right: 0;
}
.tab2_con .top .top_item img {
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  box-sizing: border-box;
}
.tab2_con .top .top_item p {
  text-align: center;
  font-family: Microsoft YaHei;
  font-size: 16px;
  color: #333;
  line-height: 30px;
}

.tab2_con .bottom {
  width: 100%;
  height: 181px;
  display: flex;
}
.tab2_con .bottom img {
  display: block;
  margin: 0 auto;
}
.tab2_con .bottom p {
  text-align: center;
  font-family: Microsoft YaHei;
  font-size: 16px;
}
.tab2_con .bottom .w278 {
  height: 100%;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab2_con .bottom .left {
  width: 22.8%;
  float: left;
}
.tab2_con .bottom .right {
  width: 22.8%;
  float: right;
}
.tab2_con .bottom .center {
  flex: 1;
  margin-left: 2%;
  margin-right: 2%;
  background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
  background-size: 100% 100%;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .tab2_con .top {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    justify-content: space-between;
  }
  .tab2_con .bottom {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    margin-top: 26px;
  }
}
</style>
