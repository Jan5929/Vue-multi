const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const glob = require('glob')
// 配置pages多页面获取当前文件夹下的html和js
function getEntry (globPath) {
  const entries = {}
  let tmp
  const htmlTemplates = {}
  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function (entry) {
    tmp = entry.split('/').splice(-3)
    htmlTemplates[tmp[1]] = entry
  })

  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function (entry) {
    tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry,
      template: htmlTemplates[tmp[1]] ? htmlTemplates[tmp[1]] : 'index.html', //  当前目录没有有html则以共用的public/index.html作为模板
      filename: tmp[1] + '.html' // 以文件夹名称.html作为访问地址
    }
  })
  return entries
}
const htmlTemplates = getEntry('./src/views/**/*.')
console.log(htmlTemplates, '123')
module.exports = {
  pages: htmlTemplates,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true, // eslint 检查
  productionSourceMap: false, // 生产环境不需要source map 文件
  configureWebpack: config => { // 通过 webpack-merge 合并至webpack
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => { // webpack 链式操作，增加新loader
    config.resolve.alias // 别名映射
      .set('~', resolve('src'))
      .set('~c', resolve('src/components'))
  },
  devServer: {
    open: true,
    index: '/Login.html'
  }
}
