<template>
  <div class="list_box">
    <div class="list" :class="nowindex==index?'whitecolor':''" @click="showornot">
      <slot></slot>
      <span :class="nowindex==index?'arrow_left':'arrow_bottom'" class="arrow"></span>
    </div>
    <transition name="move">
      <ul class="nav_ul" v-show="nowindex==index" :style="{height:items.length*30-5+'px'}">
        <li v-for="(item, index) in items" :key="index">
          <router-link :to="item.path">
            <strong><span @click="currentindex(index)" :class="$route.path==item.path?'bluecolor':''">{{item.title}}</span></strong>
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'  
export default {
  props: [ "items","index","nowindex"],
  data() {
    return {
      clickindex: -1,
      show: false,
    };
  },
  computed: {
      ...mapGetters(['routepath'])
  },
  methods: {
    currentindex(i) {
      this.clickindex = i;
      // this.nowindex = this.index;
      // console.log(this.$route.path);
    },
    showornot(){
        this.show=!this.show
        // console.log(this.index);
        if(this.show){
            this.$emit('shownav',this.index)
        }
        else{
            this.$emit('shownav',-1)
        }
    }
  },
  watch: {
      nowindex(){
          if(this.index!=this.nowindex){
              this.show=false
          }
      },
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
  },
};
</script>
<style>
ul,li{
  list-style: none;
}
.list{
    border-bottom: 1px solid #f0f0f0;
    padding:15px 15px 15px 20px;
}
.list:hover{
    background-color: #fff;
}
.list_box{
  height: 100%;
}
.nav_ul {
  margin: 0;
  overflow: hidden;
  padding-left:55px;
}
.nav_ul a{
    color: inherit;
    text-decoration: none;
}
.nav_ul a:hover{
    color: inherit;
    text-decoration: none;
}
.whitecolor{
    background-color: #fff;
}

.nav_ul li span{
    display: block;
    padding: 5px 0;
}
.nav_ul li:nth-last-of-type(1) span{
    padding-bottom: 0
}
.nav_ul li:hover{
    background-color: #f0f0f0;
}
.list {
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  vertical-align: center;
}
.list strong{
  width: 80%;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
}
.bluecolor {
  color: #00c2f3;
  text-decoration: underline;
}
.arrow {
  color: coral;
  border: 5px solid transparent;
}
.arrow_left {
  border-right-color: #555;
}
.arrow_bottom {
  border-top-color: #555;
}
/* 动画 */
.move-enter,
.move-leave-to {
  height: 0 !important;
}
.move-enter-to,
.move-leave {
  height: auto;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.3s;
}
</style>