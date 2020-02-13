import Vue from 'vue'
import Router from 'vue-router'
import hotel from '@/components/reception/hotel.vue'
import passengerFlow from '@/components/reception/passengerFlow/passengerFlow.vue'
import vehicleTotal from '@/components/reception/vehicleTotal.vue'
import touristXF from '@/components/reception/touristXF.vue'
import monitoring from '@/components/reception/monitor.vue'
import weather from '@/components/reception/weather.vue'
import basicPortrait from '@/components/reception/basicPortrait.vue'
import aaaaa from '@/components/aaaaa.vue'

// 基础资源
import basis_scenic from '@/components/reception/background/basis_message/scenic.vue'
import basis_hotel from '@/components/reception/background/basis_message/hotel.vue'
import basis_catering from '@/components/reception/background/basis_message/catering.vue'
import basis_arg from '@/components/reception/background/basis_message/arg.vue'
import basis_library from '@/components/reception/background/basis_message/library.vue'
import basis_museum from '@/components/reception/background/basis_message/museum.vue'
import basis_culture from '@/components/reception/background/basis_message/culture.vue'
import basis_ich from '@/components/reception/background/basis_message/ich.vue'
import basis_shopping from '@/components/reception/background/basis_message/shopping.vue'
import basis_travel from '@/components/reception/background/basis_message/travel.vue'
import basis_play from '@/components/reception/background/basis_message/play.vue'
import basis_unit from '@/components/reception/background/basis_message/unit.vue'
// 应急事件管理
import meet_index from '@/components/reception/background/emergency_events/index.vue'
import meet_thing from '@/components/reception/background/emergency_events/meetThing.vue'
import meet_plan from '@/components/reception/background/emergency_events/meetPlan.vue'
import meet_emergencyThing from '@/components/reception/background/emergency_events/emergencyThing.vue'
// 应急资源管理
import meet_person from "@/components/reception/background/emergency_resource/person.vue"
import meet_org from "@/components/reception/background/emergency_resource/organization.vue"
import meet_duty from "@/components/reception/background/emergency_resource/duty.vue"
import meet_address_book from "@/components/reception/background/emergency_resource/addressBook.vue"
import test from '@/components/reception/background/basis_message/museum.vue'
import map from '@/components/reception/background/choose_address/map.vue'
// 监控
import scenicMon from '@/components/reception/background/monitor/scenicMon.vue'
import monitor from '@/components/reception/background/monitor/monitor.vue'
// 登录
import login from '@/components/login/login.vue'
import navmenu from '@/components/user/navmenu.vue'
// 口碑监测
import wordMouth from '@/components/word_mouth_monitoring/word_mouth_monitoring'
// GIS一张图
import gis from '@/components/GIS/GIS.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'aaaaa',
      component: aaaaa
    },
    {
      path: '/passengerFlow',
      name: 'passengerFlow',
      component: passengerFlow
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: hotel
    },
    {
      path: '/vehicleTotal',
      name: 'vehicleTotal',
      component: vehicleTotal
    },
    {
      path: '/touristXF',
      name: 'touristXF',
      component: touristXF
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: monitoring
    },
    {
      path: '/weather',
      name: 'weather',
      component: weather
    },
    {
      path: '/basicPortrait',
      name: 'basicPortrait',
      component: basicPortrait
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    //口碑监测
    {
      path: '/wordMouth',
      name: 'wordMouth',
      component: wordMouth
    },
    // GIS
    {
      path: '/gis',
      name: 'gis',
      component: gis
    },
    {
      path: '/navmenu',
      name: 'navmenu',
      component: navmenu
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    // 景区
    {
      path: '/basisScenic',
      name: 'basisScenic',
      component: basis_scenic
    },
    // 宾馆
    {
      path: '/basisHotel',
      name: 'basisHotel',
      component: basis_hotel
    },
    // 餐馆
    {
      path: '/basisCatering',
      name: 'basisCatering',
      component: basis_catering
    },
    // 农家乐
    {
      path: '/basisAgritainment',
      name: 'basisArg',
      component: basis_arg
    },
    // 图书馆
    {
      path: '/basisLibrary',
      name: 'basisLibrary',
      component: basis_library
    },
    // 博物馆
    {
      path: '/basisMuseum',
      name: 'basisMuseum',
      component: basis_museum
    },
    // 文化馆
    {
      path: '/basisCulture',
      name: 'basisCulture',
      component: basis_culture
    },
    // 非遗场所
    {
      path: '/basisIch',
      name: 'basisIch',
      component: basis_ich
    },
    // 旅行社
    {
      path: '/basisTravel',
      name: 'basisTravel',
      component: basis_travel
    },
    // 购物场所
    {
      path: '/basisShopping',
      name: 'basisShopping',
      component: basis_shopping
    },
    // 休闲娱乐场所
    {
      path: '/basisPlay',
      name: 'basisPlay',
      component: basis_play
    },
    // 体育馆
    {
      path: '/basisUnit',
      name: 'basisUnit',
      component: basis_unit
    },
    // 应急事件管理
    // 应急事件
    {
      path: '/meetThing',
      name: 'meetThing',
      component: meet_thing
    },
    // 应急首页
    {
      path: '/meetIndex',
      name: 'meetIndex',
      component: meet_index
    },
    // 应急预案
    {
      path: '/meetPlan',
      name: 'meetPlan',
      component: meet_plan
    },
    // 突发事件
    {
      path: '/emergencyThing',
      name: 'emergencyThing',
      component: meet_emergencyThing
    },
    // 应急资源管理
    // 应急人员列表
    {
      path: '/meetPerson',
      name: 'meetPerson',
      component: meet_person
    },
    // 应急机构列表
    {
      path: '/meetOrg',
      name: 'meetOrg',
      component: meet_org
    },
    // 值班信息列表
    {
      path: '/meetDuty',
      name: 'meetDuty',
      component: meet_duty
    },
    // 通讯录
    {
      path: '/meetAddressBook',
      name: 'meetAddressBook',
      component: meet_address_book
    }, 
    // 监控设置
    // 景区监控设置
    {
      path: '/scenicMon',
      name: 'scenicMon',
      component: scenicMon
    }, 
    // 监控点位设置
    {
      path: '/monitoring',
      name: 'monitoring',
      component: monitor
    }, 
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})
