<template>
  <div class="emergency_index_content">
    <div class="emergency_index_nav_all">
      <nav class="emergency_index_nav">
        <div class="emergency_index_nav_left">
          <div class="emergency_index_nav_choose">
            <img src="../../../../assets/image/yingji/index-c.png" alt />
            <router-link to="/meetIndex">首页</router-link>
          </div>
          <div class="emergency_index_nav_choose">|</div>
          <div class="emergency_index_nav_choose">
            <router-link to="/meetThing">管理</router-link>
          </div>
          <div>智慧旅游应急平台</div>
        </div>
        <div class="emergency_index_nav_right">
          <p>{{nowTime}}</p>
        </div>
      </nav>
    </div>

    <div id="my_map"></div>
    <!-- 左边列表 -->
    <div class="emergency_index_content_left">
      <div class="emergency_index_content_left_content">
        <div class="emergency_index_content_left_search">
          <input type="text" v-model="name" placeholder="搜索景点、设备、设施关键字" />
          <button type="button" @click="findLeft()">搜索</button>
        </div>
        <div class="emergency_index_content_left_list_content">
          <div
            class="emergency_index_content_left_list"
            v-for="(item, index) in meetThingLists"
            :key="index"
          >
            <div class="emergency_index_content_left_list_top">
              <div class="emergency_index_content_left_list_id">
                <img src="../../../../assets/image/yingji/list.png" alt />
                <div>编号：{{item.id}}</div>
              </div>
              <div>时间：{{item.inputTime}}</div>
              <div>名称：{{item.eventName}}</div>
              <div>地点：{{item.occurredSite}}</div>
              <div>详情：{{item.eventContent}}</div>
            </div>

            <div class="emergency_index_content_left_list_bottom">
              <!-- <div>{{item.eventStatus}}</div> -->
              <div class="emergency_index_content_left_list_bottom_status">
                <span></span>
                <span>未处理</span>
              </div>
              <button type="button" @click="nowHandle(item.id)">立即处理</button>
            </div>
          </div>
          <button
            class="emergency_index_content_left_list_btn"
            type="button"
            @click="isMore = true"
          >查看更多</button>
        </div>
      </div>
    </div>
    <!-- 右边列表 -->
    <div class="emergency_index_content_right">
      <div class="emergency_index_content_right_message_icon_all" @click="isMessage = !isMessage">
        <div class="emergency_index_content_right_message_icon">
          <img src="../../../../assets/image/yingji/bell.png" alt />
        </div>
        <div class="emergency_index_content_right_message_point"></div>
      </div>
      <!-- 消息通知 -->
      <div class="emergency_index_content_right_message_list" v-if="isMessage">
        <div class="emergency_index_content_right_message_list_title">
          <div>消息通知</div>
          <span
            class="emergency_index_content_right_message_list_title_close"
            @click="isMessage =false"
          >
            <img src="../../../../assets/image/yingji/close.png" alt />
          </span>
        </div>
        <div class="emergency_index_content_right_message_list_content">
          <div v-for="(item, index) in allMeetThingLists" :key="index">
            <span class="emergency_index_content_right_message_list_content_points"></span>
            【事件】{{item.eventContent}}
          </div>
        </div>
        <button class="emergency_index_content_right_message_list_content_btn">全部消息</button>
      </div>
      <!-- 事件 -->
      <div class="emergency_index_content_right_event" v-else>
        <div class="emergency_index_content_right_event_all">
          <div>
            <div class="emergency_index_content_right_event_info_icon">
              <img src="../../../../assets/image/yingji/info.png" alt />
            </div>
            <div>事件</div>
          </div>
          <div>
            <p>待处理：{{eventNoprocessed}}</p>
            <p>已处理：{{eventProcessed}}</p>
          </div>
        </div>
      </div>
      <!-- 事件列表 -->
      <div
        v-if="isMessage == false&&idLeft!=''&&isHanlle == false"
        class="emergency_index_content_right_event_list_content"
      >
        <div class="emergency_index_content_right_event_list">
          <div class="emergency_index_content_right_event_list_title">
            <div class="emergency_index_content_right_event_list_title_img">
              <img src="../../../../assets/image/yingji/info.png" alt />
            </div>
            <div>事件信息</div>
          </div>
          <div>编号：{{eventList.id}}</div>
          <div>名称：{{eventList.eventName}}</div>
          <div>时间：{{eventList.creatTime}}</div>
          <div>地点：{{eventList.occurredSite}}</div>
          <div>详情：{{eventList.eventContent}}</div>
          <div>流程：{{eventList.eventStatus | eventStatus}}</div>
        </div>
        <div class="emergency_index_content_right_event_list_btn">
          <button type="button" @click="isHanlle = true">立即处置</button>
          <button type="button" @click="isMore = true">查看更多</button>
        </div>
      </div>
      <div
        v-if="isHanlle"
        class="emergency_index_content_right_event_list_content emergency_index_content_right_event_list_content2"
      >
        <div
          class="emergency_index_content_right_event_list emergency_index_content_right_event_list2"
        >
          <div>事件信息：{{eventList.id}}</div>
          <div>时间：{{eventList.creatTime}}</div>
          <div>地点：{{eventList.occurredSite}}</div>
          <div>描述：{{eventList.eventContent}}</div>
        </div>
        <div class="emergency_index_content_right_event_list_btn2">
          <button
            type="button"
            :class="btnIndex == index?'btnActive':''"
            @click="changeBtn(index)"
            v-for="(item, index) in btnList"
            :key="index"
          >{{item.name}}</button>
        </div>
        <div v-if="btnIndex == 0" class="emergency_index_content_right_event_list_btn_content">
          <div>
            <span>
              <span>待处理</span>
            </span>
            <button type="button" @click="btnIndex =1">立即处理</button>
          </div>
        </div>
        <div v-if="btnIndex == 1" class="emergency_index_content_right_event_list_btn_content">
          <button type="button" @click="isPlanHandle=true">预案处理</button>
          <button type="button" @click="isPersonHandle=true">人工处理</button>
          <button type="button">不处理</button>
        </div>
        <div v-if="btnIndex == 2" class="emergency_index_content_right_event_list_btn_content">
          <div v-for="(item, index) in personList" :key="index">{{item.name}}:{{item.phone}}</div>
        </div>
      </div>
    </div>
    <!-- 中间弹出层 -->
    <el-dialog title="全部消息" :visible.sync="isMore" width="50%">
      <div v-if="isMore" class="emergency_index_content_middle">
        <div class="emergency_index_content_middle_title">
          <div class="emergency_index_content_middle_title_left">
            <!-- <div>全部消息</div> -->
            <input type="text" v-model="middleName" placeholder="请输入消息" />
            <button @click="midSearch()">搜索</button>
          </div>
          <!-- <div class="emergency_index_content_middle_title_right" @click="isMore=false">
          <img src="../../../../assets/image/yingji/close.png" alt />
          </div>-->
        </div>
        <div class="emergency_index_content_middle_content">
          <div
            class="emergency_index_content_middle_lists"
            v-for="(item, index) in allMeetThingLists"
            :key="index"
          >
            <div>
              <span>【事件】&emsp; {{item.eventName}}</span>
              &emsp;
              {{item.inputTime}}
            </div>
            <div>
              <div>编号：{{item.id}}&emsp;地点：{{item.occurredSite}}</div>
              <div>事件：{{item.eventContent}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 人工处理 -->
    <el-dialog title="人工处理" :visible.sync="isPersonHandle" width="40%">
      <div class="emergency_index_content_middle_PersonHandle">
        <table>
          <tr class="emergency_index_table_title">
            <td>姓名</td>
            <td>性别</td>
            <td>联系方式</td>
            <td>操作</td>
          </tr>
          <tr>
            <td v-show="personList.length == ''" colspan="4" class="noinfo">没有找到匹配的记录</td>
          </tr>
          <tr v-for="(item, index) in personList" :key="index">
            <td style="width:12%">{{item.name}}</td>
            <td style="width:12%">{{item.sex | sex}}</td>
            <td style="width:10%">{{item.phone}}</td>
            <td style="width:10%;cursor: pointer;color:#495e66" @click="send(item)">
              <i class="el-icon-share"></i>发送发送
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <el-dialog title="设置消息内容" :visible.sync="isSetMsgContent" width="30%">
      <el-form>
        <el-form-item label="短信内容">
          <el-input v-model="smsContent"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSetMsgContent = false">取 消</el-button>
        <el-button type="primary" @click="sendSms()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 人工处理 -->
    <el-dialog title="人工处理" :visible.sync="isPlanHandle" width="50%">
      <div class="emergency_index_content_middle_PersonHandle">
        <table>
          <tr class="emergency_index_table_title">
            <td></td>
                <td>预案名称</td>
                <td>预案级别</td>
                <td>预案类型</td>
                <td>编制时间</td>
                <td>编制单位</td>
          </tr>
          <tr v-if="meetPlanList.length == ''">
            <td colspan="7" class="noinfo">没有找到匹配的记录</td>
          </tr>
          <tr v-for="(item, index) in meetPlanList" :key="index">
                <td style="width:3%">
                  <el-radio v-model="planId" :label="item.id"><br></el-radio>
                </td>
                <td style="width:8%">{{item.planName}}</td>
                <td style="width:8%">{{item.planLevel | levelPlan}}</td>
                <td style="width:12%">{{item.planType | planType}}</td>
                <td style="width:12%">{{item.compileTime}}</td>
                <td style="width:10%">{{item.compileUnit}}</td>
              </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPlanHandle = false">取 消</el-button>
        <el-button type="primary" @click="sendPerson()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowTime: "",
      map: "",
      name: "",
      middleName: "",
      isMessage: false,
      isMore: false,
      isHanlle: false,
      isPlanHandle: false,
      isPersonHandle: false,
      isSetMsgContent: false,
      phone: "",
      idLeft: "",
      smsContent: "",
      meetThingLists: [],
      eventList: "",
      allMeetThingLists: [],
      personList: [],
      meetPlanList:[],
      btnList: [{ name: "进度" }, { name: "处置" }, { name: "通讯录" }],
      btnIndex: 0,
      // 事件已处理未处理
      eventProcessed: 0,
      eventNoprocessed: 0,
      // 选择预案
      planId:"",
    };
  },
  methods: {
    //   获取当前时间
    getNowTime() {
      let myDate = new Date();
      myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      myDate.getDate(); //获取当前日(1-31)
      myDate.getDay();
      let week;
      if (myDate.getDay() == 0) {
        week = "星期日";
      } else if (myDate.getDay() == 1) {
        week = "星期一";
      } else if (myDate.getDay() == 2) {
        week = "星期二";
      } else if (myDate.getDay() == 3) {
        week = "星期三";
      } else if (myDate.getDay() == 4) {
        week = "星期四";
      } else if (myDate.getDay() == 5) {
        week = "星期五";
      } else if (myDate.getDay() == 6) {
        week = "星期六";
      }
      this.nowTime =
        myDate.getFullYear() +
        "-" +
        myDate.getMonth() +
        "-" +
        myDate.getDate() +
        week;
    },
    loadMap() {
      this.map = new T.Map("my_map");
      this.map.centerAndZoom(new T.LngLat(122.323867, 29.97176), 12);
    },
    async getThingLists() {
      //   添加点
      let arrayObj = [];
      let res1 = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=1&pagSize=999&eventName=${this.middleName}`
      );
      console.log(res1);
      if (res1.data.msg == "success") {
        this.allMeetThingLists = res1.data.data.list;
        this.allMeetThingLists.forEach(element => {
          //   console.log(element);
          var marker = new T.Marker(
            new T.LngLat(element.eventLng, element.eventLat)
          );
          marker.id = element.id;
          marker.title = element.eventName;
          arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            console.log(e.target.title);
            var markerInfoWin = new T.InfoWindow(
              "事件编号：" + e.target.id + "<br>事件名称：" + e.target.title
            );
            marker.openInfoWindow(markerInfoWin);
          }); // 将标注添加到地图中
        });
      }

      // console.log(this.meetThingLists);
      var markers = new T.MarkerClusterer(this.map, { markers: arrayObj });
      this.allMeetThingLists.forEach(ele => {
        if (ele.eventStatus == 0) {
          this.eventNoprocessed += 1;
        } else if (ele.eventStatus == 2) {
          this.eventProcessed += 1;
        }
      });
    },
    async getLeftList() {
      let res2 = await this.$http.get(
        `/emer/listEmergencyEvent?pagNumber=1&pagSize=999&eventName=${this.name}`
      );
      if (res2.data.msg == "success") {
        res2.data.data.list.forEach(ele => {
          if (ele.eventStatus == 0) {
            this.meetThingLists.push(ele);
          }
        });
      }
    },
    findLeft() {
      this.meetThingLists = [];
      this.getLeftList();
    },
    midSearch() {
      this.eventNoprocessed = 0;
      this.eventProcessed = 0;
      this.getThingLists();
    },
    // 左边立即处置
    nowHandle(i) {
      this.idLeft = i;
      this.getEventList();
    },
    async getEventList() {
      let res = await this.$http.get(
        `/emer/getEmergencyEvent?id=${this.idLeft}`
      );
      // console.log(res.data.data);
      if (res.data.msg == "success") {
        this.eventList = res.data.data;
      }
    },
    // 获取人员列表
    async getPersonList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPeople?pagNumber=1&pagSize=999`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.personList = res.data.data.list;
      }
    },
    // 获取应急预案列表
    async getMeetPlanList() {
      let res = await this.$http.get(
        `/emer/listEmergencyPlan?pagNumber=1&pagSize=999`
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.meetPlanList = res.data.data.list;
      }
    },
    // 发送短信
    send(i) {
      this.isSetMsgContent = true;
      this.phone = i.phone;
    },
    async sendSms() {
      let res = await this.$http.get(
        `/emer/sendMagSms?content=${this.smsContent}&mobile=${this.phone}`
      );
      console.log(res);
    },
    changeBtn(i) {
      this.btnIndex = i;
      this.getPersonList();
      this.getMeetPlanList();
    },
    // 关联预案
    async sendPerson(){
      console.log(this.idLeft);
      console.log(this.planId);
      let res = await this.$http.post(
        `/emer/updateEmergencyEvent`,
        qs.stringify({
          id: this.idLeft,
          planId2: this.planId
        })
      );
      console.log(res);
    }
  },
  mounted() {
    this.getNowTime();
    this.loadMap();
    this.getThingLists();
    this.getLeftList();
  }
};
</script>
<style>
.emergency_index_content {
  width: 100%;
  height: 100%;
  position: relative;
}
#my_map {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.emergency_index_nav_all {
  width: 100%;
  height: 8%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
.emergency_index_nav {
  width: 100%;
  height: 100%;
  background-color: #5e87b0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2%;
  box-sizing: border-box;
}
.emergency_index_nav_left {
  display: flex;
  align-items: center;
}
.emergency_index_nav_left > div {
  font-size: 24px;
  font-family: SourceHanSansCN;
  color: #fff;
}
.emergency_index_nav_left > div.emergency_index_nav_choose {
  color: #fff;
  padding-right: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.emergency_index_nav_left > div.emergency_index_nav_choose:nth-of-type(1) img {
  width: 25%;
  margin-right: 10%;
}
.emergency_index_nav_left > div.emergency_index_nav_choose:nth-of-type(1) a {
  color: #000;
}
/* 左边框框 */
.emergency_index_content_left {
  width: 20%;
  height: 92%;
  /* height: calc(100% - 50px); */
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
}
.emergency_index_content_left_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.emergency_index_content_left_search {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.emergency_index_content_left_search input {
  width: 65%;
  height: 30px;
  border: 1px solid rgba(153, 153, 153, 1);
  opacity: 0.57;
  border-radius: 5px;
  outline: none;
  padding-left: 5%;
}
.emergency_index_content_left_search button {
  width: 25%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: rgba(64, 158, 255, 1);
  border: none;
  border-radius: 5px;
  text-align: center;
  outline: none;
  cursor: pointer;
}
/* 事件列表 */
.emergency_index_content_left_list_content {
  width: 100%;
  height: 92%;
  overflow-x: hidden;
  overflow-y: scroll;
}
/*滚动条样式*/
.emergency_index_content_left_list_content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.emergency_index_content_left_list_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_left_list_content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.emergency_index_content_left_list {
  width: 100%;
  background: rgba(94, 135, 176, 1);
  /* padding: 10px 10px 20px 10px; */
  border-radius: 10px 10px 10px 10px;
  box-sizing: border-box;
  border: 1px solid rgba(182, 187, 193, 1);
  margin-bottom: 20px;
}
.emergency_index_content_left_list_top {
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 10px 10px;
  margin-bottom: 20px;
}
.emergency_index_content_left_list_top > div {
  margin: 10px 0;
}
.emergency_index_content_left_list_top
  > div.emergency_index_content_left_list_id {
  height: 36px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.emergency_index_content_left_list_top
  > div.emergency_index_content_left_list_id
  img {
  width: 30px;
  margin-right: 5%;
}
.emergency_index_content_left_list_bottom {
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
}
.emergency_index_content_left_list_bottom_status > span {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(3, 193, 119, 1);
}
.emergency_index_content_left_list_bottom_status > span:nth-of-type(1) {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 10px;
  background: rgba(71, 188, 162, 1);
  border-radius: 50%;
}
.emergency_index_content_left_list_bottom button {
  width: 50%;
  height: 34px;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  border: none;
  margin-left: 10%;
  color: #fff;
  outline: none;
  cursor: pointer;
}
.emergency_index_content_left_list_btn {
  width: 100%;
  height: 8%;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
}
/* 右边框框 */
.emergency_index_content_right {
  width: 20%;
  height: calc(100% - 50px);
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
}
.emergency_index_content_right_message_icon_all {
  width: 12%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 12%; /* 让div的高等于宽 */
  background: rgba(94, 135, 176, 1);
  border-radius: 5px;
  position: absolute;
  right: 8%;
  top: 10%;
  cursor: pointer;
}
.emergency_index_content_right_message_icon {
  /* display: flex; */
  text-align: center;
}
.emergency_index_content_right_message_icon img {
  width: 60%;
  margin-top: 10%;
}
.emergency_index_content_right_message_point {
  width: 20%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 20%;
  background-color: red;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
}
.emergency_index_content_right_message_list_title {
  position: relative;
  padding: 10px;
  background: rgba(94, 135, 176, 1);
  border-radius: 5px 5px 0px 0px;
}
.emergency_index_content_right_message_list_title > div {
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: SourceHanSansCN;
}
.emergency_index_content_right_message_list_title
  .emergency_index_content_right_message_list_title_close {
  position: absolute;
  right: 5%;
  top: 10px;
  cursor: pointer;
  width: 8%;
}
.emergency_index_content_right_message_list_title_close img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_message_list {
  width: 60%;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 5px;
  position: absolute;
  right: 25%;
  top: 10%;
}
.emergency_index_content_right_message_list_content {
  width: 100%;
}
.emergency_index_content_right_message_list_content > div {
  width: 100%;
  padding-left: 5%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 8% 0;
  color: #333;
  font-size: 14px;
  font-family: SourceHanSansCN;
}
.emergency_index_content_right_message_list_content > div > span {
  display: inline-block;
  width: 4%;
  height: 0; /*设置高为0，让padding撑起高*/
  padding-bottom: 4%;
  background-color: red;
  border-radius: 50%;
}
.emergency_index_content_right_message_list_content_btn {
  display: block;
  border: none;
  outline: none;
  color: #fff;
  width: 60%;
  margin: 10% auto;
  height: 0;
  padding-bottom: 15%;
  padding-top: 4%;
  background: rgba(64, 158, 255, 1);
  border-radius: 5px;
  cursor: pointer;
}
.emergency_index_content_right_event_all {
  display: flex;
  width: 60%;
  height: 10%;
  position: absolute;
  left: 10%;
  top: 10%;
  background: rgba(94, 135, 176, 1);
  border-radius: 5px;
  border: 1px solid rgba(199, 199, 199, 1);
}
.emergency_index_content_right_event_all > div:nth-of-type(1) {
  width: 50%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_info_icon {
  width: 25%;
  margin-left: 20%;
  margin-right: 5%;
}
.emergency_index_content_right_event_info_icon img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) {
  width: 50%;
  height: 100%;
  background-color: #fff;
  font-size: 13px;
  border-radius: 0px 5px 5px 0px;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) p {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.emergency_index_content_right_event_all > div:nth-of-type(2) p:hover {
  text-decoration: underline;
}
/* 事件列表 */
.emergency_index_content_right_event_list_content {
  width: 80%;
  position: absolute;
  top: 25%;
  left: calc((100% - 80%) / 2);
}
.emergency_index_content_right_event_list_content2 {
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px;
}
.emergency_index_content_right_event_list {
  width: 100%;
  background-color: #5e87b0;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px;
  padding: 5%;
  box-sizing: border-box;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_list2 {
  width: 100%;
  background-color: #5e87b0;
  border: 1px solid rgba(182, 187, 193, 1);
  border-radius: 10px 10px 0 0;
  padding: 5%;
  box-sizing: border-box;
  color: #fff;
  font-size: 13px;
}
.emergency_index_content_right_event_list > div {
  margin: 5% 0;
}
.emergency_index_content_right_event_list_title {
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-bottom: 5%;
}
.emergency_index_content_right_event_list_title_img {
  width: 15%;
  margin-right: 8%;
}
.emergency_index_content_right_event_list_title_img img {
  width: 100%;
  height: 100%;
}
.emergency_index_content_right_event_list_btn {
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
}
.emergency_index_content_right_event_list_btn button {
  width: 40%;
  padding: 4% 0;
  border: none;
  outline: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn button:nth-of-type(1) {
  color: #666;
  background-color: #fff;
  border: 1px solid rgba(182, 187, 193, 1);
}
.emergency_index_content_right_event_list_btn button:nth-of-type(2) {
  background: rgba(64, 158, 255, 1);
}
/* 三个按钮 */
.emergency_index_content_right_event_list_btn2 {
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
  padding: 0 5%;
}
.emergency_index_content_right_event_list_btn2 > button {
  width: 30%;
  padding: 2% 0;
  outline: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  color: #666;
  background-color: #fff;
  border: 1px solid rgba(182, 187, 193, 1);
}
.emergency_index_content_right_event_list_btn2 > button.btnActive {
  background: rgba(64, 158, 255, 1);
  border: none;
  color: #fff;
}
.emergency_index_content_right_event_list_btn_content {
  margin: 10% 0;
  padding: 0 5%;
}
.emergency_index_content_right_event_list_btn_content > div {
  margin: 5% 0;
  display: flex;
  align-items: center;
}
.emergency_index_content_right_event_list_btn_content > div > span {
  width: 30%;
  /* text-align: center; */
  height: 0;
  font-size: 13px;
  padding-bottom: 30%;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(64, 158, 255, 1);
  border-radius: 50%;
  color: rgba(64, 158, 255, 1);
  margin-right: 10%;
}
.emergency_index_content_right_event_list_btn_content > div > span > span {
  height: 17px;
  padding-top: 22px;
}
.emergency_index_content_right_event_list_btn_content > div > button {
  background: rgba(64, 158, 255, 1);
  color: #fff;
  border: none;
  outline: none;
  padding: 3% 10%;
  border-radius: 5px;
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn_content > button {
  display: block;
  width: 60%;
  margin: 10% auto;
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 3% 0;
  cursor: pointer;
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(1) {
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(2) {
  background: #cbcbcb;
}
.emergency_index_content_right_event_list_btn_content > button:nth-of-type(3) {
  background: #a1a1a1;
}
/* 中间弹出框 */
.emergency_index_content_middle_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
.emergency_index_content_middle {
  /* width: 50%;
  height: 80%;
  position: absolute;
  left: calc((100% - 50%) / 2);
  top: calc((100% - 80%) / 2);
  z-index: 50;
  background-color: #f4f2f0; */
}
.emergency_index_content_middle_title {
  width: 100%;
  /* height: 12%; */
  height: 30px;
  /* padding: 2% 5%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.emergency_index_content_middle_title_right {
  width: 2%;
  cursor: pointer;
}
.emergency_index_content_middle_title_right img {
  width: 100%;
  cursor: pointer;
}
.emergency_index_content_middle_title_left {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
}
.emergency_index_content_middle_title_left div {
  margin-right: 5%;
}
.emergency_index_content_middle_title_left input {
  width: 60%;
  height: 100%;
  padding-left: 2%;
  margin-right: 3%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
.emergency_index_content_middle_title_left button {
  width: 15%;
  height: 100%;
  border: none;
  color: #fff;
  background-color: #409efc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.emergency_index_content_middle_content {
  width: 100%;
  height: 88%;
  /* border: 1px solid #000; */
  overflow-x: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.emergency_index_content_middle_content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  /* margin-left: 10px; */
}
.emergency_index_content_middle_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(64, 158, 255, 1);
}
.emergency_index_content_middle_content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.emergency_index_content_middle_lists {
  width: 100%;
  margin: 2% auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2%;
}
.emergency_index_content_middle_lists > div:nth-of-type(1) {
  margin-bottom: 4%;
}
.emergency_index_content_middle_lists > div:nth-of-type(2) {
  display: flex;
  font-size: 15px;
}
.emergency_index_content_middle_lists > div > span {
  font-weight: bold;
}
.emergency_index_content_middle_lists > div > div {
  width: 50%;
}
/* 人工处理 */
.emergency_index_content_middle_PersonHandle table {
  width: 100%;
  border-collapse: collapse;
}
.emergency_index_content_middle_PersonHandle table tr {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
.emergency_index_content_middle_PersonHandle table tr td {
  text-align: center;
  border: 1px solid #ccc;
}
.emergency_index_table_title {
  background-color: #495e66;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
</style>