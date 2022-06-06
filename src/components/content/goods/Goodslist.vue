<template>
  <div class="goods">
		<goodslist-item v-for="(item,index) in goods" :key="index"  :goodsItem="item"/>
  </div>
</template>

<script>
import GoodslistItem from "components/content/goods/GoodslistItem.vue" 

export default {
	components:{
		GoodslistItem
	},

  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

		padding: 2px;
  
  }
</style>