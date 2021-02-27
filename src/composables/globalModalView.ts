import { JsonObject } from "type-fest";
import { computed, ref, shallowRef } from "vue";

const _modalComponent = shallowRef<any>(null);
const _modalParameters = ref<any>(null);
const _shown = ref(false);

export function getModalComponent() {
  return _modalComponent.value;
}
export function getModalParameters() {
  return _modalParameters.value;
}
type ComponentOptions = { bind?: any }
export function setModalComponent(component: any, options?: ComponentOptions) {
  _modalParameters.value = options?.bind ?? {};
  _modalComponent.value = component;
}
export function showModal() {
  _shown.value = true;
}
export function hideModal() {
  _shown.value = false;
}
export function useModal() {
  
  return {
    getModalComponent,
    setModalComponent,
    getModalParameters,
    isShown: computed(() => _shown.value),
    close: () => hideModal(),
    show: () => showModal()
  }
}