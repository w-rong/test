<template>
  <div class="report_content">
    <div class="report_title">
      <h2>普陀文旅大数据报告</h2>
      <!-- <h2>2019年11月海盐县文旅大数据报告</h2> -->
    </div>
    <div class="report_content_all">
      <!-- 文旅资源概况 -->
      <div class="report_resources">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>文旅资源概况</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          截止到统计时间，普陀文旅资源统计共收录
          <span v-for="(item, index) in resourceList" :key="index">
            <span>
              {{item.name}}
              <span class="import_account">{{item.value}}</span>家,
            </span>
          </span>
        </div>
      </div>
      <!-- 景区客流量 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>景区客流量</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          普陀最热门的旅游景区是{{hotelScenicName}}景区，接待游客
          <span
            class="import_account"
          >{{hotelScenic}}</span>
          人次,
          其次是{{hotelScenic2Name}},接待游客
          <span
            class="import_account"
          >{{hotelScenic2}}</span>人次。
        </div>
        <div class="report_resources_table">
          <div ref="scenicTable"></div>
        </div>
      </div>
      <!-- 省内热门客源地 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>省内热门客源地</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          省内游客来源地排名前三的是：
          <span>
            <span>
              <span class="import_account">{{ProInTop3[0]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{ProInTop3[1]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{ProInTop3[2]}}</span>
            </span>
          </span>
          <span></span>。
        </div>
        <div class="report_resources_table">
          <div ref="provinceInTable"></div>
        </div>
      </div>
      <!-- 省外热门客源地 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>省外热门客源地</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          省外游客来源地排名前三的是：
          <span>
            <span>
              <span class="import_account">{{ProOutTop3[0]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{ProOutTop3[1]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{ProOutTop3[2]}}</span>
            </span>
          </span>
          <span></span>。
        </div>
        <div class="report_resources_table">
          <div ref="provinceOutTable"></div>
        </div>
      </div>
      <!-- 城市客流量排行 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>城市客流量排行</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          城市游客来源地排名前三的是：
          <span>
            <span>
              <span class="import_account">{{cityTop3[0]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{cityTop3[1]}}</span>
            </span>
          </span>,
          <span>
            <span>
              <span class="import_account">{{cityTop3[2]}}</span>
            </span>
          </span>
          <span></span>
          。
        </div>
        <div class="report_resources_table">
          <div ref="city_table"></div>
        </div>
      </div>

      <!-- 省内外游客占比 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>省内外游客占比</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          <span >
            省外游客的占比是：
            <span>
              <span class="import_account">{{proOutdataNum}}%</span>
            </span>
          </span>
          <span >
            省内游客的占比是：
            <span>
              <span class="import_account">{{proIndataNum}}%</span>
            </span>
          </span>
          。
        </div>
        <div class="report_resources_table">
          <div ref="proInOut_table"></div>
        </div>
      </div>
      <!-- 境外游客来源地top5 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>境外游客来源地Top5</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          <span >
            境外游客来源中{{chinaOutText1}}
            <span>
              <span class="import_account">{{chinaOutNum1}}人次</span>
            </span>
            其次是{{chinaOutText2}}
            <span>
              <span class="import_account">{{chinaOutNum2}}人次</span>
            </span>
          </span>
          。
        </div>
        <div class="report_resources_table">
          <div ref="chinaOut_table"></div>
        </div>
      </div>
      <!-- 省外游客来源地top5 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>省外游客来源地Top5</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          <span >
            省外游客来源中{{proOutTop5text1}}
            <span>
              <span class="import_account">{{proOutTop5Num1}}人次</span>
            </span>
            其次是{{proOutTop5text2}}
            <span>
              <span class="import_account">{{proOutTop5Num2}}人次</span>
            </span>
          </span>
          。
        </div>
        <div class="report_resources_table">
          <div ref="proOutTop5_table"></div>
        </div>
      </div>
      <!-- 内外宾 -->
       <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>内外宾客流量</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
            内外宾客流来源中{{inPeople}}
          <span >
            <span>
              <span class="import_account">{{inPeopleNum}}人次</span>
            </span>,
            {{OutPeople}}
            <span>
              <span class="import_account">{{OutPeopleNum}}人次</span>
            </span>
          </span>
          。
        </div>
      </div>

      <!-- 车流量统计 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>车流量统计</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          总车流量
          <span class="import_account">22323</span>辆，其中兴普大道A 153辆占比23% ;
          兴普大道B
          <span class="import_account">3432</span>辆占比
          <span class="import_account">32</span>%；
          兴普大道C
          <span class="import_account">3332</span>辆占比
          <span class="import_account">12</span>%
          其中自驾游车辆
          <span class="import_account">3432</span>辆，占总百分比
          <span class="import_account">32</span>
          %。
        </div>
        <div class="report_resources_table">
          <div ref="carTotal_echart"></div>
        </div>
        <!-- 城市车流量占比 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">城市车流量占比排行</div>
            <div class="PC_title_line"></div>
          </div>
          <div class="report_resources_table">
            <div ref="carZhanbi_echart"></div>
          </div>
        </div>
      </div>
      <!-- 游客基础画像(极光) -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>游客基础画像</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          线下消费者游客画像中，男性消费占总游客的
          <span>
            <span>
              <span class="import_account">{{male}}%</span>
            </span>
          </span>
          ，女性消费占总游客的
          <span>
            <span>
              <span class="import_account">{{female}}%</span>.
            </span>
          </span>
        </div>
        <div class="report_resources_table" style="height:360px">
          <div class="tourist_person" style="height:200px">
            <div class="tourist_person_left">
              <div>
                <div class="man" style="margin-top:20px">
                  <img src="../assets/image/report/N_nan.png" alt />
                  <div class="man_all">
                    <div class="man_title">男性游客</div>
                    <div class="man_value">{{male}}%</div>
                  </div>
                </div>
                <div class="man" style="margin-top:20px">
                  <img src="../assets/image/report/N_nv.png" alt />
                  <div class="man_all">
                    <div class="man_title">女性游客</div>
                    <div class="man_value">{{female}}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tourist_person_right" ref="tourist_table"></div>
          </div>
          <div class="tourist_person_bottom" style="height:150px" ref="tourist_table_married"></div>
        </div>
        <!-- 子女阶段分布 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">子女阶段分布</div>
            <div class="PC_title_line"></div>
          </div>
          <div class="report_resources_table">
            <div ref="childZb_Ec"></div>
          </div>
        </div>
        <!-- 游玩时长 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">游玩时长</div>
            <div class="PC_title_line"></div>
          </div>
          <div class="report_resources_table">
            <div ref="play_Ec"></div>
          </div>
        </div>
      </div>
      <!-- 消费游客画像 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>消费游客画像</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          线下消费者游客画像中，男性消费占总游客的
          <span>
            <span>
              <span class="import_account">{{maleXF}}%</span>
            </span>
          </span>
          ，女性消费占总游客的
          <span>
            <span>
              <span class="import_account">{{femaleXF}}%</span>.
            </span>
          </span>
        </div>
        <div class="report_resources_table" style="height:360px">
          <div class="tourist_person" style="height:200px">
            <div class="tourist_person_left">
              <div>
                <div class="man" style="margin-top:20px">
                  <img src="../assets/image/report/N_nan.png" alt />
                  <div class="man_all">
                    <div class="man_title">男性游客</div>
                    <div class="man_value">{{maleXF}}%</div>
                  </div>
                </div>
                <div class="man" style="margin-top:20px">
                  <img src="../assets/image/report/N_nv.png" alt />
                  <div class="man_all">
                    <div class="man_title">女性游客</div>
                    <div class="man_value">{{femaleXF}}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tourist_person_right" ref="huaxiangXF"></div>
          </div>
          <div class="tourist_person_bottom" style="height:150px" ref="xf_age"></div>
        </div>
        <!-- 游客常住地占比 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">游客常住地占比</div>
            <div class="PC_title_line"></div>
          </div>
          <div class="report_resources_table changzhu">
            <div class="S_tit">
              <div class="S_echarts_title">
                <li
                  :class="{active:index===cityIndex1}"
                  v-for="(item,index) in cityTab"
                  :key="index"
                  @click.stop="toggleCityTab1(index)"
                >
                  <div>{{item}}</div>
                </li>
              </div>
            </div>
            <div ref="cityEchart"></div>
          </div>
        </div>
      </div>
      <!-- 游客消费情况 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>游客消费情况</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          旅游总消费<span class="import_account">{{countTotal}}</span>元        
            人均消费<span class="import_account">{{avgXF}}</span>元
        </div>
        <div class="report_resources_table" style="height:400px">
          <div ref="touristXF_EC"></div>
        </div>
        <!-- 景点消费分析 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">景点消费分析</div>
            <div class="PC_title_line"></div>
          </div>
          <div style="margin:20px 0;">
            景点人均消费<span class="import_account">{{scenicAvg}}</span>元        
          </div>
          <div class="report_resources_table">
            <div ref="scenic_echart"></div>
          </div>
        </div>
        <!-- 餐饮消费分析 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">餐饮消费分析</div>
            <div class="PC_title_line"></div>
          </div>
          <div style="margin:20px 0;">
            餐饮人均消费<span class="import_account">{{dishAvg}}</span>元      
          </div>
          <div class="report_resources_table">
            <div ref="food_echart"></div>
          </div>
        </div>
        <!-- 酒店消费分析 -->
        <div class="PC_city_zhanbi">
          <div class="PC_title">
            <div class="PC_title_txt">酒店消费分析</div>
            <div class="PC_title_line"></div>
          </div>
          <div style="margin:20px 0;">
            酒店人均消费<span class="import_account">{{hotelAvg}}</span>元
          </div>
          <div class="report_resources_table">
            <div ref="hotel_echart"></div>
          </div>
        </div>
      </div>
      <!-- 综合网评分析 -->
      <div class="report_resources report_resources_margin">
        <div class="report_content_title">
          <img src="../assets/image/report/pc_title_left.png" alt />
          <span>综合网评分析</span>
          <img src="../assets/image/report/pc_title_right.png" alt />
        </div>
        <div class="report_resources_content">
          区域内累计评价
          <span class="import_account">{{comentTotal}}</span>条，
          新增评论数
          <span class="import_account">{{newNumber}}</span>条，
          累计好评率
          <span class="import_account">{{goodNumber}}</span>%；
        </div>
        <div class="report_resources_table" style="height:400px">
          <div ref="netWork_echart"></div>
        </div>
      </div>
    </div>

    <!-- <div class="right_slider">
      <div class="download" @click="downLoad">
        <img src="../assets/images/pc_download.png" alt />
      </div>
      <div class="download return_top" @click="returnTop">
        <img src="../assets/images/return_top.png" alt />
      </div>
    </div>-->
  </div>
</template>
<script>
import qs from "qs";

export default {
  props: ["ReportName", "ReportTheme", "valueData"],
  data() {
    return {
      year: "",
      reportAdd: [],
      // startTime: this.$moment(new Date()).format("YYYY"),
      //   endTime: "2019-12-30",
      allAccount: "",
      // 高速出
      scenic_table: "",
      provinceIn_table: "",
      provinceOut_table: "",
      age_table: "",
      tourist_table: "",
      provinceIn: [],
      provinceOut: [],
      inBayonet: [],
      outBayonet: [],
      catering: [],
      hotel: [],
      tourist: [],
      touristPic: [],
      //////////////
      carTotalEc: null,
      childFbEc: null,
      plsyEc: null,
      xf_ageEc: null,
      age_tableXF: null,
      toustXFEc: null,
      netEc: null,
      city_ec: null,
      proInOutEc: null,
      // reportSubject: "春节",
      resourceList: [],
      totalTourist: 0, //总接待游客
      ptTourist: 0, //普陀山待游客
      scenicName: [],
      scenicData: [],
      provieList: [],
      ProInName: [],
      ProInData: [],
      ProInTop3: [],
      provieOutList: [],
      ProOutTop3: [],
      ProOutName: [],
      ProOutData: [], //省外
      cityTop3: [],
      cityTotalName: [],
      cityTotalData: [], //城市客流量
      carName: ["兴普大道A", "兴普大道B", "兴普大道C"],
      carDate: [
        {
            name: '兴普大道A',
            value: 25
        },
        {
            name: '兴普大道B',
            value: 28
        },
        {
            name: '兴普大道C',
            value: 32
        }
      ], //
      carZBname: ['杭州', '嘉兴', '南京'],
      carZBdata: [25,35,55], /////
      // 极光游客画像start
      ageName: [],
      ageData: [],
      marriedData: 0,
      childData: 0,
      expertData: 0,
      countData: 0,
      female: 0,
      male: 0,
      ageDistriData: [],
      ageDistriName: [],
      // 极光游客画像end
      marriedDataXF: 0,
      femaleXF: 0,
      maleXF: 0,

      playName: [],
      playData: [],
      XFtouristName: [],
      XFtouriseData: [],
      cityIndex1: 0,
      cityTab: [],
      CZproName: [],
      CZproData: [],
      CZcityName: [],
      CZcityData: [],
      touXF1: [],
      touXF2: [],
      touXF3: [],
      touXFName: [],
      scenicXFName: [],
      scenicXFData: [], //景区消费
      foodXFName: [],
      foodXFData: [],
      hotelXFName: [],
      hotelXFData: [],
      netName: [],
      netData: [],
      comentTotal: 0,
      newNumber: 0,
      goodNumber: 0,
      hotelScenic: 0,  //热门景区
      hotelScenicName: '',
      hotelScenic2: 0,  //其次景区
      hotelScenic2Name: '',
      // 文旅饭店
      proInOutName: [],
      proInOutData: [],
      chinaOutName: [],
      chinaOutData: [],
      chinaOutText1: '',
      chinaOutNum1: '',
      chinaOutText2: '',
      chinaOutNum2: '',
      proOutTop5Name: [],
      proOutTop5Data: [],
      proOutTop5text1: '',
      proOutTop5text2: '',
      proOutTop5Num1: '',
      proOutTop5Num2: '',
      inPeople: '',
      OutPeople: '',
      inPeopleNum: '',
      OutPeopleNum: '',
      proOutdataNum: 0,
      proIndataNum: 0,
      
      countTotal: 0,
      avgXF: 0,
      scenicAvg: 0,
      dishAvg: 0,
      hotelAvg: 0, //酒店消费
    };
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (value) {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
    bracket(value) {
      if (value.indexOf("（") != -1) {
        let num = value.indexOf("（");
        return value.substr(0, num);
      } else {
        return value;
      }
    },
    splitNumBefore(value) {
      let num = value.indexOf(":");
      if (value.indexOf(":") != -1) {
        let b = value.substring(2, num - 1);
        return b;
      }
    },
    splitNumAfter(value) {
      let num = value.indexOf(":");
      if (value.indexOf(":") != -1) {
        let c = value.substring(num + 2, value.length - 2) * 1;
        return c.toFixed(2);
      }
    }
  },
  methods: {
    async getSpringData() {
      var res = await this.$http.post(
        `/report/getBigDataReportDetail`,
        qs.stringify({
          queryDate: this.valueData,
          reportSubject: this.ReportTheme
        })
      );
      console.log(res);
      let { data, code } = res.data;
      this.resourceList = [];
      this.totalTourist = 0;
      this.scenicName = [];
      this.scenicData = [];
      this.CZproName = [];
      this.CZproData = [];
      this.CZcityName = [];
      this.CZcityData = [];
      this.netName = [];
      this.netData = [];
      this.cityTotalName = [];
      this.cityTotalData = [];
      this.cityTop3 = [];
      this.ProOutName = [];
      this.ProOutData = [];
      this.ProOutTop3 = [];
      this.ProInName = [];
      this.ProInData = [];
      this.ProInTop3 = [];
      this.ageName = [];
      this.ageData = [];
      this.XFtouristName = [];
      this.XFtouriseData = [];
      this.ageDistriName = [];
      this.ageDistriData = [];
      this.foodXFName = [];
      this.foodXFData = [];
      this.touXF1 = [];
      this.touXF2 = [];
      this.touXF3 = [];
      this.touXFName = [];

      this.proInOutName = []
      this.proInOutData = []
      this.chinaOutName = []
      this.chinaOutData = []
      this.proOutTop5Name = []
      this.proOutTop5Data = []

      for (var key in data) {
        // 资源统计
        if (key == "placeNums") {
          for (var key1 in data[key]) {
            this.resourceList.push({ name: key1, value: data[key][key1] });
          }
        }
        // 景区客流量
        if (key == "scenicPassenger") {
          if (data[key].length != 0) {
            var result = [];
            var sortData = data[key].sort(compare("passengerNum", true));

            sortData.forEach(item => {
              this.totalTourist += Number(item.passengerNum);
              this.hotelScenic = sortData[sortData.length-1].passengerNum
              this.hotelScenic2 = sortData[sortData.length-2].passengerNum
              this.hotelScenicName = sortData[sortData.length-1].scenicName
              this.hotelScenic2Name = sortData[sortData.length-2].scenicName
              this.scenicName.push(item.scenicName);
              this.scenicData.push(item.passengerNum);
            });
          }
        }
        // 客流量
        if (key == "areaPassenger") {
          for (var key1 in data[key]) {
            if (key1 == "cityPass") {
              //城市客流量
              if (data[key][key1].length != 0) {
                var sortData = data[key][key1]
                  .sort(compare("passengerCount"), false)
                  .slice(0, 8);
                var Top3 = sortData.slice(0, 3);
                Top3.forEach(item => {
                  this.cityTop3.push(item.cityName);
                });
                sortData.forEach(item => {
                  this.cityTotalName.push(item.cityName);
                  this.cityTotalData.push(item.passengerCount);
                });
              }
            }
            if (key1 == "proInnerCity") {
              //省内客流量
              if (data[key][key1].length != 0) {
                var sortData1 = data[key][key1]
                  .sort(compare("passengerCount"), false)
                  .slice(0, 8);
                var Top3 = sortData1.slice(0, 3);
                Top3.forEach(item => {
                  this.ProInTop3.push(item.cityName);
                });
                sortData1.forEach(item => {
                  this.ProInName.push(item.cityName);
                  this.ProInData.push(item.passengerCount);
                });
              }
            }
            if (key1 == "proPass") {
              //省外客流量
              if (data[key][key1].length != 0) {
                var sortData2 = data[key][key1]
                  .sort(compare("passengerCount"), false)
                  .slice(0, 8);
                var Top3 = sortData2.slice(0, 3);
                Top3.forEach(item => {
                  this.ProOutTop3.push(item.provinceName);
                });
                sortData2.forEach(item => {
                  this.ProOutName.push(item.provinceName);
                  this.ProOutData.push(item.passengerCount);
                });
              }
            }
          }
        }
        // 游客画像
        if (key == "portraitConsume") {
          for (var key1 in data[key]) {
            if (key1 == "ageRatio") {
              var sortData = [];
              var ageData = jsonSort(JSON.parse(data[key][key1]), false);
              ageData.forEach(item => {
                if (item.name == "age20") {
                  sortData.push({ name: "20岁以下", id: 1, value: item.value });
                }
                if (item.name == "age2025") {
                  sortData.push({ name: "20~25岁", id: 2, value: item.value });
                }
                if (item.name == "age2530") {
                  sortData.push({ name: "25~30岁", id: 3, value: item.value });
                }
                if (item.name == "age3035") {
                  sortData.push({ name: "30~35岁", id: 4, value: item.value });
                }
                if (item.name == "age40") {
                  sortData.push({ name: "40岁以上", id: 5, value: item.value });
                }
              });
              var ageSort = sortData.sort(compare("id", true));
              ageSort.forEach(item => {
                // this.ageName.push(item.name);
                // this.ageData.push({ name: item.name, value: item.value });
                this.XFtouristName.push(item.name);
                this.XFtouriseData.push({ name: item.name, value: item.value });
              });
            }
            if (key1 == "childPeriodWithStayTime") {
              let playDays = []
                var sortaAgeRand = jsonSort(data[key][key1], false)
                sortaAgeRand.forEach(item=>{
                    if (item.name == '1天'||item.name == '2天'||item.name == '3天'||item.name == '4天') {
                      playDays.push({name:item.name,value:item.value})
                      this.playData = playDays
                    }else{
                      // this.ageDistriName.push(item.name);
                      // this.ageDistriData.push(item.value);
                    }
                })
            }

            if (key1 == "marriedRatio") {
              var haveMarr = JSON.parse(data[key][key1])["married"];
              this.marriedDataXF = Number(haveMarr * 100).toFixed(2);
            }
            if (key1 == "childRatio") {
              var haveMarr = JSON.parse(data[key][key1])["has"];
              this.childData = Number(haveMarr * 100).toFixed(2);
            }
            if (key1 == "travelDrRatio") {
              var haveMarr = JSON.parse(data[key][key1])["expert"];
              this.childData = Number(haveMarr * 100).toFixed(2);
            }
            if (key1 == "sexRatio") {
              var haveMarr = JSON.parse(data[key][key1])["female"];
              this.femaleXF = Number(haveMarr * 100).toFixed(2);
              var haveMarr1 = JSON.parse(data[key][key1])["male"];
              this.maleXF = Number(haveMarr1 * 100).toFixed(2);
            }
            if (key1 == "consumeptionLine") {
              var data2 = [];
              if (data[key][key1].length != 0) {
                for (var i = 0; i < data[key][key1].length; i += 2) {
                  data2.push(data[key][key1][i]);
                }
                data2.forEach(item => {
                  var name =
                    String(item.dateTime).slice(5, 6) +
                    "/" +
                    String(item.dateTime).slice(6, 8);
                  this.touXFName.push(name);
                  this.touXF1.push(item.avgHotel);
                  this.touXF2.push(item.avgScenic);
                  this.touXF3.push(item.avgCatering);
                });
              }
            }

            // 餐饮消费
            if (key1 == "cateringOrder") {
              var data1 = jsonSort(JSON.parse(data[key][key1]), false);
              data1.forEach(item => {
                this.foodXFName.push(item.name);
                this.foodXFData.push({ name: item.name, value: item.value });
              });
            }
            // 酒店消费
            if(key1 == 'hotelOrder'){
              var data1 = jsonSort(JSON.parse(data[key][key1]), false).slice(0,6)
              data1.forEach(item=>{
                  this.hotelXFName.push(item.name)
                  this.hotelXFData.push({name:item.name, value:item.value})
              })
            }
            // 景区消费
            if(key1 == 'scenicOrder'){
              var data1 = jsonSort(JSON.parse(data[key][key1]), false).slice(0,6)
              data1.forEach(item=>{
                  this.scenicXFName.push(item.name)
                  this.scenicXFData.push({name:item.name, value:item.value})
              })
            }
            // 人均
            if(key1 == 'dishAvg'){
                this.dishAvg = Number(data[key][key1]).toFixed(2)
            }
            if(key1 == 'hotelAvg'){
                this.hotelAvg = Number(data[key][key1]).toFixed(2)
            }
            if(key1 == 'scenicAvg'){
                this.scenicAvg = Number(data[key][key1]).toFixed(2)
            }
            //消费detail
            if(key1 == 'total'){
                this.countTotal = Number(data[key][key1]).toFixed(2)
            }
            if(key1 == 'totalAvg'){
                this.avgXF = Number(data[key][key1]).toFixed(2)
            }
            // 极光游客基础画像
            let ageJD = []
            let ageTotal = 0
            if(key1 == 'jiguangPortrait'){
              let JGdata = data[key][key1]
              JGdata.forEach(item=>{
                if(item.attribute == '16-25岁' ||item.attribute == '26-35岁' ||item.attribute == '36-45岁' ||item.attribute == '大于46岁'  ){
                  this.ageName.push(item.attribute)
                  this.ageData.push({name: item.attribute, value: item.percent})
                } else if(item.attribute == '婴幼儿' || item.attribute == '孕育期' || item.attribute == '青少年'){
                    ageJD.push({name: item.attribute, value: item.percent})
                } else if(item.attribute == '男'){
                  this.male = Number(item.percent).toFixed(2)
                  this.female = Number(100 - this.male).toFixed(2)
                } else if(item.attribute == '已婚'){
                  this.marriedData = Number(item.percent).toFixed(2)
                }
              })
              ageJD.sort(compare('value', false)).forEach(item=>{
                ageTotal += Number(Number(item.value).toFixed(2))
                this.ageDistriName.push(item.name)
                this.ageDistriData.push(Number(item.value).toFixed(2))
              })
              if(ageTotal < 100){
                  this.ageDistriData[this.ageDistriData.length-1] = (Number(this.ageDistriData[this.ageDistriData.length-1]) + (100 - ageTotal)).toFixed(2)
              }
            }
          }
        }
        // 新增文旅饭店图表
        if(key == "gongAn"){
          for(var key1 in data[key]){
            // 省内外占比
            if(key1 == 'outProvincePercent'){
              this.proInOutName.push('省外')
              this.proInOutData.push({naem:'省外', value: Number((Number(data[key][key1].outProvince)*100).toFixed(2))})
              this.proInOutName.push('省内')
              this.proInOutData.push({naem:'省内', value: Number(100 - (Number(data[key][key1].outProvince)*100)).toFixed(2)})

              this.proOutdataNum = Number((Number(data[key][key1].outProvince)*100).toFixed(2))
              this.proIndataNum = Number(100 - (Number(data[key][key1].outProvince)*100)).toFixed(2)
              
            }
            // 境外top5
            if(key1 == 'foreignerTouristTop5'){
              let currData = data[key][key1]
              let sortData = currData.sort(compare('totalPeople',true))
              // this.chinaOutText = sortData
              this.chinaOutText1 = sortData[sortData.length - 1].areaName
              this.chinaOutText2 = sortData[sortData.length - 2].areaName
              this.chinaOutNum1 = sortData[sortData.length - 1].totalPeople
              this.chinaOutNum2 = sortData[sortData.length - 2].totalPeople
              sortData.forEach(item=>{
                this.chinaOutName.push(item.areaName)
                this.chinaOutData.push(item.totalPeople)
              })
            }
            // 省外
            if(key1 == 'outProvinceTouristTop5'){
                let currData = data[key][key1]
                let sortData = currData.sort(compare('totalPeople',true))
                this.proOutTop5text1 = sortData[sortData.length - 1].areaName
                this.proOutTop5text2 = sortData[sortData.length - 2].areaName
                this.proOutTop5Num1 = sortData[sortData.length - 1].totalPeople
                this.proOutTop5Num2 = sortData[sortData.length - 2].totalPeople
                sortData.forEach(item=>{
                  this.proOutTop5Name.push(item.areaName)
                  this.proOutTop5Data.push(item.totalPeople)
                })
            }
            // 内外宾
            if(key1 == 'nwbNum'){
              let currData = data[key][key1]
              currData.forEach(item=>{
                if(item.nwblx == '内宾'){
                  this.inPeople = item.nwblx
                  this.inPeopleNum = item.totalPepole
                } else{
                  this.OutPeople = item.nwblx
                  this.OutPeopleNum = item.totalPepole
                }
              })
            }
          }
        }

        // 常住地占比省
        var that = this;
        if (key == "province") {
          var objData = jsonSort(JSON.parse(data[key]), false).slice(0, 6);
          if (objData.length != 0) {
            objData.forEach(item => {
              that.CZproName.push(item.name);
              that.CZproData.push({ name: item.name, value: item.value });
            });
          }
        }
        // 常驻市
        if (key == "city") {
          var objData1 = jsonSort(JSON.parse(data[key]), false).slice(0, 6);
          if (objData.length != 0) {
            objData1.forEach(item => {
              that.CZcityName.push(item.name);
              that.CZcityData.push({ name: item.name, value: item.value });
            });
          }
        }
        // 评分分布
        if (key == "commentDistribute") {
          this.comentTotal = data[key]["allCount"];
          this.newNumber = data[key]["newCommentsNum"];
          this.goodNumber = data[key]["highRatio"].toFixed(2);
          var commData = data[key]["attribute"];
          if (commData.length != 0) {
            commData.forEach(item => {
              if (item.sourceName == "LVMAMA") {
                this.netName.push("驴妈妈");
                this.netData.push({ name: "驴妈妈", value: item.commentNum });
              }
              if (item.sourceName == "MEITUAN") {
                this.netName.push("美团");
                this.netData.push({ name: "美团", value: item.commentNum });
              }
              if (item.sourceName == "QUNAR") {
                this.netName.push("去哪儿");
                this.netData.push({ name: "去哪儿", value: item.commentNum });
              }
              if (item.sourceName == "TONGCHENGLVYOU") {
                this.netName.push("同程旅游");
                this.netData.push({ name: "同程旅游", value: item.commentNum });
              }
              if (item.sourceName == "TUNIU") {
                this.netName.push("途牛");
                this.netData.push({ name: "途牛", value: item.commentNum });
              }
            });
          }
        }
      }
      // this.scenicReport()
      // this.toggleCityTab1(0)   //常住地
      if (res.data.msg == "success") {
        this.reportAdd = res.data.data;
      }
    },
    // 省内外占比
    async resource(){
        this.proInOutEc = this.$echarts.init(this.$refs.proInOut_table)
        var option = {
            title:{
                show: this.proInOutName.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                textStyle:{
                    color:'#bcbcbc'
                },
                text:'暂无数据',
                left:'center',
                top:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} 人'
            },
            legend: {
                orient: 'vertical',
                x: '75%',
                // top: '3%',
                bottom: '40%',
                itemWidth: 10,  // 设置宽度
                itemHeight: 10, // 设置高度
                itemGap: 15,
                textStyle:{
                    color: '#fff',
                    fontSize: 14
                },
                data: this.proInOutName
            },
            toolbox: {
                show: true,
                
            },
            grid: {
                top: '5%',
                bottom: '10%'
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: [60, 70],
                    center: ['44%', '50%'],
                    // roseType: 'radius',
                    label: {
                        show: true,
                        formatter: function(data){
                            return data.name + Number((data.value )).toFixed(2) +'%'
                        }
                    },
                    labelLine: {
                        normal:{  
                            length: 5,
                            // lineStyle: {
                            //     color: "#CBEAFF"  // 改变标示线的颜色
                            // }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: this.proInOutData,
                    color: ['#F4A305','#33C6EB']
                },
            ]
        };
        this.proInOutEc.setOption(option);
        window.addEventListener('resize', this.resizeHandler)
    },
    // 境外
    abroadTop(){
        this.$echarts.init(this.$refs.chinaOut_table).setOption({
        title:{
            show: this.chinaOutData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
            textStyle:{
                color:'#bcbcbc'
            },
            text:'暂无数据',
            left:'center',
            top:'center'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "8%",
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            show: true,
            interval: 0
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: this.chinaOutName
        },
        series: [
          {
            type: "bar",
            data: this.chinaOutData
          }
        ]
      });
    },
    // 省外top5
    proOutTop5Fn(){
        this.$echarts.init(this.$refs.proOutTop5_table).setOption({
        title:{
            show: this.proOutTop5Name.length == 0,//平常时设置为false，隐藏没有数据的文字提示
            textStyle:{
                color:'#bcbcbc'
            },
            text:'暂无数据',
            left:'center',
            top:'center'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "8%",
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            show: true,
            interval: 0
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: this.proOutTop5Name
        },
        series: [
          {
            type: "bar",
            data: this.proOutTop5Data
          }
        ]
      });
    },
    
    // 景区客流量
    scenicReport() {
      this.$echarts.init(this.$refs.scenicTable).setOption({
        // color: "rgba(253, 115, 95, 1)",
        title: {
          text: "游客量（人次）",
          left: "center",
          bottom: 0
        },
        // barWidth: 15,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "8%",
          bottom: "10%",
          top: "8%",
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            show: true,
            interval: 0
          },
          // axisLine: {
          //   lineStyle: {
          //     color: "#FC771C" //设置横坐标轴线颜色
          //   }
          // },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: this.scenicName,
          // position:'right',
          axisLabel: {
            show: true
          }
        },
        series: [
          {
            type: "bar",
            data: this.scenicData
            // itemStyle: {
            //   normal: {
            //     label: {
            //       formatter: "{b}",
            //       show: true,
            //       // position: "center",
            //       left: "100%",
            //       textStyle: {
            //         color: "#000"
            //       }
            //     }
            //   }
            // },
            // label: {
            //   normal: {
            //     position: [1, 2]
            //   }
            // }
          }
        ]
      });
    },
    // 省内
    inProvince() {
      // 省内热门客源地
      this.provinceIn_table = this.$echarts.init(this.$refs.provinceInTable);
      let proviceInName = [];
      let proviceInValue = [];
      let proviceInAccount = this.provinceIn.slice(0, 8);
      proviceInAccount.forEach(element => {
        proviceInName.push(element.city);
        proviceInValue.push((element.percent * 100).toFixed(2));
      });
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "18%",
          containLabel: true
        },
        xAxis: {
          data: this.ProInName,
          axisLabel: {
            //横坐标类目文字
            show: true,
            interval: 0
          },
          axisLine: {}
        },
        yAxis: [
          {
            type: "value",
            name: "人数(万)",
            axisLabel: {
              //横坐标类目文字
              show: true,
              zIndex: 100
            },
            splitLine: {
              show: true
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: this.ProInData
          }
        ],
        itemStyle: {
          normal: {
            color: "#ccc"
          }
        }
      };
      this.provinceIn_table.setOption(option);
    },
    // 省外
    outProvince() {
      this.provinceOut_table = this.$echarts.init(this.$refs.provinceOutTable);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "18%",
          containLabel: true
        },
        xAxis: {
          data: this.ProOutName,
          axisLabel: {
            show: true,
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          name: "人数(万)",
          nameTextStyle: {}
        },
        series: [
          {
            type: "bar",
            data: this.ProOutData
          }
        ]
      };
      this.provinceOut_table.setOption(option);
    },
    // 城市
    cityTotal() {
      this.city_ec = this.$echarts.init(this.$refs.city_table);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "18%",
          containLabel: true
        },
        xAxis: {
          data: this.cityTotalName,
          axisLabel: {
            show: true,
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          name: "人数(万)",
          axisLabel: {
            //横坐标类目文字
            show: true,
            // margin:-60,
            zIndex: 100
            //   formatter:function (value){

            //   return value+ "\n";}
            // }
          }
        },
        series: [
          {
            type: "bar",
            data: this.cityTotalData
          }
        ]
      };
      this.city_ec.setOption(option);
    },
    // 车流量统计
    carTotal() {
      // console.log(this.carName,this.carDate);
      this.carTotalEc = this.$echarts.init(this.$refs.carTotal_echart);
      var giftImageUrl =
        "data:image/png;base64,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";
      var carName = this.carName;
      var carDate = this.carDate;
      // carDate.length = 0
      var option = {
        title: {
          show: carDate.length == 0,
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#bcbcbc",
            fontWeight: 600,
            fontSize: 20
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        graphic: {
          elements: [
            // {
            //   type: "image",
            //   style: {
            //     image: giftImageUrl,
            //     width: 80,
            //     height: 80
            //   },
            //   left: "27%",
            //   top: "center"
            // },
            {
              type: "text",
              left: "36%",
              top: "45%",
              style: {
                text: "总车辆",
                textAlign: "center",
                fill: "#B2916E",
                width: 30,
                height: 30,
                fontSize: 15
              }
            },
            {
              type: "text",
              left: "35%",
              top: "45%",
              style: {
                text: "\n658辆",
                textAlign: "center",
                fill: "#B2916E",
                width: 30,
                height: 30,
                fontSize: 18
              }
            }
          ]
        },
        legend: {
          orient: "vertical",
          x: "80%",
          // top: '3%',
          bottom: "30%",
          itemWidth: 11, // 设置宽度
          itemHeight: 11, // 设置高度
          itemGap: 15,
          // textStyle: {
          //   color: "#B2916E",
          //   fontSize: 12
          // },
          data: carName
        },
        series: [
          {
            name: "设备状态",
            type: "pie",
            radius: ["47%", "59%"],
            center: ["40%", "50%"],
            color: ["#FB7293", "#F6A61C", "#0E74FF"],
            label: {
              normal: {
                formatter: " {b|{b}}\n {a|{d}%}\n",
                borderWidth: 30,
                borderRadius: 10,
                padding: [-20, -30],
                rich: {
                  a: {
                    fontSize: 14,
                    lineHeight: 8
                  },
                  b: {
                    fontSize: 14,
                    lineHeight: 38
                  }
                }
              }
            },
            labelLine: {
              normal: {
                length: 15,
                length2: 23
              }
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: "#fff"
            },
            data: carDate
          }
        ]
      };
      this.carTotalEc.setOption(option);
    },
    carZhanbi() {
      this.$echarts.init(this.$refs.carZhanbi_echart).setOption({
        title: {
          text: "车流量占比%",
          left: "center",
          bottom: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "8%",
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            show: true,
            interval: 0
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: this.carZBname
          // position:'right',
        },
        series: [
          {
            type: "bar",
            data: this.carZBdata
          }
        ]
      });
    },
    // 年龄(极光)
    ageTable() {
      // 游客画像
      this.age_table = this.$echarts.init(this.$refs.tourist_table);
      var option = {
        legend: {
          orient: "vertical",
          top: "8%",
          left: "75%",
          data: this.ageName,
          icon: "circle",
          itemHeight: 5,
          textStyle: {
            fontSize: 14,
            color: "#59331C",
            fontFamily: "Source Han Sans CN"
          }
        },
        graphic: {
          //图形中间文字
          type: "text",
          left: "45%",
          top: "45%",
          style: {
            text: "年龄",
            textAlign: "center",
            fill: "#59331C",
            fontSize: 20,
            fontFamily: "Source Han Sans CN"
          }
        },
        toolbox: {
          show: false
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: ["35%", "70%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: this.ageData,
            color: ["#339AE5", "#D9C701", "#E7536B", "#E7BCF3", "#FF9F7F"]
          }
        ]
      };
      this.age_table.setOption(option);
    },
    // 游客画像半圆(极光)
    touristDetailTable() {
      // 已婚
      let married = this.marriedData;
      let child = this.childData;
      let expert = this.expertData;
      let countRatio = this.countData;
      this.tourist_table = this.$echarts.init(this.$refs.tourist_table_married);
      var option = {
        tooltip: {
          show: false
        },
        graphic: [
          {
            type: "text",
            top: "52%",
            left: "7%",
            style: {
              fill: "#B2916E",
              text: "已婚",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          {
            type: "text",
            left: "31%",
            top: "52%",
            style: {
              fill: "#B2916E",
              text: "有子女",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          {
            type: "text",
            left: "55%",
            top: "53%",
            style: {
              fill: "#B2916E",
              text: "旅游达人",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          // {
          //   type: "text",
          //   left: "81%",
          //   top: "52%",
          //   style: {
          //     fill: "#B2916E",
          //     text: "重游率",
          //     fontFamily: "Source Han Sans CN",
          //     fontSize: 15
          //   }
          // }
        ],
        color: ["#01dadc"],
        series: [
          {
            name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["10%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                fontFamily: "Source Han Sans CN",
                color: "#DF2721",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: married,
                name: married + "%\n",
                itemStyle: {
                  normal: {
                    color: "#FD735F"
                  }
                }
              },
              {
                value: 100 - married,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          {
            // name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["35%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#DF2721",
                fontFamily: "Source Han Sans CN",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: child,
                name: child + "%\n",
                itemStyle: {
                  normal: {
                    color: "#FA9B03"
                  }
                }
              },
              {
                value: 100 - child,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          {
            // name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["60%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#DF2721",
                fontFamily: "Source Han Sans CN",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: expert,
                name: expert + "%\n",
                itemStyle: {
                  normal: {
                    color: "#019ADD"
                  }
                }
              },
              {
                value: 100 - expert,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          // {
          //   // name: "一般",
          //   type: "pie",
          //   //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
          //   startAngle: 0,
          //   hoverAnimation: false,
          //   tooltip: {},
          //   radius: ["65%", "70%"],
          //   center: ["85%", "50%"],
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "center",
          //       color: "#DF2721",
          //       fontFamily: "Source Han Sans CN",
          //       fontSize: 12,
          //       formatter: function(params) {
          //         return params.name;
          //       }
          //     }
          //   },
          //   labelLine: {
          //     normal: {
          //       show: false
          //     }
          //   },
          //   data: [
          //     {
          //       value: 100,
          //       itemStyle: {
          //         normal: {
          //           color: "transparent"
          //         }
          //       }
          //     },
          //     {
          //       value: countRatio,
          //       name: countRatio + "%\n",
          //       itemStyle: {
          //         normal: {
          //           color: "#FB7293"
          //         }
          //       }
          //     },
          //     {
          //       value: 100 - countRatio,
          //       itemStyle: {
          //         normal: {
          //           color: "#FFDDC4"
          //         }
          //       }
          //     }
          //   ]
          // }
        ]
      };
      this.tourist_table.setOption(option);
    },
    // 子女阶段（极光）
    childFbFn() {
      this.childFbEc = this.$echarts.init(this.$refs.childZb_Ec);
      var yMax = 100;
      var dataShadow = [];
      for (var i = 0; i < this.ageDistriData.length; i++) {
        dataShadow.push(yMax);
      }
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(data) {
            return data[1].axisValue + data[1].value + "%";
          }
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "15%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            axisLine: {
              //坐标轴线
              show: false,
              lineStyle: {
                color: "#333333"
              }
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "#BFE0FF"
              }
            },
            splitLine: {
              show: false //去除网格线
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          }
        ],
        yAxis: [
          {
            show: true,
            data: this.ageDistriName,
            inverse: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#333333"
              }
            },
            axisTick: {
              lineStyle: { color: "#333333" } // x轴刻度的颜色
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 13,
                color: "#684833"
              }
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          },
          {
            show: true,
            inverse: true,
            data: this.ageDistriData,
            axisLabel: {
              formatter: function(data) {
                return data + "%";
              },
              textStyle: {
                fontSize: 13,
                color: "#684833"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "#E7D3BA"
            },
            barGap: "-100%",
            barWidth: "40%",
            data: dataShadow,
            animation: false,
            hoverAnimation: false,
            label: {
              normal: {
                position: "inside",
                textStyle: {
                  fontSize: 14,
                  color: "#BFE0FF"
                },
                position: "right"
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#E7D3BA"
              }
            }
          },
          {
            name: "直接访问",
            type: "bar",
            barWidth: "40%",
            label: {
              normal: {
                textStyle: {
                  fontSize: 14,
                  color: "#BFE0FF"
                },
                position: [5, -16]
              }
            },
            itemStyle: {
              normal: {
                color: "#D53C3C"
              }
            },
            data: this.ageDistriData
          }
        ]
      };
      this.childFbEc.setOption(option);
    },
    // 游玩时长
    playFn() {
      this.plsyEc = this.$echarts.init(this.$refs.play_Ec);
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          itemWidth: 12,
          itemHeight: 10,
          itemGap: 10,
          left: "60%",
          top: "20%"
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30
          }
        },
        label: {
          formatter: "{c}%\n",
          padding: [-20, -15],
          color: "#59331C"
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["40%", "50%"],
            data: this.playData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            color: ["#FD735F", "#D53C3C", "#FFCECD", "#9F340A"]
          }
        ]
      };
      this.plsyEc.setOption(option);
    },
    // 游客画像
    ageTableXF() {
      this.age_tableXF = this.$echarts.init(this.$refs.huaxiangXF);
      var option = {
        legend: {
          orient: "vertical",
          top: "8%",
          left: "75%",
          data: this.XFtouristName,
          icon: "circle",
          itemHeight: 5,
          textStyle: {
            fontSize: 15,
            color: "#59331C",
            fontFamily: "Source Han Sans CN"
          }
        },
        graphic: {
          //图形中间文字
          type: "text",
          left: "45%",
          top: "45%",
          style: {
            text: "年龄",
            textAlign: "center",
            fill: "#59331C",
            fontSize: 20,
            fontFamily: "Source Han Sans CN"
          }
        },
        toolbox: {
          show: false
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: ["35%", "70%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: this.XFtouriseData,
            color: ["#339AE5", "#D9C701", "#E7536B", "#E7BCF3", "#FF9F7F"]
          }
        ]
      };
      this.age_tableXF.setOption(option);
    },
    touristDet_XF() {
      let married = this.marriedDataXF;
      let child = this.childData;
      let expert = this.expertData;
      let countRatio = this.countData;
      this.xf_ageEc = this.$echarts.init(this.$refs.xf_age);
      var option = {
        tooltip: {
          show: false
        },
        graphic: [
          {
            type: "text",
            top: "52%",
            left: "7%",
            style: {
              fill: "#B2916E",
              text: "已婚",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          {
            type: "text",
            left: "31%",
            top: "52%",
            style: {
              fill: "#B2916E",
              text: "有子女",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          {
            type: "text",
            left: "55%",
            top: "53%",
            style: {
              fill: "#B2916E",
              text: "旅游达人",
              fontFamily: "Source Han Sans CN",
              fontSize: 15
            }
          },
          // {
          //   type: "text",
          //   left: "81%",
          //   top: "52%",
          //   style: {
          //     fill: "#B2916E",
          //     text: "重游率",
          //     fontFamily: "Source Han Sans CN",
          //     fontSize: 15
          //   }
          // }
        ],
        color: ["#01dadc"],
        series: [
          {
            name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["10%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                fontFamily: "Source Han Sans CN",
                color: "#DF2721",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: married,
                name: married + "%\n",
                itemStyle: {
                  normal: {
                    color: "#FD735F"
                  }
                }
              },
              {
                value: 100 - married,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          {
            // name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["35%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#DF2721",
                fontFamily: "Source Han Sans CN",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: child,
                name: child + "%\n",
                itemStyle: {
                  normal: {
                    color: "#FA9B03"
                  }
                }
              },
              {
                value: 100 - child,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          {
            // name: "一般",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ["65%", "70%"],
            center: ["60%", "50%"],
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#DF2721",
                fontFamily: "Source Han Sans CN",
                fontSize: 12,
                formatter: function(params) {
                  return params.name;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent"
                  }
                }
              },
              {
                value: expert,
                name: expert + "%\n",
                itemStyle: {
                  normal: {
                    color: "#019ADD"
                  }
                }
              },
              {
                value: 100 - expert,
                itemStyle: {
                  normal: {
                    color: "#FFDDC4"
                  }
                }
              }
            ]
          },
          // {
          //   // name: "一般",
          //   type: "pie",
          //   //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
          //   startAngle: 0,
          //   hoverAnimation: false,
          //   tooltip: {},
          //   radius: ["65%", "70%"],
          //   center: ["85%", "50%"],
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "center",
          //       color: "#DF2721",
          //       fontFamily: "Source Han Sans CN",
          //       fontSize: 12,
          //       formatter: function(params) {
          //         return params.name;
          //       }
          //     }
          //   },
          //   labelLine: {
          //     normal: {
          //       show: false
          //     }
          //   },
          //   data: [
          //     {
          //       value: 100,
          //       itemStyle: {
          //         normal: {
          //           color: "transparent"
          //         }
          //       }
          //     },
          //     {
          //       value: countRatio,
          //       name: countRatio + "%\n",
          //       itemStyle: {
          //         normal: {
          //           color: "#FB7293"
          //         }
          //       }
          //     },
          //     {
          //       value: 100 - countRatio,
          //       itemStyle: {
          //         normal: {
          //           color: "#FFDDC4"
          //         }
          //       }
          //     }
          //   ]
          // }
        ]
      };
      this.xf_ageEc.setOption(option);
    },
    // 常驻
    async toggleCityTab1(index) {
      this.cityIndex1 = index
      var that = this;
      if (index == 1) {
        setTimeout(function() {
          that.city(that.CZproName, that.CZproData, that.$refs.cityEchart);
        }, 1000);
      }
      if (index == 0) {
        setTimeout(() => {
          that.city(that.CZcityName, that.CZcityData, that.$refs.cityEchart);
        }, 1000);
      }
    },
    city(cpName, cpData, refData) {
      this.cityEc = this.$echarts.init(refData);
      var option = {
        title: {
          show: cpName.length == 0, //平常时设置为false，隐藏没有数据的文字提示
          textStyle: {
            color: "#bcbcbc"
          },
          text: "暂无数据",
          left: "center",
          top: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%"
        },
        legend: {
          orient: "vertical",
          left: "70%",
          top: "10%",
          show: true,
          itemWidth: 9,
          itemHeight: 9,
          itemGap: 10,
          data: cpName,
          textStyle: {
            fontSize: 10
          }
        },
        toolbox: {
          show: false
        },
        // graphic: {
        //     elements: [{
        //         type: 'image',
        //         style: {
        //             image: touristData.length == 0 ? '' : giftImageUrl,
        //             width: 45,
        //             height: 45
        //         },
        //         left: 'center',
        //         top: 'center',
        //     }]
        // },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: ["25%", "50%"],
            center: ["35%", "50%"],
            roseType: "area",
            label: {
              normal: {
                textStyle: {
                  color: "#59331C" // 改变标示文字的颜色
                },
                padding: [20, -20],
                rich: {
                  a: {
                    fontSize: "0.12rem",
                    lineHeight: 12,
                    color: "#59331C"
                  },
                  b: {
                    fontSize: "0.12rem",
                    lineHeight: "0.16rem",
                    color: "#59331C"
                  }
                },
                itemStyle: {
                  color: "#59331C"
                },
                formatter: function(data) {
                  return (
                    data.name.replace(/省|市/g, "") +
                    Number(Number(data.value) * 100).toFixed(2) +
                    "%\n"
                  );
                }
              }
            },
            labelLine: {
              normal: {
                length: 12,
                length2: 15,
                lineStyle: {
                  color: "#B2916E" // 改变标示线的颜色
                }
              }
            },
            data: cpData,
            color: [
              "#fdd100",
              "#28b1c7",
              "#ff4873",
              "#7351e3",
              "#ed5400",
              "#4b64ed",
              "#3fecfe"
            ]
          }
        ]
      };
      this.cityEc.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    // 游客消费分析
    async nearWeak() {
      this.toustXFEc = this.$echarts.init(this.$refs.touristXF_EC);
      var option = {
        title: {
          show: false,
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#bcbcbc",
            fontWeight: 600,
            fontSize: 16
          }
        },
        tooltip: [
          {
            trigger: "axis",
            type: "showTip"
            // formatter: function(data){
            //     data.forEach(element => {
            //         console.log(element.seriesName)
            //         return  'element.seriesName + element.value'
            //     });
            // }
          }
        ],
        legend: {
          data: ["酒店消费", "景区消费", "餐饮消费"],
          textStyle: {
            color: "#684833"
          },
          y: "85%"
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "20%",
          top: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.touXFName,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#684833"
            },
            fontSize: 12,
            interval: 0
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(178, 210, 227, 0.5)"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#684833"
            },
            fontSize: 12,
            interval: 0
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(178, 210, 227, 0.5)"
            }
          },
          splitLine: {
            show: true, //网格线
            lineStyle: {
              color: ["rgba(178, 210, 227, 0.5)"], //网格线颜色
              width: 1,
              type: "solid"
            }
          }
        },
        series: [
          {
            name: "酒店消费",
            data: this.touXF1,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3 //折线宽度
                }
              }
            }
          },
          {
            name: "景区消费",
            data: this.touXF2,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3 //折线宽度
                }
              }
            }
          },
          {
            name: "餐饮消费",
            data: this.touXF3,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3 //折线宽度
                }
              }
            }
          }
        ],
        color: ["#00D98B", "#F45E23", "#228FFE"]
      };
      this.toustXFEc.setOption(option);
    },
    // 景区消费
    scenicFn() {
      this.city(this.scenicXFName, this.scenicXFData, this.$refs.scenic_echart);
    },
    // 餐饮消费
    foodFn() {
      this.city(this.foodXFName, this.foodXFData, this.$refs.food_echart);
    },
    // 餐饮消费
    hotelFn() {
      this.city(this.hotelXFName, this.hotelXFData, this.$refs.hotel_echart);
    },
    // 网络
    netWorkFn() {
      this.netEc = this.$echarts.init(this.$refs.netWork_echart);
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            radius: ["30%", "50%"],
            center: ["40%", "50%"],
            data: this.netData,
            label: {
              normal: {
                textStyle: {
                  color: "#59331C" // 改变标示文字的颜色
                },
                padding: [20, -40],
                rich: {
                  a: {
                    fontSize: "0.12rem",
                    lineHeight: 22,
                    color: "#B2916E"
                  },
                  b: {
                    fontSize: "0.12rem",
                    lineHeight: 22,
                    color: "#B2916E"
                  }
                },
                itemStyle: {
                  color: "#59331C"
                },
                formatter: function(data) {
                  return data.name + "\n\n" + data.value;
                }
              }
            },
            labelLine: {
              normal: {
                length: 12,
                length2: 50,
                lineStyle: {
                  color: "#B2916E" // 改变标示线的颜色
                }
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            color: [
              "#05EADF",
              "#267DED",
              "#F2C70D",
              "#68FE67",
              "#F9993A",
              "#BC59FE"
            ]
          }
        ]
      };
      this.netEc.setOption(option);
    },
    addReportForm() {
      let reportAdd = [];
    },
    downLoad() {
      // this.getdownLoad();
    },
    returnTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  mounted() {
    console.log('加载页面');
    let that = this;
    setTimeout(() => {
      that.abroadTop();
      that.proOutTop5Fn();
      that.resource();
      that.scenicReport();
      that.inProvince();
      that.outProvince();
      that.cityTotal();
      that.carTotal();
      that.carZhanbi();
      that.ageTable();
      that.touristDetailTable();
      that.childFbFn();
      that.playFn();
      that.ageTableXF();
      that.touristDet_XF();
      that.toggleCityTab1(0);
      that.nearWeak();
      that.scenicFn();
      that.foodFn();
      that.hotelFn();
      that.netWorkFn();
    }, 2000);
    // if (this.ReportTheme!='月报') {
    //     this.valueData = this.valueData.substring(0,4)
    //   console.log(this.valueData);
    // }
    // this.getSpringData();
    console.log(this.valueData);
    console.log(this.ReportTheme);
    if (this.valueData != "") {
      if (this.ReportTheme != "月报") {
        this.valueData = this.valueData.substring(0, 4);
        console.log(this.valueData);
        this.getSpringData();
      }else{
        this.valueData = this.valueData.substring(0, 4)+'-'+this.valueData.substring(5, 7);
        console.log(this.valueData);
        this.getSpringData();
      }
    }
  },
  watch: {
    valueData(val) {
      console.log(val);
      // console.log(newval)
      // if(newval != oldval){
      //   this.getSpringData()
      // }
    }
    // complete(newval, oldval){
    //   // console.log(newval)
    //   this.$emit('complateCoutn', newval)
    // }
  }
};
function jsonSort(jsonObj, desc) {
  let arr = [];
  for (var key in jsonObj) {
    arr.push({ name: key, value: jsonObj[key] });
  }
  var newArr = arr.sort(compare("value", desc));
  return newArr;
}
function compare(property, desc) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    if (desc == true) {
      // 升序排列
      return value1 - value2;
    } else {
      // 降序排列
      return value2 - value1;
    }
  };
}
</script>
<style>
.S_tit {
  width: 2rem;
  height: 0.35rem;
  margin-top: 0.1rem;
  float: right;
  position: relative;
  z-index: 666;
}
.S_echarts_title {
  height: 0.35rem;
  width: 100%;
  padding-right: 5%;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 0.1rem;
}
.S_echarts_title > li {
  display: block;
  width: 80px;
  height: 35px;
  border: 1px solid #b2916e;
  border-radius: 17px;
  color: #59331c;
  font-size: 0.14rem;
  line-height: 35px;
  text-align: center;
  margin-right: 0.1rem;
  cursor: pointer;
  z-index: 999;
}
.S_echarts_title > li.active {
  background: rgba(178, 145, 110, 0.2);
}
.S_echarts_con {
  height: calc(100% - 0.45rem);
  width: 100%;
  margin-top: 0.6rem;
  /* box-sizing: border-box; */
}
/* 省略号 */
.PC_city_zhanbi {
  width: 80%;
  margin: 0 auto;
}
.PC_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.PC_title_txt {
  width: 30%;
}
.PC_title_line {
  width: 70%;
  height: 1px;
  border-bottom: 1px dashed #000;
}
.el-table:before {
  height: 0;
}
.report_content {
  position: relative;
  background-color: #303b4d;
}
.report_title {
  background-image: url("../assets/image/report/pc_title_bg.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 147px;
  font-size: 25px;
  line-height: 147px;
  /* color: rgba(255, 255, 255, 1); */
}
.report_title h2 {
  width: 100%;
  margin: 0;
  text-align: center;
  color: #fff;
  /* background-image: -webkit-linear-gradient(bottom, #fff, #faccf4); */
  /* -webkit-background-clip: text; */
  /* -webkit-text-fill-color: transparent; */
}
.report_content_all {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 100px;
}
.report_content_title {
  width: 100%;
  margin: 10px auto;
  text-align: center;
  font-family: Source Han Sans CN;
  font-size: 26px;
}
.report_content_title span {
  margin: 0 16px;
}
.report_content_title img {
  display: inline-block;
  width: 75px;
  height: 13px;
  margin-top: 8px;
  vertical-align: top;
}
.report_resources_content {
  width: 80%;
  margin: 0 auto;
  text-indent: 35px;
  letter-spacing: 2px;
  font-size: 16px;
  font-family: Source Han Sans CN;
}
.report_resources_table {
  width: 65%;
  height: 300px;
  margin: 0 auto;
}
.report_resources_table > div {
  width: 100%;
  height: 100%;
}
.report_resources_table img {
  width: 100%;
  height: 100%;
}
.report_resources_margin {
  margin-top: 50px;
}
.right_slider {
  width: 4%;
  position: fixed;
  right: 3%;
  bottom: 15%;
}
.right_slider .download {
  width: 100%;
  /* height: 100px; */
  cursor: pointer;
}
.right_slider .return_top {
  margin-top: 10px;
}
.right_slider .download img {
  display: block;
  width: 100%;
  height: 100%;
}
/* 游客消费情况 */
.tourist_spending {
  position: relative;
  width: 100%;
  margin: 20px auto;
}
.tourist_spending_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tourist_spending_top .all_spending {
  width: 150px;
  height: 110px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  /* line-height: 110px; */
  font-size: 18px;
  /* background-image: url("../assets/images/spring_spending.png"); */
  background-size: 100% 100%;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  font-size: 15px;
}
.tourist_spending_top .catering_person {
  width: 180px;
  height: 180px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: center;
  /* background-image: url("../assets/images/spring_catering_person.png"); */
  background-size: 100% 100%;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  font-size: 15px;
}
.tourist_spending_center {
  position: absolute;
  left: calc(50% - 220px / 2);
  top: calc(50% - 200px / 2);
  width: 200px;
  height: 200px;
}
.tourist_spending_center .scenic_person {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 40px;
  box-sizing: border-box;
  /* background-image: url("../assets/images/spring_scenic_person.png"); */
  background-size: 100% 100%;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  font-size: 15px;
}
.tourist_spending_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  box-sizing: border-box;
  /* margin-top: 30px; */
}
.tourist_spending_bottom .spending_person {
  width: 150px;
  height: 110px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 30px;
  box-sizing: border-box;
  /* background-image: url("../assets/images/spring_spending.png"); */
  background-size: 100% 100%;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  font-size: 15px;
}
.tourist_spending_bottom .hotel_person {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  /* background-image: url("../assets/images/spring_hotel_person.png"); */
  background-size: 100% 100%;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  font-size: 15px;
}
/* 游客画像 */
.tourist_person {
  width: 100%;
  display: flex;
  height: 300px;
}
.tourist_person_left {
  width: 30%;
}
.man {
  display: flex;
  font-family: Source Han Sans CN;
}
.man img {
  width: 50px;
  height: 50px;
}
.man_all {
  font-size: 15px;
  margin-left: 10px;
  padding: 5px 0;
}
.man_value {
  color: red;
}
.tourist_person_right {
  width: 70%;
  height: 100%;
}
.import_account {
  color: red;
}
</style>