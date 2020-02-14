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
            <li v-for="(item, index) in allClassifyList" :key="index">
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
    <!-- 右边列表 -->
    <div class="gis_right_list">
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
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unitName}}</div>
          <div>{{item.level | scenicStatus}}</div>
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '宾馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.hotelName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '购物场所'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.shoppingName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '教育机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.eduOrganName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非遗场所'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unheritageStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '农家乐'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.agritainmentName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物商店'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.heritageShopName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '餐饮'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.restaurantName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物保护管理机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalProtectName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化艺术科研机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalScienceName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化站'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '图书馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.libraryName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化行政主管部门'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalManageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '博物馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.museumName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '农家乡村'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.villageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化产业示范（试验）园区和示范基地'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalExampleName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非公有制艺术表演场馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unpubStationName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '公共卫生间'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.toiletName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '表演场馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
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
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.humanityName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非物质文化遗产保护中心'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unheritageCenterName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '红色旅游信息'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
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
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.heritageAuctionName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化市场综合执法机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalExecuteName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '演出经纪机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.showBrokerName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文物保护科研机构'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalProtectScienceName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '其他文物企业'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.otherHeritageName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '休闲娱乐'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.entertainmentName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '文化馆'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.culturalCenterName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '非公有制艺术表演团体'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.unpubPerformName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '旅行社'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
          <div>{{item.travelName}}</div>
          <!-- <div>{{item.level | scenicStatus}}</div> -->
        </div>
      </div>
      <div class="gis_right_list_content" v-if="classifyChoose == '网吧'">
        <div class="gis_right_list_content_list" v-for="(item, index) in rightList" :key="index">
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
      let url = {
        cater: "/base/listPtBaseRestaurant",
        hesProtect: "/base/listBaseCulturalProtect",
        cultrueArt: "/base/listBaseCulturalScience",
        cultrueSpot: "/base/listBaseCulturalStation",
        library: "/base/listBaseLibrary",
        cultureAdmin: "	/base/listBaseCulturalManage",
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
      if (this.classifyChoose == "景区") {
        this.getScenic();
      } else if (this.classifyChoose == "宾馆") {
        this.getHotel();
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
        this.getAllLists(url.cater,publicName.cater);
      } else if (this.classifyChoose == "文物保护管理机构") {
        this.getAllLists(url.hesProtect,publicName.hesProtect);
      } else if (this.classifyChoose == "文化艺术科研机构") {
        this.getAllLists(url.cultrueArt,publicName.cultrueArt);
      } else if (this.classifyChoose == "文化站") {
        this.getAllLists(url.cultrueSpot,publicName.cultrueSpot);
      } else if (this.classifyChoose == "图书馆") {
        this.getAllLists(url.library,publicName.library);
      } else if (this.classifyChoose == "文化行政主管部门") {
        this.getAllLists(url.cultureAdmin,publicName.cultureAdmin);
      } else if (this.classifyChoose == "博物馆") {
        this.getAllLists(url.museum,publicName.museum);
      } else if (this.classifyChoose == "农家乡村") {
        this.getAllLists(url.village,publicName.village);
      } else if (this.classifyChoose == "文化产业示范（试验）园区和示范基地") {
        this.getAllLists(url.cultureIndustry,publicName.cultureIndustry);
      } else if (this.classifyChoose == "非公有制艺术表演场馆") {
        this.getAllLists(url.public1,publicName.public1);
      } else if (this.classifyChoose == "公共卫生间") {
        this.getAllLists(url.public2,publicName.public2);
      } else if (this.classifyChoose == "表演场馆") {
        this.getAllLists(url.public3,publicName.public3);
      } else if (this.classifyChoose == "产业") {
        this.getAllLists(url.public4,publicName.public4);
      } else if (this.classifyChoose == "人文设施") {
        this.getAllLists(url.public5,publicName.public5);
      } else if (this.classifyChoose == "非物质文化遗产保护中心") {
        this.getAllLists(url.public6,publicName.public6);
      } else if (this.classifyChoose == "红色旅游信息") {
        this.getAllLists(url.public7,publicName.public7);
      } else if (this.classifyChoose == "风情小镇") {
        this.getAllLists(url.public8,publicName.public8);
      } else if (this.classifyChoose == "文物拍卖企业") {
        this.getAllLists(url.public9,publicName.public9);
      } else if (this.classifyChoose == "文化市场综合执法机构") {
        this.getAllLists(url.public10,publicName.public10);
      } else if (this.classifyChoose == "演出经纪机构") {
        this.getAllLists(url.public11,publicName.public11);
      } else if (this.classifyChoose == "文物保护科研机构") {
        this.getAllLists(url.public12,publicName.public12);
      } else if (this.classifyChoose == "其他文物企业") {
        this.getAllLists(url.public13,publicName.public13);
      } else if (this.classifyChoose == "休闲娱乐") {
        this.getAllLists(url.public14,publicName.public14);
      } else if (this.classifyChoose == "文化馆") {
        this.getAllLists(url.public15,publicName.public15);
      } else if (this.classifyChoose == "非公有制艺术表演团体") {
        this.getAllLists(url.public16,publicName.public16);
      } else if (this.classifyChoose == "旅行社") {
        this.getAllLists(url.public17,publicName.public17);
      } else if (this.classifyChoose == "网吧") {
        this.getAllLists(url.public18,publicName.public18);
      }
      // } else {
      //   this.getAllLists();
      // }
    },
    // 获取景区列表
    async getScenic() {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `/base/listBaseScenic?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
        // 标点
        this.rightList.forEach(element => {
          //创建图片对象
          let icon = new T.Icon({
            iconUrl: require("../../assets/image/gis/point.png"),
            iconSize: new T.Point(27, 27),
            iconAnchor: new T.Point(10, 25)
          });
          var marker = new T.Marker(new T.LngLat(element.lng, element.lat), {
            icon: icon
          });
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.unitName;
          marker.address = element.address;
          this.arrayObj.push(marker);

          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
        });
      }
      let res1 = await this.$http.get(
        `/base/listBaseScenic?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.hotelName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listPtBaseHotel?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.shoppingName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listPtBaseShopping?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.eduOrganName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listBaseEduOrgan?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.unheritageStationName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listBaseUnheritageStation?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.agritainmentName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listBaseFormHouse?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element.heritageShopName;
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `/base/listBaseHeritageShop?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
      }
      // console.log(this.leftList);
    },
    // 获取所有列表
    async getAllLists(publicUrl,publicName) {
      this.map.clearOverLays();
      this.arrayObj = [];
      let res = await this.$http.get(
        `${publicUrl}?pagNumber=1&pagSize=999`
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.rightList = res.data.data.list;
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
          if (element.flagPic == null) {
            marker.imgUrl = require("../../assets/image/gis/icon/noPic.jpg");
          } else {
            marker.imgUrl =
              "http://txl.tourzj.gov.cn/sitepic/Imgbig/" + element.flagPic;
          }
          marker.name = element[publicName];
          marker.address = element.address;
          this.arrayObj.push(marker);
          marker.addEventListener("click", function(e) {
            // console.log(e.target.title);
            var infoWin1 = new T.InfoWindow();
            let sContent =
              "<div  style='width: 200px;border: 1px solid #4981AE;background-color: #04213E;'>" +
              "<img style='width: 100%;' src=" +
              e.target.imgUrl +
              " ><div>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
              e.target.name +
              "</p>" +
              "<p style='padding:10px;color:#fff;margin:0'>" +
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
      let res1 = await this.$http.get(
        `${publicUrl}?pagNumber=1&pagSize=999&unitName=${this.searchName}`
      );
      // console.log(res1);
      if (res1.data.msg == "success") {
        this.leftList = res1.data.data.list;
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
          if (that.classifyChoose == "景区") {
            that.getScenic();
          } else if (that.classifyChoose == "宾馆") {
            that.getHotel();
          } else if (that.classifyChoose == "购物场所") {
            that.getShopping();
          } else if (that.classifyChoose == "教育机构") {
            that.getEducation();
          } else if (that.classifyChoose == "非遗场所") {
            that.getIch();
          }
        }

        return false;
      }
    };
  },
  mounted() {
    this.loadMap();
    this.getAllClassify();
    this.getScenic();
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