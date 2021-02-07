import { ISpecificationNode } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";
import { Ref, ref } from "vue";

const specificationTree: Ref<ISpecificationNode> = ref(new SpecificationTree('The specifications'));
const selectedNode: Ref<ISpecificationNode> = ref(specificationTree.value);

export default function specificationTreeComposition() {
  const hasParent = () => Boolean(selectedNode.value.getParentNode());

  const addNewAsset = (newAsset: ISpecificationNode) => selectedNode.value.addChild(newAsset);
  const chooseNewParent = (parentAsset: ISpecificationNode) => selectedNode.value = parentAsset;
  const isSibling = (potentialSibling: ISpecificationNode) => testNodeIsSibling(selectedNode.value, potentialSibling);
  const isDirectChild = (potentialChild: ISpecificationNode) => selectedNode.value.getChildren().some(child => child.equals(potentialChild));
  const isAncestor = (potentialAncestor: ISpecificationNode) => hasParent() && testNodeAncestry(selectedNode.value.getParentNode()!, potentialAncestor);
  const isAncestorOrUncle = (potentialAncestorUncle: ISpecificationNode) => hasParent() && testNodeAncestryAndUncles(selectedNode.value.getParentNode()!, potentialAncestorUncle);
  return {
    specificationTree,
    addNewAsset,
    chooseNewParent,
    isAncestor,
    isDirectChild,
    isSibling,
    isAncestorOrUncle
  }
}

function testNodeIsSibling(testNode: ISpecificationNode, potentialSibling: ISpecificationNode): boolean {
  return testNode.getParentNode()?.getChildren().some(child => child.equals(potentialSibling)) ?? false;
}
function testNodeAncestryAndUncles (currentParent: ISpecificationNode, potentialAncestor: ISpecificationNode): boolean {
  if (testNodeIsSibling(currentParent, potentialAncestor)) return true;
  const parentNode: ISpecificationNode | null = currentParent.getParentNode();
  if (!parentNode) return false;
  return testNodeAncestry(parentNode, potentialAncestor);
}
function testNodeAncestry (currentParent: ISpecificationNode, potentialAncestor: ISpecificationNode): boolean {
  if (currentParent.equals(potentialAncestor)) return true;
  const parentNode: ISpecificationNode | null = currentParent.getParentNode();
  if (!parentNode) return false;
  return testNodeAncestry(parentNode, potentialAncestor);
}