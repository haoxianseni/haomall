module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets':'@/assets',
        'components':'@/components',
        'common':'@/common',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}
