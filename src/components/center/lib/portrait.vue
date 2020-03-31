<template>
  <div
    class="root"
    @click="skip()"
    :style="{transform: `scale(${scale})`, transformOrigin: 'center bottom'}"
  >
    <h3 class="svgh3">本月游客画像</h3>
    <div class="content">
      <section class="portrait-block ider">
        <h4>游客身份</h4>
        <ul>
          <li v-for="(i, idx) in list" :key="idx">
            <label style="width:10px">{{i.name}}</label>
            <img src="@/assets/img/portrait/chartbg@2x.png" alt />
            <svg
              width="106"
              height="106"
              version="1.1"
              class="pie"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <!-- <radialGradient id="Gradient"
                                        cx="0" cy="0" r="100" fx="100" fy="100">
                                    <stop offset="0%" stop-color="red"/>
                                    <stop offset="100%" stop-color="blue"/>
                </radialGradient>-->
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#92cbfe" />
                  <stop offset="100%" stop-color="#2382f7" />
                </linearGradient>
              </defs>
              <circle cx="53" cy="53" r="28" stroke="url(#linear)">
                <animate
                  attributeName="stroke-dashoffset"
                  :to="getVal(i.value, 175)"
                  dur="1s"
                  fill="freeze"
                />
              </circle>
            </svg>
            <p>
              <b>{{i.value * 100 | fixed}}</b>%
            </p>
          </li>
        </ul>
      </section>
      <section class="portrait-block gender">
        <h4>性别统计</h4>
        <div class="gender-area">
          <div class="woman">
            <img src="@/assets/img/portrait/man.png" alt />
            <p>{{(male * 10000) / 100 | fixed}}%</p>
          </div>
          <div class="chart">
            <svg
              :width="genderR * 2 + 10"
              :height="genderR * 2 + 10"
              version="1.1"
              class="pie"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                :cx="genderWidth"
                :cy="genderWidth"
                :r="genderR - 5"
                stroke="#08b0ff"
                class="ring manchart"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  :to="-getVal(male, 251)"
                  dur="1s"
                  fill="freeze"
                />
              </circle>
              <circle
                :cx="genderWidth"
                :cy="genderWidth"
                :r="genderR * 0.7"
                stroke="rgba(0,87,168,0.1)"
                class="ring"
              />
              <circle
                :cx="genderWidth"
                :cy="genderWidth"
                :r="genderR * 0.7"
                stroke="#ff78ba"
                class="ring womanchart"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  :to="getVal(female, 198)"
                  dur="1s"
                  fill="freeze"
                />
              </circle>
              <circle
                :cx="genderWidth"
                :cy="genderWidth"
                :r="genderR"
                stroke="rgba(0,87,168,0.5)"
                fill="none"
                stroke-width="1"
              />
              <circle
                :cx="genderWidth"
                :cy="genderWidth"
                :r="genderR * 0.75"
                stroke="rgba(0,87,168,0.5)"
                fill="none"
                stroke-width="1"
              />
              <circle :cx="genderWidth" :cy="genderWidth" r="2" fill="#0057A8" />
              <line :x1="genderWidth" :y1="genderWidth" :x2="genderWidth" y2="0" stroke="#0057A8" />
              <line
                :x1="genderWidth"
                :y1="genderWidth"
                :x2="endPoint[0]"
                :y2="endPoint[1]"
                stroke="#0057A8"
                class="endline"
              />
            </svg>
          </div>
          <div class="woman">
            <img src="@/assets/img/portrait/woman.png" alt />
            <p>{{(female * 10000) / 100 | fixed}}%</p>
          </div>
          <div class="decoration"></div>
        </div>
      </section>
      <section class="portrait-block age">
        <h4>年龄段</h4>
        <div class="age-content">
          <div ref="chartpie" class="chartpie"></div>
          <ul class="lenged">
            <li v-for="(i, key) in ageList" :key="key">{{i}}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { options, setColors } from "../options/portrait";
import axios from "@/http";
import { getDate } from "@/utils/utils";
import qs from "qs";

function getControl(p1, p2, curveness) {
  return [
    (p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness,
    (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness
  ];
}
const genderR = 45;

function angle(an) {
  let r = 51;
  let angle = (Math.PI / 180) * an;
  let y = genderR + 5 + r * Math.sin(angle);
  let x = genderR + 5 + r * Math.cos(angle);

  return [x, y];
}

const map = {
  married: "已婚",
  withChild: "携子",
  tourismDr: "旅游达人",
  revisitRatio: "重游"
};

const agemap = {
  age20to25: "20-25岁",
  age25to30: "25-30岁",
  age30to35: "30-35岁",
  age35to40: "35-40岁",
  age40: "40岁以上"
};

export default {
  data() {
    return {
      list: [],
      male: 0,
      female: 0,
      genderR: genderR,
      ageList: Object.values(agemap),
      scale: 1
    };
  },
  filters: {
    fixed(value) {
      return value.toFixed(2);
    }
  },
  computed: {
    genderWidth() {
      return this.genderR + 5;
    },
    endPoint() {
      return angle(360 * (this.female / 100));
    }
  },
  methods: {
    getVal(val, max) {
      return max * (1 - val);
    },
    initChartPie() {
      let chart = this.$echarts.init(this.$refs.chartpie);
      chart.setOption(options);
      // console.log(getDate());
      // axios.post('/tourist/findPortraitAttribute', {queryTime: getDate(), valueType: 'age'})
      axios
        .post(
          "/tourist/findPortraitAttribute",
          qs.stringify({ queryTime: "2019-12", valueType: "age" })
        )
        .then(data => {
          // console.log(data.data.data);
          let values = Object.values(data.data.data);
          let ageData = values.map(d => (d * 10000) / 100);
          let result = setColors(values);
          // console.log(ageData);
          // console.log(result);

          chart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{d}%",
              show: true
            },
            series: [
              {
                axisLine: {
                  lineStyle: {
                    color: result
                  }
                }
              },

              {
                data: ageData
              }
            ]
          });
        });
    },
    getIder() {
      // let dentity = axios.post('/tourist/findPortraitIdentity', {queryTime: getDate()})
      // let revisit = axios.post('/tourist/findPortraitRevisit', {queryTime: getDate()})
      let dentity = axios.post(
        "/tourist/findPortraitIdentity",
        qs.stringify({ queryTime: "2019-12" })
      );
      let revisit = axios.post(
        "/tourist/findPortraitRevisit",
        qs.stringify({ queryTime: "2019-12" })
      );
      Promise.all([dentity, revisit]).then(data => {
        // console.log(data);
        this.list = [
          {
            value: data[0].data.data["married"],
            name: map["married"]
          },
          {
            value: data[0].data.data["withChild"],
            name: map["withChild"]
          },
          {
            value: data[0].data.data["tourismDr"],
            name: map["tourismDr"]
          },
          // {
          //   value: data[1].data.data["revisitRatio"],
          //   name: map["revisitRatio"]
          // }
        ];
      });
    },
    getGender() {
      // axios.post('/tourist/findPortraitAttribute', {queryTime: getDate(), valueType: 'gender'})
      axios
        .post(
          "/tourist/findPortraitAttribute",
          qs.stringify({ queryTime: "2019-12", valueType: "gender" })
        )
        .then(data => {
          // console.log(data);
          this.male = data.data.data.male;
          this.female = data.data.data.female;
          // console.log(data);
        });
    },
    skip() {
      // const { href } = this.$router.resolve({
      //   path: "/basicPortrait"
      // });
      // window.open(href, "_blank");
    }
  },
  mounted() {
    this.initChartPie();
    this.getIder();
    this.getGender();

    this.scale = window.scale;
  }
};
</script>

<style scoped lang="less">
.root {
  width: 860px;
  height: 293px;
  background: url("../../../assets/img/portrait/bg@2x.png") no-repeat;
  background-size: 860px 293px;
  position: absolute;
  bottom: 0.9rem;

  .svgh3 {
    line-height: 59px;
    font-size: 22px;
  }

  .title();

  .content {
    display: flex;
    height: 300px - 59px;
    .portrait-block {
      box-sizing: border-box;
      height: 100%;
      color: #bfe0ff;
      padding: 5px 0;

      h4 {
        margin: 0 auto;
        background: url("../../../assets/img/portrait/titlebg@2x.png") no-repeat;
        background-size: 175px 34px;
        width: 175px;
        height: 34px;
        font-size: 16px;
        color: #c1e0ef;
        text-align: center;
        line-height: 31px;
      }
    }
  }
}

.ider {
  width: 360px;
  ul {
    position: absolute;
    // overflow: hidden;
    // height: 100%;

    li {
      width: 106px;
      height: 106px;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 13px;
      label {
        position: absolute;
        writing-mode: vertical-lr;
        top: 50%;
        left: -10px;
        transform: translatey(-50%);
      }
      img {
        position: absolute;
        width: 106px;
        height: 106px;
      }
      .pie {
        position: absolute;
      }

      &:nth-child(1) {
        left: 50px;
        top: 7px;
        img {
          .move_rotate();
        }
      }
      &:nth-child(2) {
        left: 231px;
        top: 7px;
        img {
          .move_rotate(0.5s);
        }
      }
      &:nth-child(3) {
        left: 148px;
        top: 78px;
        img {
          .move_rotate(1s);
        }
      }
      &:nth-child(4) {
        left: 193px;
        top: 78px;
        img {
          .move_rotate(1.5s);
        }
      }
      p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #0ce3dc;
        b {
          font-size: 16px;
        }
      }
    }
  }
  circle {
    stroke-linecap: round;
    fill: none;
    stroke-width: 4;
    stroke-dasharray: 175;
    stroke-dashoffset: 175;
    transform: rotatez(-90deg);
    transform-origin: 53px;
  }
}

@origin: 45px + 5px;
.gender {
  width: 205px;
  position: relative;
  .gender-area {
    font-size: 14px;
    display: flex;
    color: #4abffe;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
    text-align: center;

    .man,
    .woman {
      max-width: 50px;
      overflow: hidden;
    }
    .ring {
      fill: none;
      stroke-width: 4;
    }
    .manchart {
      stroke-dasharray: 251;
      stroke-dashoffset: 0;
      transform: rotatez(-90deg);
      transform-origin: @origin;
    }
    .womanchart {
      stroke-dasharray: 198;
      stroke-dashoffset: 198;
      transform: rotatez(-90deg);
      transform-origin: @origin;
    }
    .endline {
      transform: rotate(-90deg);
      transform-origin: @origin;
    }
  }

  .decoration {
    background: url("../../../assets/img/portrait/decoration@2x.png") no-repeat;
    background-size: 201px 47px;
    width: 201px;
    height: 47px;
    position: absolute;
    bottom: 25px;
  }
}

.age {
  flex: 1;

  .age-content {
    display: flex;
    font-size: 14px;
    color: #bfe0ff;
    align-items: center;
    margin-top: 15px;

    .chartpie {
      width: 120px;
      height: 150px;
      margin-left: 20px;
    }

    .lenged {
      margin-left: 20px;
      line-height: 23px;

      li {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50% - 2.5px;
          left: -15px;
          border-radius: 50%;
          width: 5px;
          height: 5px;
        }
        &:nth-child(1)::after {
          background: #2080f7;
        }
        &:nth-child(2)::after {
          background: #02d7cb;
        }
        &:nth-child(3)::after {
          background: #f5c70f;
        }
        &:nth-child(4)::after {
          background: #ae52ff;
        }
        &:nth-child(5)::after {
          background: #fa9837;
        }
        &:nth-child(6)::after {
          background: #4fdb5d;
        }
      }
    }
  }
}
</style>

