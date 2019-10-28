<template>
  <div>
    <component 
      :is="component" 
      @start-game="startGame($event)"
      :level="level"></component>
  </div>
</template>

<script>
  import Menu from './components/Menu.vue'
  import Game from './components/Game.vue'

  export default {
    components: {
      appMenu: Menu,
      appGame: Game
    },
    data() {
      return {
        component: 'appMenu', 
        level: null
      }
    }, 
    methods: {
      startGame(event) {
        this.component == 'appGame' ? this.component = 'appMenu' : this.component = 'appGame'
        this.level = event;
      }
    }
  };
</script>

<style>

  @font-face {
    font-family: 'Nokia';
    src: url('../src/assets/nokiafc22.ttf') format('truetype');
  }

  * {
    box-sizing: border-box;
    font-family: 'Nokia';
  }

  body {
    margin: 0;
  }

  .game-button {
    width: 50%;
    border: 1px solid #96C002;
    padding: 32px;
    background: #000106;
    color: #96C002;
    outline: none;
    cursor: pointer;
  }
</style>
