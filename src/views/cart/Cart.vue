<template>
  <div class="cart">
    <navbar class="nav-bar">
      <template v-slot:center>购物车({{ length }})</template>
    </navbar>
    <cart-list />
    <cart-bot-bar />
  </div>
</template>

<script>
import Navbar from "components/common/tabbar/Navbar.vue";
import { mapGetters } from "vuex";

import CartList from "./childComps/CartList.vue";
import CartBotBar from "./childComps/CartBotBar.vue"

export default {
  components: {
    Navbar,
    mapGetters,
    CartList,
    CartBotBar
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.cart {
	height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>