import { computed, ref, shallowRef } from "vue";

const _modalComponent = shallowRef<any>(null);
const _shown = ref(false);

export function getModalComponent() {
  return _modalComponent.value;
}
export function setModalComponent(component: any) {
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
    isShown: computed(() => _shown.value),
    close: () => hideModal(),
    show: () => showModal()
  }
}