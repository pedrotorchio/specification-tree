<template lang="pug">
button.new-asset-button( @click="$emit('click:new-asset')" ) New Asset
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ["click:new-asset"]
});
</script>