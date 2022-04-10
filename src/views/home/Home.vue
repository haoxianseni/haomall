<template>
  <div id="home">
    <Navbar class="home-nav">
      <template v-slot:center>购物街</template>
    </Navbar>

    <scroll class="content" ref="scroll"
     :probe-type="3" 
     :pull-up-load="true" 
     @scroll="contentScroll"
     @pullingUp="loadMore">
    <home-swiper :banners="banners" />
    <recommend-views :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabclick="tabclick"/>
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
export default {
  components: {
    HomeSwiper,
    RecommendViews,
    FeatureView,
    Navbar,
    TabControl,
    Goodslist,
    Scroll,
    BackTop
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
      isShowBackTop:false
    }; 
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();
    this.homeGoods('pop');
    this.homeGoods('new');
    this.homeGoods('sell');
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
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500) //点击置顶
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000//划到某处显示backTop箭头
    },
    
    loadMore() {
      this.homeGoods(this.currentType);//上拉加载更多
      this.$refs.scroll.finishPullUp()
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
  position: sticky;
  top: 0;
  z-index: 999;
}

#home {
  height: 100vh;
  position: relative;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: var(--color-background);
  z-index: 99;
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