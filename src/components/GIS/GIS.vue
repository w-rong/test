<template>
  <div class="gis_content">
    <div class="gis_title" @click="isShrink = false">
      GIS资源一张图
      <div
        class="gis_title_left_word"
        style="cursor:pointer"
        @click="$router.push('/basisScenic')"
      >普陀基础数据采集系统</div>
    </div>
    <div id="my_map_putuo" @click="isShrink = false"></div>
    <!-- 左边列表 -->
    <div class="gis_left_list" v-if="isShrink">
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
            <input type="text" v-model="searchName" placeholder="搜索" />
          </div>
          <!-- 列表 -->
          <!-- 景区 -->
          <div class="gis_left_check_result_list" v-if="classifyChoose == '景区'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.unitName}}</p>
                <p>{{item.level | scenicLevel}}</p>
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '宾馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.hotelName}}</p>
                <p>{{item.level | scenicLevel}}</p>
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '公共服务'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.serviceName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '购物场所'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.shoppingName}}</p>
                <p>{{item.level | scenicLevel}}</p>
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '教育机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.eduOrganName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '非遗场所'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.unheritageStationName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '农家乐'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.agritainmentName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文物商店'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.heritageShopName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '餐饮'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.restaurantName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文物保护管理机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalProtectName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化艺术科研机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalScienceName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化站'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalStationName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '图书馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.libraryName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化行政主管部门'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalManageName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '博物馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.museumName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '农家乡村'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.villageName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化产业示范（试验）园区和示范基地'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalExampleName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '非公有制艺术表演场馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.unpubStationName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '公共卫生间'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.toiletName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '表演场馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.performVenueName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '产业'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.industryName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '人文设施'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.humanityName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '非物质文化遗产保护中心'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.unheritageCenterName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '红色旅游信息'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.redTravelName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '风情小镇'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.townName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文物拍卖企业'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.heritageAuctionName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化市场综合执法机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalExecuteName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '演出经纪机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.showBrokerName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文物保护科研机构'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalProtectScienceName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '其他文物企业'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.otherHeritageName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '休闲娱乐'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.entertainmentName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '文化馆'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.culturalCenterName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '非公有制艺术表演团体'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.unpubPerformName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '旅行社'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.travelName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
          <div class="gis_left_check_result_list" v-if="classifyChoose == '网吧'">
            <div class="gis_left_check_result" v-for="(item, index) in leftList" :key="index">
              <div class="gis_left_check_result_img" v-if="item.flagPic!=null">
                <img :src="'http://txl.tourzj.gov.cn/sitepic/ImgSmall/'+item.flagPic" alt />
              </div>
              <div class="gis_left_check_result_img" v-else>
                <img src="../../assets/image/gis/icon/noPic.jpg" alt />
              </div>
              <div class="gis_left_check_result_info">
                <p>{{item.internetBarName}}</p>
                <!-- <p>{{item.level | scenicLevel}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 统计 -->
        <div class="gis_left_statis" v-else>
          <ul>
            <li
              @click="chooseClassify(item.name)"
              v-for="(item, index) in allClassifyList"
              :key="index"
              style="cursor: pointer;"
            >
              <img :src="item.name == classifyChoose?item.imgUrl_c: item.imgUrl" alt />
              <div>
                {{item.name | points}}
                {{item.value}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 缩略图 -->
    <div class="gis_left_shrink" v-else @click="isShrink = true">
      <div class="gis_left_shrink_words">
        <p>{{classifyChoose}}</p>
        <p>{{allClassify[classifyChoose]}}</p>
      </div>
      <div class="gis_left_shrink_img">
        <div class="gis_left_shrink_img_circle"></div>
        <!-- <div class="gis_left_shrink_img_circle"></div> -->
        <div class="gis_left_shrink_img_circle_img">
          <img v-if="classifyChoose == '景区'" src="../../assets/image/gis/scenic.png" alt />
          <img v-if="classifyChoose == '宾馆'" src="../../assets/image/gis/hotel.png" alt />
          <img v-if="classifyChoose == '文化馆'" src="../../assets/image/gis/scenic.png" alt />
          <img v-if="classifyChoose == '博物馆'" src="../../assets/image/gis/scenic.png" alt />
          <img v-if="classifyChoose == '购物场所'" src="../../assets/image/gis/shopping.png" alt />
          <img v-if="classifyChoose == '非遗场所'" src="../../assets/image/gis/scenic.png" alt />
          <img v-if="classifyChoose == '公共服务'" src="../../assets/image/gis/public.png" alt />
          <img v-if="classifyChoose == '农家乐'" src="../../assets/image/gis/arg.png" alt />
          <img v-if="classifyChoose == '餐饮'" src="../../assets/image/gis/catering.png" alt />
          <img v-if="classifyChoose == '休闲娱乐'" src="../../assets/image/gis/play.png" alt />
          <img v-if="classifyChoose == '旅行社'" src="../../assets/image/gis/travel.png" alt />
          <img v-if="classifyChoose == '图书馆'" src="../../assets/image/gis/scenic.png" alt />
        </div>
      </div>
    </div>
    <!-- 右边列表 -->
    <div class="gis_right_list" @click="isShrink = false">
      <div class="gis_right_list_title">基础资源信息</div>
      <div class="gis_right_list_title_select">
        <select v-model="classifyChoose" @change="selectList()">
          <option
            class="gis_right_list_title_option"
            v-for="(item, index) in allClassifyName"
            :key="index"
            :value="item"
          >{{item}}</option>
        </select>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '景区'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge(item)"
        >
          <div>{{item.unitName}}</div>
          <div>{{item.level | scenicStatus}}</div>
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '宾馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge1(item)"
        >
          <div>{{item.hotelName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '公共服务'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge11(item)"
        >
          <div>{{item.serviceName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '购物场所'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge2(item)"
        >
          <div>{{item.shoppingName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '教育机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge12(item)"
        >
          <div>{{item.eduOrganName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非遗场所'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge3(item)"
        >
          <div>{{item.unheritageStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '农家乐'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge4(item)"
        >
          <div>{{item.agritainmentName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物商店'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge13(item)"
        >
          <div>{{item.heritageShopName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '餐饮'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge5(item)"
        >
          <div>{{item.restaurantName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物保护管理机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge14(item)"
        >
          <div>{{item.culturalProtectName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化艺术科研机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge16(item)"
        >
          <div>{{item.culturalScienceName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化站'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge17(item)"
        >
          <div>{{item.culturalStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '图书馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge6(item)"
        >
          <div>{{item.libraryName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化行政主管部门'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge18(item)"
        >
          <div>{{item.culturalManageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '博物馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge7(item)"
        >
          <div>{{item.museumName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '农家乡村'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge19(item)"
        >
          <div>{{item.villageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化产业示范（试验）园区和示范基地'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge20(item)"
        >
          <div>{{item.culturalExampleName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非公有制艺术表演场馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge21(item)"
        >
          <div>{{item.unpubStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '公共卫生间'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge22(item)"
        >
          <div>{{item.toiletName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '表演场馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge23(item)"
        >
          <div>{{item.performVenueName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '产业'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.industryName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '人文设施'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge24(item)"
        >
          <div>{{item.humanityName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div
        class="gis_right_list_content"
        v-if="classifyChoose == '非物质文化遗产保护中心'"
        @click="showBridge25(item)"
      >
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unheritageCenterName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '红色旅游信息'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge26(item)"
        >
          <div>{{item.redTravelName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '风情小镇'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.townName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物拍卖企业'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge27(item)"
        >
          <div>{{item.heritageAuctionName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化市场综合执法机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge28(item)"
        >
          <div>{{item.culturalExecuteName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '演出经纪机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge29(item)"
        >
          <div>{{item.showBrokerName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物保护科研机构'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge15(item)"
        >
          <div>{{item.culturalProtectScienceName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '其他文物企业'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge30(item)"
        >
          <div>{{item.otherHeritageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '休闲娱乐'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge8(item)"
        >
          <div>{{item.entertainmentName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化馆'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge9(item)"
        >
          <div>{{item.culturalCenterName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非公有制艺术表演团体'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge31(item)"
        >
          <div>{{item.unpubPerformName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '旅行社'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge10(item)"
        >
          <div>{{item.travelName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '网吧'">
        <div
          class="gis_right_list_content_list"
          v-for="(item, index) in rightList"
          :key="index"
          @click="showBridge32(item)"
        >
          <div>{{item.internetBarName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
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
      searchName: "",
      isShrink: false,
      allClassify: [],
      allClassifyName: [],
      allClassifyList: [],
      leftList: [],
      rightList: [],
      arrayObj: [],
      classifyChoose: "景区",
      buttonList: [{ name: "统计" }, { name: "查询" }],
      classifyDetailList: [
        {
          name: "普陀山风景名胜区",
          value: "5A景区"
        },
        {
          name: "沈家门渔港小镇景区",
          value: "5A景区"
        },
        {
          name: "舟山桃花岛风景旅游区",
          value: "5A景区"
        },
        {
          name: "普陀山风景名胜区",
          value: "5A景区"
        },
        {
          name: "沈家门渔港小镇景区",
          value: "5A景区"
        },
        {
          name: "舟山桃花岛风景旅游区",
          value: "5A景区"
        },
        {
          name: "普陀山风景名胜区",
          value: "5A景区"
        },
        {
          name: "沈家门渔港小镇景区",
          value: "5A景区"
        },
        {
          name: "舟山桃花岛风景旅游区",
          value: "5A景区"
        },
        {
          name: "普陀山风景名胜区",
          value: "5A景区"
        },
        {
          name: "沈家门渔港小镇景区",
          value: "5A景区"
        },
        {
          name: "舟山桃花岛风景旅游区",
          value: "5A景区"
        },
        {
          name: "普陀山风景名胜区",
          value: "5A景区"
        },
        {
          name: "沈家门渔港小镇景区",
          value: "5A景区"
        },
        {
          name: "舟山桃花岛风景旅游区",
          value: "5A景区"
        }
      ]
    };
  },
  methods: {
    chooseLeft(index) {
      this.nowIndex = index;
      // this.getAllClassify();
    },
    initMap() {
      document.querySelector("#my_map_putuo").innerHTML = "";
      // console.log(document.querySelector("#my_map_putuo").innerHTML);
      this.map = "";
      // console.log(this.map);
      this.map = null;
      // console.log(this.map);
      // var imageURL =
      //   "http://t0.tianditu.gov.cn/img_w/wmts?" +
      //   "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      //   "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9cbdcbc0e3daab6e428cb34aa16fc82d";
      // var imageURL =
      //   "http://t0.tianditu.gov.cn/img_w/wmts?tk=9cbdcbc0e3daab6e428cb34aa16fc82d";
      // var imageURL =
      //   "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9cbdcbc0e3daab6e428cb34aa16fc82d";
      // var lay = new T.TileLayer(imageURL);
      // var config = { layers: [lay] };
      //初始化地图对象
      // map = new T.Map("mapDiv", config);
      // this.map = new T.Map("my_map_putuo", config);
      this.map = new T.Map("my_map_putuo");
      this.map.enableDrag();
      var ctrl = new T.Control.MapType();
      this.map.addControl(ctrl);

      // this.map = new T.Map("my_map_putuo", config);
      this.map.centerAndZoom(new T.LngLat(122.323867, 29.97176), 12);
      // this.map.setStyle("black");
      // this.map.addEventListener("click", this.MapClick);
      this.loadMap();
    },
    loadMap() {
      this.map.clearOverLays();
      // this.removeMarkets();
      this.arrayObj = [];
      //创建对象
      let administrative = new T.AdministrativeDivision();
      var config = {
        needSubInfo: false,
        needAll: false,
        needPolygon: true,
        needPre: true,
        searchType: 1,
        searchWord: "普陀市"
      };
      administrative.search(config, this.searchResult);
      this.map.clearOverLays();
      this.arrayObj = [];
    },
    searchResult(result) {
      console.log(result);
      if (result.getStatus() == 100) {
        var data = result.getData();
        // console.log(data);
        this.polygon(data[0].points);
      } else {
        result.getMsg();
      }
    },
    polygon(points) {
      var pointsArr = [];
      for (var i = 0; i < points.length; i++) {
        var regionLngLats = [];
        var regionArr = points[i].region.split(",");
        for (var m = 0; m < regionArr.length; m++) {
          var lnglatArr = regionArr[m].split(" ");
          var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
          regionLngLats.push(lnglat);
          pointsArr.push(lnglat);
        }
        //创建面对象
        var polygon = new T.Polygon(regionLngLats, {
          color: "#172ED6",
          weight: 3,
          lineStyle: "dashed",
          opacity: 1,
          fillColor: "#FFFFFF",
          fillOpacity: 0
        });
        //向地图上添加行政区划面
        this.map.addOverLay(polygon);
        // map.addOverLay(line);
      }
      //显示最佳比例尺
      // this.map.setViewport(pointsArr);
    },
    removeMarkets() {
      var lays = this.map.getOverlays(); //获取地图上所有的覆盖物
      var s = 0;
      for (var i = lays.length - 1; i >= 0; i--) {
        //倒序删除避免长度发生变化
        if ((lays[i].Type = 1000)) {
          //根据地图上覆盖物的类型删除
          this.map.removeOverLay(lays[i]); //从地图上移除。
          //        s++;
        }
      }
    },
    // 点击显示点信息
    // 景区
    showBridge(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      // if (e.p) {

      // }
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.unitName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      console.log(e.lng, e.lat);
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 宾馆
    showBridge1(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.hotelName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 购物场所
    showBridge2(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.shoppingName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 非遗场所
    showBridge3(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.unheritageStationName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 农家乐
    showBridge4(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.agritainmentName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 餐饮
    showBridge5(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.restaurantName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 图书馆
    showBridge6(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.libraryName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 博物馆
    showBridge7(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.museumName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 休闲娱乐
    showBridge8(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.entertainmentName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化馆
    showBridge9(e) {
      // this.loadMap();
      // console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalCenterName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 旅行社
    showBridge10(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.travelName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 公共服务
    showBridge11(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.flagPicUrl == null) {
        if (e.flagPic == null) {
          // 暂无图片
          imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
        } else {
          imgUrl = "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + e.flagPic;
        }
      } else {
        imgUrl = e.flagPicUrl;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.serviceName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 教育机构
    showBridge12(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.eduOrganName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文物商店
    showBridge13(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.heritageShopName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文物保护管理机构
    showBridge14(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalProtectName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文物保护科研机构
    showBridge15(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalProtectScienceName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化艺术科研机构
    showBridge16(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalScienceName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化站
    showBridge17(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalStationName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化行政主管部门
    showBridge18(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalManageName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 农家乡村
    showBridge19(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.villagePic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.villagePic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.villageName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化产业示范（试验）园区和示范基地
    showBridge20(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalExampleName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 非公有制艺术表演场馆
    showBridge21(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.unpubStationName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 公共卫生间
    showBridge22(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.toiletPic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.toiletPic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.toiletName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 表演场馆
    showBridge23(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.performVenueName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 人文设施
    showBridge24(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.humanityPic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.humanityPic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.humanityName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 非物质文化遗产保护中心
    showBridge25(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.unheritageCenterName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 红色旅游信息
    showBridge26(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.redTravelName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文物拍卖企业
    showBridge27(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.heritageAuctionName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 文化市场综合执法机构
    showBridge28(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.culturalExecuteName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 演出经纪机构
    showBridge29(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.showBrokerName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 其他文物企业
    showBridge30(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.otherHeritageName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 非公有制艺术表演团体
    showBridge31(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.unpubPerformName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 网吧
    showBridge32(e) {
      // this.loadMap();
      console.log(e);
      //创建图片对象
      let a = [];
      let imgUrl = "";
      let icon = new T.Icon({
        iconUrl: require("../../assets/image/gis/point.png"),
        iconSize: new T.Point(27, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 创建点
      var marker = new T.Marker(new T.LngLat(e.lng, e.lat), {
        icon: icon
      });
      if (e.pic == null) {
        // 暂无图片
        imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
      } else {
        imgUrl = e.pic;
      }
      a.push(marker);
      var infoWin1 = new T.InfoWindow();
      let sContent =
        "<div  style='width: 200px;background-color: #04213E;'>" +
        "<img style='width: 100%;' src=" +
        imgUrl +
        " ><div>" +
        "<p style='padding:10px;color:#fff;margin:0'>" +
        e.internetBarName +
        "</p>" +
        "<p style='padding:10px;color:#fff;margin:0'>地址：" +
        e.address +
        "</p>" +
        "</div></div>";
      infoWin1.setContent(sContent);
      marker.addEventListener("click", function(e) {
        marker.openInfoWindow(infoWin1);
      });
      this.map.centerAndZoom(new T.LngLat(e.lng, e.lat), 12);
      setTimeout(() => {
        marker.openInfoWindow(infoWin1);
      }, 100);
      // 将标注添加到地图中
      var markers = new T.MarkerClusterer(this.map, {
        markers: a
        // markers: array
      });
      // markers.openInfoWindow(infoWin1);
    },
    // 获取基础资源数据
    async getAllClassify() {
      let res = await this.$http.get("/base/getAllSourceCount");
      // console.log(res);
      if (res.data.msg == "success") {
        this.allClassify = res.data.data;
        delete this.allClassify['产业']
        delete this.allClassify['风情小镇']
        // console.log(this.allClassify);
        // console.log(Array(this.allClassify));
        this.allClassifyName = Object.keys(this.allClassify);
        Object.keys(this.allClassify).forEach((element, i) => {
          this.allClassifyList.push({
            name: element,
            value: Object.values(this.allClassify)[i],
            imgUrl: "",
            imgUrl_c: ""
          });
        });
        // console.log(this.allClassifyList);
        this.allClassifyList.forEach((ele, i) => {
          if (ele.name == "景区") {
            ele.imgUrl = require("../../assets/image/gis/icon/scenic.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/scenic_c.png");
          } else if (ele.name == "宾馆") {
            ele.imgUrl = require("../../assets/image/gis/icon/hotel.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/hotel_c.png");
          } else if (ele.name == "农家乐") {
            ele.imgUrl = require("../../assets/image/gis/icon/arg.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/arg_c.png");
          } else if (ele.name == "休闲娱乐") {
            ele.imgUrl = require("../../assets/image/gis/icon/play.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/play_c.png");
          } else if (ele.name == "公共卫生间") {
            ele.imgUrl = require("../../assets/image/gis/icon/wc.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/wc_c.png");
          } else if (ele.name == "红色旅游信息") {
            ele.imgUrl = require("../../assets/image/gis/icon/redTravel.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/redTravel_c.png");
          } else if (ele.name == "旅行社") {
            ele.imgUrl = require("../../assets/image/gis/icon/travel.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/travel_c.png");
          } else if (ele.name == "公共服务") {
            ele.imgUrl = require("../../assets/image/gis/icon/public.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/public_c.png");
          } else if (ele.name == "农家乡村") {
            ele.imgUrl = require("../../assets/image/gis/icon/village.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/village_c.png");
          } else if (ele.name == "餐饮") {
            ele.imgUrl = require("../../assets/image/gis/icon/catering.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/catering_c.png");
          } else {
            ele.imgUrl = require("../../assets/image/gis/icon/scenic.png");
            ele.imgUrl_c = require("../../assets/image/gis/icon/scenic_c.png");
          }
        });
        // console.log(this.allClassifyList);
      }
    },
    // 选择分类
    selectList() {
      // this.loadMap();
      // this.removeMarkets();
      this.initMap();
      let url = {
        cater: "/base/listPtBaseRestaurant",
        hesProtect: "/base/listBaseCulturalProtect",
        cultrueArt: "/base/listBaseCulturalScience",
        cultrueSpot: "/base/listBaseCulturalStation",
        library: "/base/listBaseLibrary",
        cultureAdmin: "/base/listBaseCulturalManage",
        museum: "/base/listBaseMuseum",
        village: "/base/listBaseVillage",
        cultureIndustry: "/base/listBaseCulturalExample",
        public1: "/base/listBaseUnpubStation",
        public2: "/base/listBaseToilet",
        public3: "/base/listBasePerformVenue",
        public4: "/base/listBaseIndustry",
        public5: "/base/listBaseHumanity",
        public6: "/base/listBaseUnheritageCenter",
        public7: "/base/listBaseRedTravel",
        public8: "/base/listBaseTownService",
        public9: "/base/listBaseHeritageAuction",
        public10: "/base/listBaseCulturalExecute",
        public11: "/base/listBaseShowBroker",
        public12: "/base/listBaseCulturalProtectScience",
        public13: "/base/listBaseOtherHeritage",
        public14: "/base/listPtBaseEntertainment",
        public15: "/base/listBaseCulturalCenter",
        public16: "/base/listiBaseUnpubPerformService",
        public17: "/base/listBaseTravelData",
        public18: "/base/listBaseInternetBar",
        public19: "",
        public20: ""
      };
      let publicName = {
        cater: "restaurantName",
        hesProtect: "culturalProtectName",
        cultrueArt: "culturalScienceName",
        cultrueSpot: "culturalStationName",
        library: "libraryName",
        cultureAdmin: "culturalManageName",
        museum: "museumName",
        village: "villageName",
        cultureIndustry: "culturalExampleName",
        public1: "unpubStationName",
        public2: "toiletName",
        public3: "performVenueName",
        public4: "industryName",
        public5: "humanityName",
        public6: "unheritageCenterName",
        public7: "redTravelName",
        public8: "townName",
        public9: "heritageAuctionName",
        public10: "culturalExecuteName",
        public11: "showBrokerName",
        public12: "culturalProtectScienceName",
        public13: "otherHeritageName",
        public14: "entertainmentName",
        public15: "culturalCenterName",
        public16: "unpubPerformName",
        public17: "travelName",
        public18: "internetBarName",
        public19: "",
        public20: ""
      };
      let imgUrl = {
        cater: "flagPicUrl",
        hesProtect: "pic",
        cultrueArt: "pic",
        cultrueSpot: "pic",
        library: "pic",
        cultureAdmin: "pic",
        museum: "pic",
        village: "villagePic",
        cultureIndustry: "pic",
        public1: "pic",
        public2: "toiletPic",
        public3: "pic",
        public4: "industryPic",
        public5: "humanityPic",
        public6: "pic",
        public7: "redTravelPic",
        public8: "townName",
        public9: "pic",
        public10: "pic",
        public11: "pic",
        public12: "pic",
        public13: "pic",
        public14: "entertainmentName",
        public15: "culturalCenterName",
        public16: "pic",
        public17: "travelName",
        public18: "pic",
        public19: "",
        public20: ""
      };
      if (this.classifyChoose == "景区") {
        this.getScenic();
      } else if (this.classifyChoose == "宾馆") {
        this.getHotel();
      } else if (this.classifyChoose == "公共服务") {
        this.getPublicShop();
      } else if (this.classifyChoose == "购物场所") {
        this.getShopping();
      } else if (this.classifyChoose == "教育机构") {
        this.getEducation();
      } else if (this.classifyChoose == "非遗场所") {
        this.getIch();
      } else if (this.classifyChoose == "农家乐") {
        this.getArg();
      } else if (this.classifyChoose == "文物商店") {
        this.getHerShop();
      } else if (this.classifyChoose == "餐饮") {
        this.getAllLists(url.cater, publicName.cater, imgUrl.cater);
      } else if (this.classifyChoose == "文物保护管理机构") {
        this.getAllLists(
          url.hesProtect,
          publicName.hesProtect,
          imgUrl.hesProtect
        );
      } else if (this.classifyChoose == "文化艺术科研机构") {
        this.getAllLists(
          url.cultrueArt,
          publicName.cultrueArt,
          imgUrl.cultrueArt
        );
      } else if (this.classifyChoose == "文化站") {
        this.getAllLists(
          url.cultrueSpot,
          publicName.cultrueSpot,
          imgUrl.cultrueSpot
        );
      } else if (this.classifyChoose == "图书馆") {
        this.getAllLists(url.library, publicName.library, imgUrl.library);
      } else if (this.classifyChoose == "文化行政主管部门") {
        this.getAllLists(
          url.cultureAdmin,
          publicName.cultureAdmin,
          imgUrl.cultureAdmin
        );
      } else if (this.classifyChoose == "博物馆") {
        this.getAllLists(url.museum, publicName.museum, imgUrl.museum);
      } else if (this.classifyChoose == "农家乡村") {
        this.getAllLists(url.village, publicName.village, imgUrl.village);
      } else if (this.classifyChoose == "文化产业示范（试验）园区和示范基地") {
        this.getAllLists(
          url.cultureIndustry,
          publicName.cultureIndustry,
          imgUrl.cultureIndustry
        );
      } else if (this.classifyChoose == "非公有制艺术表演场馆") {
        this.getAllLists(url.public1, publicName.public1, imgUrl.public1);
      } else if (this.classifyChoose == "公共卫生间") {
        this.getAllLists(url.public2, publicName.public2, imgUrl.public2);
      } else if (this.classifyChoose == "表演场馆") {
        this.getAllLists(url.public3, publicName.public3, imgUrl.public3);
      } else if (this.classifyChoose == "产业") {
        this.getAllLists(url.public4, publicName.public4, imgUrl.public4);
      } else if (this.classifyChoose == "人文设施") {
        this.getAllLists(url.public5, publicName.public5, imgUrl.public5);
      } else if (this.classifyChoose == "非物质文化遗产保护中心") {
        this.getAllLists(url.public6, publicName.public6, imgUrl.public6);
      } else if (this.classifyChoose == "红色旅游信息") {
        this.getAllLists(url.public7, publicName.public7, imgUrl.public7);
      } else if (this.classifyChoose == "风情小镇") {
        this.getAllLists(url.public8, publicName.public8, imgUrl.public8);
      } else if (this.classifyChoose == "文物拍卖企业") {
        this.getAllLists(url.public9, publicName.public9, imgUrl.public9);
      } else if (this.classifyChoose == "文化市场综合执法机构") {
        this.getAllLists(url.public10, publicName.public10, imgUrl.public10);
      } else if (this.classifyChoose == "演出经纪机构") {
        this.getAllLists(url.public11, publicName.public11, imgUrl.public11);
      } else if (this.classifyChoose == "文物保护科研机构") {
        this.getAllLists(url.public12, publicName.public12, imgUrl.public12);
      } else if (this.classifyChoose == "其他文物企业") {
        this.getAllLists(url.public13, publicName.public13, imgUrl.public13);
      } else if (this.classifyChoose == "休闲娱乐") {
        this.getAllLists(url.public14, publicName.public14, imgUrl.public14);
      } else if (this.classifyChoose == "文化馆") {
        this.getAllLists(url.public15, publicName.public15, imgUrl.public15);
      } else if (this.classifyChoose == "非公有制艺术表演团体") {
        this.getAllLists(url.public16, publicName.public16, imgUrl.public16);
      } else if (this.classifyChoose == "旅行社") {
        this.getAllLists(url.public17, publicName.public17, imgUrl.public17);
      } else if (this.classifyChoose == "网吧") {
        this.getAllLists(url.public18, publicName.public18, imgUrl.public18);
      }
      // } else {
      //   this.getAllLists();
      // }
    },
    // 左边点击选择
    chooseClassify(name) {
      this.classifyChoose = name;
      this.isShrink = false;
      this.selectList();
    },
    // 获取景区列表
    async getScenic() {
      // this.initMap();
      let res = await this.$http.get(
        `/base/listBaseScenic?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listBaseScenic?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.arrayObj = [];
        let array = [];
        this.leftList.forEach(element => {
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          // 创建点
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          // console.log(element.pic);
          if (element.flagPicUrl == null) {
            if (element.flagPic == null) {
              // 暂无图片
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl =
                "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
            }
          } else {
            marker.imgUrl = element.flagPicUrl;
          }

          marker.name = element.unitName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          // array.push(marker);
          // 点击显示窗口对象
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        // console.log(this.arrayObj);
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
          // markers: array
        });
      }
      // console.log(this.leftList);
    },
    // 获取宾馆列表
    async getHotel() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listPtBaseHotel?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listPtBaseHotel?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.arrayObj = [];
        // removeMarkers(this.map,{markers:this.arrayObj})
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.flagPicUrl == null) {
            if (element.flagPic == null) {
              // 暂无图片
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl =
                "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
            }
          } else {
            marker.imgUrl = element.flagPicUrl;
          }
          marker.name = element.hotelName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取购物场所列表
    async getShopping() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listPtBaseShopping?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listPtBaseShopping?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.flagPicUrl == null) {
            if (element.flagPic == null) {
              // 暂无图片
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl =
                "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
            }
          } else {
            marker.imgUrl = element.flagPicUrl;
          }
          marker.name = element.shoppingName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取教育机构列表
    async getEducation() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listBaseEduOrgan?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listBaseEduOrgan?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.pic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl = element.pic;
          }
          marker.name = element.eduOrganName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取非遗场所列表
    async getIch() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listBaseUnheritageStation?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listBaseUnheritageStation?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.pic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl = element.pic;
          }
          marker.name = element.unheritageStationName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取农家乐列表
    async getArg() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listBaseFormHouse?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listBaseFormHouse?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.flagPicUrl == null) {
            if (element.flagPic == null) {
              // 暂无图片
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl =
                "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
            }
          } else {
            marker.imgUrl = element.flagPicUrl;
          }
          marker.name = element.agritainmentName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取文物商店列表
    async getHerShop() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listBaseHeritageShop?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listBaseHeritageShop?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.rightList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.pic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl = element.pic;
          }
          marker.name = element.heritageShopName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取公共服务列表
    async getPublicShop() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listPtService?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `/base/listPtService?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.rightList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.flagPicUrl == null) {
            if (element.flagPic == null) {
              // 暂无图片
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl =
                "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
            }
          } else {
            marker.imgUrl = element.flagPicUrl;
          }
          marker.name = element.serviceName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    },
    // 获取所有列表
    async getAllLists(publicUrl, publicName, imgUrl) {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(`${publicUrl}?pagNumber=1&pagSize=999`);
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
      }
      let res1 = await this.$http.get(
        `${publicUrl}?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
        // 标点
        this.leftList.forEach(element => {
          //   console.log(element);
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          console.log(publicName == "restaurantName");
          if (publicName == "restaurantName") {
            if (element.flagPicUrl == null) {
              if (element.flagPic == null) {
                // 暂无图片
                marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
              } else {
                marker.imgUrl =
                  "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
              }
            } else {
              marker.imgUrl = element.flagPicUrl;
            }
          } else {
            if (element[imgUrl] == null) {
              marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
            } else {
              marker.imgUrl = element[imgUrl];
            }
          }
          if (publicName == "entertainmentNam") {
            if (element.flagPicUrl == null) {
              if (element.flagPic == null) {
                // 暂无图片
                marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
              } else {
                marker.imgUrl =
                  "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
              }
            } else {
              marker.imgUrl = element.flagPicUrl;
            }
          }
          if (publicName == "travelName") {
            if (element.flagPicUrl == null) {
              if (element.flagPic == null) {
                // 暂无图片
                marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
              } else {
                marker.imgUrl =
                  "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
              }
            } else {
              marker.imgUrl = element.flagPicUrl;
            }
          }

          marker.name = element[publicName];
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>地址：" +
              e.target.address +
              "</p>" +
              "</div></div>";
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
          }); // 将标注添加到地图中
        });
        var markers = new T.MarkerClusterer(this.map, {
          markers: this.arrayObj
        });
      }
      // console.log(this.leftList);
    }
    //
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        if (that.nowIndex == 1) {
          let url = {
            cater: "/base/listPtBaseRestaurant",
            hesProtect: "/base/listBaseCulturalProtect",
            cultrueArt: "/base/listBaseCulturalScience",
            cultrueSpot: "/base/listBaseCulturalStation",
            library: "/base/listBaseLibrary",
            cultureAdmin: "/base/listBaseCulturalManage",
            museum: "/base/listBaseMuseum",
            village: "/base/listBaseVillage",
            cultureIndustry: "/base/listBaseCulturalExample",
            public1: "/base/listBaseUnpubStation",
            public2: "/base/listBaseToilet",
            public3: "/base/listBasePerformVenue",
            public4: "/base/listBaseIndustry",
            public5: "/base/listBaseHumanity",
            public6: "/base/listBaseUnheritageCenter",
            public7: "/base/listBaseRedTravel",
            public8: "/base/listBaseTownService",
            public9: "/base/listBaseHeritageAuction",
            public10: "/base/listBaseCulturalExecute",
            public11: "/base/listBaseShowBroker",
            public12: "/base/listBaseCulturalProtectScience",
            public13: "/base/listBaseOtherHeritage",
            public14: "/base/listPtBaseEntertainment",
            public15: "/base/listBaseCulturalCenter",
            public16: "/base/listiBaseUnpubPerformService",
            public17: "/base/listBaseTravelData",
            public18: "/base/listBaseInternetBar",
            public19: "",
            public20: ""
          };
          let publicName = {
            cater: "restaurantName",
            hesProtect: "culturalProtectName",
            cultrueArt: "culturalScienceName",
            cultrueSpot: "culturalStationName",
            library: "libraryName",
            cultureAdmin: "culturalManageName",
            museum: "museumName",
            village: "villageName",
            cultureIndustry: "culturalExampleName",
            public1: "unpubStationName",
            public2: "toiletName",
            public3: "performVenueName",
            public4: "industryName",
            public5: "humanityName",
            public6: "unheritageCenterName",
            public7: "redTravelName",
            public8: "townName",
            public9: "heritageAuctionName",
            public10: "culturalExecuteName",
            public11: "showBrokerName",
            public12: "culturalProtectScienceName",
            public13: "otherHeritageName",
            public14: "entertainmentName",
            public15: "culturalCenterName",
            public16: "unpubPerformName",
            public17: "travelName",
            public18: "internetBarName",
            public19: "",
            public20: ""
          };
          let imgUrl = {
            cater: "flagPicUrl",
            hesProtect: "pic",
            cultrueArt: "pic",
            cultrueSpot: "pic",
            library: "pic",
            cultureAdmin: "pic",
            museum: "pic",
            village: "villagePic",
            cultureIndustry: "pic",
            public1: "pic",
            public2: "toiletPic",
            public3: "pic",
            public4: "industryPic",
            public5: "humanityPic",
            public6: "pic",
            public7: "redTravelPic",
            public8: "townName",
            public9: "pic",
            public10: "pic",
            public11: "pic",
            public12: "pic",
            public13: "pic",
            public14: "entertainmentName",
            public15: "culturalCenterName",
            public16: "pic",
            public17: "travelName",
            public18: "pic",
            public19: "",
            public20: ""
          };
          if (that.classifyChoose == "景区") {
            that.getScenic();
          } else if (that.classifyChoose == "宾馆") {
            that.getHotel();
          } else if (that.classifyChoose == "公共服务") {
            that.getPublicShop();
          } else if (that.classifyChoose == "购物场所") {
            that.getShopping();
          } else if (that.classifyChoose == "教育机构") {
            that.getEducation();
          } else if (that.classifyChoose == "非遗场所") {
            that.getIch();
          } else if (that.classifyChoose == "农家乐") {
            that.getArg();
          } else if (that.classifyChoose == "文物商店") {
            that.getHerShop();
          } else if (that.classifyChoose == "餐饮") {
            that.getAllLists(url.cater, publicName.cater, imgUrl.cater);
          } else if (that.classifyChoose == "文物保护管理机构") {
            that.getAllLists(
              url.hesProtect,
              publicName.hesProtect,
              imgUrl.hesProtect
            );
          } else if (that.classifyChoose == "文化艺术科研机构") {
            that.getAllLists(
              url.cultrueArt,
              publicName.cultrueArt,
              imgUrl.cultrueArt
            );
          } else if (that.classifyChoose == "文化站") {
            that.getAllLists(
              url.cultrueSpot,
              publicName.cultrueSpot,
              imgUrl.cultrueSpot
            );
          } else if (that.classifyChoose == "图书馆") {
            that.getAllLists(url.library, publicName.library, imgUrl.library);
          } else if (that.classifyChoose == "文化行政主管部门") {
            that.getAllLists(
              url.cultureAdmin,
              publicName.cultureAdmin,
              imgUrl.cultureAdmin
            );
          } else if (that.classifyChoose == "博物馆") {
            that.getAllLists(url.museum, publicName.museum, imgUrl.museum);
          } else if (that.classifyChoose == "农家乡村") {
            that.getAllLists(url.village, publicName.village, imgUrl.village);
          } else if (
            that.classifyChoose == "文化产业示范（试验）园区和示范基地"
          ) {
            that.getAllLists(
              url.cultureIndustry,
              publicName.cultureIndustry,
              imgUrl.cultureIndustry
            );
          } else if (that.classifyChoose == "非公有制艺术表演场馆") {
            that.getAllLists(url.public1, publicName.public1, imgUrl.public1);
          } else if (that.classifyChoose == "公共卫生间") {
            that.getAllLists(url.public2, publicName.public2, imgUrl.public2);
          } else if (that.classifyChoose == "表演场馆") {
            that.getAllLists(url.public3, publicName.public3, imgUrl.public3);
          } else if (that.classifyChoose == "产业") {
            that.getAllLists(url.public4, publicName.public4, imgUrl.public4);
          } else if (that.classifyChoose == "人文设施") {
            that.getAllLists(url.public5, publicName.public5, imgUrl.public5);
          } else if (that.classifyChoose == "非物质文化遗产保护中心") {
            that.getAllLists(url.public6, publicName.public6, imgUrl.public6);
          } else if (that.classifyChoose == "红色旅游信息") {
            that.getAllLists(url.public7, publicName.public7, imgUrl.public7);
          } else if (that.classifyChoose == "风情小镇") {
            that.getAllLists(url.public8, publicName.public8, imgUrl.public8);
          } else if (that.classifyChoose == "文物拍卖企业") {
            that.getAllLists(url.public9, publicName.public9, imgUrl.public9);
          } else if (that.classifyChoose == "文化市场综合执法机构") {
            that.getAllLists(
              url.public10,
              publicName.public10,
              imgUrl.public10
            );
          } else if (that.classifyChoose == "演出经纪机构") {
            that.getAllLists(
              url.public11,
              publicName.public11,
              imgUrl.public11
            );
          } else if (that.classifyChoose == "文物保护科研机构") {
            that.getAllLists(
              url.public12,
              publicName.public12,
              imgUrl.public12
            );
          } else if (that.classifyChoose == "其他文物企业") {
            that.getAllLists(
              url.public13,
              publicName.public13,
              imgUrl.public13
            );
          } else if (that.classifyChoose == "休闲娱乐") {
            that.getAllLists(
              url.public14,
              publicName.public14,
              imgUrl.public14
            );
          } else if (that.classifyChoose == "文化馆") {
            that.getAllLists(
              url.public15,
              publicName.public15,
              imgUrl.public15
            );
          } else if (that.classifyChoose == "非公有制艺术表演团体") {
            that.getAllLists(
              url.public16,
              publicName.public16,
              imgUrl.public16
            );
          } else if (that.classifyChoose == "旅行社") {
            that.getAllLists(
              url.public17,
              publicName.public17,
              imgUrl.public17
            );
          } else if (that.classifyChoose == "网吧") {
            that.getAllLists(
              url.public18,
              publicName.public18,
              imgUrl.public18
            );
          }
        }

        return false;
      }
    };
  },
  mounted() {
    // this.loadMap();
    this.getAllClassify();
    this.getScenic();
    this.initMap();
  }
};
</script>
<style>
/* .tdt-iconLayers-layer{
  left: -400px!important;
  top: 100px!important;
} */
.tdt-top {
  top: 50px !important;
}
.tdt-right {
  right: 30% !important;
}
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
  background-image: url("/static/img/headtop.png");
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
  outline: none;
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
.gis_left_statis div {
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
  padding: 10px 6%;
  padding-bottom: 0;
  box-sizing: border-box;
  position: relative;
}
.gis_right_list_title_select select {
  width: 70%;
  height: 45px;
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
  top: 27px;
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
.gis_right_list_content {
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
.gis_right_list_content_list {
  width: 100%;
  background-image: url("../../assets/image/gis/list_bg.png");
  background-size: 100% 100%;
  color: #cbeaff;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  margin: 10px 0;
}
.gis_right_list_content_list > div:nth-of-type(2) {
  color: #00d7e9;
}
.gis_content .tdt-infowindow-content {
  margin: 0 !important;
}
.gis_content .tdt-infowindow-content-wrapper,
.tdt-infowindow-tip {
  background: #04213e !important;
}
/* 缩率图 */
.gis_left_shrink {
  width: 254px;
  height: 131px;
  position: absolute;
  left: 40px;
  bottom: 40px;
  z-index: 40;
  background-image: url("../../assets/image/gis/shrink.png");
  background-size: 100% 100%;
  cursor: pointer;
}
.gis_left_shrink_words {
  color: #fff;
  position: absolute;
  left: 20%;
  top: 20%;
}
.gis_left_shrink_words p {
  margin: 10px;
}
.gis_left_shrink_img {
  position: relative;
}

.gis_left_shrink_img > div.gis_left_shrink_img_circle:nth-of-type(2) {
  left: -13px;
  top: -13px;
}
.gis_left_shrink_img > div.gis_left_shrink_img_circle:nth-of-type(1) {
  width: 80px;
  height: 80px;
  background-image: url("../../assets/image/gis/thumbnail_bg.png");
  background-size: 100% 100%;
  position: absolute;
  left: -22px;
  top: -23px;
}
.gis_left_shrink_img > div.gis_left_shrink_img_circle:nth-of-type(1) {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 2s linear infinite;
  -moz-animation: rotate 2s linear infinite;
  -o-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.gis_left_shrink_img > div.gis_left_shrink_img_circle_img {
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 50%;
  line-height: 37px;
  background: linear-gradient(
    -44deg,
    rgba(239, 171, 90, 1),
    rgba(178, 84, 25, 1)
  );
}
.gis_left_shrink_img > div.gis_left_shrink_img_circle_img img {
  width: 60%;
  /* height: 100%; */
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
  .gis_left_statis div {
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