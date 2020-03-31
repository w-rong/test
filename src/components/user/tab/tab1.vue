<template>
  <div class="tab2_con">
    <div class="top">
      <div class="top_item" @click="tab1Click()">
        <img src="../../../assets/image/nav_logo/tab1_1.png" alt />
        <p>全域旅游管理系统</p>
      </div>
      <div class="top_item" @click="tab2Click()">
        <img src="../../../assets/image/nav_logo/tab1_2.png" alt />
        <p>旅游景区资源系统</p>
      </div>
      <div class="top_item" @click="tab3Click()">
        <img src="../../../assets/image/nav_logo/tab1_3.png" alt />
        <p>旅游产业融合管理系统</p>
      </div>
      <div class="top_item nomr" @click="tab4Click()">
        <img src="../../../assets/image/nav_logo/tab1_4.png" alt />
        <p>饭店动态管理系统</p>
      </div>
    </div>
    <div class="bottom">
      <div class="left w278">
        <div class="item_box" @click="tab5Click()">
          <img src="../../../assets/image/nav_logo/tab1_5.png" alt />
          <p>万村景区管理系统</p>
        </div>
      </div>
      <div class="center">
        <div class="item_box" @click="tab6Click()">
          <img src="../../../assets/image/nav_logo/tab1_6.png" alt />
          <p>旅游风情小镇管理系统</p>
        </div>
      </div>
      <div class="right w278">
        <div class="item_box" @click="tab7Click()">
          <img src="../../../assets/image/nav_logo/tab1_7.png" alt />
          <p>民宿管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab2",
  data() {
    return {
      urlLists: [],
      tab1: "",
      tab2: "",
      tab3: "",
      tab4: "",
      tab5: "",
      tab6: "",
      tab7: ""
    };
  },
  methods: {
    async getRole() {
      let res = await this.$http.get(`sso/getAllSystemUrls`);
      // console.log(res.data);
      if (res.data.msg == "success") {
        this.urlLists = res.data.data;
        this.urlLists.forEach((ele, i) => {
          if (ele.systemName == "全域旅游管理") {
            this.tab1 = ele.systemUrl;
          } else if (ele.systemName == "旅游景区资源评估评审系统") {
            this.tab2 = ele.systemUrl;
          } else if (ele.systemName == "旅游产业融合管理") {
            this.tab3 = ele.systemUrl;
          } else if (ele.systemName == "饭店动态管理") {
            this.tab4 = ele.systemUrl;
          } else if (ele.systemName == "万村景区管理") {
            this.tab5 = ele.systemUrl;
          } else if (ele.systemName == "旅游风情小镇管理") {
            this.tab6 = ele.systemUrl;
          } else if (ele.systemName == "民宿管理") {
            this.tab7 = ele.systemUrl;
          }
        });
      }
    },
    async tab1Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab1}`
      );
      console.log(res);
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab2Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab2}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab3Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab3}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab4Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab4}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab5Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab5}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab6Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab6}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    },
    async tab7Click() {
      let res = await this.$http.get(
        `sso/toSystemUrlPage?systemUrl=${this.tab7}`
      );
      if (res.data.msg == "success") {
        window.open(res.data.data.url, "_blank");
      }
    }
  },
  mounted() {
    this.getRole();
  }
};
</script>

<style>
.tab2_con {
  width: 100%;
  height: 100%;
}
.tab2_con li {
  list-style: none;
}
.tab2_con .top {
  width: 100%;
  height: 181px;
  display: flex;
  justify-content: space-between;
}
.tab2_con .top .top_item {
  /* flex: 1; */
  /* margin-right: 23; */
  width: 24%;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.tab2_con .top_item:hover {
  transform: scale(1.02);
}
.tab2_con .bottom .left:hover,
.tab2_con .bottom .center:hover,
.tab2_con .bottom .right:hover {
  transform: scale(1.02);
}
.tab2_con .top .top_item.nomr {
  margin-right: 0;
}
.tab2_con .top .top_item img {
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  width: 50%;
  height: 70%;
}
.tab2_con .top .top_item p {
  text-align: center;
  font-size: 18px;
  color: #333;
  line-height: 30px;
}

.tab2_con .bottom {
  width: 100%;
  height: 181px;
  display: flex;
  margin-top: 26px;
}
.tab2_con .bottom img {
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  width: 50%;
  height: 70%;
}
.tab2_con .bottom p {
  text-align: center;
}
.tab2_con .bottom .w278 {
  width: 283px;
  height: 181px;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab2_con .bottom .left {
  float: left;
}
.tab2_con .bottom .right {
  float: right;
}
.tab2_con .bottom .center {
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
  background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab2_con .bottom .center .item_box img {
  width: 25%;
  /* height: 52%; */
}
.item_box {
  cursor: pointer;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .tab2_con .top {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    justify-content: space-between;
  }
  .tab2_con .top .top_item img {
    display: block;
    margin: 0 auto;
    padding-top: 10px;
    width: 46%;
    height: 70%;
  }
  .tab2_con .bottom {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    margin-top: 26px;
  }
  .tab2_con .bottom .center .item_box img {
    width: 23%;
    /* height: 52%; */
  }
}
</style>
