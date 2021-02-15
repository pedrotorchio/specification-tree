<template lang="pug">
.modal-container-background( v-if="isShown" @click.self="close()" )
  .modal-close-button( @click="close()" ) X
  .modal-container: component.modal-view-component( :is="getModalComponent()" )
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@/composables/globalModalView';

export default defineComponent({
  setup(props, { emit }) {
    const {
      getModalComponent,
      isShown,
      close
      } = useModal();

    return {
      close,
      isShown,
      getModalComponent
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
  position: absolute
  display: block
  padding: 2em
  top: 0
  right: 0
  color: black
  cursor: pointer
.modal-container
  min-height: 300px
.modal-view-component
  height: 100%
  width: 100%
  background: white
  padding: 24px
  border-radius: 6px
</style>