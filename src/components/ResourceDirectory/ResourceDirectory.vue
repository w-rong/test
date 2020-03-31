<template>
  <div class="body">
    <div class="header">
      <div class="top">
        <img class="logo" src="https://smsycs.hxxpl.com.cn/2020/202002251516168622953.png" alt />
        <div class="pagename">资源目录管理</div>
        <div class="user-info">
          欢迎您,
          <span class="user-name">普陀信息管理中心</span>
          <span class="out-btn" @click="goOut()">退出</span>
        </div>
      </div>
      <div class="section">
        <div class="section-children">资源统计</div>
      </div>
    </div>
    <div class="resource-box">
      <div class="head">数据共享</div>
      <div class="resource">
        <p class="resource-head" @click="isAllClassify = true">
          <img
            class="icon"
            src="https://smsycs.hxxpl.com.cn/2020/202002241937039476858.png"
          />
          总统计表
        </p>
      </div>
      <div class="resource" v-for="val in list" :key="val.index">
        <p class="resource-head" @click="changeDateClass(val.name)" :id="val.name">
          <img
            class="icon"
            src="https://smsycs.hxxpl.com.cn/2020/202002241937039476858.png"
            :alt="val.name"
          />
          {{val.name}}
          <span>{{val.number}}</span>
        </p>
        <ul class="resource-list">
          <li
            class="resource-item"
            :class=" {show: showDate == val.name}"
            v-for="items in val.subList"
            :key="items.index"
            @click="getResourceDate(items.name)"
          >
            <p class="resource-name">
              <img
                class="icon"
                src="https://smsycs.hxxpl.com.cn/2020/202002241940032468354.png"
                :alt="items.name"
              />
              {{items.name}}
            </p>
            <span>{{items.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="table-body" v-show="isAllClassify == false">
      <div class="table-box">
        <div class="table-header-box">
          <p class="table-header-text">
            『{{ showSubdate ||'全部'}}』数据资源
            <span>共{{totalTableNum}}种资源表 共{{totalFieldNum}}个字段项</span>
          </p>
          <div class="search-box">
            <input class="search-inp" type="text" v-model="keyword" />
            <div class="search-btn" @click="getSearchData()">当前资源检索</div>
          </div>
        </div>
        <div class="sort-box">
          <span class="sort-text">排序</span>
          <span
            class="sort-btn"
            :class="{active: isSortType == 'big' }"
            @click="setNumber('big')"
          >记录数↑</span>
          <span
            class="sort-btn"
            :class="{active: isSortType == 'some'}"
            @click="setNumber('some')"
          >记录数↓</span>
          <span class="sort-btn" :class="{active: isShowEnglish}" @click="setShowEnglish()">隐藏英文表名</span>
        </div>
        <div class="list-box">
          <div
            class="list-item"
            v-for="item in subListDate"
            :key="item.index"
            @click="showListData(item.tableCode,item.tableName)"
          >
            <div class="list-top">
              <p class="show" :class="{only: !isShowEnglish }">{{item.tableName}}</p>
              <p :class="{show: isShowEnglish}">{{item.tableCode}}</p>
            </div>
            <div class="list-body">
              <div class="list-body-item">
                <img src alt />
                <p>{{item.updateType}}</p>
              </div>
              <div class="list-body-item">
                <img src alt />
                <p>记录数</p>
                <span>{{item.records}}</span>
              </div>
              <div class="list-body-item">
                <img src alt />
                <p>字段数</p>
                <span>{{item.fieldNum}}</span>
              </div>
              <!-- 暂时没有接口 -->
              <!-- <div class="apply-btn" @click="goApply()">加入申请</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="res_allclassify" v-show="isAllClassify">
      <div class="res_allclassify_title">汇总统计</div>
      <div class="res_allclassify_table">
          <div v-for="(item, index) in classifyLists" :key='index'
          :class="'res_allclassify_table_little'+index">
            <img :src='item.icon' alt="">
            <div class="res_allclassify_name">{{item.name}}</div>
            <div class="res_allclassify_val" v-if="index == 4">{{item.val}}条</div>
            <div class="res_allclassify_val" v-else>{{item.val}}个</div>
          </div>
      </div>
    </div>
    <!--  -->
    <div class="alter-bg" v-show="isShowAlert"></div>
    <div class="alert-body" v-show="isShowAlert">
      <h3>
        基本信息
        <div class="off-btn" @click="offDataInfo()">关闭窗口</div>
        <div class="info-btn" @click="seeDataInfo(eFieldName)">详细数据</div>
      </h3>
      <div class="table">
        <div class="tr">
          <div class="td">资源ID</div>
          <div class="tdr"></div>
        </div>
        <div class="tr">
          <div class="td">资源关键字</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">信息资源名称</div>
          <div class="tdr"></div>
        </div>
        <!--  <div class="tr">
          <div class="td">资源关键字</div>
          <div class="tdr"></div>
        </div>-->
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">共享类型</div>
          <div class="tdr">地区共享</div>
        </div>
        <div class="tr">
          <div class="td">共享方式</div>
          <div class="tdr">共享平台</div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">数据分类大类</div>
          <div class="tdr">地区共享</div>
        </div>
        <div class="tr">
          <div class="td">数据分类子类</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">数据来源大类</div>
          <div class="tdr"></div>
        </div>
        <div class="tr">
          <div class="td">数据来源子类</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">数据分享大类</div>
          <div class="tdr">旅游消费情况</div>
        </div>
        <div class="tr">
          <div class="td">数据分享子类</div>
          <div class="tdr">消费结构信息</div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">系统来源</div>
          <div class="tdr">单位自建</div>
        </div>
        <div class="tr">
          <div class="td">数据库形式</div>
          <div class="tdr">本地数据库</div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">更新频率</div>
          <div class="tdr">每日</div>
        </div>
        <div class="tr">
          <div class="td">数据交换方式</div>
          <div class="tdr">数据抽取</div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">信息资源摘要</div>
          <div class="tdr"></div>
        </div>
        <div class="tr">
          <div class="td"></div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">信息资源提供方</div>
          <div class="tdr">浙江省文化和旅游厅</div>
        </div>
        <div class="tr">
          <div class="td">信息资源提供方地址</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">元数据联系单位</div>
          <div class="tdr">浙江省文化和旅游厅</div>
        </div>
        <div class="tr">
          <div class="td">元数据联系单位地址</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table">
        <div class="tr">
          <div class="td">服务类型</div>
          <div class="tdr">目录服务</div>
        </div>
        <div class="tr">
          <div class="td">服务地址</div>
          <div class="tdr"></div>
        </div>
      </div>
      <div class="table bottom">
        <div class="tr">
          <div class="td">在线资源连接地址</div>
          <div class="tdr"></div>
        </div>
        <div class="tr">
          <div class="td">词典名称</div>
          <div class="tdr"></div>
        </div>
      </div>
      <h3>表信息</h3>
      <div class="table bottom">
        <div class="tr">
          <div class="td">英文表名</div>
          <div class="tdr">{{eFieldName}}</div>
        </div>
        <div class="tr">
          <div class="td">中文表名</div>
          <div class="tdr">{{cFieldName}}</div>
        </div>
      </div>
      <h3>字段信息</h3>
      <div class="text-table">
        <div class="text-head">
          <p>字段英文名</p>
          <p>字段中文名</p>
          <p>字段类型</p>
          <p>共享类型</p>
          <p>主键</p>
        </div>
        <!-- 数据遍历 -->
        <div class="text-tr" v-for="field in fieldList" :key="field.index">
          <p class="text-td">{{field.fieldEngName}}</p>
          <p class="text-td">{{field.fieldCnsName}}</p>
          <p class="text-td">{{field.fieldType}}</p>
          <p class="text-td">地区共享</p>
          <p class="text-td">
            <img class="icon_true" src="https://smsycs.hxxpl.com.cn/2020/202002242353394554188.png" alt v-if="field.isNullAble == 'YES'"/>
          </p>
        </div>
      </div>
      <div style="margin: 30px auto;width:100%;height: 40px;">
        <!-- <div class="off-btn" @click="offDataInfo()">关闭窗口</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import "../ResourceDirectory/ResourceDirectory.css";
export default {
  data() {
    return {
      list: [],
      showDate: "",
      showSubdate: "",
      isShowEnglish: "",
      subListDate: [],
      keyword: "",
      isShowAlert: false,
      isSortType: "",
      totalTableNum: "",
      totalFieldNum: "",
      fieldList: "",
      cFieldName: "",
      eFieldName: "",
      isAllClassify:true,
      classifyLists:[
        {
          name:"数据分类",
          val:5,
          icon:'https://smsycs.hxxpl.com.cn/2020/202003301712361223675.png'
        },
        {
          name:"子类数",
          val:0,
          icon:"https://smsycs.hxxpl.com.cn/2020/202003301713505518560.png"
        },
        {
          name:"字段数",
          val:0,
          icon:"https://smsycs.hxxpl.com.cn/2020/202003301714156690442.png"
        },
        {
          name:"数据表",
          val:0,
          icon:"https://smsycs.hxxpl.com.cn/2020/202003301719302473661.png"
        },
        {
          name:"数据量",
          val:0,
          icon:"https://smsycs.hxxpl.com.cn/2020/202003301715348487355.png"
        },
      ]
    };
  },
  created() {
    this.getListData();
    this.getHead();
    this.getAllClassify()
  },
  methods: {
    getResourceDate(name) {
      // console.log(name);
      this.showSubdate = name;
      this.getSublistDate(name);
    },
    changeDateClass(name) {
      this.isAllClassify = false
      // console.log(name);
      if (this.showDate !== name) {
        this.showDate = name;
      } else {
        this.showDate = "";
      }
      // console.log(this.showDate);
    },
    getHead() {
      this.axios
        .get("http://47.96.94.56:8082/resource/getTabList")
        .then(res => {
          console.log(res.data.data);
          let result = res.data.data;
          let obj = { name: "", number: "", subList: [] };
          let list = [];
          result.map(res => {
            // 处理数据，转成前端需要的数据类型
            // console.log("res", res);
            obj.name = res.tabType;
            obj.number = res.subNum;
            let strArr = res.subType.split(",");
            // console.log(strArr);
            let obj2 = { name: "", num: "" };
            strArr.map(str => {
              let subStr = str.split("_");
              //   console.log(subStr);
              obj2.name = subStr[0];
              obj2.num = subStr[1];
              obj.subList.push(obj2);
              obj2 = { name: "", num: "" };
            });
            // console.log("obj", obj);
            this.list.push(obj);
            obj = { name: "", number: "", subList: [] };
          });
          // console.log("this.list", this.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSublistDate(name) {
      let that = this;
      that.axios
        .post(
          "http://47.96.94.56:8082/resource/getTypeRowsColumn?tableType=" +
            name +
            "&tableName=",
          {}
        )
        .then(function(res) {
          // console.log(res.data.data);
          that.subListDate = res.data.data.listData;
          that.totalFieldNum = res.data.data.totalFieldNum;
          that.totalTableNum = res.data.data.totalTableNum;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllClassify() {
      let that = this;
      that.axios
        .get(
          "http://47.96.94.56:8082/resource/getTableTypeCount"
        )
        .then(function(res) {
          console.log(res);
          that.classifyLists[1].val = res.data.data
          // that.subListDate = res.data.data.listData;
          // that.totalFieldNum = res.data.data.totalFieldNum;
          // that.totalTableNum = res.data.data.totalTableNum;
        })
        .catch(function(error) {
          console.log(error);
        });
      that.axios
        .post(
          "http://47.96.94.56:8082/resource/getAllRowsColumn?tableName=",
          {}
        )
        .then(function(res) {
          console.log(res);
          that.classifyLists[2].val = res.data.data.totalFieldNum
          that.classifyLists[3].val = res.data.data.totalTableNum
          that.classifyLists[4].val = res.data.data.totalRowNum
          console.log(that.classifyLists[2])
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setShowEnglish() {
      this.isShowEnglish = !this.isShowEnglish;
    },
    // 加入申请，暂无接口
    goApply() {},
    // 页面初始化获取数据
    getListData() {
      let that = this;
      that.axios
        .post(
          "http://47.96.94.56:8082/resource/getAllRowsColumn?tableName=",
          {}
        )
        .then(function(res) {
          // console.log(res.data.data);
          //   let list = res.data.data;
          that.subListDate = res.data.data.listData;
          that.totalFieldNum = res.data.data.totalFieldNum;
          that.totalTableNum = res.data.data.totalTableNum;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showListData(code, name) {
      // console.log(code);
      // 加载动画
      this.isShowAlert = true;
      this.cFieldName = name;
      this.eFieldName = code;
      let that = this;
      // 开始请求接口
      that.axios
        .post(
          "http://47.96.94.56:8082/resource/getTableDetails?tableCode=" + code,
          {}
        )
        .then(function(res) {
          // console.log(res.data.data);
          // 加载动画结束
          that.fieldList = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seeDataInfo(eFieldName) {
      let routeUrl = this.$router.resolve({
        path: "/tableList",
        query: { tableCode: eFieldName }
      });
      window.open(routeUrl.href, "_blank");
    },
    getSearchData() {
      let val = this.keyword;
      let that = this;
      this.axios
        .post(
          "http://47.96.94.56:8082/resource/getAllRowsColumn?tableName=" + val,
          {}
        )
        .then(function(res) {
          console.log(res.data.data);
          that.subListDate = res.data.data.listData;
          that.totalTableNum = res.data.data.totalTableNum;
          that.totalFieldNum = res.data.data.totalFieldNum;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setNumber(type) {
      let that = this;
      if (type == "big") {
        let list = that.subListDate.sort(function(a, b) {
          return a.records - b.records;
        });
        that.isSortType = "big";
      } else if (type == "some") {
        let list = that.subListDate.sort(function(a, b) {
          return b.records - a.records;
        });
        that.isSortType = "some";
      }
    },
    offDataInfo() {
      this.isShowAlert = false;
      this.cFieldName = "";
      this.eFieldName = "";
    },
    // 退出登录
    goOut() {}
  }
};


</script>

<style scoped>
body::-webkit-scrollbar {
  display: none;
}

.body {
  width: 99vw;
  height: 100vh;
  /* margin-top: 88px; */
}
</style>
