import { ISpecificationNode, SpecificationNode } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";
import { computed, Ref, ref, SetupContext, toRefs } from "vue";

// export function specificationTreeToJsTreeNodes(specificationTree: SpecificationTree): JsTreeNode[] {
//   const jsTreeNodes: JsTreeNode[] = specificationTree.getChildren().mapToArray(specificationTreeNodeToJsTreeNode);
//   return jsTreeNodes;
// }
// export function specificationTreeToVueJsTreeNodes(specificationTree: SpecificationTree): VueJsTreeNode[] {
//   const vueJsTreeNodes: VueJsTreeNode[] = specificationTree.getChildren().mapToArray(specificationTreeNodeToVueJsTreeNode);
//   return vueJsTreeNodes;
// }
// function specificationTreeNodeToJsTreeNode(specificationTreeNode: ISpecificationNode): JsTreeNode {
//   return {
//     name: specificationTreeNode.getTitle(),
//     expanded: false,
//     children: specificationTreeNode.getChildren().mapToArray(specificationTreeNodeToJsTreeNode)
//   }
// }
// function specificationTreeNodeToVueJsTreeNode(specificationTreeNode: ISpecificationNode): VueJsTreeNode {
//   return {
//     text: specificationTreeNode.getTitle(),
//     id: specificationTreeNode.getUuid(),
//     definition: specificationTreeNode.getContent() ?? "",
//     nodes: specificationTreeNode.getChildren().mapToArray(specificationTreeNodeToVueJsTreeNode)
//   }
// }
type RequiredProps = {
  level: number,
  index: number,
  node: ISpecificationNode
}
const selectedNode: Ref<ISpecificationNode | null> = ref(null);
export function selectNode(node: ISpecificationNode | null) {
  selectedNode.value = node;
}
export function useTreeNode(props: RequiredProps, { emit }: SetupContext) {
  const {
    level,
    node,
    index
  } = toRefs(props);
  const isThisNodeRoot = computed(() => level.value === 0);
  const isThisNodeSelected = computed(() => selectedNode.value?.equals(node.value));
  const title = computed(() => node.value.getMetadata().title);
  const content = computed(() => node.value.getAsset()?.getContent());

  const applyToNode = <T>(aFunction: (n: ISpecificationNode) => T): T => aFunction(node.value!);
  const selectNodeAndEmit = (node: ISpecificationNode) => {
    selectedNode.value = node
    emit("select", node);
  }
  return {
    isThisNodeRoot,
    isThisNodeSelected,
    apply: applyToNode,
    title,
    content,
    selectedNode,
    selectNodeAndEmit
  }
}