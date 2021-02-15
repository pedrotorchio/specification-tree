<template lang="pug">
main
  directory-view( v-if="directoryView" :specifications="specificationTree" @select:specificationNode="selectNode($event)" )
  assets-view-frame( v-else )
  new-asset-button( @click:new-asset="newAsset()" )
  modal-container
</template>
<script lang="ts">
import AssetsViewFrame from '@/components/assets-view/AssetsViewFrame.vue';
import DirectoryView from '@/components/directory-view/DirectoryView.vue';
import ModalContainer from '@/components/modal-container/ModalContainer.vue';
import NewAssetModalContainer from '@/components/new-asset-modal-view/NewAssetModalView.vue';
import NewAssetButton from '@/components/new-asset/NewAssetButton.vue';
import { setModalComponent, showModal } from '@/composables/globalModalView';
import specificationTreeComposition from '@/composables/specificationTree';
import { defineComponent, ref } from 'vue';
import Asset from './models/Asset';
import NodeType, { SpecificationNodeTypes } from './models/NodeType';
import { ISpecificationNode } from './models/SpecificationNode';


export default defineComponent({
  components: {
    AssetsViewFrame,
    DirectoryView,
    NewAssetButton,
    ModalContainer,
  },
  setup() {
    const directoryView = ref(true);
    const { chooseNewParent, specificationTree, addNewAsset } = specificationTreeComposition();
    const mkRandomAsset = () => {
      const newAsset = new Asset();
      newAsset.setType(new NodeType(SpecificationNodeTypes.text));
      newAsset.setContent(`Random: ${Math.floor(Math.random()*999)}`);
      return newAsset;
    }
    // addNewAsset(new SpecificationNode("A test", mkRandomAsset())),
    return {
      directoryView,
      chooseNewParent,
      newAsset: () => { setModalComponent(NewAssetModalContainer); showModal(); },
      selectNode: (node: ISpecificationNode) => chooseNewParent(node),
      specificationTree,
    }
  }
})
</script>
<style lang="sass" src="@/styles/forms.sass"></style>
<style lang="sass">
*
  box-sizing: border-box

body

  background-color: $background-pattern-colour-b
  background-image:  linear-gradient(135deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(225deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(45deg, $background-pattern-colour-a 25%, transparent 25%), linear-gradient(315deg, $background-pattern-colour-a 25%, #E5E5F7 25%)
  background-position:  $background-pattern-size 0, $background-pattern-size 0, 0 0, 0 0
  background-size: $background-pattern-size $background-pattern-size
  background-repeat: repeat
html, body, #app, #app > main
  height: 100%
  width: 100%
  margin: 0
  padding: 0
  font-family: sans-serif
#app > main
  display: flex
  flex-direction: column
.assets-view-frame, #directory-view
  height: 100%
  width: 100%
  flex: 1 1 auto
.new-asset-button
  flex: 0 0 auto
  height: 36px
  border-radius: 0
  border: none
  background: $base-color
  color: white
  text-transform: uppercase
  font-weight: bold
  letter-spacing: 5px



</style>
