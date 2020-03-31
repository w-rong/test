<template>
  <div class="menuCon">
    <div class="tabCon">
      <!-- <div class="menuCon_logo">
        <img src="../../../assets/images/logo.png" alt="">
      </div>-->
      <p class="menu_title">普陀区文化和旅游信息服务平台</p>
      <div class="tabMenuItem">
        <ul class="tab_title">
          <li
            :class="{active:index===nowIndex}"
            v-for="(item,index) in tabList"
            :key="index"
            @click="toggleTab(index)"
          >{{item}}</li>
        </ul>
        <div class="content">
          <tab1 ref="tab1" class="con" v-show="nowIndex===0"></tab1>
          <tab2 class="con" v-show="nowIndex===1"></tab2>
          <tab3 class="con" v-show="nowIndex===2"></tab3>
          <tab4 class="con" v-show="nowIndex===3"></tab4>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <div class="editPwd" @click="sleDown" @mouseleave="hideDown">
      <p class="sele">
        您好！欢迎登录普陀文旅大数据中心&nbsp;
        <span></span>
      </p>
      <div class="seleBox">
        <div class="sele_down" v-show="seleDowShow">
          <p @click="editWindow">
            <span class="edit_pwdIcon"></span> 修改密码
          </p>
          <p @click="exitLogin">
            <span class="exitIcon"></span> 退出
          </p>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible="editWindowShow"
      width="30%"
      :before-close="editPwdClose"
      center
      custom-class="menuConDig"
    >
      <el-form
        :model="editFormRule"
        status-icon
        :rules="rules"
        ref="editFormRule"
        label-width="100px"
        class="demo-editFormRule"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="editFormRule.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <!-- :rules="[ { required: true, message: '不能为空'}, {validator:validcodeName, trigger:'blur',  message: '6-16字母数字组合'}]" -->
          <el-input type="password" v-model="editFormRule.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <!-- :rules="[ { required: true, message: '不能为空'}, {validator:validcodeName, trigger:'blur',  message: '6-16字母数字组合'}]" -->
          <el-input type="password" v-model="editFormRule.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editWindowShow = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editFormRule')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 退出 -->
    <el-dialog title="退出" custom-class="menuConDig" :visible="exitWindowShow" width="30%" center>
      <span>确定退出?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitWindowShow = false">取 消</el-button>
        <el-button type="primary" @click="Loginexit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tab1 from "../user/tab/tab1.vue";
import tab2 from "../user/tab/tab2.vue";
import tab3 from "../user/tab/tab3.vue";
import tab4 from "../user/tab/tab4.vue";
// import globalInfo from '@/assets/js/userData.js'
import md5 from "js-md5";
import axios from "axios";
import qs from "qs";
// import CryptoJS from 'crypto-js'

// import encrypt from '@/assets/js/jiami.js'
export default {
  components: {
    tab1,
    tab2,
    tab3,
    tab4
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.editFormRule.checkPass !== "") {
          this.$refs.editFormRule.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editFormRule.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      validcodeName: (rule, value, callback) => {
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
        if (!reg.test(value)) {
          callback(new Error("必须是由4-9位数字和字母组合"));
        } else {
          callback();
        }
      },
      tabList: ["产业管理", "行业监管", "公共服务", "数据中心"],
      nowIndex: 0,
      isShow: false,
      seleDowShow: false,
      editWindowShow: false,
      exitWindowShow: false,
      editFormRule: {
        pass: "", //新密码
        checkPass: "", //确认密码
        oldpass: "" //原密码
      },
      rules: {
        //验证
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }]
        // oldpass: [
        //     { validator: checkAge, trigger: 'blur' }
        // ]
      },
      roleArr: [],
      usernameParams: "",
      userIdParams: "",
      passwordParams: ""
      // currUserId: '',
      // userName: ''
    };
  },
  methods: {
    toggleTab(index) {
      this.nowIndex = index;
    },
    sleDown: function() {
      this.seleDowShow = true;
    },
    hideDown() {
      this.seleDowShow = false;
    },
    editWindow: function() {
      this.editWindowShow = true;
    },
    editWindowHide: function() {
      this.editWindowShow = false;
    },
    editSubmit(editFormRule) {
      this.$refs[editFormRule].validate(async valid => {
        if (valid) {
          let passwordNew = md5(this.editFormRule.pass);
          let passwordOld = md5(this.editFormRule.oldpass);
          let userName = localStorage.getItem("username");
          var editRes = await this.$http.post(
            `/root/user/changePassword`,
            qs.stringify({
              newPwd: passwordNew,
              uname: userName,
              oldPwd: passwordOld
              // Password: encrypt.encrypt(this.editFormRule.oldpass)
            })
          );
          console.log(editRes);
          if (editRes.data.msg == "修改成功") {
            this.$message({
              showClose: true,
              message: "密码修改成功",
              type: "success"
            });
            this.editWindowShow = false;
            var that = this;
            setTimeout(function() {
              that.$router.push({
                path: "/"
              });
            }, 2000);
          } else {
            this.$message({
              message: editRes.data.msg,
              type: "error"
            });
          }
        }
      });
    },
    resetSubmit(editFormRule) {
      this.$refs[editFormRule].resetFields();
    },
    editPwdClose(done) {
      this.editWindowShow = false;
    },
    exitLogin() {
      this.exitWindowShow = true;
    },
    Loginexit() {
      this.$router.push("/");
      // localStorage.removeItem("Authorization");
    },
  },
  mounted() {
    // this.getRole()
  },
  created() {
    // this.usernameParams =  encrypt.decrypt(this.$route.query.u).split('*')[0]
    // this.passwordParams =  encrypt.decrypt(this.$route.query.p).split('*')[0]
    // this.userIdParams =  encrypt.decrypt(this.$route.query.i)
  }
};
</script>

<style>
.menuCon_logo {
  width: 110px;
  height: 164px;
  margin: 0 auto;
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -55px;
}
li {
  list-style: none;
}
.menuCon {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/image/nav_bg.png") no-repeat;
  background-size: 100% 100%;
}
@media screen and (max-height: 700px) {
  /* .menuCon {
    overflow: auto;
  } */
}
.tabCon {
  width: 1206px;
  height: 670px;
  margin: 0 auto;
  position: relative;
  /* margin-top: 115px; */
  /* padding-top: 180px; */
  padding-top: 12%;
}
.tabCon .tabMenuItem {
  /* overflow: hidden; */
}
.tabCon .menu_title {
  font-size: 57px;
  color: #333;
  text-align: center;
  font-family: FZCuQian-M17S;
}
.tabCon .content {
  width: 1206px;
  /* height: 400px; */
  height: 37%;
  /* background-color: #900; */
}
.tabCon .tab_title {
  padding: 0 129px 0 174px;
  display: flex;
  padding-top: 2%;
  /* margin-top: 90px; */
  font-family: "fzht";
}
.tabCon .tab_title li {
  flex: 1;
  height: 72px;
  margin-bottom: 21px;
  cursor: pointer;
  font-size: 26px;
  text-align: center;
  line-height: 72px;
  list-style: none;
}
.tabCon .tab_title li.active {
  color: #fff;
  background: url("../../assets/image/tabMenuBg.png") no-repeat center;
  background-size: 100% 100%;
}
.menuCon .editPwd {
  width: 336px;
  height: 80px;
  /* background: #000; */
  position: absolute;
  right: 55px;
  top: 27px;
}
.menuCon .editPwd .sele {
  height: 41px;
  line-height: 41px;
  color: #fff;
  background-color: #787c7f;
  border-radius: 9px;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 18px;
  cursor: pointer;
}
.seleBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 35px;
  right: 0;
}
.menuCon .editPwd .sele span {
  width: 15px;
  height: 12px;
  display: inline-block;
  background: url("../../assets/image/down.png") no-repeat;
  background-size: 100% 100%;
}
.menuCon .editPwd .sele_down {
  width: 140px;
  height: 75px;
  background-color: #787c7f;
  border-radius: 9px;
  position: absolute;
  right: 0;
  top: 10px;
  /* display: none; */
}
.menuCon .editPwd .sele_down p {
  height: 37px;
  padding-left: 40px;
  color: #fff;
  line-height: 37px;
  position: relative;
  cursor: pointer;
}
.menuCon .editPwd .sele_down p span {
  display: inline-block;
  position: absolute;
  left: 16px;
  top: 7px;
}
.menuCon .editPwd .sele_down p span.edit_pwdIcon {
  width: 18px;
  height: 22px;
  padding-top: 7px;
  background: url("../../assets/image/edit_pwd.png") no-repeat;
}
.menuCon .editPwd .sele_down p span.exitIcon {
  width: 19px;
  height: 19px;
  padding-top: 7px;
  background: url("../../assets/image/exit.png") no-repeat;
}
.menuCon .menuConDig .el-dialog--center .el-dialog__body {
  text-align: center;
  font-size: 18px;
  color: #333;
}
.menuCon .menuConDig .el-dialog__header {
  background-color: #4aa0ef;
  text-align: center;
}
.menuCon .menuConDig .el-dialog__title {
  color: #fff;
}
.menuCon .menuConDig .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.menuCon .menuConDig .el-dialog__headerbtn .el-dialog__close:hover {
  font-size: 18px;
  color: #fff;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .tabCon .menu_title {
    font-size: 37px;
    color: #333;
    text-align: center;
    font-family: FZCuQian-M17S;
  }
  .tabCon .tab_title li {
    flex: 1;
    height: 72px;
    margin-bottom: 21px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    line-height: 72px;
    list-style: none;
    padding-right: 24px;
  }
  .tabCon {
    width: 1206px;
    height: 670px;
    margin: 0 auto;
    position: relative;
    /* margin-top: 115px; */
    padding-top: 100px;
  }
}
</style>
