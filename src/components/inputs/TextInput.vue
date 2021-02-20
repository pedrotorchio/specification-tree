<template lang="pug">
.input
  label {{label}}
  input( :value="value" @update:value="onValueUpdate" )
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useInput, Props as InputProps } from '@/composables/inputs';
  export default defineComponent({
    props: {
      value: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true,
        default: "text"
      },
      label: {
        type: String,
        required: false
      }
    },
    setup(props, context) {
      const { label, primitiveValue, onValueUpdate } = useInput(props, { context })

      return {
        label,
        primitiveValue,
        onValueUpdate
      }
    }
  });
</script>
<style lang="sass" scoped></style>