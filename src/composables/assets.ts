import Asset from "@/models/Asset";
import { ref } from "vue";

export function newAssetForm() {
  const theAsset = ref(new Asset());
  
}