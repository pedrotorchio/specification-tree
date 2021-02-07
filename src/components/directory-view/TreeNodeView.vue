<template lang="pug">
.tree-node-view
  h2( :class="[`lvl-${level}`, { 'is-active': isActive, 'is-selected': isSelected }]" @click.self="emit('select', node)" ) {{title}}
    
  tree-node-view( v-for="child, i in node.getChildren()" :node="child" @select="emit('select', $event)" :level="level + 1" :index="i")
</template>

<script lang="ts">
import { SpecificationNode } from '@/models/SpecificationNode';
import { computed, defineComponent, PropType, reactive } from 'vue';
import specificationTreeComposition from '../app/specificationTreeComposition';
import { useJsTreeComposition } from './jsTreeComposition';

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
  setup(props, { emit }) {
    const { selectedNode } = useJsTreeComposition();
    const { isAncestor, isDirectChild, isSibling, isAncestorOrUncle } = specificationTreeComposition();

    const isThisNodeSelected = computed(() => selectedNode.value?.equals(props.node));
    const isThisNodeDirectChild = computed(() => isDirectChild(props.node));
    const isThisNodeSibling = computed(() => isSibling(props.node));
    const isThisNodeAncestorOrUncle = computed(() => isAncestorOrUncle(props.node));
    const isThisNodeRoot = computed(() => props.level === 0);
    const isThisNodeActive = computed(() => isThisNodeRoot.value || isThisNodeSelected.value || isThisNodeAncestorOrUncle.value || isThisNodeDirectChild.value || isThisNodeSibling.value);

    const title = computed(() => `${props.level}-${props.index}_${props.node.getTitle()}`)

    return {
      isThisNodeSelected,
      isThisNodeAncestorOrUncle,
      isThisNodeDirectChild,
      isThisNodeSibling,
      isActive: isThisNodeActive,
      isSelected: isThisNodeSelected,
      title,
      emit
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