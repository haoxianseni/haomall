<template>
    <swiper>
      <!-- 轮播图的使用 -->
      <swiper-item v-for="item in banners" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" :title="item.title" alt="" @load="imgLoad"/>
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad:false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    imgLoad() {
      if(!this.isLoad)
      {
      this.$emit('swiperImgLoad')
      this.isLoad = true
      }
    }
  }
};
</script>

<style>
</style>