<template>
  <div class="login">
    <div class="login_tit">普陀区文化和旅游信息服务平台</div>
    <div class="box">
      <p class="title">欢迎登录</p>
      <div class="subForm">
        <div class="divAcc">
          <span class="accIcon"></span>
          <input
            type="text"
            v-model="account"
            name="account"
            class="account"
            ref="account"
            placeholder="请输入您的账号"
          />
        </div>
        <div class="divPwd">
          <span class="pwdIcon"></span>
          <input
            type="password"
            v-model="pwd"
            placeholder="请输入您的密码"
            name="password"
            class="pwd"
            ref="pwd"
          />
        </div>
        <div class="divCode">
          <input type="text" class="code" v-model="codeIn" placeholder="请输入验证码" />
          <img :src="imgUrl" alt />
          <!-- <img :src="verificationCode" alt /> -->
          <span class="reloadIcon" @click="VerificationCode()"></span>
        </div>
        <button class="login_btn" @click="getlogin" type="button"></button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
import "../../css/common.css";
import md5 from 'js-md5';
export default {
  data() {
    return {
      codeIn: "",
      imgUrl: "http://47.96.94.56:8082/kaptcha/registCode",
      pwd: "", //密码
      account: "", //用户名
      verificationCode: "",
      header: ""
    };
  },
  created() {},
  methods: {
    // 验证码
    async VerificationCode() {
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.imgUrl = "http://47.96.94.56:8082/kaptcha/registCode?" + num;
    },
    async getVer() {
      let res = await this.$http.get(`/kaptcha/registCode`);
      // console.log(res.headers["cache-control"]);
      this.verificationCode = res.data;
      // console.log(res.headers);
    },
    async getlogin() {
      if (this.account == "") {
        this.$message({
          message: "账号不能为空",
          type: "error"
        });
        return;
      }
      if (this.pwd == "") {
        this.$message({
          message: "密码不能为空",
          type: "error"
        });
        return;
      }
      if (this.codeIn == "") {
        this.$message({
          message: "验证码不能为空",
          type: "error"
        });
        return;
      }
      let password = md5(this.pwd)
      // console.log(password);
      var res = await this.$http.post(
        "/login",
        qs.stringify({
          username: this.account,
          validateCode: this.codeIn,
          password: password
        })
      );
      console.log(res);
      if (res.data.msg == "loginSuccess") {
        this.$message({
          message: "登录成功",
          type: "success"
        });
        this.$router.push({ path: "/navmenu" });
        this.header = res.headers["authorization"];
        console.log(res.headers["authorization"]);
        console.log(this.header);
        localStorage.setItem("Authorization", res.headers["authorization"]);
        localStorage.setItem("username", res.data.username);
        // localStorage.setItem("username", res.data.isAdmin);
      } else {
        this.$message({
          message: res.data.msg,
          type: "error"
        });
        this.VerificationCode();
      }
      // var url = location.href; //获取url中"?"符后的字串
      // if (url.indexOf("?") != -1) {
      //   let pathRote = url.substring(url.indexOf("?") + 1, url.length);
      //   this.$router.push({ path: "/" + pathRote });
      // } else {
      //   this.$router.push({ path: "/navmenu" });
      // }
    }
  },
  mounted() {
    // this.getVer();
    this.VerificationCode();
    // localStorage.setItem("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsInVzZXJfaWQiOjEsInNjb3BlIjpbIlJPTEVfQURNSU4iLCJST09UIiwi5rWL6K-VIiwid2V3ZSIsIjEyMTIxMiIsIjExMTExIiwiamF2YSJdLCJleHAiOjE1ODQzNTIzNzEsImlhdCI6MTU4NDM0ODc3MSwianRpIjoiZDkwZTAzZjEtMjZiYy00ODQ3LTg1ODktNzdlODgwNjE1ZDliIn0.ZT6u0_qAtavKUirXo2SuyI5ixYQdFCTLOTB4e8DNyJVuJcTu5O96MZIGejMAwH0Fv5SHIFtdUZnwm4nynjrwsg");
  }
};
</script>

<style >
.pwdTootle {
  color: #a00;
  font-size: 14px;
  width: 150px;
  height: 30px;
  display: block;
  position: absolute;
  top: 10px;
  left: 200px;
}
.login_logo {
  width: 110px;
  height: 164px;
  margin: 0 auto;
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -55px;
}
.login_logo img {
  width: 100%;
  height: 100%;
}
.login_tit {
  font-size: 57px;
  text-align: center;
  /* margin-top: 290px; */
  font-family: FZCuQian-M17S;
}
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/image/login_bg.png") no-repeat;
  background-size: 100% 100%;
  /* background-size: 1920px 1080px;
  background-position: 50% 50%; */
  /* overflow: hidden; */
  padding-top: 261px;
  box-sizing: border-box;
  position: relative;
}
.login .box {
  /* width: 651px; */
  width: 551px;
  /* height: 408px; */
  height: 360px;
  background: url("../../assets/image/login.png") no-repeat;
  margin: 0 auto;
  margin-top: 50px;
  background-size: 100% 100%;
}
.login .box .title {
  font-size: 30px;
  color: #333;
  padding-top: 63px;
  text-align: center;
  /* font-family: "FZL2JW"; */
  font-family: FZL2JW;
  /* margin: 0 auto; */
  font-family: "fzl2jw";
}
.box .subForm {
  width: 304px;
  height: 230px;
  margin: 0 auto;
  margin-top: 16px;
  /* background-color: #789; */
}
.box .subForm input {
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding-left: 45px;
  box-sizing: border-box;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  background: transparent;
  line-height: none;
  outline: none;
}
.box .subForm input.code {
  padding-left: 7px;
  padding-right: 32px;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #999;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #666;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #666;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #666;
}
.box .subForm .divAcc,
.box .subForm .divPwd,
.box .subForm .divCode {
  position: relative;
}
.box .subForm .accIcon,
.box .subForm .pwdIcon,
.box .subForm .reloadIcon {
  display: inline-block;
  position: absolute;
  left: 7px;
  top: 10px;
}
.box .subForm .divCode img {
  width: 119px;
  right: 38px;
  top: 7px;
  position: absolute;
}
.box .subForm .accIcon {
  width: 27px;
  height: 27px;
  background: url("../../assets/image/account.png");
}
.box .subForm .pwdIcon {
  width: 24px;
  height: 30px;
  bottom: 7px;
  background: url("../../assets/image/pwd.png");
}
.box .subForm .reloadIcon {
  width: 23px;
  height: 23px;
  cursor: pointer;
  display: inline-block;
  left: 272px;
  top: 10px;
  background: url("../../assets/image/code.png");
}
.box .subForm .divCode .codetxt {
  width: 67px;
  height: 33px;
  line-height: 33px;
  display: inline-block;
  position: absolute;
  left: 197px;
  top: 5px;
  background: #fff;
}
.box .subForm .login_btn {
  width: 291px;
  height: 44px;
  border: none;
  margin-left: 10px;
  margin-top: 16px;
  display: block;
  background: url("../../assets/image/login_btn.png") no-repeat;
  cursor: pointer;
}
.box .subForm .divCode .codetxt {
  padding-left: 0;
  border-bottom: 0;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .login {
    width: 100%;
    height: 100%;
    background: url("../../assets/image/login_bg.png") no-repeat;
    background-size: 100% 100%;
    /* background-size: 1920px 1080px;
  background-position: 50% 50%; */
    /* overflow: hidden; */
    padding-top: 150px;
    box-sizing: border-box;
    position: relative;
  }
}
</style>
