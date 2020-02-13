<template>
  <div class="word_mouth_all_content">
    <div class="word_mouth_title">
      <headtop :title="pageTitle" />
      <!-- <div class="word_mouth_title_font">口碑监测系统</div> -->
    </div>
    <div class="word_mouth_content">
      <!-- 网评综合分析 -->
      <div class="word_mouth_left_contnet">
        <!-- 网评综合分析 -->
        <div class="word_mouth_bridge">
          <div class="word_mouth_bridge_title">
            <div class="word_mouth_bridge_title_font">网评综合分析</div>
          </div>
          <!-- 累计评论数 -->
          <div class="synthesize_summarize">
            <div class="synthesize_all_person">
              <div class="synthesize_all_person_title">累计评论数</div>
              <div class="synthesize_all_person_account">
                <div
                  class="synthesize_all_person_account_font"
                >{{scenicAccount+hotelAccount+cateringAccount}}</div>
              </div>
            </div>
            <div class="synthesize_add_comment">
              <div class="synthesize_add_comment_title">新增评论数</div>
              <div class="synthesize_add_comment_account">
                <img src="../../assets/image/mouth_add_comment_icon.png" alt />
                <span>{{addComment}}</span>
              </div>
            </div>
            <div class="synthesize_add_comment">
              <div class="synthesize_add_comment_title">累计好评率</div>
              <div class="synthesize_add_comment_account">
                <img src="../../assets/image/mouth_good_comment_icon.png" alt />
                <span>{{allGoodComment}}</span>
              </div>
            </div>
            <div class="mouth_add_up">
              <img src="../../assets/image/mouth_comment_up.png" alt />
            </div>
          </div>
          <!-- 评论趋势图 -->
          <div class="word_mouth_bridge_little_block synthesize_comment_trend">
            <div class="word_mouth_bridge_little_title">
              <div class="word_mouth_bridge_little_title_word">评论趋势图</div>
              <div class="word_mouth_bridge_little_title_line"></div>
            </div>
            <div class="synthesize_comment_trend_table" ref="synthesize_comment_trend_table"></div>
          </div>
          <!-- 评论来源地分布 -->
          <div class="word_mouth_bridge_little_block synthesize_distribution_comments">
            <div class="word_mouth_bridge_little_title">
              <div class="word_mouth_bridge_little_title_word">评论来源地分布</div>
              <div class="word_mouth_bridge_little_title_line"></div>
            </div>
            <div class="synthesize_distribution_comments_content">
              <div class="synthesize_distribution_comments_table_content">
                <img class="mouth_circle_out" src="../../assets/image/mouth_circle_out.png" alt />
                <img class="mouth_circle_in" src="../../assets/image/mouth_circle_in.png" alt />
                <div
                  class="synthesize_distribution_comments_table"
                  ref="synthesize_distribution_comments_table"
                ></div>
              </div>
            </div>
          </div>
          <!-- 最新评论 -->
          <div class="word_mouth_bridge_little_block word_mouth_new_comments">
            <div class="word_mouth_bridge_little_title">
              <div class="word_mouth_bridge_little_title_word">最新评论</div>
              <div class="word_mouth_bridge_little_title_line"></div>
            </div>
            <div class="synthesize_latest_comments_list">
              <div v-for="(item, index) in newComment" :key="index">
                <span class="mouth_comment_result">{{item.commentType | isComment}}</span>
                <span class="mouth_comment_address">{{item.placeType | isHotel}}</span>
                <span class="mouth_comment_content">{{item.commentContent}}</span>
              </div>
            </div>
            <div class="synthesize_check_comments" @click="isCommentDialog = true">查看更多评论</div>
          </div>
        </div>
      </div>
      <div class="word_mouth_right_contnet">
        <!-- 景区评论概况 -->
        <div class="word_mouth_bridge_right" style="margin-right: 3%;" v-show="showOneBridge">
          <div class="word_mouth_bridge_title">
            <div class="word_mouth_bridge_title_font">景区评论概况</div>
          </div>
          <div class="word_mouth_scenic_comment_all_content">
            <!-- 累计评论数 -->
            <div class="word_mouth_scenic_comment_total">
              <div class="word_mouth_scenic_comment_total_title">累计评论数</div>
              <div class="word_mouth_scenic_comment_total_content">
                <div class="word_mouth_scenic_comment_total_count">
                  <div class="synthesize_all_person_account">
                    <div class="synthesize_all_person_account_font">{{scenicAccount}}</div>
                  </div>
                </div>
                <div class="word_mouth_scenic_comment_classify">
                  <img src="../../assets/image/mouth_scenic_comment_classify1.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify2.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify3.png" alt />
                </div>
              </div>
            </div>
            <!-- 景区评分维度 -->
            <div class="word_mouth_scenic_comment_dimensionality word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">景区评分维度</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div class="word_mouth_scenic_comment_dimensionality_content">
                <div
                  class="word_mouth_scenic_comment_dimensionality_table"
                  ref="word_mouth_scenic_comment_dimensionality_table"
                ></div>
                <div class="word_mouth_scenic_comment_dimensionality_choose">
                  <select v-model="scenicPlaceName" @change="choosePlaceSce()">
                    <option value>全部</option>
                    <option
                      v-for="(item, index) in scenicCommentName"
                      :key="index"
                      :value="item"
                    >{{item}}</option>
                  </select>
                  <div class="analysis_synthesis_title">综合分析</div>
                  <div class="analysis_synthesis_score">{{scenicRate}}分/{{allscenicRate}}分</div>
                  <div class="word_mouth_scenic_comment_dimensionality_point">
                    <div class="word_mouth_scenic_comment_dimensionality_point_all_scenic">
                      <span></span>全部景区
                    </div>
                    <div class="word_mouth_scenic_comment_dimensionality_point_choose_scenic">
                      <span></span>选中景区
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 景区评论量 -->
            <div class="word_mouth_scenic_comment_total_account word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">景区评论量</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div
                class="word_mouth_scenic_comment_total_account_content"
                ref="word_mouth_scenic_comment_total_account_count"
              ></div>
              <!-- <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">1、沈家门金粤轩景区</div>
                <div
                  class="word_mouth_scenic_comment_total_account_count"
                  ref="word_mouth_scenic_comment_total_account_count_shenjia"
                ></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">2、忆宿海景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">3、东港永兴假日景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">4、沈家门金海贝景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">5、东瓯王大景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>-->
            </div>
          </div>
        </div>
        <!-- 酒店评论概况 -->
        <div class="word_mouth_bridge_right">
          <div class="word_mouth_bridge_title">
            <div class="word_mouth_bridge_title_font">酒店评论概况</div>
          </div>
          <div class="word_mouth_scenic_comment_all_content">
            <!-- 累计评论数 -->
            <div class="word_mouth_scenic_comment_total">
              <div class="word_mouth_scenic_comment_total_title">累计评论数</div>
              <div class="word_mouth_scenic_comment_total_content">
                <div class="word_mouth_scenic_comment_total_count">
                  <div class="synthesize_all_person_account">
                    <div class="synthesize_all_person_account_font">{{hotelAccount}}</div>
                  </div>
                </div>
                <div class="word_mouth_scenic_comment_classify">
                  <img src="../../assets/image/mouth_scenic_comment_classify1.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify2.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify3.png" alt />
                </div>
              </div>
            </div>
            <!-- 酒店评分维度 -->
            <div class="word_mouth_scenic_comment_dimensionality word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">酒店评分维度</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div class="word_mouth_scenic_comment_dimensionality_content">
                <div
                  class="word_mouth_scenic_comment_dimensionality_table"
                  ref="word_mouth_hotel_comment_dimensionality_table"
                ></div>
                <div class="word_mouth_scenic_comment_dimensionality_choose">
                  <select v-model="hotelPlaceName" @change="choosePlaceHotel()">
                    <option value>全部</option>
                    <option
                      v-for="(item, index) in hotelCommentName"
                      :key="index"
                      :value="item"
                    >{{item}}</option>
                  </select>
                  <div class="analysis_synthesis_title">综合分析</div>
                  <div class="analysis_synthesis_score">{{hotelRate}}分/{{allhotelRate}}分</div>
                  <div class="word_mouth_scenic_comment_dimensionality_point">
                    <div class="word_mouth_scenic_comment_dimensionality_point_all_scenic">
                      <span></span>全部酒店
                    </div>
                    <div class="word_mouth_scenic_comment_dimensionality_point_choose_scenic">
                      <span></span>选中酒店
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 酒店评论量 -->
            <div class="word_mouth_scenic_comment_total_account word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">酒店评论量</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div
                class="word_mouth_scenic_comment_total_account_content"
                ref="word_mouth_hotel_comment_total_account_count"
              ></div>
              <!-- <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">1、沈家门金粤轩景区</div>
                <div
                  class="word_mouth_scenic_comment_total_account_count"
                  ref="word_mouth_scenic_comment_total_account_count_shenjia"
                ></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">2、忆宿海景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">3、东港永兴假日景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">4、沈家门金海贝景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">5、东瓯王大景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>-->
            </div>
          </div>
        </div>
        <!-- 餐饮评论概况 -->
        <div class="word_mouth_bridge_right" style="margin-left: 3%;">
          <div class="word_mouth_bridge_title">
            <div class="word_mouth_bridge_title_font">餐饮评论概况</div>
          </div>
          <div class="word_mouth_scenic_comment_all_content">
            <!-- 累计评论数 -->
            <div class="word_mouth_scenic_comment_total">
              <div class="word_mouth_scenic_comment_total_title">累计评论数</div>
              <div class="word_mouth_scenic_comment_total_content">
                <div class="word_mouth_scenic_comment_total_count">
                  <div class="synthesize_all_person_account">
                    <div class="synthesize_all_person_account_font">{{cateringAccount}}</div>
                  </div>
                </div>
                <div class="word_mouth_scenic_comment_classify">
                  <img src="../../assets/image/mouth_scenic_comment_classify1.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify2.png" alt />
                  <img src="../../assets/image/mouth_scenic_comment_classify3.png" alt />
                </div>
              </div>
            </div>
            <!-- 餐饮评分维度 -->
            <div class="word_mouth_scenic_comment_dimensionality word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">餐饮评分维度</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div class="word_mouth_scenic_comment_dimensionality_content">
                <div
                  class="word_mouth_scenic_comment_dimensionality_table"
                  ref="word_mouth_catering_comment_dimensionality_table"
                ></div>
                <div class="word_mouth_scenic_comment_dimensionality_choose">
                  <select v-model="caterPlaceName" @change="choosePlaceCater">
                    <option value>全部</option>
                     <option
                      v-for="(item, index) in caterPlaceName"
                      :key="index"
                      :value="item"
                    >{{item}}</option>
                  </select>
                  <div class="analysis_synthesis_title">综合分析</div>
                  <div class="analysis_synthesis_score">{{caterRate}}分/{{allcaterRate}}分</div>
                  <div class="word_mouth_scenic_comment_dimensionality_point">
                    <div class="word_mouth_scenic_comment_dimensionality_point_all_scenic">
                      <span></span>全部餐饮
                    </div>
                    <div class="word_mouth_scenic_comment_dimensionality_point_choose_scenic">
                      <span></span>选中餐饮
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 餐饮评论量 -->
            <div class="word_mouth_scenic_comment_total_account word_mouth_bridge_little_block">
              <div class="word_mouth_bridge_little_title">
                <div class="word_mouth_bridge_little_title_word">餐饮评论量</div>
                <div class="word_mouth_bridge_little_title_line"></div>
              </div>
              <div
                class="word_mouth_scenic_comment_total_account_content"
                ref="word_mouth_catering_comment_total_account_count"
              ></div>
              <!-- <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">1、沈家门金粤轩景区</div>
                <div
                  class="word_mouth_scenic_comment_total_account_count"
                  ref="word_mouth_scenic_comment_total_account_count_shenjia"
                ></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">2、忆宿海景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">3、东港永兴假日景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">4、沈家门金海贝景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>
              <div class="word_mouth_scenic_comment_total_account_content">
                <div class="word_mouth_scenic_name_comment_total_account">5、东瓯王大景区</div>
                <div class="word_mouth_scenic_comment_total_account_count"></div>
              </div>-->
            </div>
          </div>
        </div>
        <!-- <div class="word_mouth_bridge_right">
          <div class="word_mouth_bridge_title">酒店评论概况</div>
        </div>-->
      </div>
      <div class="word_mouth_bridge_right_arrow" @click="showOneBridge=!showOneBridge">
        <img src="../../assets/image/mouth_arrow.png" alt />
      </div>
    </div>
    <!-- 评论弹窗 -->
    <!-- 弹窗背景颜色 -->
    <div class="word_mouth_comment_dialog_bg" v-if="isCommentDialog"></div>
    <div class="word_mouth_comment_dialog" v-if="isCommentDialog">
      <div class="word_mouth_comment_dialog_title">
        <img @click="isCommentDialog=false" src="../../assets/image/mouth_close.png" alt />
        <div class="word_mouth_comment_dialog_title_font">酒店评论概况</div>
      </div>
      <div class="word_mouth_comment_dialog_content">
        <div class="word_mouth_comment_dialog_choose">
          <div class="dig_comment_source dig_comment_source_one">
            <div class="dig_comment_source_word">评论来源</div>
            <div class="dig_comment_source_select">
              <el-select v-model="commnetOrigin" placeholder="请选择">
                <el-option
                  popper-class="dig_comment_source_select_little"
                  v-for="item in commnetOriginList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_comment_source dig_comment_source_two">
            <div class="dig_comment_source_word">评论对象类型</div>
            <div class="dig_comment_source_select">
              <el-select v-model="commnetObjType" placeholder="请选择">
                <el-option
                  popper-class="dig_comment_source_select_little"
                  v-for="item in commnetObjTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_comment_source dig_comment_source_three">
            <div class="dig_comment_source_word">评论时间</div>
            <div class="dig_comment_source_time">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" align="right"></el-date-picker>&ensp;-&ensp;
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" align="right"></el-date-picker>
            </div>
          </div>
          <div class="dig_comment_source dig_comment_source_four">
            <div class="dig_comment_source_word">好差评</div>
            <div class="dig_comment_source_select">
              <el-select v-model="commnetType" placeholder="请选择">
                <el-option
                  popper-class="dig_comment_source_select_little"
                  v-for="item in commnetTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_comment_source dig_comment_source_five">
            <div class="dig_comment_source_word">评论对象</div>
            <el-input v-model="commnetObjName" placeholder="请输入评论对象名称"></el-input>
          </div>
          <div class="dig_comment_source">
            <div class="dig_comment_source_six" @click="getCommnetList()">查询</div>
          </div>
          <div class="dig_comment_source">
            <div class="dig_comment_source_seven" @click="reset()">重置</div>
          </div>
        </div>
        <div class="word_mouth_comment_dialog_list">
          <table>
            <tr>
              <td>评论来源</td>
              <td>评论对象来源</td>
              <td>好差评</td>
              <td>评分</td>
              <td>评论对象</td>
              <td>评论内容</td>
              <td>评论时间</td>
              <td>评论用户</td>
            </tr>
            <tr v-if="commentList.length==0">
              <td colspan="8">暂无评价</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in commentList"
              :key="index"
              :class="(index%2 ==0)?'word_mouth_comment_tr_one':'word_mouth_comment_tr_two'"
            >
              <td>{{item.commentSource | isOrigin}}</td>
              <td>{{commnetObjType | isHotelLittle}}</td>
              <td>{{item.commentType | isComment}}</td>
              <td>{{item.commnetScore}}</td>
              <td>{{item.placeName}}</td>
              <td>{{item.commentContent}}</td>
              <td>{{item.commentTime | date}}</td>
              <td>{{item.commentUser}}</td>
            </tr>
          </table>
        </div>
        <div class="word_mouth_page">
          <div class="word_mouth_page_total">
            共有
            <span>{{allAccount}}&ensp;</span>条
          </div>
          <div>
            <el-pagination
              background
              background-color="#0a5b8f"
              text-color="#fff"
              layout="prev, pager, next"
              :total="allAccount"
              :page-size="8"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              small="true"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { $get, $post } from "../../config/http";
import axios from "axios";
import headtop from "@/components/header/headtop";
import qs from "qs";
export default {
  data() {
    return {
      pageTitle: "口碑监测系统",
      startTime: "2019-10-01",
      endTime: "2019-12-30",
      timeMonth: "2020-01",
      baseUrl: "http://47.96.94.56:8083",
      // 新增评论量
      addComment: "",
      // 累计好评量
      allGoodComment: "",
      // 评论趋势图
      sceTend: "",
      hotelTend: "",
      caterTend: "",
      // 评论来源地
      commentAddress: "",
      commentAddressAccount: "",
      // 最新评价
      newComment: [],
      hotelAccount: "",
      hotelLists: "",
      scenicAccount: "",
      cateringAccount: "",
      commentTrendTable: "",
      commentTrendList: "",
      commentAddressTable: "",
      commentDimensionalityTable: "",
      commentDimensionalityHotelTable: "",
      commentDimensionalityCateringTable: "",
      shenjiaTable: "",
      scenicCountTable: "",
      hotelCountTable: "",
      cateringCountTable: "",
      showOneBridge: true,
      isCommentDialog: false,
      value1: "",
      // showRightBridge:false,
      // 评论列表
      commentList: [],
      // 分页
      allAccount: "",
      currentPage: 1,
      // 评论来源
      commnetOrigin: "",
      commnetOriginList: [
        {
          value: "meituan",
          label: "美团"
        },
        {
          value: "qunar",
          label: "去哪儿"
        },
        {
          value: "lvmama",
          label: "驴妈妈"
        },
        {
          value: "tongchenglvyou",
          label: "同程"
        },
        {
          value: "tuniu",
          label: "途牛"
        },
        {
          value: "xiecheng",
          label: "携程"
        }
      ],
      // 评论对象类型
      commnetObjType: "scenic",
      commnetObjTypeList: [
        {
          value: "scenic",
          label: "景区"
        },
        {
          value: "hotel",
          label: "酒店"
        },
        {
          value: "restaurant",
          label: "餐馆"
        }
      ],
      // 评论对象名称
      commnetObjName: "",
      // 好中差
      commnetType: "",
      commnetTypeList: [
        {
          value: "1",
          label: "好评"
        },
        {
          value: "2",
          label: "中评"
        },
        {
          value: "0",
          label: "差评"
        }
      ],
      // 景区评分维度
      scenicPlaceName: "",
      scenicCommentDimensionality: [],
      d: [],
      littleLists: [],
      // 酒店评分维度
      hotelPlaceName: "",
      hotelCommentDimensionality: [],
      hotelD: [],
      hotellittleLists: [],
      // 餐馆评分维度
      caterPlaceName: "",
      caterCommentDimensionality: [],
      caterD: [],
      caterlittleLists: [],
      // 景区评论量
      scenicCommentCount: "",
      scenicCommentName: [],
      allscenicRate:0,
      scenicRate:0,
      // 酒店评论量
      hotelCommentCount: "",
      hotelCommentName: [],
      allhotelRate:0,
      hotelRate:0,
      // 餐饮评论量
      caterCommentCount: "",
      caterCommentName: [],
      allcaterRate:0,
      caterRate:0,
    };
  },
  components: {
    headtop
  },
  methods: {
    // 获取评价
    // 酒店
    async getHotelEval() {
      // console.log($post);
      let res = await axios.post(
        this.baseUrl + "/placeComment/findCommentList",
        qs.stringify({
          areaName: "普陀",
          commentType: 1,
          pageNo: 1,
          pageSize: 10,
          placeName: "",
          placeSource: "",
          placeType: "hotel"
        })
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.hotelAccount = res.data.data.total;
        this.hotelLists = res.data.data.list;
      }
    },
    // 景区
    async getSceEval() {
      // console.log($post);
      let res = await axios.post(
        this.baseUrl + "/placeComment/findCommentList",
        qs.stringify({
          areaName: "普陀",
          commentType: "",
          pageNo: 1,
          pageSize: 10,
          placeName: "",
          placeSource: "",
          placeType: "scenic"
        })
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.scenicAccount = res.data.data.total;
      }
    },
    // 餐馆
    async getCaterEval() {
      // console.log($post);
      let res = await axios.post(
        this.baseUrl + "/placeComment/findCommentList",
        qs.stringify({
          areaName: "普陀",
          commentType: "",
          pageNo: 1,
          pageSize: 10,
          placeName: "",
          placeSource: "",
          placeType: "restaurant"
        })
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.cateringAccount = res.data.data.total;
      }
    },
    // 获取新增评论量,累计好评量
    async getAddComment() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getNewCommentNum?areaName='普陀'&queryTime=" +
          this.timeMonth
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.addComment = res.data.data.newCommentNum;
      }
      let resGood = await axios.get(
        this.baseUrl + "/evaluate/getHighCommentNum?areaName='普陀'"
      );
      // console.log(resGood);
      if (resGood.data.msg == "success") {
        this.allGoodComment = resGood.data.data.highCommentNum;
      }
    },
    // 评论趋势图
    async comment_trend_table() {
      let sceRes = await axios.get(
        this.baseUrl +
          "/evaluate/getAllCommentTrend?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=scenic"
      );
      // console.log(sceRes);
      if (sceRes.data.msg == "success") {
        this.sceTend = sceRes.data.data;
      }
      let hotelRes = await axios.get(
        this.baseUrl +
          "/evaluate/getAllCommentTrend?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=hotel"
      );
      // console.log(hotelRes);
      if (hotelRes.data.msg == "success") {
        this.hotelTend = hotelRes.data.data;
      }
      let caterRes = await axios.get(
        this.baseUrl +
          "/evaluate/getAllCommentTrend?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=restaurant"
      );
      // console.log(caterRes);
      if (caterRes.data.msg == "success") {
        this.caterTend = caterRes.data.data;
      }
      // console.log(this.sceTend, this.hotelTend, this.caterTend);
      this.commentTrendTable = this.$echarts.init(
        this.$refs.synthesize_comment_trend_table
      );
      let months = [];
      let sceMonths = [];
      let hotelMonths = [];
      let caterMonths = [];
      let sceAccount = [];
      let hotelAccount = [];
      let caterAccount = [];
      this.sceTend.forEach(element => {
        sceMonths.push(element.timeDate);
        sceAccount.push(element.commentNum);
      });
      this.hotelTend.forEach(element => {
        hotelMonths.push(element.timeDate);
        hotelAccount.push(element.commentNum);
      });
      this.caterTend.forEach(element => {
        caterMonths.push(element.timeDate);
        caterAccount.push(element.commentNum);
      });
      // console.log(
      //   sceMonths,
      //   hotelMonths,
      //   caterMonths,
      //   sceAccount,
      //   hotelAccount,
      //   caterAccount
      // );
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["景区", "酒店", "餐馆"],
          itemWidth: 10,
          itemHeight: 2,
          padding: [0, 0, 0, 0],
          // position:[5,0],
          textStyle: {
            fontSize: 10,
            fontFamily: "Microsoft YaHe",
            color: "#B2D2E3"
          }
        },
        grid: {
          left: "3%",
          top: "15%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: sceMonths,
          axisLabel: {
            show: true,
            color: "#B2D2E3"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            color: "#207FF6"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: true,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        series: [
          {
            name: "景区",
            barWidth: 15,
            type: "bar",
            stack: "总量",
            color: "#1A97FF",
            label: {
              show: false,
              position: "insideRight"
            },
            data: sceAccount
          },
          {
            name: "酒店",
            type: "bar",
            stack: "总量",
            color: "#F6B64A",
            label: {
              show: false,
              position: "insideRight"
            },
            data: hotelAccount
          },
          {
            name: "餐馆",
            type: "bar",
            stack: "总量",
            color: "#0CE3DC",
            label: {
              show: false,
              position: "insideRight"
            },
            data: caterAccount,
            itemStyle: {
              emphasis: {
                barBorderRadius: 0
              },

              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [3, 3, 0, 0]
              }
            }
          }
        ]
      };
      this.commentTrendTable.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    // 评论来源地
    async comment_address_table() {
      let res = await axios.get(
        this.baseUrl + "/evaluate/getCommentSourceAttribute?areaName=普陀"
      );
      if (res.data.msg == "success") {
        // console.log(res.data.data);
        this.commentAddress = res.data.data.attribute;
        this.commentAddressAccount = res.data.data.allCount;
      }
      let commentAddressName = [];
      let commentAddressCount = [];
      this.commentAddress.forEach(ele => {
        if (ele.sourceName == "LVMAMA") {
          commentAddressName.push("驴妈妈");
          commentAddressCount.push({ name: "驴妈妈", value: ele.commentNum });
        } else if (ele.sourceName == "MEITUAN") {
          commentAddressName.push("美团");
          commentAddressCount.push({ name: "美团", value: ele.commentNum });
        } else if (ele.sourceName == "QUNAR") {
          commentAddressName.push("去哪儿");
          commentAddressCount.push({ name: "去哪儿", value: ele.commentNum });
        } else if (ele.sourceName == "TONGCHENGLVYOU") {
          commentAddressName.push("同程");
          commentAddressCount.push({ name: "同程", value: ele.commentNum });
        } else if (ele.sourceName == "TUNIU") {
          commentAddressName.push("途牛");
          commentAddressCount.push({ name: "途牛", value: ele.commentNum });
        } else if (ele.sourceName == "XIECHENG") {
          commentAddressName.push("携程");
          commentAddressCount.push({ name: "携程", value: ele.commentNum });
        }
      });
      // console.log(commentAddressName,commentAddressCount);
      this.commentAddressTable = this.$echarts.init(
        this.$refs.synthesize_distribution_comments_table
      );
      var option = {
        // backgroundColor:"#000",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          show: false,
          data: commentAddressName
        },
        series: [
          {
            // name: "途牛",
            type: "pie",
            radius: ["50%", "68%"],

            label: {
              formatter: " {b} \n\n{c}条 {d}%  ",
              padding: [0, -90]
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 90,
                lineStyle: {
                  width: 2,
                  color: "#229BB2"
                }
              }
            },
            data: commentAddressCount,
            color: [
              "#C057FF",
              "#02EADA",
              "#F99737",
              "#68FF67",
              "#207FF6",
              "#F4C60F"
            ]
          }
        ]
      };
      this.commentAddressTable.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    // 最新评价
    async getNewComment() {
      let res = await axios.get(
        this.baseUrl + "/evaluate/getNewestComments?areaName=普陀"
      );
      if (res.data.msg == "success") {
        console.log(res.data.data);
        this.newComment = res.data.data;
      }
    },
    choosePlace() {
      this.comment_dimensionality_table();
    },
    // 景区评分维度
    async comment_dimensionality_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=scenic&placeName="
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.scenicCommentDimensionality = res.data.data;
      }
      let secnRes = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=scenic&placeName=" +
          this.scenicPlaceName
      );
      // console.log(secnRes);
      if (secnRes.data.msg == "success") {
        this.scenicCommentDim = secnRes.data.data;
      }
      let scenicCommentDimensionalityName = [];
      let scenicCommentDimensionalityCount = [];
      this.d = [];

      
      this.scenicCommentDimensionality.forEach(ele => {
        this.d.push({ name: ele.sourceName, value: 0 });

        if (ele.sourceName == "LVMAMA") {
          scenicCommentDimensionalityName.push({ text: "驴妈妈" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "MEITUAN") {
          scenicCommentDimensionalityName.push({ text: "美团" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "QUNAR") {
          scenicCommentDimensionalityName.push({ text: "去哪儿" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TONGCHENGLVYOU") {
          scenicCommentDimensionalityName.push({ text: "同程" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TUNIU") {
          scenicCommentDimensionalityName.push({ text: "途牛" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "XIECHENG") {
          scenicCommentDimensionalityName.push({ text: "携程" });
          scenicCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        }
      });
      // console.log(this.d);
      let count = 0
      let countLittle = 0;
      scenicCommentDimensionalityCount.forEach(element => {
        count+=1;
        countLittle+= element*1
      });
      this.allscenicRate = (countLittle/count).toFixed(2)
      this.commentDimensionalityTable = this.$echarts.init(
        this.$refs.word_mouth_scenic_comment_dimensionality_table
      );
      var option = {
        radar: [
          {
            indicator: scenicCommentDimensionalityName,
            center: ["53%", "52%"], // 位置
            radius: 50, //大小
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#BFE0FF" // 文字颜色
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent"
                ], //圆环颜色
                // shadowColor: "#000", // 圆颜色
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#006AA6" // 分割线
              }
            },
            splitLine: {
              lineStyle: {
                color: "#006AA6" //圆线
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#00FFFF"
              }
            },
            // areaStyle: {
            //   normal: {
            //     width: 1,
            //     opacity: 0.2
            //   }
            // },
            data: [
              {
                value: scenicCommentDimensionalityCount,
                areaStyle: {
                  normal: {
                    color: "#03BBCF", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          },
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#F4C60F"
              },
              lineStyle: {
                color: "#000" // 图表中各个图区域的边框线颜色
              }
            },
            data: [
              {
                value: this.littleLists,
                areaStyle: {
                  normal: {
                    color: "#F4C60F", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          }
        ]
      };
      this.commentDimensionalityTable.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    async choosePlaceSce() {
      let res = await axios.get(
        this.baseUrl +
          `	/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=
          ${this.timeMonth}&placeName=${this.scenicPlaceName}&placeType=scenic`
      );
      console.log(this.scenicPlaceName);
      if (res.data.msg == "success") {
        let a = res.data.data;
        // console.log(a);
        this.d.forEach((ele, i) => {
          for (let m = 0; m < a.length; m++) {
            
            console.log(a);
            if (ele.name == a[m].sourceName) {
              this.d[i].value = a[m].totalScore;
            }
          }
        });
        
        // console.log(this.d);
        this.littleLists = [];
        this.d.forEach(element => {
          this.littleLists.push(element.value);
        });
        let count = 0;
        let littleCount = 0;
        this.littleLists.forEach(element => {
         count += 1
            littleCount += element*1 
        });
        console.log(count,littleCount);
        this.scenicRate = (littleCount / count).toFixed(2)
          this.comment_dimensionality_table();
        // console.log(this.littleLists);
      }
    },
    // 酒店评分维度
    async comment_hotel_dimensionality_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=hotel&placeName="
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.hotelCommentDimensionality = res.data.data;
      }
      let secnRes = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=hotel&placeName=" +
          this.hotelPlaceName
      );
      // console.log(secnRes);
      if (secnRes.data.msg == "success") {
        this.hotelCommentDim = secnRes.data.data;
      }
      let hotelCommentDimensionalityName = [];
      let hotelCommentDimensionalityCount = [];
      this.hotelD = [];

      this.hotelCommentDimensionality.forEach(ele => {
        this.hotelD.push({ name: ele.sourceName, value: 0 });

        if (ele.sourceName == "LVMAMA") {
          hotelCommentDimensionalityName.push({ text: "驴妈妈" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "MEITUAN") {
          hotelCommentDimensionalityName.push({ text: "美团" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "QUNAR") {
          hotelCommentDimensionalityName.push({ text: "去哪儿" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TONGCHENGLVYOU") {
          hotelCommentDimensionalityName.push({ text: "同程" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TUNIU") {
          hotelCommentDimensionalityName.push({ text: "途牛" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "XIECHENG") {
          hotelCommentDimensionalityName.push({ text: "携程" });
          hotelCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        }
      });
      let count = 0
      let countLittle = 0;
      hotelCommentDimensionalityCount.forEach(element => {
        count+=1;
        countLittle+= element*1
      });
      this.allhotelRate = (countLittle/count).toFixed(2)
      // console.log(this.hotelD);
      this.commentDimensionalityHotelTable = this.$echarts.init(
        this.$refs.word_mouth_hotel_comment_dimensionality_table
      );
      var option = {
        radar: [
          {
            indicator:hotelCommentDimensionalityName,
            center: ["50%", "52%"], // 位置
            radius: 50, //大小
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#BFE0FF" // 文字颜色
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent"
                ], //圆环颜色
                // shadowColor: "#000", // 圆颜色
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#006AA6" // 分割线
              }
            },
            splitLine: {
              lineStyle: {
                color: "#006AA6" //圆线
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#00FFFF"
              }
            },
            // areaStyle: {
            //   normal: {
            //     width: 1,
            //     opacity: 0.2
            //   }
            // },
            data: [
              {
                value: hotelCommentDimensionalityCount,
                areaStyle: {
                  normal: {
                    color: "#03BBCF", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          },
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#F4C60F"
              },
              lineStyle: {
                color: "#000" // 图表中各个图区域的边框线颜色
              }
            },
            data: [
              {
                value: this.hotellittleLists,
                areaStyle: {
                  normal: {
                    color: "#F4C60F", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          }
        ]
      };
      this.commentDimensionalityHotelTable.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    async choosePlaceHotel() {
      let res = await axios.get(
        this.baseUrl +
          `	/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=
          ${this.timeMonth}&placeName=${this.hotelPlaceName}&placeType=hotel`
      );
      if (res.data.msg == "success") {
        let a = res.data.data;
        // console.log(a);
        
       
        this.hotelD.forEach((ele, i) => {
          for (let m = 0; m < a.length; m++) {
            if (ele.name == a[m].sourceName) {
              this.hotelD[i].value = a[m].totalScore;
            }
          }
        });
        // console.log(this.hotelD);
        this.hotellittleLists = [];
        this.hotelD.forEach(element => {
          this.hotellittleLists.push(element.value);
        });
        let count = 0;
        let littleCount = 0;
        this.hotellittleLists.forEach(element => {
          count += 1
            littleCount += element*1 
        });
         this.hotelRate = (littleCount / count).toFixed(2)
        console.log(count,littleCount);
          this.comment_hotel_dimensionality_table();
        // console.log(this.hotellittleLists);
      }
    },
    // 餐饮评分维度
    async comment_catering_dimensionality_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=restaurant&placeName="
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.caterCommentDimensionality = res.data.data;
      }
      let secnRes = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=restaurant&placeName=" +
          this.caterPlaceName
      );
      // console.log(secnRes);
      if (secnRes.data.msg == "success") {
        this.caterCommentDim = secnRes.data.data;
      }
      let caterCommentDimensionalityName = [];
      let caterCommentDimensionalityCount = [];
      this.caterD = [];

      this.caterCommentDimensionality.forEach(ele => {
        this.caterD.push({ name: ele.sourceName, value: 0 });

        if (ele.sourceName == "LVMAMA") {
          caterCommentDimensionalityName.push({ text: "驴妈妈" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "MEITUAN") {
          caterCommentDimensionalityName.push({ text: "美团" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "QUNAR") {
          caterCommentDimensionalityName.push({ text: "去哪儿" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TONGCHENGLVYOU") {
          caterCommentDimensionalityName.push({ text: "同程" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "TUNIU") {
          caterCommentDimensionalityName.push({ text: "途牛" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        } else if (ele.sourceName == "XIECHENG") {
          caterCommentDimensionalityName.push({ text: "携程" });
          caterCommentDimensionalityCount.push(ele.totalScore.toFixed(2));
        }
      });
      // console.log(this.caterD);
      let count = 0
      let countLittle = 0;
      caterCommentDimensionalityCount.forEach(element => {
        count+=1;
        countLittle+= element*1
      });
      this.allcaterRate = (countLittle/count).toFixed(2)
      this.commentDimensionalityCateringTable = this.$echarts.init(
        this.$refs.word_mouth_catering_comment_dimensionality_table
      );
      // console.log();
      console.log(this.$refs.word_mouth_hotel_comment_total_account_count);
      var option = {
        radar: [
          {
            indicator: caterCommentDimensionalityName,
            center: ["46%", "45%"], // 位置
            radius: 60, //大小
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#BFE0FF" // 文字颜色
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent"
                ], //圆环颜色
                // shadowColor: "#000", // 圆颜色
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#006AA6" // 分割线
              }
            },
            splitLine: {
              lineStyle: {
                color: "#006AA6" //圆线
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#00FFFF"
              }
            },
            // areaStyle: {
            //   normal: {
            //     width: 1,
            //     opacity: 0.2
            //   }
            // },
            data: [
              {
                value: caterCommentDimensionalityCount,
                areaStyle: {
                  normal: {
                    color: "#03BBCF", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          },
          {
            name: "雷达图",
            type: "radar",
            symbol: "none",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 1
                }
              },
              normal: {
                color: "#F4C60F"
              },
              lineStyle: {
                color: "#000" // 图表中各个图区域的边框线颜色
              }
            },
            data: [
              {
                value: this.caterlittleLists,
                areaStyle: {
                  normal: {
                    color: "#F4C60F", // 选择区域颜色
                    opacity: 0.3
                  }
                }
              }
            ]
          }
        ]
      };
      this.commentDimensionalityCateringTable.setOption(option);
      window.addEventListener("resize", this.resizeHandler);
    },
    async choosePlaceCater() {
      let res = await axios.get(
        this.baseUrl +
          `	/evaluate/getCommentDimensionScore?areaName='普陀'&queryTime=
          ${this.timeMonth}&placeName=${this.caterPlaceName}&placeType=restaurant`
      );
      // console.log(this.caterPlaceName);
      if (res.data.msg == "success") {
        let a = res.data.data;
        // console.log(a);
        
        this.caterD.forEach((ele, i) => {
          for (let m = 0; m < a.length; m++) {
            if (ele.name == a[m].sourceName) {
              this.caterD[i].value = a[m].totalScore;
            }
          }
        });
        // console.log(this.caterD);
        this.caterlittleLists = [];
        this.caterD.forEach(element => {
          this.caterlittleLists.push(element.value);
        });
        let count = 0;
        let littleCount = 0;
         this.caterlittleLists.forEach(element => {
         count += 1
            littleCount += element*1 
        });
        // console.log(count,littleCount);
        this.caterRate = (littleCount / count).toFixed(2)
          this.comment_catering_dimensionality_table();
        // console.log(this.caterlittleLists);
      }
    },
    // 景区评论量
    async comment_count_shenjia_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentNumTop5?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=scenic"
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.scenicCommentCount = res.data.data;
      }
      let highComment = [];
      let middleComment = [];
      let lowComment = [];
      // console.log(this.scenicCommentCount.reverse());
      this.scenicCommentCount.reverse().forEach(element => {
        this.scenicCommentName.push(element.placeName);
        highComment.push(element.highNum);
        middleComment.push(element.midNum);
        lowComment.push(element.lowNum);
      });

      // console.log(this.scenicCommentCount);
      this.scenicCountTable = this.$echarts.init(
        this.$refs.word_mouth_scenic_comment_total_account_count
      );
      var option = {
        barWidth: 10,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ["好评", "中评", "差评"]
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: false
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        yAxis: {
          type: "category",
          data: this.scenicCommentName,
          axisLabel: {
            show: false,
            // position: "right",
            // padding: [3, 4, 6],
            color: "#fff"
            // position:right
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        series: [
          {
            name: "好评",
            type: "bar",
            stack: "总量",
            // itemStyle: {
            //   show: true,
            //   // position: "top",
            //   position: [5, -16],
            // },

            label: {
              show: false,
              position: "insideRight"
            },
            itemStyle: {
              normal: {
                label: {
                  // formatter: "{b}",
                  formatter: function(data) {
                    // console.log(data);
                    for (let i = 1; i <= 5; i++) {
                      // const element = array[i];
                      return i + "、" + data.name;
                    }
                  },
                  show: true,
                  // position: "top",
                  textStyle: {
                    fontSize: 12,
                    color: "#BFE0FF"
                  },
                  position: [5, -20]
                }
              }
            },
            data: highComment
          },
          {
            name: "中评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: middleComment
          },
          {
            name: "差评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: lowComment
          }
        ],
        color: ["#02579F", "#0A9193", "#786319"]
      };
      this.scenicCountTable.setOption(option);
    },
    // 酒店评论量
    async comment_count_hotel_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentNumTop5?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=hotel"
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.hotelCommentCount = res.data.data;
      }
      let highComment = [];
      let middleComment = [];
      let lowComment = [];
      // console.log(this.scenicCommentCount.reverse());
      this.hotelCommentCount.reverse().forEach(element => {
        this.hotelCommentName.push(element.placeName);
        highComment.push(element.highNum);
        middleComment.push(element.midNum);
        lowComment.push(element.lowNum);
      });
      this.hotelCountTable = this.$echarts.init(
        this.$refs.word_mouth_hotel_comment_total_account_count
      );
      var option = {
        barWidth: 10,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ["好评", "中评", "差评"]
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: false
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        yAxis: {
          type: "category",
          data: this.hotelCommentName,
          axisLabel: {
            show: false,
            // position: "right",
            // padding: [3, 4, 6],
            color: "#fff"
            // position:right
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        series: [
          {
            name: "好评",
            type: "bar",
            stack: "总量",
            // itemStyle: {
            //   show: true,
            //   // position: "top",
            //   position: [5, -16],
            // },

            label: {
              show: false,
              position: "insideRight"
            },
            itemStyle: {
              normal: {
                label: {
                  formatter: "{b}",
                  show: true,
                  // position: "top",
                  textStyle: {
                    fontSize: 12,
                    color: "#BFE0FF"
                  },
                  position: [5, -20]
                }
              }
            },
            data: highComment
          },
          {
            name: "中评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: middleComment
          },
          {
            name: "差评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: lowComment
          }
        ],
        color: ["#02579F", "#0A9193", "#786319"]
      };
      this.hotelCountTable.setOption(option);
    },
    // 餐饮评论量
    async comment_count_catering_table() {
      let res = await axios.get(
        this.baseUrl +
          "/evaluate/getCommentNumTop5?areaName='普陀'&queryTime=" +
          this.timeMonth +
          "&placeType=restaurant"
      );
      // console.log(res);
      if (res.data.msg == "success") {
        this.caterCommentCount = res.data.data;
      }
      let highComment = [];
      let middleComment = [];
      let lowComment = [];
      // console.log(this.scenicCommentCount.reverse());
      this.caterCommentCount.reverse().forEach(element => {
        this.caterCommentName.push(element.placeName);
        highComment.push(element.highNum);
        middleComment.push(element.midNum);
        lowComment.push(element.lowNum);
      });
      this.cateringCountTable = this.$echarts.init(
        this.$refs.word_mouth_catering_comment_total_account_count
      );
      var option = {
        barWidth: 10,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ["好评", "中评", "差评"]
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: false
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        yAxis: {
          type: "category",
          data: this.caterCommentName,
          axisLabel: {
            show: false,
            // position: "right",
            // padding: [3, 4, 6],
            color: "#fff"
            // position:right
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //分割线配置
            show: false,
            lineStyle: {
              color: "#004069"
            }
          }
        },
        series: [
          {
            name: "好评",
            type: "bar",
            stack: "总量",
            // itemStyle: {
            //   show: true,
            //   // position: "top",
            //   position: [5, -16],
            // },

            label: {
              show: false,
              position: "insideRight"
            },
            itemStyle: {
              normal: {
                label: {
                  formatter: "{b}",
                  show: true,
                  // position: "top",
                  textStyle: {
                    fontSize: 12,
                    color: "#BFE0FF"
                  },
                  position: [5, -20]
                }
              }
            },
            data: highComment
          },
          {
            name: "中评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: middleComment
          },
          {
            name: "差评",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: lowComment
          }
        ],
        color: ["#02579F", "#0A9193", "#786319"]
      };
      this.cateringCountTable.setOption(option);
    },
    resizeHandler() {
      this.commentAddressTable.resize();
      this.commentTrendTable.resize();
      this.commentAddressTable.resize();
      this.commentDimensionalityTable.resize();
      this.scenicCountTable.resize();
      this.commentDimensionalityHotelTable.resize();
      this.commentDimensionalityCateringTable.resize();
      this.hotelCountTable.resize();
      this.cateringCountTable.resize();
    },
    // 上一页，下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
      this.getCommnetList();
    },
    // 获取评价列表
    async getCommnetList() {
      let res = await axios.post(
        this.baseUrl + "/placeComment/findCommentList",
        qs.stringify({
          areaName: "普陀",
          commentType: this.commnetType,
          pageNo: this.currentPage,
          pageSize:6,
          placeName: this.commnetObjName,
          placeSource: this.commnetOrigin,
          placeType: this.commnetObjType
        })
      );
      console.log(res);
      if (res.data.msg == "success") {
        this.commentList = res.data.data.list;
        this.allAccount = res.data.data.total;
      }
      console.log(this.commentList);
    },
    reset(){
       this.commnetType='';
          this.currentPage=1;
          this.commnetObjName='';
          this.commnetOrigin='';
         this.commnetObjType='scenic';
      this.getCommnetList();
    }
  },
  mounted() {
    this.getHotelEval();
    this.getSceEval();
    this.getCaterEval();
    // 获取新增评论量
    this.getAddComment();
    // 获取最新评价
    this.getNewComment();
    // 获取全部评价
    this.getCommnetList();
    this.comment_trend_table();
    this.comment_address_table();
    this.comment_dimensionality_table();
    this.comment_count_shenjia_table();
    this.comment_hotel_dimensionality_table();
    this.comment_catering_dimensionality_table();
    this.comment_count_hotel_table();
    this.comment_count_catering_table();
  }
};
</script>
<style>
.word_mouth_all_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("../../assets/image/bg.jpg");
  background-size: 100% 100%;
  font-family: PingFang SC;
  position: relative;
}
.word_mouth_comment_dialog_bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.word_mouth_comment_dialog {
  width: 62%;
  height: 60%;
  position: absolute;
  left: calc((100% - 62%) / 2);
  top: calc((100% - 60%) / 2);
  z-index: 300;
  /* background: #fff; */
  background-image: url("../../assets/image/mouth_dig_bg.png");
  background-size: 100% 100%;
}
.word_mouth_title {
  width: 100%;
  height: 8.61%;
  background-image: url("../../assets/image/title.png");
  background-size: 100% 100%;
  /* line-height: 60px; */
  font-size: 22px;
  font-family: PingFang SC;
  color: #cbeaff;
  text-align: center;
  position: relative;
}
.word_mouth_title_font {
  width: 100%;
  height: 28px;
  text-align: center;
  position: absolute;
  top: 50%;
  margin-top: calc(-40px / 2);
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
  /* margin-top: -14px; */
}
.word_mouth_content {
  height: 90%;
  margin-top: 1%;
  margin-bottom: 1%;
  /* margin-top: 20px; */
  display: flex;
  /* justify-content: space-around; */
  padding-left: 2%;
}
.word_mouth_left_contnet {
  width: 33%;
  height: 100%;
  margin-right: 2%;
}
.word_mouth_right_contnet {
  width: 68%;
  height: 100%;
  /* display: flex; */
  overflow: hidden;
  /* flex-wrap: wrap;
  justify-content: space-around; */
  /* overflow-x: scroll; */
}
.word_mouth_bridge {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url("../../assets/image/mouth_bridge_bg.png");
  background-size: 100% 100%;
}
.word_mouth_bridge_right {
  display: inline-block;
  width: 48%;
  height: 100%;
  /* margin-right: 3%; */
  background-image: url("../../assets/image/mouth_bridge_bg.png");
  background-size: 100% 100%;
}
.word_mouth_bridge_title {
  width: 100%;
  height: 6.7%;
  position: relative;
  /* height: 50px; */
  /* line-height: 48px; */
  font-family: PingFang SC;
  /* font-weight: bold; */
  color: rgba(203, 234, 255, 1);
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
  text-align: center;
  background-image: url("../../assets/image/mouth_bridge_title.png");
  background-size: 100% 100%;
}
.word_mouth_bridge_title_font {
  position: absolute;
  top: 50%;
  width: 100%;
  /* text-align: center; */
  height: 22px;
  margin-top: -11px;
}
/* 累计评价 */
.synthesize_summarize {
  height: 10%;
  display: flex;
  color: #fff;
  padding: 10px 20px;
}
.synthesize_all_person {
  width: 30%;
  height: 93.3%;
  margin-left: 5px;
}
.synthesize_all_person_title {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(178, 210, 227, 1);
  margin-bottom: 5px;
}
.synthesize_all_person_account {
  height: 70%;
  width: 90%;
  /* height: 16%; */
  text-align: center;
  /* padding: 10px 0; */
  /* letter-spacing: 2px; */
  background-image: url("../../assets/image/mouth_total_comment.png");
  background-size: 100% 100%;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(12, 227, 220, 1);
  position: relative;
}
.synthesize_all_person_account_font {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  margin-top: -14px;
}
.synthesize_add_comment {
  width: 30%;
  height: 100%;
  background-image: url("../../assets/image/mouth_add_comment.png");
  background-size: 100% 100%;
  margin-right: 10px;
  /* padding: 1% 0; */
  text-align: center;
  color: rgba(12, 227, 220, 1);
}
.synthesize_add_comment_title {
  margin: 10px 5px 0;
  color: rgba(178, 210, 227, 1);
  font-size: 14px;
}
.synthesize_add_comment_account img {
  /* display: flex;
  align-items: center;
  text-align: center; */
  vertical-align: center;
}
.mouth_add_up {
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.mouth_add_up img {
  width: 60%;
  height: 30%;
}
/* 评论趋势图 */
.synthesize_comment_trend {
  padding: 0 5%;
  height: 21%;
  /* border: 1px solid #000; */
}
.word_mouth_bridge_little_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.word_mouth_bridge_little_title_word {
  width: 26%;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  color: rgba(178, 210, 227, 1);
  background-image: url("../../assets/image/mouth_little_title.png");
  background-size: 100% 100%;
}
.word_mouth_bridge_little_title_line {
  width: 70%;
  height: 1px;
  border-bottom: 2px dashed rgba(0, 106, 166, 1);
}
/* 评论趋势图图表 */
.synthesize_comment_trend_table {
  width: 100%;
  height: 85%;
  /* background-color: #fff; */
}
/* 评论来源地 */
.synthesize_distribution_comments {
  padding: 0 5%;
  margin-top: 1%;
  height: 28%;
  /* border: 1px solid #000; */
}
.synthesize_distribution_comments_content {
  width: 100%;
  height: 85%;
  /* background-color: #fff; */
}
.synthesize_distribution_comments_table_content {
  width: 100%;
  height: 100%;
  position: relative;
}
/* 设置动画 */
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(360deg);
  }

  to {
    -webkit-transform: rotate(0deg);
  }
}

@-webkit-keyframes rotation2 {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}
.mouth_circle_out {
  position: absolute;
  left: calc(50% - 30% / 2);
  top: 10%;
  width: 30%;
  -webkit-transform: rotate(360deg);
  animation: rotation 4s linear infinite;
  -moz-animation: rotation 4s linear infinite;
  -webkit-animation: rotation 4s linear infinite;
  -o-animation: rotation 4s linear infinite;
  /* height: 90%; */
}
.mouth_circle_in {
  width: 28%;
  position: absolute;
  left: calc(50% - 28% / 2);
  top: 12.5%;
  -webkit-transform: rotate(360deg);
  animation: rotation2 4s linear infinite;
  -moz-animation: rotation2 4s linear infinite;
  -webkit-animation: rotation2 4s linear infinite;
  -o-animation: rotation2 4s linear infinite;
  /* top: 15px; */
  /* height: 90%; */
}
.synthesize_distribution_comments_table {
  position: absolute;
  width: 100%;
  height: 100%;
  /* border: 1px solid #000; */
}
/* <!-- 最新评论 --> */
.word_mouth_new_comments {
  padding: 0 5%;
  margin-top: 1%;
  height: 28%;
  /* border: 1px solid #000; */
}
.synthesize_latest_comments_list {
  height: 65%;
  /* border: 1px solid #000; */
}
.synthesize_latest_comments_list {
  margin-top: 1%;
}
.synthesize_latest_comments_list > div {
  width: 100%;
  /* height: 18%; */
  /* padding: 1% 0; */
  display: flex;
  /* padding: 2.5% 0; */
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #006aa6;
}
.mouth_comment_result {
  padding: 0.5% 5%;
  font-size: 12px;
  background-image: url("../../assets/image/mouth_comment_result.png");
  background-size: 100% 100%;
}
.mouth_comment_address {
  padding: 0.5% 5%;
  font-size: 12px;
  background-image: url("../../assets/image/mouth_comment_address.png");
  background-size: 100% 100%;
}
.mouth_comment_content {
  margin-left: 2%;
  width: 65%;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow: hidden; /*内容会被修剪，并且其余内容是不可见的。*/
  text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
}
/* 查看更多评论 */
.synthesize_check_comments {
  width: 25%;
  margin: 0 auto;
  margin-top: 2%;
  padding: 1% 2%;
  text-align: center;
  box-sizing: border-box;
  padding: 2px 0;
  background: rgba(24, 61, 88, 1);
  border: 1px solid rgba(0, 106, 166, 1);
  border-radius: 10px;
  font-size: 8px;
  font-weight: 500;
  color: rgba(178, 210, 227, 1);
  cursor: pointer;
}
.mouth_font_center {
  position: absolute;
  top: 50%;
}
/* 景区评论概况 */
.word_mouth_scenic_comment_all_content {
  padding: 0 5%;
  height: 92.5%;
  /* border: 1px solid #000; */
}

/* 景区评论数 */
.word_mouth_scenic_comment_total {
  width: 100%;
  height: 16%;
  /* border: 1px solid #000; */
}
.word_mouth_scenic_comment_total_title {
  font-size: 16px;
  color: #b2d2e3;
  margin-top: 1%;
  margin-bottom: 2%;
}
.word_mouth_scenic_comment_total_content {
  width: 100%;
  height: 70%;
  display: flex;
}
.word_mouth_scenic_comment_total_count {
  width: 35%;
  height: 100%;
  /* margin-top: 1%; */
}
.word_mouth_scenic_comment_classify {
  width: 65%;
  height: 70%;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  text-align: center;
  background-image: url("../../assets/image/mouth_total_comment.png");
  background-size: 100% 100%;
  padding-left: 1%;
}

.word_mouth_scenic_comment_classify > img {
  width: 32.8%;
  height: 80%;
}
/* 景区评分维度 */
.word_mouth_scenic_comment_dimensionality {
  width: 100%;
  height: 30%;
  /* border: 1px solid #000; */
}
.word_mouth_scenic_comment_dimensionality_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid #000; */
}
.word_mouth_scenic_comment_dimensionality_table {
  width: 50%;
  height: 100%;
}
.word_mouth_scenic_comment_dimensionality_choose {
  width: 40%;
  height: 100%;
  margin-top: 5%;
}
.word_mouth_scenic_comment_dimensionality_choose select {
  /* width:200px;
    height:28px; */
  cursor: pointer;
  width: 80%;
  /* height: 14%; */
  height: 28px;
  padding-left: 3%;
  border: 1px solid rgba(0, 108, 171, 1);
  border-radius: 4px 4px 4px 4px;
  background-color: transparent;
  color: #bfe0ff;
  /* appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none; */
  /*添加下拉三角图标*/
  /* background: url("../img/task5-2_07.jpg") no-repeat right center transparent; */
}
.word_mouth_scenic_comment_dimensionality_choose select:after {
  content: "";
  width: 14px;
  height: 8px;
  /* background: url(../assets/arrow-down.png) no-repeat center; */
  /* border: 1px solid #000; */
  /*通过定位将图标放在合适的位置*/
  position: absolute;
  right: 20px;
  top: 41%;
  /*给自定义的图标实现点击下来功能*/
  pointer-events: none;
}
.word_mouth_scenic_comment_dimensionality_choose select option {
  color: #006aa6;
  background-color: transparent;
}
.analysis_synthesis_title {
  margin-top: 3%;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(178, 210, 227, 1);
}
.analysis_synthesis_score {
  margin-top: 1%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(178, 210, 227, 1);
}
.word_mouth_scenic_comment_dimensionality_point {
  margin-top: 10%;
  height: 18%;
}
.word_mouth_scenic_comment_dimensionality_point_all_scenic {
  height: 50%;
  font-size: 12px;
  color: #00ffff;
}
.word_mouth_scenic_comment_dimensionality_point_all_scenic span {
  display: inline-block;
  width: 3%;
  height: 30%;
  margin-right: 5%;
  background-color: #00ffff;
  border-radius: 50%;
}
.word_mouth_scenic_comment_dimensionality_point_choose_scenic {
  height: 50%;
  font-size: 12px;
  color: #f4c60f;
  margin-top: 2%;
}
.word_mouth_scenic_comment_dimensionality_point_choose_scenic span {
  display: inline-block;
  width: 3%;
  height: 30%;
  margin-right: 5%;
  background-color: #f4c60f;
  border-radius: 50%;
}
/* 景区评论量 */
.word_mouth_scenic_comment_total_account {
  width: 100%;
  height: 50%;
  /* text-align: center; */
  /* border: 1px solid #000; */
}
.word_mouth_scenic_comment_total_account_content {
  width: 100%;
  height: 80%;
  /* border: 1px solid red; */
  padding: 3% 0;
}
.word_mouth_scenic_name_comment_total_account {
  font-size: 16px;
  margin-bottom: 1%;
  color: rgba(191, 224, 255, 1);
}
.word_mouth_scenic_comment_total_account_count {
  width: 100%;
  height: 300px;
  height: 55%;
  padding: 0.5% 0.2%;
  background-image: url("../../assets/image/word_mouth_scenic_comment_total_account_count.png");
  background-size: 100% 100%;
}
/* 右拉箭头 */
.word_mouth_bridge_right_arrow {
  width: 3%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.word_mouth_bridge_right_arrow img {
  width: 100%;
}
/* 评论弹框 */
.word_mouth_comment_dialog_title {
  width: 100%;
  height: 10%;
  background-image: url("../../assets/image/mouth_dig_title.png");
  background-size: 100% 100%;
  position: relative;
}
.word_mouth_comment_dialog_title img {
  cursor: pointer;
  z-index: 10;
  width: 2.7%;
  height: 60%;
  position: absolute;
  right: 2.5%;
  top: calc((100% - 60%) / 2);
}
.word_mouth_comment_dialog_title_font {
  width: 100%;
  height: 28px;
  text-align: center;
  position: absolute;
  font-size: 20px;
  font-family: PingFang SC;
  color: rgba(203, 234, 255, 1);
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
  top: 50%;
  margin-top: -14px;
}
.word_mouth_comment_dialog_content {
  width: 97%;
  margin: 0 auto;
  margin-top: 0.5%;
  height: 78%;
  background: rgba(5, 51, 91, 0.5);
}
.word_mouth_comment_dialog_choose {
  width: 100%;
  height: 20%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
}
.dig_comment_source {
  font-size: 12px;
  display: flex;
  align-items: center;
  font-family: Microsoft YaHei;
  color: rgba(255, 255, 255, 1);
}
.dig_comment_source_one {
  width: 20%;
}
.dig_comment_source_two {
  width: 23%;
}
.dig_comment_source_three {
  width: 38%;
}
.dig_comment_source_four {
  width: 18%;
}
.dig_comment_source_five {
  width: 42%;
}
.dig_comment_source_six {
  width: 104px;
  height: 28px;
  background: rgba(3, 104, 189, 1);
  border-radius: 14px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
.dig_comment_source_seven {
  width: 104px;
  height: 28px;
  background: rgba(3, 104, 189, 1);
  border-radius: 14px;
  text-align: center;
  line-height: 28px;
  margin-left: 20px;
  cursor: pointer;
}
.dig_comment_source_select .el-select .el-input .el-select__caret {
  /*添加下拉三角图标*/
  background: url("../../assets/image/mouth_bottom_arrow.png") no-repeat center;
  color: transparent;
}
.dig_comment_source_select .el-input__inner {
  width: 128px;
  height: 28px;
  background: rgba(7, 66, 115, 1);
  border: 1px solid rgba(3, 104, 189, 1);
  border-radius: 14px;
  color: #d0e4f9;
  font-size: 12px;
}
.el-select-dropdown.dig_comment_source_select_little {
  background-color: #000;
}
.dig_comment_source .dig_comment_source_word {
  display: inline-block;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(255, 255, 255, 1);
  margin-right: 5%;
}
.dig_comment_source .dig_comment_source_select {
  display: inline-block;
}
.dig_comment_source_time {
  display: flex;
  align-items: center;
}
.dig_comment_source_time .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
}
.dig_comment_source_time .el-input__inner {
  width: 150px;
  height: 28px;
  background: rgba(7, 66, 115, 1);
  border: 1px solid rgba(3, 104, 189, 1);
  border-radius: 14px;
}
.dig_comment_source_time .el-input__icon {
  line-height: 28px;
}
.dig_comment_source_time .el-input__prefix {
  left: 0;
  right: -90px;
}
.dig_comment_source_five .el-input__inner {
  width: 386px;
  height: 28px;
  background: rgba(7, 66, 115, 1);
  border: 1px solid rgba(3, 104, 189, 1);
  border-radius: 14px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(208, 228, 249, 1);
}
.dig_comment_source_five .el-input {
  width: 57%;
}
.word_mouth_comment_dialog_list {
  width: 100%;
  height: 80%;
}
.word_mouth_comment_dialog_list table {
  width: 100%;
  /* height: 100%; */
  /* overflow-y: auto; */
  border-collapse: collapse;
}
.word_mouth_comment_dialog_list table tr > td {
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  color: rgba(208, 228, 249, 1);
  vertical-align: middle;
}
.word_mouth_comment_dialog_list table tr:nth-of-type(1) {
  background-color: #074273;
}
.word_mouth_comment_dialog_list table tr.word_mouth_comment_tr_one {
  background-color: #032b4d;
}
.word_mouth_comment_dialog_list table tr.word_mouth_comment_tr_two {
  background-color: #074273;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(1) {
  width: 10%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(2) {
  width: 11%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(3) {
  width: 10%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(4) {
  width: 5%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(5) {
  width: 13%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(6) {
  /* width: 30%; */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(7) {
  width: 12%;
}
.word_mouth_comment_dialog_list table tr > td:nth-of-type(8) {
  width: 10%;
}
.word_mouth_page {
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.word_mouth_page_total {
  font-size: 12px;
  color: #d0e4f9;
}
.word_mouth_page_total span {
  color: #f8bf58;
}
.word_mouth_page_total .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #0a5b8f;
  color: #fff;
}
@media screen and (max-width: 1400px) {
  .dig_comment_source_one {
    width: 23%;
  }
  .dig_comment_source_two {
    width: 26%;
  }
  .dig_comment_source_three {
    width: 49%;
  }
  .dig_comment_source_four {
    width: 22%;
  }
  .dig_comment_source_six {
  }
  .dig_comment_source_select .el-input__inner {
    width: 116px;
    height: 20px;
    background: rgba(7, 66, 115, 1);
    border: 1px solid rgba(3, 104, 189, 1);
    border-radius: 14px;
    color: #d0e4f9;
    font-size: 12px;
  }
  .dig_comment_source_time .el-input__inner {
    width: 140px;
    height: 21px;
    font-size: 12px;
    background: rgba(7, 66, 115, 1);
    border: 1px solid rgba(3, 104, 189, 1);
    border-radius: 14px;
  }
  .dig_comment_source_five .el-input__inner {
    width: 246px;
    height: 20px;
    background: rgba(7, 66, 115, 1);
    border: 1px solid rgba(3, 104, 189, 1);
    border-radius: 14px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(208, 228, 249, 1);
  }
  .dig_comment_source_six {
    width: 77px;
    height: 20px;
    background: rgba(3, 104, 189, 1);
    border-radius: 14px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
  .dig_comment_source_seven {
    width: 75px;
    height: 20px;
    background: rgba(3, 104, 189, 1);
    border-radius: 14px;
    text-align: center;
    line-height: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
  .synthesize_latest_comments_list > div {
    width: 100%;
    display: flex;
    /* height: 18%; */
    /* padding: 1% 0; */
    padding: 1.5% 0;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #006aa6;
  }
  .synthesize_distribution_comments_table {
    position: absolute;
    width: 100%;
    height: 110%;
    margin-top: -0.8%;
    /* border: 1px solid #000; */
  }
  .word_mouth_scenic_comment_dimensionality_choose select {
    cursor: pointer;
    width: 80%;
    /* height: 14%; */
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding-left: 3%;
    border: 1px solid rgba(0, 108, 171, 1);
    border-radius: 4px 4px 4px 4px;
    background-color: transparent;
    color: #bfe0ff;
    /* background: url(../img/task5-2_07.jpg) no-repeat right center transparent; */
  }
  .analysis_synthesis_title {
    margin-top: 3%;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(178, 210, 227, 1);
  }
  .analysis_synthesis_score {
    margin-top: 1%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(178, 210, 227, 1);
  }
  .word_mouth_scenic_comment_dimensionality_point {
    margin-top: 7%;
    height: 18%;
  }
  .word_mouth_scenic_comment_dimensionality_table {
    width: 50%;
    height: 100%;
  }
  .mouth_comment_content {
    margin-left: 2%;
    width: 60%;
    white-space: nowrap; /*规定段落中的文本不进行换行*/
    overflow: hidden; /*内容会被修剪，并且其余内容是不可见的。*/
    text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
  }
  .mouth_comment_result {
    padding: 1% 5%;
    font-size: 12px;
    background-image: url("../../assets/image/mouth_comment_result.png");
    background-size: 100% 100%;
  }
  .mouth_comment_address {
    padding: 1% 5%;
    font-size: 12px;
    background-image: url("../../assets/image/mouth_comment_address.png");
    background-size: 100% 100%;
  }
}
</style>