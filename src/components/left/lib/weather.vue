<template>
  <div class="root" ref="root" @click="skip()">
    <h3>天气罗盘</h3>
    <div class="content">
      <div class="immediately">
        <div class="angle">{{temperature.substring(0, temperature.length-1)}}°</div>
        <div class="details">
          <div>湿度 {{humidity}}</div>
          <div>PM {{air}}</div>
          <div>{{wind}} {{power}}</div>
          <div class="icon">
            <img :src="weatherImg" alt />
            <span>{{weather}}</span>
          </div>
          <div>
            空气质量
            <b>良</b>
          </div>
        </div>
      </div>
      <ul class="history">
        <li>
          <img :src="weatherImg" alt />
          <div>
            <p>今天</p>
            <p>{{future0}}</p>
          </div>
        </li>
        <li>
          <img :src="weatherImg1" alt />
          <div>
            <p>明天</p>
            <p>{{future1}}</p>
          </div>
        </li>
        <li>
          <img :src="weatherImg2" alt />
          <div>
            <p>后天</p>
            <p>{{future2}}</p>
          </div>
        </li>
      </ul>
      <div class="alarm" v-if="alarm">
        <div class="image">
          <img src="@/assets/img/weather/alarm@2x.png" alt />
        </div>
        <p>预警信息: {{alarm}}</p>
      </div>
      <!-- </div> -->
      <!-- <div class="content">
      <div class="immediately">
        <div class="angle">{{temperature.substring(0, temperature.length-1)}}°</div>
        <div class="details">
          <div>湿度 {{humidity}}</div>
          <div>PM {{air}}</div>
          <div>{{nowWeather.windDirectCn}} {{nowWeather.windLevelCn}}</div>
          <div class="icon">
            <img :src="weatherImg" alt />
            <span>{{weather}}</span>
          </div>
          <div>
            空气质量
            <b>良</b>
          </div>
        </div>
      <ul class="history">
        <li>
          <img :src="weatherImg" alt />
          <div>
            <p>今天</p>
            <p>{{future0}}</p>
          </div>
        </li>
        <li>
          <img :src="weatherImg1" alt />
          <div>
            <p>明天</p>
            <p>{{future1}}</p>
          </div>
        </li>
        <li>
          <img :src="weatherImg2" alt />
          <div>
            <p>后天</p>
            <p>{{future2}}</p>
          </div>
        </li>
      </ul>
      <div class="alarm" v-if="alarm">
                <div class="image">
                    <img src="@/assets/img/weather/alarm@2x.png" alt="">
                </div>
                <p>预警信息: {{alarm}}</p>
      </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import axios from "@/http";
// import z0 from '@/assets/img/weather/z0.png'
// import z1 from '@/assets/img/weather/z1.png'
// import z2 from '@/assets/img/weather/z2.png'
// import z3 from '@/assets/img/weather/z3.png'
// import z4 from '@/assets/img/weather/z4.png'
// import z5 from '@/assets/img/weather/z5.png'
// import z6 from '@/assets/img/weather/z6.png'
// import z7 from '@/assets/img/weather/z7.png'
// import z8 from '@/assets/img/weather/z8.png'
// import z9 from '@/assets/img/weather/z9.png'
// import z10 from '@/assets/img/weather/z10.png'
// import z11 from '@/assets/img/weather/z11.png'
// import z12 from '@/assets/img/weather/z12.png'
// import z13 from '@/assets/img/weather/z13.png'
// import z14 from '@/assets/img/weather/z14.png'

// let imgMap = {
//     '晴': z0,
//     '中雨': z1,
//     '暴雨': z2,
//     '小雨': z3,
//     '大雨': z4,
//     '大雾': z5,
//     '多云': z6,
//     '大雪': z7,
//     '冰雹': z8,
//     '雨夹雪': z9,
//     '阴': z10,
//     '雷阵雨': z11,
//     '中雪': z12,
//     '阵雨': z13,
//     '小雪': z14,
// }

const imgMap = [
  "晴",
  "多云",
  "阴",
  "阵雨",
  "雷阵雨",
  "雷阵雨伴有冰雹",
  "雨夹雪",
  "小雨",
  "中雨",
  "大雨",
  "暴雨",
  "大暴雨",
  "特大暴雨",
  "阵雪",
  "小雪",
  "中雪",
  "大雪",
  "暴雪",
  "雾",
  "冻雨",
  "沙尘暴",
  "小雨-中雨",
  "中雨-大雨",
  "大雨-暴雨",
  "暴雨-大暴雨",
  "大暴雨-特大暴雨",
  "小雪-中雪",
  "中雪-大雪",
  "大雪-暴雪",
  "浮尘",
  "扬沙",
  "强沙尘暴",
  "浓雾",
  "强浓雾",
  "霾",
  "中毒霾",
  "重度霾",
  "严重霾",
  "大雾",
  "特强浓雾",
  "无",
  "雨",
  "雪"
];

export default {
  data() {
    return {
      air: "21",
      pm: "2",
      wind: "东北风",
      power: "3级",
      humidity: "66%",
      temperature: "6℃",
      weather: "晴",
      weather1:"晴",
      weather2:"晴",
      weatherImg: "",
      weatherImg1: "",
      weatherImg2: "",
      alarm: "",
      future0: "0°-0°",
      future1: "0°-0°",
      future2: "0°-0°",
      nowWeather: []
    };
  },
  mounted() {
    this.getWeather();
    // axios
    //   .get("/base/listWeatherForJiSu?nowCity='普陀区'")
    //   .then(data => {
    //     console.log(data.data.data);
    //     this.air = data.data.data["气温 ℃"];
    //     this.wind = data.data.data["风向0"];
    //     this.power = data.data.data["风力0"];
    //     this.humidity = data.data.data["湿度 %"];
    //     this.temperature = data.data.data["温度0"];
    //     this.weather = data.data.data["天气"];
    //     this.alarm = data.data.data["预警信息"];
    //     // this.weatherImg = imgMap[this.weather]
    //     // this.weatherImg1 = imgMap[data.data.data['天气1']]
    //     // this.weatherImg2 = imgMap[data.data.data['天气2']]
    //     this.weatherImg = `static/img/weather/${imgMap.indexOf(
    //       this.weather
    //     )}.gif`;
    //     this.weatherImg1 = `static/img/weather/${imgMap.indexOf(
    //       data.data.data["天气1"]
    //     )}.gif`;
    //     this.weatherImg2 = `static/img/weather/${imgMap.indexOf(
    //       data.data.data["天气2"]
    //     )}.gif`;
    //     this.future0 = `${data.data.data["最低气温 ℃"].substring(
    //       0,
    //       data.data.data["最低气温 ℃"].length - 1
    //     )}°-${data.data.data["最高气温 ℃"].substring(
    //       0,
    //       data.data.data["最高气温 ℃"].length - 1
    //     )}°`;
    //     this.future1 = `${data.data.data["最低温度1"].substring(
    //       0,
    //       data.data.data["最低温度1"].length - 1
    //     )}°-${data.data.data["最高温度1"].substring(
    //       0,
    //       data.data.data["最高温度1"].length - 1
    //     )}°`;
    //     this.future2 = `${data.data.data["最低温度2"].substring(
    //       0,
    //       data.data.data["最低温度2"].length - 1
    //     )}°-${data.data.data["最高温度2"].substring(
    //       0,
    //       data.data.data["最高温度2"].length - 1
    //     )}°`;
    //   });
    axios.get("/base/getPuTuoWeather").then(res => {
      console.log(res);
      let tem = res.data.data.data;
      this.humidity = tem.dryBulTemp + "%";
      //this.air = tem.windDirectCn
      this.wind = tem.windDirectCn;
      this.power = tem.windLevelCn;
    });
    axios.get("/base/getPuTuoWeatherWeek").then(res => {
      console.log(res);
      let tem = res.data.data.data.list;
      this.weather = tem[0].dayWtString;
      this.weather1 = tem[1].dayWtString;
      this.weather2 = tem[2].dayWtString;
      this.future0 = tem[0].minTemp + "°-" + tem[0].maxTemp + "°";
      this.future1 = tem[1].minTemp + "°-" + tem[1].maxTemp + "°";
      this.future2 = tem[2].minTemp + "°-" + tem[2].maxTemp + "°";
      switch (this.weather) {
        case "晴":
          this.weatherImg = require("../../../assets/hotel/dayWhite/1晴.gif");
          break;
        case "少云":
          this.weatherImg = require("../../../assets/hotel/dayWhite/2少云.gif");

          break;
        case "多云":
          this.weatherImg = require("../../../assets/hotel/dayWhite/3多云.gif");

          break;
        case "阴天":
          this.weatherImg = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "阴":
          this.weatherImg = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "小雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "中雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/6中雨.gif");

          break;
        case "大雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/7大雨.gif");

          break;
        case "暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/8暴雨.gif");

          break;
        case "大暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/9大暴雨.gif");

          break;
        case "特大暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/10特大暴雨.gif");

          break;
        case "雷阵雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/11雷阵雨.gif");

          break;
        case "浮尘":
          this.weatherImg = require("../../../assets/hotel/dayWhite/12浮尘.gif");

          break;
        case "扬沙":
          this.weatherImg = require("../../../assets/hotel/dayWhite/13扬沙.gif");

          break;
        case "雨夹雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/14雨夹雪.gif");

          break;
        case "小雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "中雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/16中雪.gif");

          break;
        case "大雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/17大雪.gif");

          break;
        case "暴雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/18暴雪.gif");

          break;
        case "冻雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/19冻雨.gif");

          break;
        case "沙尘暴":
          this.weatherImg = require("../../../assets/hotel/dayWhite/20沙尘暴.gif");

          break;
        case "雷阵雨伴有冰雹":
          this.weatherImg = require("../../../assets/hotel/dayWhite/21雷阵雨伴有冰雹.gif");

          break;
        case "强沙尘暴":
          this.weatherImg = require("../../../assets/hotel/dayWhite/22沙尘暴.gif");

          break;
        case "雾":
          this.weatherImg = require("../../../assets/hotel/dayWhite/23雾.gif");
          break;
        case "阵雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/24阵雪.gif");

          break;
        case "阵雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/25阵雨.gif");

          break;
        case "小到中雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中到大雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大到暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "暴雨到大暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/29暴雨到大暴雨.gif");

          break;
        case "大暴雨到特大暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/30大暴雨到特大暴雨.gif");

          break;
        case "小到中雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中到大雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大到暴雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "小雨转中雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中雨转大雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大雨转暴雨":
          this.weatherImg = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "小雪转中雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中雪转大雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大雪转暴雪":
          this.weatherImg = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "霾":
          this.weatherImg = require("../../../assets/hotel/dayWhite/53雾霾.gif");

          break;

        // 默认代码块
      }
      switch (this.weather1) {
        case "晴":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/1晴.gif");
          break;
        case "少云":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/2少云.gif");

          break;
        case "多云":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/3多云.gif");

          break;
        case "阴天":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "阴":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "小雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "中雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/6中雨.gif");

          break;
        case "大雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/7大雨.gif");

          break;
        case "暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/8暴雨.gif");

          break;
        case "大暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/9大暴雨.gif");

          break;
        case "特大暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/10特大暴雨.gif");

          break;
        case "雷阵雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/11雷阵雨.gif");

          break;
        case "浮尘":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/12浮尘.gif");

          break;
        case "扬沙":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/13扬沙.gif");

          break;
        case "雨夹雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/14雨夹雪.gif");

          break;
        case "小雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "中雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/16中雪.gif");

          break;
        case "大雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/17大雪.gif");

          break;
        case "暴雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/18暴雪.gif");

          break;
        case "冻雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/19冻雨.gif");

          break;
        case "沙尘暴":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/20沙尘暴.gif");

          break;
        case "雷阵雨伴有冰雹":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/21雷阵雨伴有冰雹.gif");

          break;
        case "强沙尘暴":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/22沙尘暴.gif");

          break;
        case "雾":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/23雾.gif");
          break;
        case "阵雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/24阵雪.gif");

          break;
        case "阵雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/25阵雨.gif");

          break;
        case "小到中雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中到大雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大到暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "暴雨到大暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/29暴雨到大暴雨.gif");

          break;
        case "大暴雨到特大暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/30大暴雨到特大暴雨.gif");

          break;
        case "小到中雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中到大雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大到暴雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "小雨转中雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中雨转大雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大雨转暴雨":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "小雪转中雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中雪转大雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大雪转暴雪":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "霾":
          this.weatherImg1 = require("../../../assets/hotel/dayWhite/53雾霾.gif");

          break;

        // 默认代码块
      }
      switch (this.weather2) {
        case "晴":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/1晴.gif");
          break;
        case "少云":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/2少云.gif");

          break;
        case "多云":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/3多云.gif");

          break;
        case "阴天":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "阴":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/4阴.gif");
          break;
        case "小雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/5雨.gif");
          break;
        case "中雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/6中雨.gif");

          break;
        case "大雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/7大雨.gif");

          break;
        case "暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/8暴雨.gif");

          break;
        case "大暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/9大暴雨.gif");

          break;
        case "特大暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/10特大暴雨.gif");

          break;
        case "雷阵雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/11雷阵雨.gif");

          break;
        case "浮尘":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/12浮尘.gif");

          break;
        case "扬沙":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/13扬沙.gif");

          break;
        case "雨夹雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/14雨夹雪.gif");

          break;
        case "小雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/15小雪.gif");

          break;
        case "中雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/16中雪.gif");

          break;
        case "大雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/17大雪.gif");

          break;
        case "暴雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/18暴雪.gif");

          break;
        case "冻雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/19冻雨.gif");

          break;
        case "沙尘暴":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/20沙尘暴.gif");

          break;
        case "雷阵雨伴有冰雹":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/21雷阵雨伴有冰雹.gif");

          break;
        case "强沙尘暴":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/22沙尘暴.gif");

          break;
        case "雾":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/23雾.gif");
          break;
        case "阵雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/24阵雪.gif");

          break;
        case "阵雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/25阵雨.gif");

          break;
        case "小到中雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中到大雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大到暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "暴雨到大暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/29暴雨到大暴雨.gif");

          break;
        case "大暴雨到特大暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/30大暴雨到特大暴雨.gif");

          break;
        case "小到中雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中到大雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大到暴雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "小雨转中雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/26小到中雨.gif");

          break;
        case "中雨转大雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/27中到大雨.gif");

          break;
        case "大雨转暴雨":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/28大到暴雨.gif");

          break;
        case "小雪转中雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/31小到中雪.gif");

          break;
        case "中雪转大雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/32中到大雪.gif");

          break;
        case "大雪转暴雪":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/33大到暴雪.gif");

          break;
        case "霾":
          this.weatherImg2 = require("../../../assets/hotel/dayWhite/53雾霾.gif");

          break;

        // 默认代码块
      }
    });
  },
  methods: {
    async getWeather() {
      let nowRes = await this.$http.get(`/base/getPuTuoWeather`);
      if (nowRes.data.msg == "操作成功") {
        this.nowWeather = nowRes.data.data;
      }
    },
    skip() {
      // const { href } = this.$router.resolve({
      //   path: "/weather"
      // });
      // window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="less">
.root {
  .rimStyle();

  .content {
    height: 11.75rem;
    position: relative;
    padding-top: 1rem;
    box-sizing: border-box;
  }

  .immediately {
    .flexDefault();
    justify-content: flex-start;
    .angle {
      margin-left: 1.25rem;
      font-size: 4rem;
      color: #0ce3dc;
      background: url("../../../assets/img/weather/t@2x.png") no-repeat;
      width: 8.95rem;
      height: 5.5rem;
      background-size: 8.95rem 5.5rem;
      .flexDefault();
    }

    .details {
      color: #add5fa;
      font-size: 0.7rem;
      width: 12rem;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(3, 33.33%);
      grid-gap: 0.15rem 0.1rem;
      height: 5.5rem;
      margin-left: 0.75rem;

      & > div {
        line-height: 1.45rem;
        // width: 5rem;
        height: 1.45rem;
        // margin: 0 7px;
        padding-left: 0.6rem;
        box-sizing: border-box;

        b {
          color: #ee6723;
        }

        &:not(:nth-child(4)) {
          background: url("../../../assets/img/weather/group@2x.png") no-repeat;
          background-size: 5rem 1.45rem;
        }
        &:nth-child(4) {
          grid-row: 2 / span 2;
          grid-column: 2 / span 1;
          height: auto;
        }
      }

      .icon {
        .flexDefault();
        justify-content: flex-start;
        padding-left: 0;
        img {
          width: 2.8rem;
          // height: 2.8rem;
        }
        span {
          margin-left: 0.5rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  .history {
    .flexDefault();
    justify-content: space-around;
    font-size: 0.8rem;
    color: #0ce3dc;
    margin-top: 1.5rem;

    li {
      .flexDefault();
      img {
        width: 2rem;
        height: 2rem;
      }
      div {
        margin-left: 0.5rem;
        line-height: 1rem;
        p:first-child {
          font-size: 0.7rem;
          color: #5583ae;
          text-align: center;
        }
      }
    }
  }

  .alarm {
    background: rgba(241, 79, 70, 0.2);
    height: 1.5rem;
    line-height: 1.5rem;
    position: absolute;
    bottom: 0;
    width: 93%;
    color: #f14f46;
    font-size: 0.7rem;
    margin-left: 0.3rem;
    .flexDefault(flex-start);
    padding-left: 1rem;

    .image {
      position: relative;
      margin-right: 0.5rem;
      width: 1.05rem;
      height: 1.05rem;

      img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 22;
      }

      &::after {
        content: "";
        width: 180%;
        height: 180%;
        background: rgba(241, 79, 70, 0.2);
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: breathing 4s ease-out infinite;
        // animation-direction:alternate;
        transform-origin: -0.25rem;
      }
    }
  }
}

@keyframes breathing {
  0% {
    transform: scale(0.7) translate(-50%, -50%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>

