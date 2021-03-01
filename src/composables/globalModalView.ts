import { Store } from "@/models/Store";
import { JsonObject } from "type-fest";
import { computed, markRaw, reactive, ref, shallowRef } from "vue";

type PropsDictionary = { [k: string]: any };
type ListenersDictionary = { [k: string]: Function };
interface ModalState {
  shown: boolean,
  component: any,
  parameters: {
    listeners: ListenersDictionary,
    props: PropsDictionary
  }
}
class ModalView extends Store<ModalState> {
  protected data() {
    return {
      shown: false,
      component: null,
      parameters: {
        listeners: {},
        props: {}
      }
    }
  }
  setModalComponent(component: any, options: ComponentOptions = {}) {
    const { listeners = {}, props = {} } = options;
    this.state.parameters.listeners = listeners;
    this.state.parameters.props = props;
    this.state.component = markRaw(component);
  }
  showModal() {
    this.state.shown = true;
  }
  hideModal() {
    this.state.shown = false;
  }
}
const store = new ModalView();

type ComponentOptions = { listeners?: any, props?: any };

export function useModal() {
  
  return {
    modalComponent: computed(() => store.getState().component),
    modalParameters: computed(() => store.getState().parameters),
    isShown: computed(() => store.getState().shown),
    setModalComponent: (component: any, options: ComponentOptions) => store.setModalComponent(component, options),
    hideModal: () => store.hideModal(),
    showModal: () => store.showModal()
  }
}