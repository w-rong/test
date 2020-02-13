const path = require('path');
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    assetsDir: './static',
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
    configureWebpack: {
        // plugins: [
        //     new CompressionPlugin({
        //         test: /\.js$/
        //     })
        // ]
    }
}

function addStyleResource (rule) {
    rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/assets/index.less')
        ]
    })
}