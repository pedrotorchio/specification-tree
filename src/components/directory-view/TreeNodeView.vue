<template lang="pug">
.tree-node-view
  h2( :class="[`lvl-${level}`, { 'is-active': isExpanded, 'is-selected': isSelected }]" @click.self="selectNode(node)" ) {{title}}
  p( v-show="isSelected" ) {{ content }}
  tree-node-view( v-for="child, i in node.getChildren()" :node="child" @select="selectNode($event)" :level="level + 1" :index="i")
</template>

<script lang="ts">
import { useTreeNode } from '@/composables/directoryTree';
import useSpecificationTreeComposition from '@/composables/specificationTree';
import { SpecificationNode } from '@/models/SpecificationNode';
import { computed, defineComponent, PropType } from 'vue';

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
      content,
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
      content,
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
  margin: 5px 0
.is-selected
  font-weight: bold
.is-active
  display: block
.tree-node-view
  padding-left: 16px
p
  font-size: 12px
  margin: 0
  padding-left: 12px
</style>