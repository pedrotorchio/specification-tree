import { ISpecificationNode, SpecificationNode } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";

export function specificationTreeToJsTreeNodes(specificationTree: SpecificationTree): JsTreeNode[] {
  const jsTreeNodes: JsTreeNode[] = specificationTree.getChildren().map(specificationTreeNodeToJsTreeNode);
  return jsTreeNodes;
}
function specificationTreeNodeToJsTreeNode(specificationTreeNode: ISpecificationNode): JsTreeNode {
  return {
    name: specificationTreeNode.getTitle(),
    expanded: false,
    children: specificationTreeNode.getChildren().map(specificationTreeNodeToJsTreeNode)
  }
}