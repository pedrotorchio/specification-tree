<template lang="pug">
header.tree-view-header
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class TreeViewHeader extends Vue {

}
</script>
<style lang="sass" scoped>
$height: 32px
.tree-view-header
  height: $height
  line-height: $height
  text-transform: uppercase
</style>