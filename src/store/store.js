import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		counter: 0
	}, 
	getters: {
		counterText(state) {
			return `Obecna wartość countera wynosi ${state.counter}`; 
		}, 
		counterPlusTwo(state) {
			return `A tyle będzie wynosić, jeśli dodamy do niej dwa: ${state.counter + 2}`;
		}
	},
	mutations: {
		increment(state) {
			state.counter++;
		}, 
		decrement(state) {
			state.counter--;
		}
	}, 
	actions: {
		increment(context) {
			context.commit('increment');
		}, 
		decrement(context) {
			context.commit('decrement');
		}
	}
});