var webpack = require('webpack');
module.exports = {
    entry: {
        'UIDesigner/scripts/exts/echarts4/echarts4-plugins': './index.js', // 加上目录名称
        'runtime/scripts/exts/echarts4/echarts4-plugins': './index.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: true
        })
    ],
    output: {
        libraryTarget: 'amd',
        library: 'echarts4-plugins',
        path: __dirname + '/../../',
        filename: '[name].js'
    }
};