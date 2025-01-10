<template>
  <nav>
    <router-link
      :to="title.link"
      v-for="(title, index) in titles"
      :key="index"
      :style="{color: title.color}"
    >
      {{title.title}}
    </router-link>
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