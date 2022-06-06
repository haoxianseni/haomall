import {
	ADD_COUNTER,
	ADD_TO_CART
} from "./mutation-type"

export default {
	//mutations的唯一目的就是修改state中的状态
		//mutations中的每个方法可能完成的事件比较单一一点 所以这里对以下所注释的代码进行了重构
		// addCart(state,payLoad) {
		// 	//第一种写法： let oldProduct = null
		// 	// for(let item of state.cartList) {
		// 	// 	if(item.iid === payLoad.iid) {
		// 	// 		oldProduct = item
		// 	// 	}
		// 	// }
		// 	//第二种写法：let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)

		// 	if(oldProduct) {
		// 		 oldProduct.count += 1
		// 	}
		// 	else {
		// 		payLoad.count = 1
		// 		state.cartList.push(payLoad)
		// 	}
		// }
		[ADD_COUNTER](state,payLoad) {
			payLoad.count++
		},

		[ADD_TO_CART](state,payLoad) {
			payLoad.checked = true
			state.cartList.push(payLoad)
		}
}