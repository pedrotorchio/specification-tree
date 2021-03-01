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
import { useModal } from '@/composables/globalModalView';
import specificationTreeComposition from '@/composables/specificationTree';
import { defineComponent, ref } from 'vue';
import Asset from './models/Asset';
import Metadata from './models/Metadata';
import NodeType, { SpecificationNodeTypes } from './models/NodeType';
import { ISpecificationNode, SpecificationNode } from './models/SpecificationNode';


export default defineComponent({
  components: {
    AssetsViewFrame,
    DirectoryView,
    NewAssetButton,
    ModalContainer,
  },
  setup() {
    const directoryView = ref(true);
    const { chooseNewParent, specificationTree, addNewNode } = specificationTreeComposition();
    const mkRandomAsset = () => {
      const newAsset = new Asset(new NodeType(NodeType.TEXT));
      newAsset.setType(new NodeType(SpecificationNodeTypes.text));
      newAsset.setContent(`Random: ${Math.floor(Math.random()*999)}`);
      return newAsset;
    }
    const { setModalComponent, showModal, hideModal } = useModal();
    const showNewAssetModal = () => {
      type AssetMeta = { asset: Asset, metadata: Metadata<string> };
      setModalComponent(NewAssetModalContainer, {
        listeners: { "create:asset": ({ asset, metadata }: AssetMeta) => {
          const node = new SpecificationNode();
          node.setAsset(asset);
          node.setMetadata(metadata);
          addNewNode(node);
          hideModal();
        }}
      }); 
      showModal();
    }
    // addNewAsset(new SpecificationNode("A test", mkRandomAsset())),
    return {
      directoryView,
      chooseNewParent,
      newAsset: showNewAssetModal,
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



</style>
