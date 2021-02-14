<template lang="pug">
form
  input
  input
  textarea
  button Save
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup(props, { emit }) {
      return {}
    }
  });
</script>
<style lang="sass" scoped>
form
  display: block
</style>