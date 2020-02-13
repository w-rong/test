module.exports = function (params) {
    let result = {
        "msg": "success",
        "code": 10000,
        "data": {}
    }
    if (params.valueType === 'gender') {
        result.data = {
            "female": "0.55",
            "male": "0.45"
        }
    } else {
        result.data = {
            "age20to25": "0.21",
            "age30to35": "0.21",
            "age25to30": "0.21",
            "age35to40": "0.21",
            "age40": "0.16"
        }
    }
    return result
}