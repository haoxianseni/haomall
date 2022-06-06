<template>
  <div>
    <navbar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>   
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" 
					class="title-item" 
					:class="{active: index === currentIndex  }"
					@click="itemClick(index)" >{{ item }}</div>
        </div>
      </template>
    </navbar>
  </div>
</template>

<script>
import Navbar from "components/common/tabbar/Navbar.vue";

export default {
  components: {
    Navbar,
  },


  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },

	methods:{
		itemClick(index) {
			this.currentIndex = index
      this.$emit('titleClick',index)
		},
    backClick() {
      this.$router.back()
    }
	}
};
</script>

<style scoped>
.title {
  display: flex;
	font-size: 13px;
}

.title-item {
	flex: 1;
}

.active {
	color:var(--color-high-text);
}

.back img{
  vertical-align: middle;
}
</style>