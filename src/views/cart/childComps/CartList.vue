<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
							:cartList="cartList"/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";

import CartListItem from "./CartListItem.vue"

export default {
	activaed() {
		this.$refs.scroll.refresh()
	},

  components: {
    mapGetters,
    Scroll,
		CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.cart-list {
	height: calc(100% - 44px - 49px - 40px);
}

.content {
  height: 100%;
	
  overflow: hidden;
}
</style>