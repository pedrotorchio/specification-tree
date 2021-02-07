declare module 'js-treeview' {
  export = JsTree
}
declare class JsTree {
  constructor(tree: JsTreeNode[], id: string | Element);
  on(eventName: JsTreeEventName, callback: JsTreeEventCallback);
}
declare type JsTreeNode = { name: string, children: JsTreeNode[], expanded?: boolean };
declare type JsTreeEventName = 'expand' | 'expandAll' | 'collapse' | 'collapseAll' | 'select';
declare type JsTreeEventCallback = (event: JsTreeEventCallbackEventObject) => void;
declare type JsTreeEventCallbackEventObject = {
  data: {
    children: []
    expanded: false
    name: "Test"
  },
  target: MouseEvent
}