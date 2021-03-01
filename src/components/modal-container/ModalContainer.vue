<template lang="pug">
.modal-container-background( v-if="isShown" @click.self="close()" )
  .modal-container 
    .modal-close-button( @click="closeModal()" ) X
    component.modal-view-component( :is="modalComponent" v-bind="modalParameters.props" v-on="modalParameters.listeners" )
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@/composables/globalModalView';
import Asset from '@/models/Asset';

export default defineComponent({
  setup(props, { emit }) {
    const {
      isShown,
      hideModal,
      modalComponent,
      modalParameters
      } = useModal();
    return {
      hideModal,
      isShown,
      modalComponent,
      modalParameters,
    }
  }
});
</script>
<style lang="sass" scoped>
.modal-container-background
  background: rgba(black, .8)
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
.modal-close-button
  $size: 36px
  position: absolute
  display: block
  width: $size
  height: $size
  line-height: $size
  text-align: center
  top: -1*$size
  right: -1*$size
  color: black
  cursor: pointer
.modal-container
  min-height: 300px
  position: relative
.modal-view-component
  height: 100%
  width: 100%
  background: white
  padding: 24px
  border-radius: 6px
</style>