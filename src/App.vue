<template lang="pug">
tree-view-frame
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeViewFrame from '@/components/tree-view/TreeViewFrame.vue';

@Options({
  props: {
    msg: String
  },
  components: {
    TreeViewFrame
  }
})
export default class App extends Vue {

}
</script>
<style lang="sass">
*
  box-sizing: border-box
html, body, #app
  height: 100%
  width: 100%
  margin: 0
  padding: 0
  font-family: sans-serif
.tree-view-frame
  height: 100%
  width: 100%
</style>
