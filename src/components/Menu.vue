<template>
  <div class="menu">
    <div class="menu__image">
      <div v-for="n in 17" class="menu__image--content" :style="{ 'grid-area': `s${n}` }"></div>
    </div>
    <div class="menu__title">S N A K E</div>
    <div class="menu__subtitle">Choose your speed now:</div>
    <div class="menu__buttons">
      <button class="game-button" @click="$emit('start-game', 200)">TURTLE</button>
      <button class="game-button" @click="$emit('start-game', 150)">HORSE</button>
      <button class="game-button" @click="$emit('start-game', 80)">CHEETAH</button>
    </div>
  </div>
</template>

<script>
  
</script>

<style scoped>

  .menu {
    height: 100vh;
    width: 100%;
    background: #96C002;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .menu__image {
    height: 30vh;
    width: 30vh;
    display: grid;
    margin-bottom: 2rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas: "s1 s2 s3 . s5"
                         "s6 . . . ."
                         "s7 s8 s9 s10 s11"
                         ". . . . s12"
                         "s17 s16 s15 s14 s13";
  }

  .menu__image--content {
    background: #000106;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  } 

  .menu__title {
    font-size: 3rem;
  }

  .menu__buttons {
    width: 100%;
    padding: 2rem;
    text-align: center;
  }
</style>