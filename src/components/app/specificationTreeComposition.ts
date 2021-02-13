import { ISpecificationNode } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";
import { Ref, ref } from "vue";

const specificationTree: Ref<ISpecificationNode> = ref(new SpecificationTree('The specifications'));
const selectedNode: Ref<ISpecificationNode> = ref(specificationTree.value);

export default function useSpecificationTreeComposition() {
  const hasParent = () => Boolean(selectedNode.value.getParentNode());

  const addNewAsset = (newAsset: ISpecificationNode) => selectedNode.value.addChild(newAsset);
  const chooseNewParent = (parentAsset: ISpecificationNode) => selectedNode.value = parentAsset;
  const isSibling = (potentialSibling: ISpecificationNode) => testNodeIsSibling(selectedNode.value, potentialSibling);
  const isDirectChild = (potentialChild: ISpecificationNode) => selectedNode.value.getChildren().some(child => child.equals(potentialChild));
  const isAncestorOrUncle = (potentialAncestorUncle: ISpecificationNode) => hasParent() && testNodeAncestryAndUncles(selectedNode.value.getParentNode()!, potentialAncestorUncle);
  return {
    specificationTree,
    addNewAsset,
    chooseNewParent,
    isDirectChild,
    isSibling,
    isAncestorOrUncle
  }
}

function testNodeIsSibling(testNode: ISpecificationNode, potentialSibling: ISpecificationNode): boolean {
  const testNodeParent = testNode.getParentNode();
  const equals = (child: ISpecificationNode) => child.equals(potentialSibling)
  return testNodeParent?.getChildren().some(equals) ?? false;
}
function testNodeAncestryAndUncles (currentParent: ISpecificationNode | null, potentialAncestor: ISpecificationNode): boolean {
  if (!currentParent) return false;
  // if parent is searched node, then searched node is ancestor
  if (currentParent.equals(potentialAncestor)) return true;
  // if parent is sibling of searched node, then searched node is ancestor (uncle)
  if (testNodeIsSibling(currentParent, potentialAncestor)) return true;
  // otherwise, test another generation
  return testNodeAncestryAndUncles(currentParent.getParentNode(), potentialAncestor);
}