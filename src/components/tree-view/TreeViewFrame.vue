<template lang="pug">
.tree-view-frame
  tree-view-header
  main
    tree-view-sidebar
    tree-view-leaves-grid
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeViewHeader from './TreeViewHeader.vue';
import TreeViewLeavesGrid from './TreeViewLeavesGrid.vue';
import TreeViewSidebar from './TreeViewSidebar.vue';
@Options({
  components: {
    TreeViewHeader,
    TreeViewLeavesGrid,
    TreeViewSidebar
  }
})
export default class TreeViewFrame extends Vue {

}
</script>
<style lang="sass" scoped>
$section-padding: 16px
$base-color: #444CF7
$dark-color: #24273F
$pattern-color-a: rgba($base-color, .1)
$pattern-color-b: rgba(#E5E5F7, 1)
$pattern-size: 20px
.tree-view-frame
  display: flex
  flex-direction: column
  background-color: $pattern-color-b
  background-image:  linear-gradient(135deg, $pattern-color-a 25%, transparent 25%), linear-gradient(225deg, $pattern-color-a 25%, transparent 25%), linear-gradient(45deg, $pattern-color-a 25%, transparent 25%), linear-gradient(315deg, $pattern-color-a 25%, #E5E5F7 25%)
  background-position:  $pattern-size 0, $pattern-size 0, 0 0, 0 0
  background-size: $pattern-size $pattern-size
  background-repeat: repeat
.tree-view-header
  flex: 0 0 auto
  padding: 0 $section-padding
  background-color: rgba($dark-color, 1)
  color: white
  // border: 1px solid black
main
  flex: 1 1 auto
  display: flex
  align-items: stretch
.tree-view-sidebar
  width: 600px
  flex: 0 0 auto
  background-color: rgba($base-color, .1)
.tree-view-leaves-grid
  width: auto
  flex: 1 1 auto
.tree-view-sidebar, .tree-view-leaves-grid
  padding: $section-padding
  // border: 1px solid black
  border-top: none
.tree-view-leaves-grid
  border-left: none

.tree-view-header:before
  display: inline
  content: "header"
.tree-view-sidebar:before
  display: inline
  content: "sidebar"
.tree-view-leaves-grid:before
  display: inline
  content: "assets grid"
</style>