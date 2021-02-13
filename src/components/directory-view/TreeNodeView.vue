<template lang="pug">
.tree-node-view
  h2( :class="[`lvl-${level}`, { 'is-active': isExpanded, 'is-selected': isSelected }]" @click.self="selectNode(node)" ) {{title}}
  tree-node-view( v-for="child, i in node.getChildren()" :node="child" @select="selectNode($event)" :level="level + 1" :index="i")
</template>

<script lang="ts">
import { SpecificationNode } from '@/models/SpecificationNode';
import { computed, defineComponent, PropType } from 'vue';
import useSpecificationTreeComposition from '../app/specificationTreeComposition';
import { useTreeNode } from './jsTreeComposition';

export default defineComponent({
  name: "TreeNodeView",
  props: {
    node: {
      type: Object as PropType<SpecificationNode>,
      required: true
    },
    level: {
      type: Number as PropType<number>,
      default: 0
    },
    index: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props, context) {
    const { 
      isThisNodeSelected,
      isThisNodeRoot,
      apply,
      title,
      selectNodeAndEmit 
    } = useTreeNode(props, context);
    const {
      isDirectChild,
      isSibling,
      isAncestorOrUncle
    } = useSpecificationTreeComposition();

    const isExpanded = computed(() => {
      return isThisNodeSelected.value 
        || isThisNodeRoot.value 
        || apply(isDirectChild)
        || apply(isSibling)
        || apply(isAncestorOrUncle)
    });

    return {
      isExpanded,
      isSelected: isThisNodeSelected,
      title,
      selectNode: selectNodeAndEmit
    }
  }
});
</script>
<style lang="sass" scoped>
h2
  font-weight: normal
  cursor: pointer
  display: none
  font-size: 16px
.is-selected
  font-weight: bold
.is-active
  display: block
.tree-node-view
  padding-left: 16px
</style>