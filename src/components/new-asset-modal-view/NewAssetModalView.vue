<template lang="pug">
form( @submit.prevent="submit()" )
  label Title
  input( v-model="assetData.title" )
  label Type
  select( v-model="assetData.type" )
    option( v-for="aType in SpecificationNodeTypes" ) {{ aType }}
  label Description
  input( v-model="assetData.description" )
  label Content
  textarea.large( v-model="assetData.content" )
  button Save
</template>
<script lang="ts">
import TextInput from '@/components/inputs/TextInput.vue';
import { newAssetForm } from '@/composables/assets';
import { SpecificationNodeTypes } from '@/models/NodeType';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    TextInput
  },
  setup(props, { emit }) {
    const { assetDataProxy, asset, metadata } = newAssetForm();
    const submit = () => emit("create:asset", { asset, metadata });
    return {
      assetData: assetDataProxy,
      SpecificationNodeTypes,
      submit
    }
  }
});
</script>
<style lang="sass" scoped>
form, input, button
  display: block
</style>