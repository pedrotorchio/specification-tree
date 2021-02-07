import { ISpecificationNode, SpecificationNode } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";
import { Ref, ref } from "vue";

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

const selectedNode: Ref<ISpecificationNode | null> = ref(null);
export function useJsTreeComposition() {
  return {
    selectedNode,
    selectNode: (node: ISpecificationNode) => selectedNode.value = node
  }
}