import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

// NOTE ノードに任意の属性を持たせられる
//      children要素がarrayで保持されているのが最低条件の模様
export interface TreeNode {
  name: string;
  abbreviatedName: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-mattree',
  templateUrl: './mattree.component.html',
  styleUrls: ['./mattree.component.scss']
})
export class MattreeComponent implements OnInit {
  // NOTE MatTreeのdataSource
  //      これ自体はツリーをflatにしたり展開/折り畳みを担わない
  // dataSource = new MatTreeNestedDataSource<TreeNode>();
  @Input() dataSource: MatTreeNestedDataSource<TreeNode>;
  // NOTE 葉のノード以外での展開/折り畳みの状態を制御
  //      引数で関数を渡しているが、これはgetChildrenに対応する
  //      https://material.angular.io/cdk/tree/api
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  constructor() {}

  ngOnInit(): void {}

}
