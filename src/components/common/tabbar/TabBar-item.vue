<template>
		<div class="tab-bar-items" @click="itemClick">
			<div v-show="!isActive"><slot name="item-icon"></slot></div>
			<div v-show="isActive"><slot name="item-icon-active"></slot></div>
			<div :style="activeStyle"><slot name="item-text"></slot></div>
			<!-- <img src="../../assets/img/tabbar/shouye-xianxing.svg" alt="">
			<div>首页</div> -->
		</div>
</template>

<script>
export default {
	props:{
		path:String,
		activeColor:{
			type:String,
			default:"black"
		},
		activeFontWeight:{
			type:String,
			default:"bold"
		}
	},
	// data() {
	// 	return {
	// 		isActive:false
	// 	}
	// },
	computed:{
		isActive() {
			return this.$route.path.indexOf(this.path) !== -1
		},
		activeStyle() {
			return this.isActive ? {color:this.activeColor,fontWeight:this.activeFontWeight} : {}
		}
	},
	methods:{
		itemClick() {
			this.$router.replace(this.path).catch(err=>{})

		}
	}
}
</script>

<style>
	.tab-bar-items {
    flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
  }
	.tab-bar-items img {
		height: 24px;
		widows: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
</style>