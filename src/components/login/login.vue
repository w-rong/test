<template>
  <div class="login">
    <div class="login_tit">普陀区文化和旅游信息服务平台</div>
    <div class="box">
      <p class="title">欢迎登录</p>
      <form action class="subForm">
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
          <!-- <span class="pwdTootle" v-if="pwdTootle">6~16位字母数字</span> -->
        </div>
        <div class="divCode">
          <input type="text" class="code" v-model="codeIn" placeholder="请输入验证码" />
          <!-- <input type="button" class="codetxt" v-model="randomCode"/> -->
          <img :src="imgUrl" alt />
          <span class="reloadIcon" @click="VerificationCode()"></span>
        </div>
        <a class="login_btn" @click="getlogin"></a>
      </form>
    </div>
    <!-- 提示信息 -->
    <!-- <span type="text" style="color: red;">{{ ccc }}</span> -->
  </div>
</template>

<script>
import qs from "qs";
import "../../css/common.css";
// import "@/assets/js/userData.js";
// import globalInfo from '@/assets/js/userData.js'
// import CryptoJS from 'crypto-js'

// import encrypt from '@/assets/js/jiami.js'
export default {
  // usernameParams,passwordParams,
  data() {
    return {
      validcodeName: (rule, value, callback) => {
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
        if (!reg.test(value)) {
          callback(new Error("必须是由4-9位数字和字母组合"));
        } else {
          callback();
        }
      },
      codeIn: "",
      imgUrl: "http://47.96.94.56:8082/kaptcha/registCode",
      randomCode: "",
      ccc: "提示信息",
      codeOk: false,
      pwd: "", //密码
      account: "", //用户名
      isUrl: false, //地址栏是否有参数链接
      paramsUrl: "",
      urlport: "",
      urlpath: "",
      isTrue: "",
      pwdTootle: false
    };
  },
  created() {
    // this.createCode(); //初始化验证码
  },
  methods: {
    // 验证码
    async VerificationCode() {
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.imgUrl = "http://47.96.94.56:8082/kaptcha/registCode?" + num;
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
      this.$router.push({path:'/navmenu'})
      var res = await this.$http.post(
        "/login",
        qs.stringify({
          username: this.account,
          validateCode: this.codeIn,
          password: this.pwd
        })
      );
      console.log(res.data);
    //   this.$message({
    //     type: "success",
    //     message: "查询成功!"
    //   });
    //   this.$message.error(res.msg);
    //   let { data, isSuccess, message } = res.data;
    //   if (isSuccess) {
    //     console.log(res);
        
    //   } else {
    //     this.$message.error(res.msg);
    //     return;
    //   }
    },
    //跳转到返回的url
    getUrlParams() {
      var url = location.search; //获取url中"?"符后的字串
      if (url) {
        this.isUrl = true;
        if (url.indexOf("?") != -1) {
          var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
          var strs = str.split("&");
          var obj = {};
          for (var i = 0; i < strs.length; i++) {
            var str1 = strs[i].split("=");
            obj[str1[0]] = str1[1];
            var newarr = [];
            newarr.push(obj);
          }
          this.urlport = newarr[0].port;
          this.urlpath = newarr[0].path;
          this.isTrue = newarr[0].isTrue;
        }
      } else {
        this.isUrl = false;
      }
    }
    // 密码格式验证
  },
  mounted() {
    this.getUrlParams();
    this.VerificationCode();
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
  padding-top: 150px;
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
</style>
