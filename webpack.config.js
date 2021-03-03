const path = require('path');
const fs = require('fs/promises');
const { promisify } = require('util')
const sizeOf = promisify(require('image-size'));
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class AssetsInfoWebpackPlugin {
  constructor({ path }) {
    this.dir = path
    this.infofile = path + '/info.json'
    this.created = false;
  }

  apply(compiler) {
    /** 启动webpack时 创建 assets 文件信息 */
    compiler.hooks.beforeRun.tapPromise('AssetsInfoWebpackPlugin', this.createInfo)
    compiler.hooks.watchRun.tapPromise('AssetsInfoWebpackPlugin', this.createInfo)
  }

  createInfo = async _ => {
    if (this.created) return;

    const info = {};

    const files = await fs.readdir(this.dir);

    for (const filename of files) {
      const data = {};

      const stat = await fs.stat(path.join(this.dir, filename));

      if (stat.isFile()) continue;

      await this.read.call(this, path.join(this.dir, filename), filename, data);

      info[filename] = data
    }

    await fs.writeFile(this.infofile, JSON.stringify(info))

    this.created = true;
  }

  async read(target, tag, data) {
    const files = await fs.readdir(target);

    for (let filename of files) {
      const absPath = path.join(target, filename)

      const stat = await fs.stat(absPath)

      if (stat.isFile()) {
        const key = target.replace(path.join(this.dir, tag) + path.sep, "").replace(/\\/g, "/")

        data[key] = data[key] || []

        if (filename.indexOf(".png") !== -1) data[key].push({ name: filename, ...await this.getWH(absPath) })
        else if (filename.indexOf("_ske") !== -1) data[key].push({ name: filename, action: await this.getAnim(absPath) })
        else data[key].push(filename)

      } else {
        await this.read.call(this, absPath, tag, data)
      }
    }
  }

  async getWH(path) {
    const { width: w, height: h } = await sizeOf(path);
    return { w, h }
  }

  async getAnim(path) {
    let info = await fs.readFile(path)
    info = JSON.parse(info.toString())
    return info.armature.map(({ name, animation }) => ({ name, anim: animation.map(anim => anim.name) }))
  }
}

const config = {
  entry: {
    main: './workspace/main',
    eva: './workspace/eva',
  },
  output: {
    filename: 'bundle/[name].bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFiles: ['index'],
    fallback: { path: require.resolve('path-browserify') },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.join(__dirname, 'dist'),
    }),
    new AssetsInfoWebpackPlugin({
      path: path.join(__dirname, 'public/assets'),
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'public'),
      }],
    }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      template: 'workspace/main/index.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['eva'],
      filename: 'eva/index.html',
      template: 'workspace/eva/index.html',
    }),

  ]
};

module.exports = (env, argv) => {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': JSON.stringify(argv)
  }))

  if (argv.mode !== 'development') return config;

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: './dist',
    open: true
  }

  return config;
};