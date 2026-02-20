const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',  // ← tsx
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: 'https://d1ok4nzvcbsy3m.cloudfront.net/',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'mfe2',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.tsx',
            },
            shared: {
                react: { singleton: true, eager: true },
                'react-dom': { singleton: true, eager: true },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}
