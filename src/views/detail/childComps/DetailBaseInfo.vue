<template>
  <div class="wrapper" v-if="goods.columns && goods.services" >
      <div class="info-title">
        {{ goods.title }}
      </div>
      <div class="price">
        <span class="newPrice">{{ goods.newPrice }}</span>
        <span class="oldPrice">{{ goods.oldPrice }}</span>
        <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
      </div>
      <div class="info-other" >
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-services" >
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
          <img :src="goods.services[index-1].icon" alt="">
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },  
    },
  },
};
</script>

<style scoped>
.wrapper {
	padding:0 8px;
  margin-top: 15px;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  
  color: #222;
  margin-bottom: 10px;
}



.price .newPrice {
  color: var(--color-high-text);
  font-size: 24px;
}

.price .oldPrice {
  font-size: 13px;
  margin-left: 5px;
  color: rgb(166, 166, 166);
  text-decoration: line-through;
}

.discount {
  position: relative;
  padding: 2px 5px;
  font-size: 12px;
  background-color: var(--color-high-text);
  border-radius: 8px;
  color: #fff;
  margin-left: 5px;
  top: -8px;
}

.info-other {
  display: flex;
  justify-content:space-between;
  margin-top: 15px;
  font-size: 13px;
  line-height: 30px;
  color: rgb(166, 166, 166);
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}

.info-services {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info-services img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info-service-item {
  font-size: 13px;
  color: #222;
}

</style>