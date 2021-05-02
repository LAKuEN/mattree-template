import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from './mattree/mattree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  @ViewChild('jsonInput') private jsonInput: ElementRef<HTMLInputElement>;

  onSelectedJsonFile(): void {
    const files = this.jsonInput.nativeElement.files;
    if (files.length != 1) return;
    const jsonFile = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      // NOTE e.target.resultにFileReader.readAsText()の返戻値の文字列が格納されている
      const treeJsonStr = e.target.result.toString();
      // NOTE TypeScriptでも文字列をパースするのにJSON.parse()を使う
      //      特定の型に変換するには、型アノテーションをつけた変数に格納すれば良いらしい
      //      https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript
      let treeData: TreeNode[] = JSON.parse(treeJsonStr);
      // NOTE dataSource.dataに設定したものがツリーに表示される
      //      親コンポーネントであるAppComponentからMatTreeComponentにバインディングしている
      this.dataSource.data = treeData;
    };
    reader.readAsText(jsonFile);
  }
}
