<template>
<div>
	<div id="tab-bar">
		<slot></slot>
  </div>  
</div>
	
</template>

<script>

export default {
  
}
</script>

<style>
  
	#tab-bar {
    display: flex;
		background-color: #f6f6f6;

		position: fixed;
		right: 0;
		left: 0;
		bottom: 0;

		box-shadow: 0 5px 10px rgb(0, 0, 0);
		z-index: 999;
  }
  
</style>