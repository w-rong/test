<template>
  <div id="my_container"></div>
</template>
<script>
// import AMap from 'AMap'
import axios from "axios";
export default {
  name: "company_manage",
  data() {
    return {
      c: [],
      map: "",
      ruleForm: {
        name: "",
        phone: "",
        addr: "",
        long: "",
        lat: "",
        start_work_time: "",
        end_work_time: "",
        dizhi: ""
      }
    };
  },
  mounted: function() {
    // this.init()
    this.loadMap();
  },
  methods: {
    loadMap() {
      this.map = new T.Map("my_container");
      this.map.centerAndZoom(new T.LngLat(122.323867, 29.97176), 12);
      this.map.addEventListener("click", this.MapClick);
    },
    MapClick(e) {
      // console.log(e);
      var marker = new T.Marker(new T.LngLat(e.lnglat.getLng(),e.lnglat.getLat()));
      new T.Geocoder().getLocation(e.lnglat,this.searchResult);
      //向地图上添加标注
      // 移除上一个
      this.map.clearOverLays();
      //向地图上添加标注
      this.map.addOverLay(marker);
      let jw = [];
      jw.push(e.lnglat.getLng());
      jw.push(e.lnglat.getLat());
      // console.log(jw);
      this.$emit("fun", jw);
      //创建标注对象
    },
     searchResult(result){
      //  console.log(result.getAddress());
       var address = result.getAddress()
       this.$emit("add", address);
     }

    // init() {
    //     map.centerAndZoom(lnglat,12);
    //     // var map = new AMap.Map('my_container',{
    //     //   resizeEnable: true,
    //     //   center: [122.323867,29.97176],
    //     //   zoom: 12,
    //     // })
    //     AMap.plugin('AMap.Geolocation',function(){ //异步加载插件
    //         var geolocation = new AMap.Geolocation()
    //         map.addControl(geolocation)
    //     })
    //     var geocoder,marker;
    //     function regeocoder(lnglatXY,that) {
    //         AMap.plugin('AMap.Geocoder',function(){
    //             var geocoder = new AMap.Geocoder({
    //                 radius: 1000,
    //                 extensions: "all"
    //             });
    //             geocoder.getAddress(lnglatXY, function(status, result) {
    //                 if (status === 'complete' && result.info === 'OK') {
    //                     var address = result.regeocode.formattedAddress;
    //                     that.ruleForm.addr = address
    //                 }
    //             });
    //             if(!marker){
    //                 marker = new AMap.Marker();
    //                 map.add(marker);
    //             }
    //             marker.setPosition(lnglatXY);
    //         })
    //     }
    //     var that = this
    //     map.on('click', function(e) {
    //         var lnglatXY = [e.lnglat.getLng(),e.lnglat.getLat()];
    //         regeocoder(lnglatXY,that)
    //         that.ruleForm.long = e.lnglat.getLng()
    //         that.ruleForm.lat = e.lnglat.getLat()
    //         console.log('经纬度:',lnglatXY)
    //         // let jw=lnglatXY.join(',')
    //         let jw = []
    //         jw.push(that.ruleForm.long)
    //         jw.push(that.ruleForm.lat)
    //         console.log(jw)
    //         that.$emit('fun',jw)
    //         // axios.get('https://restapi.amap.com/v3/geocode/regeo?parameters', {
    //         //     params: {
    //         //     location: jw,
    //         //     key:'ec6501710cc566f3e65ece4dd9d20f48'
    //         //     }
    //         // })
    //         // .then(function (response) {
    //         //     console.log(response);
    //         //     var dizhi = response.data.regeocode.formatted_address
    //         //     console.log('地址:',dizhi)
    //         //     // this.address = dizhi
    //         //     that.$emit('fun',dizhi)
    //         // })
    //         // .catch(function (error) {
    //         //     console.log(error);
    //         // });

    //     });
    // },
  }
};
</script>

<style scoped>
#my_container {
  /* margin-left: 110px; */
  height: 500px;
  /* width: calc(100% - 110px); */
}
</style>