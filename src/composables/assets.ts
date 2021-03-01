import Asset from "@/models/Asset";
import Metadata from '@/models/Metadata';
import NodeType, { SpecificationNodeTypes } from '@/models/NodeType';
import Uuid from '@/models/Uuid';
import { ref } from "vue";

export function newAssetForm() {
  const asset = ref<Asset>(new Asset(new NodeType(NodeType.TEXT)));
  const metadata = ref<Metadata<string>>(new Metadata("", new Uuid()));
  const assetDataProxy = {
    get title() {
      return metadata.value.title;
    },
    set title(t: string) {
      metadata.value.title = t;
    },
    get description(): string {
      return metadata.value.description ?? "";
    },
    set description(d: string) {
      metadata.value.description = d;
    },
    get type(): SpecificationNodeTypes {
      return asset.value.getType().name;
    },
    set type(t: SpecificationNodeTypes) {
      const type = new NodeType(t);
      asset.value = new Asset(type)
    },
    get content(): string {
      return asset.value?.getContent() ?? "";
    },
    set content(c: string) {
      asset.value?.setContent(c);
    }
  };
  return {
    assetDataProxy,
    asset: asset.value,
    metadata: metadata.value
  }
}