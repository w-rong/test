<template>
  <div class="gis_content">
    <div class="gis_title">
      GIS资源一张图
      <div class="gis_title_left_word">普陀文旅资源系统服务平台</div>
    </div>
    <div id="my_map_putuo"></div>
    <!-- 左边列表 -->
    <div class="gis_left_list">
      <div class="gis_left_list_title">基础资源概况</div>
      <div class="gis_left_content">
        <div class="gis_left_content_button">
          <button
            :class="nowIndex==index?'btn_active':''"
            type="button"
            v-for="(item, index) in buttonList"
            :key="index"
            @click="chooseLeft(index)"
          >{{item.name}}</button>
        </div>
        <!-- 查询 -->
        <div class="gis_left_check" v-if="nowIndex == 1">
          <div class="gis_left_content_input">
            <input type="text" placeholder="搜索" />
          </div>
          <!-- 列表 -->
          <div class="gis_left_check_result_list">
            <div class="gis_left_check_result">
              <div class="gis_left_check_result_img">
                <img src="../../assets/image/gis/icon/put.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>沈家门渔港小镇景区</p>
                <p>AAAA</p>
                <p>浙江省舟山市普陀区滨港路</p>
              </div>
            </div>
            <div class="gis_left_check_result">
              <div class="gis_left_check_result_img">
                <img src="../../assets/image/gis/icon/put.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>沈家门渔港小镇景区</p>
                <p>AAAA</p>
                <p>浙江省舟山市普陀区滨港路</p>
              </div>
            </div>
            <div class="gis_left_check_result">
              <div class="gis_left_check_result_img">
                <img src="../../assets/image/gis/icon/put.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>沈家门渔港小镇景区</p>
                <p>AAAA</p>
                <p>浙江省舟山市普陀区滨港路</p>
              </div>
            </div>
            <div class="gis_left_check_result">
              <div class="gis_left_check_result_img">
                <img src="../../assets/image/gis/icon/put.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>沈家门渔港小镇景区</p>
                <p>AAAA</p>
                <p>浙江省舟山市普陀区滨港路</p>
              </div>
            </div>
            <div class="gis_left_check_result">
              <div class="gis_left_check_result_img">
                <img src="../../assets/image/gis/icon/put.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>沈家门渔港小镇景区</p>
                <p>AAAA</p>
                <p>浙江省舟山市普陀区滨港路</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 统计 -->
        <div class="gis_left_statis" v-else>
          <ul>
            <li v-for="(item, index) in allClassifyList" :key="index">
              <img src="../../assets/image/gis/icon/scenic_c.png" alt />
              <p>{{item.name}}{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右边列表 -->
    <div class="gis_right_list">
      <div class="gis_right_list_title">基础资源信息</div>
      <div class="gis_right_list_title_select">
        <select v-model="classifyChoose">
          <option
            class="gis_right_list_title_option"
            v-for="(item, index) in allClassifyName"
            :key="index"
            :value="item"
          >{{item}}</option>
        </select>
      </div>
      <div class="gis_right_list_content">
        <div class="gis_right_list_content_list" v-for="(item, index) in classifyDetailList" :key="index">
          <div>{{item.name}}</div>
          <div>{{item.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: "",
      nowIndex: 0,
      allClassify: [],
      allClassifyName: [],
      allClassifyList: [],
      classifyChoose: "景区",
      buttonList: [{ name: "统计" }, { name: "查询" }],
      classifyDetailList:[
        {
          name:"普陀山风景名胜区",
          value:'5A景区'
        },
        {
          name:"沈家门渔港小镇景区",
          value:'5A景区'
        },
        {
          name:"舟山桃花岛风景旅游区",
          value:'5A景区'
        },
        {
          name:"普陀山风景名胜区",
          value:'5A景区'
        },
        {
          name:"沈家门渔港小镇景区",
          value:'5A景区'
        },
        {
          name:"舟山桃花岛风景旅游区",
          value:'5A景区'
        },
        {
          name:"普陀山风景名胜区",
          value:'5A景区'
        },
        {
          name:"沈家门渔港小镇景区",
          value:'5A景区'
        },
        {
          name:"舟山桃花岛风景旅游区",
          value:'5A景区'
        },
        {
          name:"普陀山风景名胜区",
          value:'5A景区'
        },
        {
          name:"沈家门渔港小镇景区",
          value:'5A景区'
        },
        {
          name:"舟山桃花岛风景旅游区",
          value:'5A景区'
        },
        {
          name:"普陀山风景名胜区",
          value:'5A景区'
        },
        {
          name:"沈家门渔港小镇景区",
          value:'5A景区'
        },
        {
          name:"舟山桃花岛风景旅游区",
          value:'5A景区'
        },
      ]
    };
  },
  methods: {
    chooseLeft(index) {
      this.nowIndex = index;
      // this.getAllClassify();
    },
    loadMap() {
      this.map = new T.Map("my_map_putuo");
      this.map.centerAndZoom(new T.LngLat(122.323867, 29.97176), 12);
      this.map.setStyle("black");
      this.map.addEventListener("click", this.MapClick);
    },
    // 获取基础资源数据
    async getAllClassify() {
      let res = await this.$http.get("/base/getAllSourceCount ");
      // console.log(res);
      if (res.data.msg == "success") {
        this.allClassify = res.data.data;
        console.log(Array(this.allClassify));
        this.allClassifyName = Object.keys(this.allClassify);
        Object.keys(this.allClassify).forEach((element, i) => {
          this.allClassifyList.push({
            name: element,
            value: Object.values(this.allClassify)[i],
            imgUrl: "",
            imgUrl_c: ""
          });
        });
        console.log(this.allClassifyList);
        this.allClassifyList.forEach((ele, i) => {
          if (ele.name == "景区") {
            ele.imgUrl = "../../assets/image/gis/icon/scenic.png";
            ele.imgUrl_c = "../../assets/image/gis/icon/scenic_c.png";
          }
        });
        console.log(this.allClassifyList);
      }
    }
  },
  mounted() {
    this.loadMap();
    this.getAllClassify();
  }
};
</script>
<style>
.gis_content {
  width: 100%;
  height: 100%;
  position: relative;
}
#my_map_putuo {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.gis_title {
  width: 100%;
  height: 60px;
  line-height: 52px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(254, 255, 255, 1);
  text-align: center;
  background-image: url("../../assets/image/title.png");
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.gis_title_left_word {
  position: absolute;
  left: 20px;
  top: -8px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(203, 234, 255, 1);
}
/* 左边列表 */
.gis_left_list {
  width: 20%;
  height: 85%;
  position: absolute;
  left: 2%;
  top: 10%;
  z-index: 10;
  background-image: url("../../assets/image/gis/nav_body.png");
  background-size: 100% 100%;
}
.gis_left_list_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-image: url("../../assets/image/gis/nav_title.png");
  background-size: 100% 100%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(203, 234, 255, 1);
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
}
.gis_left_content {
  width: 100%;
  height: 100%;
  /* padding: 10px 15px; */
  box-sizing: border-box;
}
.gis_left_content .gis_left_content_button {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.gis_left_check {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
}
.gis_left_content .gis_left_content_button button {
  width: 40%;
  height: 30px;
  border: none;
  background-image: url("../../assets/image/gis/button_bg.png");
  background-size: 100% 100%;
  background-color: transparent;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 100, 182, 1);
  outline: none;
  cursor: pointer;
}
.gis_left_content .gis_left_content_button button.btn_active {
  color: #0cdad4;
}
.gis_left_content_input {
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
}
.gis_left_content_input input {
  width: 100%;
  height: 25px;
  box-sizing: border-box;
  padding-left: 5%;
  background: rgba(7, 66, 115, 1);
  border: 1px solid rgba(3, 104, 189, 1);
  border-radius: 8px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(208, 228, 249, 1);
}
.gis_left_content_input ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(208, 228, 249, 1);
  font-size: 13px;
}
.gis_left_content_input ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(208, 228, 249, 1);
  font-size: 13px;
}
.gis_left_content_input :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(208, 228, 249, 1);
  font-size: 13px;
}
.gis_left_check_result_list {
  width: 100%;
  height: 85%;
  padding: 10px 15px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.gis_left_check_result_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.gis_left_check_result_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.gis_left_check_result_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.gis_left_check_result {
  width: 100%;
  height: 30%;
  display: flex;
  align-self: center;
  /* border: 1px solid #000; */
}
.gis_left_check_result_img {
  width: 50%;
  height: 100%;
}
.gis_left_check_result_img img {
  width: 100%;
}
.gis_left_check_result_info {
  width: 50%;
  height: 100%;
  /* padding: 5%; */
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
}
.gis_left_check_result_info p {
  padding: 3%;
}
/* 统计 */
.gis_left_statis {
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  overflow: auto;
}
/*滚动条样式*/
.gis_left_statis::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.gis_left_statis::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.gis_left_statis::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.gis_left_statis > ul {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.gis_left_statis > ul > li {
  width: 20%;
  /* margin: 3% 5% 3% 0; */
  margin: 2.5%;
  font-size: 12px;
  color: #bcdbf7;
  text-align: center;
}
.gis_left_statis p {
  width: 100%;
  text-align: center;
}
.gis_left_statis > ul > li img {
  width: 60%;
}
/* 右边列表 */
.gis_right_list {
  width: 20%;
  height: 85%;
  position: absolute;
  right: 2%;
  top: 10%;
  z-index: 10;
  background-image: url("../../assets/image/gis/nav_body.png");
  background-size: 100% 100%;
}
.gis_right_list_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-image: url("../../assets/image/gis/nav_title.png");
  background-size: 100% 100%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(203, 234, 255, 1);
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
}
.gis_right_list_title_select {
  width: 100%;
  border: 1px solid #000;
  padding: 10px 6%;
  box-sizing: border-box;
  position: relative;
}
.gis_right_list_title_select select {
  width: 70%;
  height: 54px;
  padding-left: 10px;
  position: relative;
  /* height: 0;
  padding-bottom: 20%; */
  border: none;
  background-color: transparent;
  background-image: url("../../assets/image/gis/button_bg.png");
  background-size: 100% 100%;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(203, 234, 255, 1);
  outline: none;
  cursor: pointer;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
.gis_right_list_title_select:after {
  content: "";
  width: 14px;
  height: 8px;
  /* background: url("../../assets/image/gis/arrow.png") no-repeat scroll right center transparent; */
  background: url(../../assets/image/gis/arrow.png) no-repeat;
  background-size: 100% 100%;
  /*通过定位将图标放在合适的位置*/
  position: absolute;
  right: 40%;
  top: 37px;
  /* top: 22px; */
  /*给自定义的图标实现点击下来功能*/
  pointer-events: none;
}
option.gis_right_list_title_option {
  -webkit-appearance: none; /* google */
  -moz-appearance: none; /* firefox */
  appearance: none;
  background-color: #022240;
  cursor: pointer;
}
/*滚动条样式*/
.gis_right_list_title_select > select::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.gis_right_list_title_select > select::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.gis_right_list_title_select > select::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.gis_right_list_content{
  width: 100%;
  height: 78%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 6%;
  box-sizing: border-box;
}
/*滚动条样式*/
.gis_right_list_content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.gis_right_list_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.gis_right_list_content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.gis_right_list_content_list{
  width: 100%;
  background-image: url("../../assets/image/gis/list_bg.png");
  background-size: 100% 100%;
  color: #CBEAFF;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  margin: 10px 0;
}
.gis_right_list_content_list>div:nth-of-type(2){
  color: #00D7E9;
}
/* media */
@media (max-width: 1400px) {
  .gis_left_check_result_info {
    width: 50%;
    height: 100%;
    /* padding: 5%; */
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
  }
  .gis_left_statis p {
    font-size: 12px;
  }
  .gis_right_list_title_select select {
    width: 70%;
    height: 34px;
    padding-left: 10px;
    /* height: 0;
  padding-bottom: 20%; */
    border: none;
    background-color: transparent;
    background-image: url("../../assets/image/gis/button_bg.png");
    background-size: 100% 100%;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(203, 234, 255, 1);
    cursor: pointer;
  }
  .gis_right_list_title_select:after {
    content: "";
    width: 14px;
    height: 8px;
    /* background: url("../../assets/image/gis/arrow.png") no-repeat scroll right center transparent; */
    background: url(../../assets/image/gis/arrow.png) no-repeat;
    background-size: 100% 100%;
    /*通过定位将图标放在合适的位置*/
    position: absolute;
    right: 40%;
    /* top: 37px; */
    top: 22px;
    /*给自定义的图标实现点击下来功能*/
    pointer-events: none;
  }
}
</style>