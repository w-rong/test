import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import aaaaa from '@/components/aaaaa.vue'
import hotel from '@/components/reception/hotel.vue'
import passengerFlow from '@/components/reception/passengerFlow/passengerFlow.vue'
import vehicleTotal from '@/components/reception/vehicleTotal.vue'
import touristXF from '@/components/reception/touristXF.vue'
import monitoring from '@/components/reception/monitor.vue'
import weather from '@/components/reception/weather.vue'
import basicPortrait from '@/components/reception/basicPortrait.vue'
import customerValue from '@/components/reception/customerValue.vue'
import netWork from '@/components/reception/netWork.vue'
//大数据报告
// import nationalDay from '@/components/reception/nationalDay.vue'
// import currency from '@/components/reception/currency.vue'

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
import basis_public from '@/components/reception/background/basis_message/public.vue'
import basis_play from '@/components/reception/background/basis_message/play.vue'
import basis_unit from '@/components/reception/background/basis_message/unit.vue'
import basis_wen_museum from '@/components/reception/background/basis_message/wenMuseum.vue'
import basis_sceCountry from '@/components/reception/background/basis_message/sceCountry.vue'
import basis_ship from '@/components/reception/background/basis_message/ship.vue'
import basis_culturalExample from '@/components/reception/background/basis_message/culturalExample.vue'
import basis_culturalExecute from '@/components/reception/background/basis_message/culturalExecute.vue'
import basis_culturalManage from '@/components/reception/background/basis_message/culturalManage.vue'
import basis_culturalProtect from '@/components/reception/background/basis_message/culturalProtect.vue'
import basis_culturalProtectScience from '@/components/reception/background/basis_message/culturalProtectScience.vue'
import basis_culturalScience from '@/components/reception/background/basis_message/culturalScience.vue'
import basis_culturalStation from '@/components/reception/background/basis_message/culturalStation.vue'
import basis_eduOrgan from '@/components/reception/background/basis_message/eduOrgan.vue'
import basis_groupBuy from '@/components/reception/background/basis_message/groupBuy.vue'
import basis_guide from '@/components/reception/background/basis_message/guide.vue'
import basis_heritageAuction from '@/components/reception/background/basis_message/heritageAuction.vue'
import basis_heritageShop from '@/components/reception/background/basis_message/heritageShop.vue'
import basis_humanity from '@/components/reception/background/basis_message/humanity.vue'
import basis_industry from '@/components/reception/background/basis_message/industry.vue'
import basis_internetBar from '@/components/reception/background/basis_message/internetBar.vue'
import basis_otherHeritage from '@/components/reception/background/basis_message/otherHeritage.vue'
import basis_performVenue from '@/components/reception/background/basis_message/performVenue.vue'
import basis_redTravel from '@/components/reception/background/basis_message/redTravel.vue'
import basis_showBroker from '@/components/reception/background/basis_message/showBroker.vue'
import basis_specialFood from '@/components/reception/background/basis_message/specialFood.vue'
import basis_specialty from '@/components/reception/background/basis_message/specialty.vue'
import basis_toilet from '@/components/reception/background/basis_message/toilet.vue'
import basis_unheritageCenter from '@/components/reception/background/basis_message/unheritageCenter.vue'
import basis_unpubStation from '@/components/reception/background/basis_message/unpubStation.vue'
import basis_unpubPerform from '@/components/reception/background/basis_message/unpubPerform.vue'
import basis_village from '@/components/reception/background/basis_message/village.vue'
// 应急事件管理
import meet_index from '@/components/reception/background/emergency_events/index.vue'
import meet_thing from '@/components/reception/background/emergency_events/meetThing.vue'
import plan_handle from '@/components/reception/background/emergency_events/planHandle.vue'
import person_handle from '@/components/reception/background/emergency_events/personHandle.vue'
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

// 资源管理
import ResourceDirectory from '../components/ResourceDirectory/ResourceDirectory'
import tableList from '../components/tableList.vue'
// 大数据报告
import reportAccount from '../components/presentation/presentation.vue'
import home from '@/components/reception/userManagement/home.vue'
import user from '@/components/reception/userManagement/user.vue'
import role from '@/components/reception/userManagement/role.vue'
import juris from '@/components/reception/userManagement/juris.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'role',
          name: 'role',
          component: role
        },
        {
          path: 'juris',
          name: 'juris',
          component: juris
        }
      ]
    },
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
    }, {
      path: '/customerValue',
      name: 'customerValue',
      component: customerValue
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: monitoring
    },
    {
      path: '/netWork',
      name: 'netWork',
      component: netWork
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
    //报告
    // {
    //   path: '/nationalDay',
    //   name: 'nationalDay',
    //   component: nationalDay
    // },
    // {
    //   path: '/currency',
    //   name: 'currency',
    //   component: currency
    // },

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
    // 公共服务
    {
      path: '/basisPublic',
      name: 'basisPublic',
      component: basis_public
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
    // 文博物馆
    {
      path: '/basisWenMuseum',
      name: 'basisWenMuseum',
      component: basis_wen_museum
    },
    // 景区村管理
    {
      path: '/basisSceCountry',
      name: 'basisSceCountry',
      component: basis_sceCountry
    },
    // 船流分析
    {
      path: '/basisShip',
      name: 'basisShip',
      component: basis_ship
    },

    // 其他
    {
      path: '/basisCulturalExample',
      name: 'basisCulturalExample',
      component: basis_culturalExample
    },
    {
      path: '/basisCulturalExecute',
      name: 'basisCulturalExecute',
      component: basis_culturalExecute
    },
    {
      path: '/basisCulturalManage',
      name: 'basisCulturalManage',
      component: basis_culturalManage
    },
    {
      path: '/basisCulturalProtect',
      name: 'basisCulturalProtect',
      component: basis_culturalProtect
    },
    {
      path: '/basisCulturalProtectScience',
      name: 'basisCulturalProtectScience',
      component: basis_culturalProtectScience
    },
    {
      path: '/basisCulturalScience',
      name: 'basisCulturalScience',
      component: basis_culturalScience
    },
    {
      path: '/basisCulturalStation',
      name: 'basisCulturalStation',
      component: basis_culturalStation
    },
    {
      path: '/basisEduOrgan',
      name: 'basisEduOrgan',
      component: basis_eduOrgan
    },
    {
      path: '/basisGroupBuy',
      name: 'basisGroupBuy',
      component: basis_groupBuy
    },
    {
      path: '/basisGuide',
      name: 'basisGuide',
      component: basis_guide
    },
    {
      path: '/basisHeritageAuction',
      name: 'basisHeritageAuction',
      component: basis_heritageAuction
    },
    {
      path: '/basisHeritageShop',
      name: 'basisHeritageShop',
      component: basis_heritageShop
    },
    {
      path: '/basisHumanity',
      name: 'basisHumanity',
      component: basis_humanity
    },
    {
      path: '/basisIndustry',
      name: 'basisIndustry',
      component: basis_industry
    },
    {
      path: '/basisInternetBar',
      name: 'basisInternetBar',
      component: basis_internetBar
    },
    {
      path: '/basisOtherHeritage',
      name: 'basisOtherHeritage',
      component: basis_otherHeritage
    },
    {
      path: '/basisPerformVenue',
      name: 'basisPerformVenue',
      component: basis_performVenue
    },
    {
      path: '/basisRedTravel',
      name: 'basisRedTravel',
      component: basis_redTravel
    },
    {
      path: '/basisShowBroker',
      name: 'basisShowBroker',
      component: basis_showBroker
    },
    {
      path: '/basisSpecialFood',
      name: 'basisSpecialFood',
      component: basis_specialFood
    },
    {
      path: '/basisSpecialty',
      name: 'basisSpecialty',
      component: basis_specialty
    },
    {
      path: '/basisToilet',
      name: 'basisToilet',
      component: basis_toilet
    },
    {
      path: '/basisUnheritageCenter',
      name: 'basisUnheritageCenter',
      component: basis_unheritageCenter
    },
    {
      path: '/basisUnpubPerform',
      name: 'basisUnpubPerform',
      component: basis_unpubPerform
    },
    {
      path: '/basisUnpubStation',
      name: 'basisUnpubStation',
      component: basis_unpubStation
    },
    {
      path: '/basisVillage',
      name: 'basisVillage',
      component: basis_village
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
    {
      path: '/planHandle',
      name: 'planHandle',
      component: plan_handle
    },
    {
      path: '/personHandle',
      name: 'personHandle',
      component: person_handle
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
    // 资源管理
    {
      path: '/ResourceDirectory',
      name: 'ResourceDirectory',
      component: ResourceDirectory
    },
    {
      path: '/tableList',
      name: 'tableList',
      component: tableList
    },
    // 大数据报告
    {
      path: '/reportAccount',
      name: 'reportAccount',
      component: reportAccount
    },
  ]
})
