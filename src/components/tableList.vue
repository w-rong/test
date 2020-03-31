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
    </div>
    <!-- <el-table :data="datalist" border  :stripe='true' style="width:100%" v-if="item.length>6">
      <af-table-column
        :prop="item"
        :label="item"
        v-for="item in tablist"
        :key="item.index" 
        fit
      >
      </af-table-column>
    </el-table> -->
    <!-- {{tablist}} -->
    <el-table :data="datalist" border  :stripe='true' style="width:100%" >
      <el-table-column
        v-for="item in tablist"
        :prop="item"
        :label="item"
        :key="item.index" 
      >
      </el-table-column>
      <!-- <af-table-column
        :prop="item"
        :label="item"
        v-for="item in datalist"
        :key="item.index" 
      >
      </af-table-column> -->
    </el-table>
    <div class="page-box">
      <span class="btn" :class="{none: pageNo == 1}" @click="setPageFlipUp">上一页</span>
      <span class>第{{pageNo}}页,共{{maxPageNo}}页</span>
      <span class="btn" :class="{none: pageNo == maxPageNo}" @click="setPageTurnDown">下一页</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tablist: [],
      datalist: [],
      pageNo: 1,
      pageSize: 5,
      tableCode: "",
      maxPageNo: ""
    };
  },
  created() {
    let tableCode = this.$route.query.tableCode;
    // console.log(tableCode);
    this.tableCode = tableCode;
    this.getDataList();
  },
  methods: {
    getDataList() {
      let that = this;
      that.axios
        .post(
          "http://47.96.94.56:8082/resource/getTableRecords?pageNo=" +
            that.pageNo +
            "&pageSize=" +
            that.pageSize +
            "&tableCode=" +
            that.tableCode,
          {}
        )
        .then(res => {
          let result = res.data.data;
          // console.log(result.list);
          let header = [];
          let tabData = result.list;
          let item = result.list[0];
          // console.log(item);
          if(item.length < 1){
            return;
          }
          for (let i in item) {
            header.push(i);
          }
          console.log("表头", header, "内容数据", tabData);
          that.tablist = header;
          that.datalist = tabData;
          that.maxPageNo = result.pages;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setPageFlipUp() {
      if (this.pageNo == 1) {
        return;
      }
      this.pageNo = this.pageNo - 1;
      this.getDataList();
    },
    setPageTurnDown() {
      if (this.pageNo == this.maxPageNo) {
        return;
      }
      this.pageNo = this.pageNo + 1;
      
      this.getDataList();
    }
  }
};
</script>

<style scoped>
body::-webkit-scrollbar {
  display: none;
}

.body {
  width: 100vw;
  height: 100vh;
}
.header {
  height: 50px;
}
.none {
  color: #ddd;
}
.page-box{
  margin: 20px auto;
}
.page-box span.btn{
  cursor: pointer;
  -webkit-user-select:none;
  user-select:none;
}
.page-box span.btn:hover{
  color: green;
}
.page-box .btn.none{
  cursor: default;
}
.page-box .btn.none:hover{
  color: #ddd;
}
</style>