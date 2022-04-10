<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item" :class="{active:index === checkIndex }" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      checkIndex: 0,
    };
  },
	methods:{
		itemClick(index) {
			this.checkIndex = index
      this.$emit('tabclick',index)
		}
	}
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
	padding: 5px;
}
.active {
	color: var(--color-high-text);
}
.active span {
	border-bottom: 2px solid var(--color-tint);
}
</style>