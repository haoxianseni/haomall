<template>
  <div id="home">
    <navbar class="home-nav">
      <template v-slot:center>购物街</template>
    </navbar>
    <tab-control :titles="['流行', '新款', '精选']" class="tabControl" v-show="isTabShow" @tabclick="tabclick" ref="tabControl1"/>

    <scroll class="content" ref="scroll"
     :probe-type="3" 
     :pull-up-load="true" 
     @scroll="contentScroll"
     @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
    <recommend-views :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精选']"  @tabclick="tabclick" ref="tabControl2"/>
    <goodslist :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendViews from "./childComps/RecommendViews.vue";
import FeatureView from "./childComps/FeatureView.vue";

import Navbar from "components/common/tabbar/Navbar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import Goodslist from "components/content/goods/Goodslist.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue"

import { getHomeMultidata, homeGoods } from "network/home.js";
import {debounce} from "common/utils.js"
export default {
  components: {
    HomeSwiper,
    RecommendViews,
    FeatureView,
    Navbar,
    TabControl,
    Goodslist,
    Scroll,
    BackTop,
    debounce
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }, 
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabShow : false,
      saveY:0
    }; 
  },
  computed: {
    
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.homeGoods('pop');
    this.homeGoods('new');
    this.homeGoods('sell');
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  mounted() {
    const refresh = debounce( this.$refs.scroll.refresh,50)
     //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {  //接受总线$bus的事件
      refresh()  //刷新scroll的高度
    })
  },
  methods: {
    //事件监听相关的方法
    tabclick(index) {
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.checkIndex = index;
      this.$refs.tabControl2.checkIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500) //点击置顶
    },
    contentScroll(position) {
      //1.监听箭头显示（划到某处显示backTop箭头）
      this.isShowBackTop = (-position.y) > 1000

      //2.决定tabControl是否吸顶（fix）
      this.isTabShow = (-position.y) > this.tabOffsetTop
    },
    
    loadMore() {
      this.homeGoods(this.currentType);//上拉加载更多
      this.$refs.scroll.finishPullUp()
    }, 
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    homeGoods(type) {
      const page = this.goods[type].page + 1
       homeGoods(type, page).then((res) => {
      console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
    });
    },

   
  }, 
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}

#home {
  height: 100vh;
  position: relative;
}

.tabControl {
 position: relative;
 z-index: 9;
 background-color: var(--color-background);
}

.content {
  /* height: calc(100% - 93px);
  overflow: hidden; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


</style>