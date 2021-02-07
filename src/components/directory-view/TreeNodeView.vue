<template lang="pug">
.tree-node-view
  h2( :class="{ active: isSelected }" @click.self="emit('select', node)" ) {{ node.getTitle() }}
  tree-node-view( v-for="child in node.getChildren()" :node="child" @select="emit('select', $event)")
</template>

<script lang="ts">
import { SpecificationNode } from '@/models/SpecificationNode';
import { computed, defineComponent, PropType } from 'vue';
import { useJsTreeComposition } from './jsTreeComposition';

export default defineComponent({
  name: "TreeNodeView",
  props: {
    node: {
      type: Object as PropType<SpecificationNode>,
      required: true
    }
  },
  setup(props, { emit }) {
    const { selectedNode } = useJsTreeComposition();
    
    return {
      isSelected: computed(() => selectedNode.value?.getUuid() === props.node.getUuid()),
      emit
    }
  }
});
</script>
<style lang="sass" scoped>
h2
  font-weight: normal
  cursor: pointer
.active
  font-weight: bold
.tree-node-view
  padding-left: 16px
</style>