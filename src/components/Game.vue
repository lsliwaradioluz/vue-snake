<template>
	<div>
		<div class="score">
			<div class="score__points">
				{{ score | addZeros}}
			</div>
			<div class="score__special-food-time" v-if="specialFoodCounter == 5">
				{{ specialFoodTime }}
			</div>
		</div>
		<div class="game">
			<div 
				class="game-snake" 
				ref="snake"
				:style="{ 'grid-column': `${snake.column} / ${snake.column + 1}`, 'grid-row': `${snake.row} / ${snake.row + 1}` }">
			</div>
			<div 
				v-for="segment in segments"
				v-show="segment.column"
				class="game-segment" 
				ref="segment"
				:style="{ 'grid-column': `${segment.column} / ${segment.column + 1}`, 'grid-row': `${segment.row} / ${segment.row + 1}` }">
			</div>
			<div 
				class="game-food" 
				ref="food"
				:style="{ 'grid-column': `${food.column} / ${food.column + 1}`, 'grid-row': `${food.row} / ${food.row + 1}` }">
			</div>
			<div 
				v-if="specialFoodCounter == 5"
				class="game-food-special" 
				:style="{ 'grid-column': `${specialFood.column} / ${specialFood.column + 1}`, 'grid-row': `${specialFood.row} / ${specialFood.row + 1}` }">
			</div>
			<div class="game-newgame-window" v-if="showNewGameWindow">
				<h1>Restart the game?</h1>
				<div class="game-newgame-window__buttons">
					<button class="game-button" @click="setGame">YES</button>
					<button class="game-button" @click="$emit('start-game')">NO</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['level'],
		data() {
			return {
				snake: null, 
				segments: null,
				food: null, 
				specialFood: null,
				specialFoodCounter: null,
				specialFoodTime: null,
				specialFoodTimeInterval: null,
				showNewGameWindow: false, 
				score: null,
				direction: null, 
        disabledKey: null
			}
		},
		computed: {
			freeCoordinates() {
				const coordinates = {
					column: Math.floor(Math.random() * 39) + 1,
					row: Math.floor(Math.random() * 17) + 1
				}

				const checkFunctionOne = this.segments.findIndex((obj) => { 
					return obj.column == coordinates.column && obj.row == coordinates.row 
				});

				if (checkFunctionOne != -1) {
					coordinates.column = Math.floor(Math.random() * 39) + 1; 
					coordinates.row = Math.floor(Math.random() * 17) + 1;
				};

				return coordinates;
			}
		},
		methods: {
			changeDirection(event) {
        if (event.keyCode == 39 && this.disabledKey !== 'right') {
          this.direction = 'right';
          this.disabledKey = 'left'
        } else if (event.keyCode == 37 && this.disabledKey !== 'left') {
          this.direction = 'left';
          this.disabledKey = 'right';
        } else if (event.keyCode == 38 && this.disabledKey !== 'up') {
          this.direction = 'up';
          this.disabledKey = 'down'
        } else if (event.keyCode == 40 && this.disabledKey !== 'down') {
          this.direction = 'down';
          this.disabledKey = 'up';
        }
      },
      activateKeys() {
        window.addEventListener('keydown', this.changeDirection);
      }, 
      disableKeys() {
        this.direction = null;
        this.disabledKey = null;
        window.removeEventListener('keydown', this.changeDirection);
      },
			setGame() {
				this.showNewGameWindow = false;
				this.snake = {
					column: 25, 
					row: 6
				};
				this.segments = [];
				this.food = {
					column: 32, 
					row: 12 
				};
				this.specialFoodCounter = 0;
				this.specialFoodTime = 4;
				this.score = 0;
				this.activateKeys();
			},
			moveSnake() {
				setInterval(() => {
					if (this.direction) {
						this.segments.unshift({
							column: this.snake.column,
							row: this.snake.row
						});
						this.segments.pop();

						if (this.direction == 'right') {
							this.snake.column++
						} else if (this.direction == 'left') {
							this.snake.column--
						} else if (this.direction == 'up') {
							this.snake.row--
						} else if (this.direction == 'down') {
							this.snake.row++
						}

						this.endGame();
						this.eatFood();
						if (this.specialFoodCounter == 5 && this.specialFood == null) this.showSpecialFood();
						if (this.specialFood != null) this.eatSpecialFood();
					}
				}, this.level);
			},
			endGame() {				
				if (this.snake.column == 0 || this.snake.column == 41 || this.snake.row == 0 || this.snake.row == 19 || this.segments.findIndex((obj) => { return obj.column == this.snake.column && obj.row == this.snake.row }) != -1) {
						this.showNewGameWindow = true;
						this.disableKeys();
				}
			},
			addScore(typeOfFood) {
				typeOfFood == 'regular' ? this.score += 7 : this.score += 40;
			},
			eatFood() {
				if (this.snake.column == this.food.column && this.snake.row == this.food.row) {
					this.specialFoodCounter < 5 ? this.specialFoodCounter++ : this.specialFoodCounter = 1;
					this.food.column = this.freeCoordinates.column;
					this.food.row = this.freeCoordinates.row;
					this.addScore('regular');
					this.segments.push({ 
						column: null,
						row: null
					});
				};
			}, 
			showSpecialFood() {
				this.specialFood = {
					column: this.freeCoordinates.column,
					row: this.freeCoordinates.row
				};
				
				if (this.specialFoodTimeInterval == null) {
					this.specialFoodTime = 4;
					this.specialFoodTimeInterval = setInterval(() => {
						this.specialFoodTime--;
					}, 1000);
				};
				
				setTimeout(() => {
					clearInterval(this.specialFoodTimeInterval);
					this.specialFoodTimeInterval = null;
					this.specialFood = null;
					if (this.specialFoodCounter == 5) this.specialFoodCounter = 0
				}, 4000);
			}, 
			eatSpecialFood() {
				if (this.snake.column == this.specialFood.column && this.snake.row == this.specialFood.row) {
					clearInterval(this.specialFoodTimeInterval);
					this.specialFoodCounter = 0;
					this.addScore('special');
					this.segments.push({ 
						column: null,
						row: null
					});
				}
			}
		},
		filters: {
			addZeros(value) {
				if (value < 10) {
					return `000${value}`
				} else if (value >= 10 && value < 100) {
					return `00${value}`
				} else if (value >= 100 && value < 1000) {
					return `0${value}`
				} else {
					return value;
				}
			}
		}, 
		created() {
			this.setGame();
		},
		mounted() {
			this.moveSnake();
		}
	};
</script>

<style scoped>
	
	.score {
		padding: 16px;
		height: 10vh;
		background-color: #96C002;
		font-size: 2rem;
		border-bottom: 2px solid #000106;
		letter-spacing: 8px;
		display: flex;	
	}

	.score__special-food-time {
		width: 100%;
		text-align: right;
	}

	.game {
		width: 100%;
		height: 90vh;
		background: #96C002;
		display: grid;
		grid-auto-columns: 2.5vw;
		grid-auto-rows: 5vh;
		overflow: hidden;
	}

	.segments {
		position: fixed;
		width: 100%;
		top: 0;
	}

	.game-snake, 
	.game-segment, 
	.game-food {
		background: #000106;
		border-radius: 10px;
	}

	.game-food, 
	.game-food-special {
		animation: pulse 0.4s alternate infinite;
	}

	.game-food-special {
		position: relative;
		background: #000106;
	}

	.game-food-special::before,
	.game-food-special::after {
		content: "";
		background: #000106;
		height: 100%;
		width: 100%;
		position: absolute;
	}

	.game-food-special::before {
		transform: rotate(30deg);
	}

	.game-food-special::after {
		transform: rotate(60deg);
	}

	.game-newgame-window {
		height: 30%;
		width: 100%;
		position: absolute;
		top: 30%;
		text-align: center;
	}

	@keyframes pulse {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(0.9);
		}
	}


</style>
