<template>
  <nav>
    <button
      v-for="(title, index) in titles"
      :key="index"
      :style="{color: title.color}"
      @click="$emit('menu-clicked', index)"
    >
      {{title.title}}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>