var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname),
    cache: true,
    devtool: 'cheap-module-source-map',
    entry: './src/app.js',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                // exclude: /(node_modules)/,
                loader: 'babel-loader?cacheDirectory',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy', 'transform-decorators']
                }
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.less$/, loader: "style-loader!css-loader?modules!less-loader"},
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: "file-loader?limit=8192"
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "./assets/bundle.js",
        chunkFilename: './assets/[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        // 热模块替换相关插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./assets/vendor-manifest.json')
        })
    ],
    devServer: {
        port: '9999',
        hot: true,
        inline: true,
        historyApiFallback: true
    }
};
