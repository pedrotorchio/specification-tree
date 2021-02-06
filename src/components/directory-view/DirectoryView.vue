<template lang="pug">
#directory-view
  
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { SpecificationTree } from '@/models/SpecificationTree';
import JsTree from "js-treeview";
import 'js-treeview/src/treeview.css'
import { specificationTreeToJsTreeNodes } from './jsTreeComposition';
export default defineComponent({
  props: {
    specifications: {
      required: true,
      type: Object as PropType<SpecificationTree>
    }
  },
  emits: [ "select:specificationNode" ],
  setup(props, { emit }) {
    let root: Element;
    let jsTreeNodes: JsTreeNode[] = specificationTreeToJsTreeNodes(props.specifications);
    const initialiseJsTree = () => {
      jsTree.value = new JsTree(jsTreeNodes, root);
      jsTree.value.on("select", (e) => emit("select:specificationNode")); // emit selected specificationNode
    }

    const jsTree = ref<JsTree | null>(null);
    watch(() => props.specifications, () => {
      jsTreeNodes = specificationTreeToJsTreeNodes(props.specifications);
      initialiseJsTree();
    }, { deep: true });
    onMounted(() => {
      root = document.querySelector("#directory-view")!;
      initialiseJsTree();
    })
  },
});
</script>
<style lang="sass" scoped></style>