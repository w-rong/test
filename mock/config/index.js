

module.exports = {
    'brigade': 'GET_/base/getAllSourceCount',
    // 车辆来源TOP5
    'spot': 'POST_/scenic/findScenicTouristVolume',
    // 身份
    'dentity': 'POST_/tourist/findPortraitIdentity',
    // 重游
    'revisit': 'POST_/tourist/findPortraitRevisit',
    // 性别与年龄
    'attribute': 'POST_/tourist/findPortraitAttribute',
    // 获取旅游消费
    'consumption': 'POST_/tourist/findTouristConsumption',
    // 获取游客来源地
    'source': 'GET_/base/getTravelSource',
    // 舆情分析
    'analysis': 'POST_/scenic/findCommentAnalysis',
    // 天气
    'forJiSu': 'GET_/base/listWeatherForJiSu',
    // 获取实时客流量
    'number': 'GET_/base/getTotalPersonNumber',
    // 景区实时游客
    'realTimeTourist': 'POST_/scenic/findScenicRealTimeTourist'
}