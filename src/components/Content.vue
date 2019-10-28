<template>
	<div>
		{{ counterText }}	
	  <button @click="increment">Zwiększ o 1</button>
	  <button @click="decrement">Zmniejsz o 1</button>
	  {{ counterPlusTwo }}
 	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				date: new Date()
			}
		},
		computed: {
			...mapGetters([
					'counterText', 
					'counterPlusTwo'
				]), 
			dateText() {
				return `dzisiejsza data to ${this.date}`;
			}
		}, 
		methods: {
			...mapActions([
				'increment', 
				'decrement'

			])
		}
	};
</script>

<style scoped>


</style>
