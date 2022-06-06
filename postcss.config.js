module.exports = {

  plugins: {

     autoprefixer: {},  // cssnext中启用

    // 'postcss-import': {},

    // 'postcss-url': {},

    // 'postcss-preset-env': {},

    // 'postcss-aspect-ratio-mini': {},

    'postcss-px-to-viewport': {

      // 使用非官方开发的可以自定义针对UI库的处理函数的插件

      viewportWidth: 375, // 视窗的宽度，对应的是设计稿的宽度

      viewportHeight: 667, // 视窗的高度，对应的是设计稿的高度

      unitPrecision: 5, // 指定‘px’转化为视窗单位值的小数位数

      viewportUnit: 'vw', // 指定要转化成的视窗单位，建议使用vw

      fontViewportUnit: 'vmin', // (String) Expected units for font.

      minPixelValue: 1, // 小于或等于1px不转化为视窗单位

      mediaQuery: false, // 允许在媒体中查询px

      selectorBlackList: [

        '.ignore',
				'tab-bar',
				'tab-bar-item'
      ], // 指定不需要转化的类.
			  // 以下为此插件新增配置项

      // exclude: ['node_modules'],

      // multiple: 100,

      // rules: {

      //   path: 'vant',

      //   fn(pixels, translated) {

      //     return `${translated * 2}vw`;

      //   },

      // },

    },

    cssnano: {},

  },

};