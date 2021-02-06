<template lang="pug">
.assets-view-frame
  assets-view-header
  main
    assets-view-sidebar
    assets-view-leaves-grid
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AssetsViewHeader from './AssetsViewHeader.vue';
import AssetsViewLeavesGrid from './AssetsViewLeavesGrid.vue';
import AssetsViewSidebar from './AssetsViewSidebar.vue';
@Options({
  components: {
    AssetsViewHeader,
    AssetsViewLeavesGrid,
    AssetsViewSidebar
  }
})
export default class AssetsViewFrame extends Vue {

}
</script>
<style lang="sass" scoped>
$section-padding: 16px

.assets-view-frame
  display: flex
  flex-direction: column
.assets-view-header
  flex: 0 0 auto
  padding: 0 $section-padding
  background-color: rgba($dark-color, 1)
  color: white
  // border: 1px solid black
main
  flex: 1 1 auto
  display: flex
  align-items: stretch
.assets-view-sidebar
  width: 600px
  flex: 0 0 auto
  background-color: rgba($base-color, .1)
.assets-view-leaves-grid
  width: auto
  flex: 1 1 auto
.assets-view-sidebar, .assets-view-leaves-grid
  padding: $section-padding
  // border: 1px solid black
  border-top: none
.assets-view-leaves-grid
  border-left: none

.assets-view-header:before
  display: inline
  content: "header"
.assets-view-sidebar:before
  display: inline
  content: "sidebar"
.assets-view-leaves-grid:before
  display: inline
  content: "assets grid"
</style>