<template>
  <div class="tab3_con">
    <div class="top">
      <div class="left w589">
        <div class="item_box" @click="tab1Click()">
          <img src="../../../assets/image/nav_logo/tab3_1.png" alt />
          <p>嗨普陀</p>
        </div>
      </div>
      <div class="left w589">
        <div class="item_box" @click="tab2Click()">
          <img src="../../../assets/image/nav_logo/tab3_2.png" alt />
          <p>手绘地图</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="item_box" @click="tab3Click()">
        <!--code自定义-->
        <img src="../../../assets/image/nav_logo/tab3_4.png" alt />
        <p>浙里好玩</p>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="qr_code"
      title="请使用微信端扫码"
      width="30%"
      
    >
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
  name: "tab3",
  data() {
    return {
      showTwo: false,
      showOne: true,
      dialogVisible: false
    };
  },
  methods: {
    tab1Click() {
      this.dialogVisible = true;
    },
    tab2Click() {
        window.open("http://daoyou.worldmaipu.com/upload_resource/2017/putuo/index/index.html?from=singlemessage&isappinstalled=0","_blank")
    },
    tab3Click() {
      window.open("https://wap.tourzj.com/", "_blank");
    }
  }
};
</script>

<style>
/* 二维码弹窗 */
.menuCon .qr_code .el-dialog__header {
  background-color: #fff;
  border: none;
}
.menuCon .qr_code .el-dialog__headerbtn .el-dialog__close {
  color: #bbb;
}
.menuCon .qr_code .el-icon-close:before {
  color: #bbb;
}
.menuCon .qr_code .el-dialog__body {
  text-align: center;
}
.tab3_con {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tab3_con .top {
  font-family: Microsoft YaHei;
  width: 100%;
  height: 181px;
  display: flex;
  justify-content: space-between;
}
.tab3_con li {
  list-style: none;
}
.tab3_con .top .w278 {
  width: 283px;
  width: 23%;
  height: 181px;
  background: url("../../../assets/image/nav_logo/tab_278_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab3_con .top .w589 {
  /* width: 283px; */
  width: 49%;
  background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab3_con .top .left {
  float: left;
}
.tab3_con .top .right {
  float: right;
}
.tab3_con .top .center {
  flex: 1;
  margin-right: 24px;
  background: url("../../../assets/image/nav_logo/tab_589_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab3_con .top .w278 .item_box img {
  width: 48%;
  /* height: 70%; */
}
.tab3_con .top .w589 .item_box img {
  width: 22%;
}
.tab3_con .bottom {
  width: 100%;
  height: 181px;
  margin-top: 2%;
  background: url("../../../assets/image/nav_logo/tab_1201_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tab3_con .bottom .item_box img {
  width: 11%;
}
.twoGgfu {
  display: flex;
  padding: 0 10%;
  box-sizing: border-box;
}
.ggfw {
  flex: 1;
}
.tab3_con .top .left:hover,
.tab3_con .top .right:hover,
.tab3_con .bottom:hover {
  transform: scale(1.02);
}
.tab3_con .item_box img {
  /* height: 65.4%; */
  width: 23%;
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  box-sizing: border-box;
}
.tab3_con .item_box .w278 {
  /* width: 118px;
        height: 117px; */
}
.tab3_con .item_box p {
  text-align: center;
  font-family: Microsoft YaHei;
  font-size: 16px;
  color: #333;
  line-height: 30px;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .tab3_con .top {
    font-family: Microsoft YaHei;
    width: 80%;
    margin: 0 auto;
    height: 150px;
    display: flex;
    justify-content: space-between;
  }
  .tab3_con .bottom {
    width: 80%;
    margin: 0 auto;
    height: 150px;
    margin-top: 2%;
    background: url("../../../assets/image/nav_logo/tab_1201_bg.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
