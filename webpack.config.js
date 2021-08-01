const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: {
        main: './src/client/js/main.js',
        videoPlayer: './src/client/js/videoPlayer.js'
    },
    mode: 'development',
    watch: true,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets'),
        clean: true,
    },
    plugins: [new MiniCssExtractPlugin({filename: './css/styles.css'})],
    module: {
        rules: [
            {
                test: /\.m?js$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                   }
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // 뒤에것부터 순서대로 불러옴, // main.js를 통해 부러온 scss를 여기서 로드함.
            },
        ]
    },

};