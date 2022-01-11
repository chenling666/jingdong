/* 
上线流程
1. 编写vue.config.js 文件，配置publicPath
2. 将生成的 dist 文件给后端
3. 后端将dist里面的东西复制到后端文件夹(jingdong)下
4. 后端重启后端服务
*** 最容易出错的是下面这个路径配置
 */
module.exports = {
  publicPath: '/jiongdong'
}