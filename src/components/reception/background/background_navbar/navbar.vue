<template>
  <div class="background_basis_navbar">
    <div class="backgroung_basis_title">基础信息采集系统</div>
    <div class="backgroung_basis_left_lists">
      <ul>
        <li v-for="(item, index) in nav_list" :key="index">
          <div v-for="(little, index) in item.paths" :key="index">
            <div>{{item.name}}</div>
            <router-link :to="little.path">{{little.name}}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nav_list: [
        {
          name: "基础信息采集",
          paths: [
            {
              name: "景区管理",
              path: "/basisScenic"
            },
            {
              name: "宾馆管理",
              path: "/basisHotel"
            },
            {
              name: "餐饮管理",
              path: "/basisCatering"
            },
            {
              name: "农家乐管理",
              path: "/basisAgritainment"
            },
            {
              name: "图书馆管理",
              path: "/basisLibrary"
            },
            {
              name: "博物馆管理",
              path: "/basisMuseum"
            },
            {
              name: "文化馆管理",
              path: "/basisCulture"
            },
            {
              name: "非遗场所管理",
              path: "/basisIch"
            },
            {
              name: "公共服务管理",
              path: "/basisPublic"
            },
            {
              name: "体育场馆管理",
              path: "/basisSports"
            },
            {
              name: "购物场所管理",
              path: "/basisShopping"
            }
          ]
        },
        {
          name: "基础信息采集22",
          paths: [
            {
              name: "景区管理22",
              path: "/basisScenic"
            }
          ]
        }
      ],
      nowIndex: 0
    };
  }
};
</script>
<style>
.backgroung_basis_title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #5e87b0;
  padding-left: 20px;
  color: #fff;
  font-size: 27px;
}
.backgroung_basis_left_lists {
  height: 100%;
  float: left;
  width: 180px;
}
.backgroung_basis_left_lists > ul > li {
  width: 100%;
  text-align: left;
  height: 50px;
  line-height: 50px;
  padding-left: 40px;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
.backgroung_basis_left_lists > ul > li > a {
  text-decoration: none;
  color: #515a6e;
}
.basic_choose_active {
  color: #00c2f3;
}
</style>