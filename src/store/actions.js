import {
	ADD_COUNTER,
	ADD_TO_CART
} from "./mutation-type"

export default {
	addCart(context,payLoad) {
		let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

		if(oldProduct) {
			context.commit(ADD_COUNTER,oldProduct)
		}
		else {
			payLoad.count = 1
			context.commit(ADD_TO_CART,payLoad)
		}

	}
}