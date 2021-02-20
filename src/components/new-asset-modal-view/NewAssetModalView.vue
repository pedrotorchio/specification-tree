<template lang="pug">
form
  label Tipo
  input
  label Descrição
  input
  label Conteúdo
  textarea
  button Save
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import TextInput from '@/components/inputs/TextInput.vue';

  export default defineComponent({
    components: {
      TextInput
    },
    setup(props, { emit }) {
      const assetData = reactive({
        title: "",
        type: "",
        content: ""
      });
      return {
        assetData
      }
    }
  });
</script>
<style lang="sass" scoped>
form, input, button
  display: block
</style>