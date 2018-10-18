// 優先度、ステータスをメニュー表示するときに使うクラスです。
class SelectMenuData {

    // 値
    val: number;

    // 表示ラベル
    label: string;

    // 設定するclass属性
    cls: string;

    constructor(val: number, label: string, cls: string) {
        this.val = val;
        this.label = label;
        this.cls = cls;
    }
}
