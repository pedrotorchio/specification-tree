import { ISpecificationNode, SpecificationNode, SpecificationNodeTypes } from "@/models/SpecificationNode";
import { SpecificationTree } from "@/models/SpecificationTree";
import { Ref, ref } from "vue";

const specificationTree: Ref<ISpecificationNode> = ref(new SpecificationTree('The specifications'));
let currentParentNode: ISpecificationNode = specificationTree.value;

export default function specificationTreeComposition() {
  const addNewAsset = (newAsset: ISpecificationNode) => currentParentNode.addChild(newAsset);
  const chooseNewParent = (parentAsset: ISpecificationNode) => currentParentNode = parentAsset;
  return {
    specificationTree,
    addNewAsset,
    chooseNewParent
  }
}