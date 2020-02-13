const path = require('path');
const fs = require('fs');

function defineRouter (key, val, router) {
    let json = path.resolve(__dirname, './data', `${key}.json`)
    let js = path.resolve(__dirname, './data', `${key}.js`)
    let isjson = fs.existsSync(json)
    let isjs = fs.existsSync(js)
    let file = {
        code: -1,
        message: 'not data'
    }
    let callback = function () {
        return file
    }

    if (isjson) {
        file = fs.readFileSync(json, 'utf-8')
    } else if (isjs) {
        callback = require(js)
    }

    if (val.startsWith('GET_')) {
        let url = val.substr(4)
        router.get(url, ctx => {
            ctx.body = file
        })
        console.log(`创建GET_${url}`)
    } else if (val.startsWith('POST_')) {
        let url = val.substr(5)
        router.post(url, ctx => {
            ctx.body = callback(ctx.request.body)
        })
        console.log(`创建POST_${url}`)
    } else {
        throw new TypeError(`not defind ${val}`)
    }
}

function mapping (path, router) {
    let map = require(path)

    for (let key in map) {
        let val = map[key]

        defineRouter(key, val, router)
    }
}

module.exports = function (url){
    const router = require('koa-router')()
    let resolveurl = path.resolve(__dirname, url)
    mapping(resolveurl, router)

    return router.routes()
}