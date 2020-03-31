<template>
  <div class="tab4_con">
    <div class="tab4_con_t">
      <li class="item haveBj haveMr haveMb tab4_left">
        <div class="item_box" @click="tab1Click()">
          <img src="../../../assets/image/nav_logo/tab4_1.png" alt />
          <p>产业综合监测分析系统</p>
        </div>
      </li>
      <li class="item haveBj tab4_right gis_box">
        <div class="item_box" @click="tab2Click()">
          <img src="../../../assets/image/nav_logo/tab4_2.png" alt />
          <p>文旅资源一张图</p>
        </div>
      </li>
      <li class="item haveBj tab4_right gis_box">
        <div class="item_box" @click="tab5Click()">
          <img src="../../../assets/image/nav_logo/tab4_5.png" alt />
          <p>基础数据采集</p>
        </div>
      </li>
    </div>
    <div class="tab4_bottom">
      <li class="item haveBj haveMr  haveMb haveMb1 tab4_left">
        <div class="item_box" @click="tab3Click()">
          <img src="../../../assets/image/nav_logo/tab4_3.png" alt />
          <p>资源目录管理</p>
        </div>
      </li>
      <li class="item haveBj ">
        <div class="item_box" @click="tab4Click()">
          <img src="../../../assets/image/nav_logo/tab4_4.png" alt />
          <p>用户管理</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab4",
  data() {
    return {};
  },
  methods: {
    tab1Click() {
      const { href } = this.$router.resolve({
        path: "/index"
      });
      window.open(href, "_blank");
    },
    tab2Click() {
      const { href } = this.$router.resolve({
        path: "/GIS"
      });
      window.open(href, "_blank");
    },
    tab5Click() {
      const { href } = this.$router.resolve({
        path: "/basisScenic"
      });
      window.open(href, "_blank");
    },
    tab3Click() {
      const { href } = this.$router.resolve({
        path: "/ResourceDirectory"
      });
      window.open(href, "_blank");
    },
    tab4Click() {
      const { href } = this.$router.resolve({
        path: "/home"
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style>
.tab4_con {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tab4_con .haveBj {
  width: 585px;
  height: 183px;
  background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
  background-size: 100% 100%;
  /* list-style: none;
  margin-left: 0; */
}
.tab4_con .tab4_right {
  width: 585px;
  height: 183px;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
  /* list-style: none; */
  /* margin-left: 0; */
}
.tab4_con li {
  list-style: none;
}
.tab4_con li:hover,
.tab4_con .haveMb:hover {
  transform: scale(1.02);
}
.tab4_con_t {
  width: 100%;
  height: 181px;
  display: flex;
}
.tab4_left {
  width: 49%;
}
.tab4_right {
  width:50%;
  flex: 1;
  margin-left: 2%;
}
.tab4_con li.tab4_right .item_box img{
  /* width:35%; */
  height: 77%;
  width: auto;
  /* padding-top:32px; */
}
.tab4_bottom {
  width: 100%;
  height: 181px;
  display: flex;
  margin-top: 2%;
}
.tab4_con .firstLi {
  width: 100%;
}
.tab4_con li.haveMr {
  margin-right: 21px;
}
.tab4_con li.haveMb {
  margin-bottom: 24px;
}
.tab4_con li p {
  font-size: 18px;
  color: #333;
}
.tab4_con li .item_box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.tab4_con li .item_box img {
  width: 25%;
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  box-sizing: border-box;
}
.tab4_con li .item_box p {
  line-height: 30px;
  font-size: 16px;
  text-align: center;
}
.gis_box{
  width:200px;
  height:200px;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .tab4_con_t {
    /* height: 49%; */
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
  }
  .tab4_bottom {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    /* flex: 1; */
    margin-top: 2%;
    /* margin-top: 24px; */
    /* background: url('../../../assets/image/nav_logo/tab_1201_bg.png') no-repeat;
        background-size: 100% 100%; */
  }
  .tab4_con .haveBj {
    width: 49%;
    height: 100%;
    background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
    background-size: 100% 100%;
    /* list-style: none;
    margin-left: 0; */
  }
    .tab4_con .tab4_right {
    width: 585px;
    height: 147px;
    background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
    background-size: 100% 100%;
    /* list-style: none; */
    /* margin-left: 0; */
  }
  .tab4_con li.tab4_right .item_box img{
    width:auto;
    height:70%;
    padding-top:10px;
  }
  .tab4_con li .item_box img {
    width: 22%;
    /* width: 118px; */
    /* height: 117px; */
    display: block;
    /* margin-left: 82px; */
    margin: 0 auto;
    padding-top: 10px;
    box-sizing: border-box;
    /* width: 100%;
        height: 117px;
        padding-top: 10px; */
  }
  .tab4_right {
    width: 49%;
    margin-left: 2%;
  }
}
</style>
