<template lang="pug">
form
  label Title
  input( v-model="assetsData.title" )
  label Type
  select( v-model="assetsData.type" )
    option( v-for="aType in SpecificationNodeTypes" ) {{ aType }}
  label Description
  input( v-model="assetsData.description" )
  label Content
  textarea.large( v-model="assetsData.content" )
  button Save
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import TextInput from '@/components/inputs/TextInput.vue';
import Asset from '@/models/Asset';
import { SpecificationNode } from '@/models/SpecificationNode';
import Metadata from '@/models/Metadata';
import Uuid from '@/models/Uuid';
import NodeType, { SpecificationNodeTypes } from '@/models/NodeType';

export default defineComponent({
  components: {
    TextInput
  },
  setup(props, { emit }) {
    
    type Setter = (v: any) => void;
    const extractValue = (e: InputEvent) => (e.target as HTMLInputElement).value;
    const call = (func: Function, ...args: any[]) => func.bind(asset)(...args);
    const setValue = (setter: Setter) => (e: InputEvent) => call(setter, extractValue(e));

    const isEmpty = () => Boolean(asset.value);
    const asset = ref<Asset>(new Asset(new NodeType(NodeType.TEXT)));
    const metadata = ref<Metadata<string>>(new Metadata("", new Uuid()));

    const assetsData = reactive({
      get title() {
        return metadata.value.title;
      },
      set title(t: string) {
        metadata.value.title = t;
      },
      get description(): string {
        return metadata.value.description ?? "";
      },
      set description(d: string) {
        metadata.value.description = d;
      },
      get type(): SpecificationNodeTypes {
        return asset.value.getType().name;
      },
      set type(t: SpecificationNodeTypes) {
        const type = new NodeType(t);
        asset.value = new Asset(type)
      },
      get content(): string {
        return `
          ${JSON.stringify(metadata.value)}
          ${JSON.stringify(asset.value)}
        `;
        // asset.value?.getContent() ?? "";
      },
      set content(c: string) {
        // asset.value?.setContent(c);
      }
    })
    return {
      assetsData,
      setValue,
      SpecificationNodeTypes
    }
  }
});
</script>
<style lang="sass" scoped>
form, input, button
  display: block
</style>