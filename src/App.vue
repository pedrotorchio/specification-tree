<template lang="pug">
main
  | {{}}
  directory-view( v-if="directoryView" :specifications="specificationTree" @select:specificationNode="selectNode($event)" )
  assets-view-frame( v-else )
  new-asset-button( @click:new-asset="newAsset()" )
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import AssetsViewFrame from '@/components/assets-view/AssetsViewFrame.vue';
import DirectoryView from '@/components/directory-view/DirectoryView.vue';
import { SpecificationTree } from './models/SpecificationTree';
import NewAssetButton from '@/components/new-asset/NewAssetButton.vue';
import specificationTreeComposition from '@/components/app/specificationTreeComposition';
import { ISpecificationNode, SpecificationNode } from './models/SpecificationNode';
import NodeType, { SpecificationNodeTypes } from './models/NodeType';

export default defineComponent({
  components: {
    AssetsViewFrame,
    DirectoryView,
    NewAssetButton
  },
  setup() {
    const directoryView = ref(true);
    const { chooseNewParent, specificationTree, addNewAsset } = specificationTreeComposition();

    return {
      directoryView,
      chooseNewParent,
      newAsset: () => addNewAsset(new SpecificationNode("Test", new NodeType(SpecificationNodeTypes.text))),
      selectNode: (node: ISpecificationNode) => chooseNewParent(node),
      specificationTree
    }
  }
})
</script>
<style lang="sass">
*
  box-sizing: border-box

body

  background-color: $background-pattern-colour-b
  background-image:  linear-gradient(135deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(225deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(45deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(315deg, $background-pattern-colour-a 25%, #E5E5F7 25%)
  background-position:  $background-pattern-size 0, $background-pattern-size 0, 0 0, 0 0
  background-size: $background-pattern-size $background-pattern-size
  background-repeat: repeat
html, body, #app
  height: 100%
  width: 100%
  margin: 0
  padding: 0
  font-family: sans-serif
.assets-view-frame
  height: 100%
  width: 100%


</style>
