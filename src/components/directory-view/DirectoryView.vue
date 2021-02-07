<template lang="pug">
#directory-view
  tree-node-view( v-for="child, i in specifications.getChildren()" :node="child" @select="clickedNode($event)" :index="i" )
</template>

<script lang="ts">
import { ISpecificationNode } from '@/models/SpecificationNode';
import { SpecificationTree } from '@/models/SpecificationTree';
import { defineComponent, PropType } from 'vue';
import { useJsTreeComposition } from './jsTreeComposition';
import TreeNodeView from './TreeNodeView.vue';

export default defineComponent({
  components: { TreeNodeView },
  props: {
    specifications: {
      required: true,
      type: Object as PropType<SpecificationTree>
    }
  },
  emits: [ "select:specificationNode" ],
  setup(props, { emit }) {
    const { selectNode } = useJsTreeComposition();
    return {  
      clickedNode: (node: ISpecificationNode) => {
        console.log(node);
        selectNode(node);
        emit("select:specificationNode", node);
      }
    }
  },
});
</script>
<style lang="sass" scoped></style>