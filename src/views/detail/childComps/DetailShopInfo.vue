<template>
  <div class="shop-info">
    <div class="info-logo">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>

    <div class="bot-info">
      <div class="info-sell">
          <div class="sells">
            <div>{{ shop.sells | sellCountFilter }}</div>
            <div class="sells-context">总销量</div>
          </div>

          <div class="g-count">
            <div>{{ shop.goodsCount }}</div>
            <div class="sells-context">全部宝贝</div>
          </div>
      </div>
    <span class="line"></span>
      <div class="show-score">
        <div v-for="item in shop.score" class="info-score">
          {{ item.name }}
          <span class="score" :class="{ 'score-better': item.isBetter }">{{
            item.score
          }}</span>
          <span class="better" :class="{ 'better-more': item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>

		<div class="last-info">
			<span class="enter-shop">进店逛逛</span>
		</div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 0 8px;
  margin-top: 20px;
	color: #222;
  border-bottom: 5px solid #f2f5f8;
}

.line {
  display: inline-block;
  height: 46px;
  width: 1px;
  background-color: #f6f6f6;
  margin-top: 14px;
}

.show-score {
  margin-right: 20px;
  width: 116px;
}

.info-logo {
  line-height: 45px;
  display: flex;
  align-items: center;
}

.info-logo img {
  width: 45px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.info-logo span {
  margin-left: 10px;
}

.bot-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}


.info-sell {
  display: flex;
  text-align: center;
  margin-left: 20px;
	margin-top: 18px;
}

.info-sell .sells {
  margin-right: 30px;
}
.sells-context {
  font-size: 12px;
	margin-top: 10px;
}

.info-score {
  font-size: 12px;
  padding: 5px 0;
}

.info-score .score {
  display: inline-block;
  width: 35px;
  color: #5ea732;
}

.info-score .better {
  color: #fff;
  background-color: #5ea732;
  text-align: center;
  margin-left: 2px;
}

.info-score .score-better {
  color: #f13e3a;
}

.info-score .better-more {
  background-color: #f13e3a;
}

.last-info {
	text-align: center;
	margin-top: 10px;
  margin-bottom: 25px;
}
.last-info .enter-shop {
	display: inline-block;
  font-size: 12px;
	height: 30px;
	line-height: 30px;
	width: 140px;;
	border-radius: 8px;
	background-color: #f6f6f6;
}
</style>