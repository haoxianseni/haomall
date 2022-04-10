<template>
	<div class="wrapper" ref="wrapper"> 
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BSroll from "better-scroll"

export default {
	data() {
		return {
			scroll:null
		}
	},
	props:{
		probeType:{
			type:Number,
		default:0
		},

		pullUpLoad:{
			type:Boolean,
			default:false
		}
	},
	mounted() {
		//创建BScroll对象
		this.scroll = new BSroll(this.$refs.wrapper,{
			// observeDOM:true,
			// observeImage:true,
			click:true,
			probeType:this.probeType,
			pullUpLoad:this.pullUpLoad
		});

		this.scroll.on('scroll',(position) => {
			this.$emit('scroll',position)
		});

		this.scroll.on('pullingUp',() => {
			this.$emit('pullingUp')
		})
	},
	methods: {
		scrollTo(x,y,time=500) {
			this.scroll.scrollTo(x,y,time)
		},
		finishPullUp() {
			this.scroll.finishPullUp()
		}
	}
}
</script>

<style scoped>

</style>