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
.tree-view-frame
  display: flex
  flex-direction: column
  padding-top: $section-padding
.tree-view-header
  flex: 0 0 auto
  padding: 0 $section-padding
main
  flex: 1 1 auto
  display: flex
  align-items: stretch
.tree-view-sidebar
  width: 600px
  flex: 0 0 auto
.tree-view-leaves-grid
  width: auto
  flex: 1 1 auto
.tree-view-sidebar, .tree-view-leaves-grid
  padding: $section-padding
</style>