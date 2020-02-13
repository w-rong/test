<template>
  <!-- 导航栏+左边列表页 -->
  <div>
    <!-- 导航栏 -->
    <nav class="content">
      <div class="nav-left">
        <div class="logo"></div>
        <div>基础信息采集系统</div>
      </div>
      <div class="nav-right">
        <p>欢迎你</p>
        <p>admin</p>
      </div>
    </nav>
    <!-- 左边列表页 -->
    <div class="list_classify">
      <left-row
        v-for="(item, index) in items"
        :key="index"
        :items="item.paths"
        :index="index"
        :nowindex="nowindex"
        @shownav="recieve"
      >
        <img :src="item.src" alt />
        <strong>
          <div>{{item.name}}</div>
        </strong>
      </left-row>
    </div>
  </div>
</template>
<script>
import LeftRow from "./LeftRow.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      remShow: false,
      infoShow: false,
      isResource: false,
      isEvent: false,
      isKnowledge: false,
      clickedindex: -1,
      showindex: -1,
      nowindex: 0,
      isBacked: true,
      items: [
        {
          src: require('../../../../assets/img/thing.png'),
          name: "基础信息采集",
          paths: [
            {
              title: "景区管理",
              path: "/basisScenic"
            },
            {
              title: "宾馆管理",
              path: "/basisHotel"
            },
            {
              title: "餐饮管理",
              path: "/basisCatering"
            },
            {
              title: "农家乐管理",
              path: "/basisAgritainment"
            },
            {
              title: "图书馆管理",
              path: "/basisLibrary"
            },
            {
              title: "博物馆管理",
              path: "/basisMuseum"
            },
            {
              title: "文化馆管理",
              path: "/basisCulture"
            },
            {
              title: "非遗场所管理",
              path: "/basisIch"
            },
            {
              title: "旅行社管理",
              path: "/basisTravel"
            },
            {
              title: "休闲娱乐场所管理",
              path: "/basisPlay"
            },
            {
              title: "购物场所管理",
              path: "/basisShopping"
            },
            // {
            //   title: "体育场馆管理",
            //   path: "/basisSports"
            // },
            {
              title: "单位管理",
              path: "/basisUnit"
            }
          ]
        },
        //  {
        //   src: require('../../../../assets/img/thing.png'),
        //   name: "应急事件管理",
        //   paths: [
        //     { path: "/meetThing", title: "应急事件列表" },
        //     { path: "/meetPlan", title: "应急预案列表" },
        //     { path: "/emergencyThing", title: "突发事件列表" }
        //   ]
        // },
        // {
        //   src: require('../../../../assets/img/thing.png'),
        //   name: "应急资源管理",
        //   paths: [
        //     { path: "/meetPerson", title: "应急人员列表" },
        //     { path: "/meetOrg", title: "应急机构列表" },
        //     { path: "/meetDuty", title: "值班信息列表" },
        //     { path: "/meetAddressBook", title: "通讯录列表" },
        //     ]
        // },
        // {
        //   src: require('../../../../assets/img/thing.png'),
        //   name: "监控管理",
        //   paths: [
        //     { path: "/scenicMon", title: "景区监控设置" },
        //     { path: "/monitor", title: "监控点位设置" },
        //     ]
        // }
        //  {
        //   src: require('../../../../assets/img/thing.png'),
        //   name: "监控管理",
        //   paths: [
        //     { path: "/monitoring", title: "监控点位管理" },
        //     { path: "/monSetting", title: "景区监控设置" }
        //   ]
        // },
        // {
        //   src: "../../../../img/thing.png",
        //   name: "景区全景图管理",
        //   paths: [
        //     { path: "/fullView", title: "景区全景图管理" },
        //     { path: "/handPaint", title: "景区手绘地图管理" },
        //     ]
        // }
      ],
    };
  },
  methods: {
    reminder() {
      this.remShow = !this.remShow;
    },
    infolist() {
      this.infoShow = !this.infoShow;
    },
    resource() {
      this.isResource = !this.isResource;
    },
    event() {
      this.isEvent = !this.isEvent;
    },
    knowledge() {
      this.isKnowledge = !this.isKnowledge;
    },
    colorindex(index) {
      this.clickedindex = index;
    },
    recieve() {
      this.nowindex = arguments[0];
    },
    isBack() {
      // var url2 = location.search;
      // var str = url2.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      // var strs = str.split("&");
      // var obj = {};
      // for (var i = 0; i < strs.length; i++) {
      //   var str1 = strs[i].split("=");
      //   obj[str1[0]] = str1[1];
      //   var newarr = [];
      //   newarr.push(obj);
      // }
      // console.log(newarr);
      // let newarr = location.search.substr(1).substring(0,location.search.substr(1).indexOf('?'))
      // console.log(newarr == '');
      // if (newarr == '') {
      //   this.isBacked = true;
      // } else {
      //    if (newarr == "true") {
      //   this.isBacked = true;
      // } else {
      //   this.isBacked = false;
      // }
      // }
     
      // console.log(this.items);
    }
  },
  components: {
    LeftRow
  },
  computed: {
    ...mapGetters(["routepath"])
  },
  created() {
    // this.isBack();
  },
  watch: {
    routepath(val) {
      console.log(val);
      // console.log(this.items[0].paths);
      var listPath = [];
      this.items2[0].paths.forEach(element => {
        listPath.push(element.path);
      });
      console.log(listPath);
      if (this.isBacked == true) {
        console.log(listPath.includes(val));
        if (listPath.includes(val)) {
          this.nowindex = 0;
        } else {
          this.nowindex = 1;
          // if (val == "/fullView") {
          //   this.nowindex = 2;
          // } else {
          //   this.nowindex = 1;
          // }
        }
      } else {
        // if (listPath.includes(val)) {
        //   this.nowindex = 0;
        // } else {
        //   if (val == "/fullView") {
        //     this.nowindex = 2;
        //   } else {
        //     this.nowindex = 1;
        //   }
        // }
      }
    }
  }
};
</script>
<style scoped>
.choosecolor {
  color: blue;
  text-decoration: underline;
}
.content {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  background: none repeat scroll 0 0 #5e87b0;
  border: none;
  border-radius: 0;
  margin: 0;
  position: relative;
  height: 50px;
  line-height: 50px;
}
.nav-left {
  display: flex;
  /* align-items: center; */
}
.nav-left button {
  width: 40px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  border: 1px solid transparent;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  background-color: #5e87b0;
}
.nav-left img {
  display: block;
  width: 36px;
  height: 36px;
  margin: 0 5px;
}
.nav-left div {
  font-weight: 500;
  font-size: 27px;
  color: white;
}
.nav-right {
  display: flex;
  align-items: center;
}
.nav-right p {
  font-size: 13px;
  color: #fff;
}
.nav-right p:nth-of-type(1) {
  margin-right: 10px;
}

.list_classify {
  background-color: #f4f4f4;
  float: left;
  font-size: 12px;
  color: #515a6e;
}

.list_classify::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.list_classify .index a {
  width: 200px;
  font-size: 13px;
  text-decoration: none;
  font-weight: 700;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
  color: #555555;
}
.list_classify .index a img {
  display: block;
  margin-right: 20px;
}
.list_classify > ul {
  width: 200px;
  padding-right: 10px;
  border-right: 1px solid #e7e7e7;
}
.list_classify > div {
  cursor: pointer;
  width: 200px;
  padding-right: 10px;
  /* border-right: 1px solid #e7e7e7; */
}
.list_classify > ul > li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  padding: 15px 15px 15px 20px;
  border-bottom: 1px solid #ffffff;
  border-top: 1px solid #e7e7e7;
  color: #555555;
  cursor: pointer;
}
.list_classify > ul > li:hover {
  background-color: #fff;
}
.list_classify > ul > li > div {
  display: flex;
}
.list_classify > ul > li img {
  margin-right: 5px;
}
.logo {
  margin-right: 10px;
}
/* 左拉 */
.arrow-left {
  border: 5px solid transparent;
  border-right-color: #555;
  width: 5px;
  height: 5px;
  margin-left: 5px;
}
.arrow-bottom {
  border: 5px solid transparent;
  border-top-color: #555;
  width: 5px;
  height: 5px;
  margin-left: 5px;
}
.list_classify > ul > li.management,
.list_classify > ul > li.thing,
.list_classify > ul > li.courage {
  flex-direction: column;
  font-size: 13px;
  font-weight: normal;
  padding-top: 0;
}
.list_classify > ul > li > a {
  color: #555;

  margin: 5px 0;
}
</style>