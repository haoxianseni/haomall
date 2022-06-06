<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" >
      <detail-swiper
        :topImages="topImages"
        v-if="topImages != ''"
        :top-images="topImages"
      />
      <detail-base-info :goods="goods" />
      <detail-shop-infor :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goodslist :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfor from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue"
import { debounce } from "common/utils.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import Goodslist from "components/content/goods/Goodslist.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    getDetail,
    DetailSwiper,
    Goods,
    DetailBaseInfo,
    Shop,
    DetailShopInfor,
    Scroll,
    DetailGoodsInfo,
    GoodsParam,
    DetailParamInfo,
    DetailCommentInfo,
    getRecommend,
    Goodslist,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommends: [],
      themeOfftop: [],
      getThemeOfftop:null,
      currentIndex:0,
      isShowBackTop:false
    };
  },
  created() {
    //1.获取id
    this.iid = this.$route.params.iid;

    //2.请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建商品对象
      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
      }
      //以下方法调用的值有误差，因为dom渲染了但是图片还没有加载完
      // this.$nextTick(() => {
      //   this.themeOfftop = [];
      //   this.themeOfftop.push(0);
      //   this.themeOfftop.push(this.$refs.params.$el.offsetTop);
      //   this.themeOfftop.push(this.$refs.comment.$el.offsetTop);
      //   this.themeOfftop.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeOfftop);
      // });
      this.getThemeOfftop = debounce(() => {
        this.themeOfftop = [];
        this.themeOfftop.push(0);
        this.themeOfftop.push(this.$refs.params.$el.offsetTop);
        this.themeOfftop.push(this.$refs.comment.$el.offsetTop);
        this.themeOfftop.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeOfftop);
      },500)
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeOfftop()
    },
    addToCart() {
      //1.获取购物车的展示信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车里
      this.$store.dispatch('addCart',product)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeOfftop[index], 500);
      // console.log(index);
    },
     backClick() {
      this.$refs.scroll.scrollTo(0,0,500) //点击置顶
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y
      //2.positionY和主题中的值做对比
      for(let i = 0; i <= this.themeOfftop.length; i++) {
        if(this.currentIndex !== i && ((i < this.themeOfftop.length -1 && positionY > this.themeOfftop[i] && positionY < this.themeOfftop[i+1]) || 
            ((i === this.themeOfftop.length -1) && positionY >= this.themeOfftop[i]))) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // for(let i = this.themeOfftop.length - 1; i >= 0;i--) {
      //   if(positionY > this.themeOfftop[i]) {
      //       this.$refs.nav.currentIndex = i
      //       break;
      //   }
      // }
      this.isShowBackTop = (-position.y) > 1000
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //3.监听item中图片加载完成
    this.$bus.$on("detailImgLoad", () => {
      //接受总线$bus的事件
      refresh(); //刷新scroll的高度
    });
  },

};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>