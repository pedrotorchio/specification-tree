declare module 'vuejs-tree';
declare type VueJsTreeNode = {
  id: number | string,
  text: string,
  definition?: string,
  depth?: number,
  tags?: number[],
  checkable?: boolean,
  selectable?: boolean,
  expandable?: boolean,
  state?: {
    checked: boolean,
    expanded: boolean,
    selected: boolean
  },
  nodes: VueJsTreeNode[]
}
declare type VueJsTreeData = VueJsTreeNode[];