<template>
  <div id="home">
    <Navbar class="home-nav">
      <template v-slot:center>购物街</template>
    </Navbar>
		<home-swiper :banners="banners"/>
		<recommend-views :recommends="recommends"/>
    <feature-view/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendViews from "./childComps/RecommendViews.vue"
import FeatureView from "./childComps/FeatureView.vue"

import Navbar from "components/common/tabbar/Navbar.vue";
import { getHomeMultidata } from "network/home.js";
export default {
  components: { 
		Navbar,
		HomeSwiper,
		RecommendViews,
    FeatureView
		},
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
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
  padding-bottom: 49px;
}
</style>