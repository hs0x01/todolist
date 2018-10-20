// TODOリストビューモデルクラスです。
class TodoListViewModel {

    // 優先度選択メニューのリスト
    priorityDataList: Array<SelectMenuData> = [];

    // ステータス選択メニューのリスト
    statusDataList: Array<SelectMenuData> = [];

    // TODOリスト
    todoList: KnockoutObservableArray<Todo>;

    // TODO入力で選択された優先度
    selectedPriority: KnockoutObservable<Priority> = ko.observable(Priority.MIDDLE);

    // TODO入力で選択されたステータス
    selectedStatus: KnockoutObservable<Status> = ko.observable(Status.TODO);

    // 入力されたTODO
    inputContent: KnockoutObservable<string> = ko.observable('');

    // 更新・削除対象レコードの添え字
    targetIdx: KnockoutObservable<number> = ko.observable(-1);

    // ダイアログ表示時、薄暗い背景を表示するフラグ
    isOverlay: KnockoutObservable<boolean> = ko.observable(false);

    // TODO入力を表示するかどうか
    isShowTodoInput: KnockoutObservable<boolean> = ko.observable(false);

    // 優先度選択メニューを表示するかどうか
    showPriorityMenu: KnockoutObservable<boolean> = ko.observable(false);

    // スタータス選択メニューを表示するかどうか
    showStatusMenu: KnockoutObservable<boolean> = ko.observable(false);

    // ダイアログを表示するかどうか
    isShowDialog: KnockoutObservable<boolean> = ko.observable(false);

    // ダイアログに表示するメッセージ
    dialogMessage: KnockoutObservable<string> = ko.observable('');

    private _todoList: TodoList;

    // 初期化します。
    init(callback: () => void): void {

        this.priorityDataList.push(new SelectMenuData(Priority.HIGH, '高', 'fa-exclamation-circle priority-high'));
        this.priorityDataList.push(new SelectMenuData(Priority.MIDDLE, '中', 'fa-exclamation-circle priority-middle'));
        this.priorityDataList.push(new SelectMenuData(Priority.LOW, '低', 'fa-exclamation-circle priority-low'));

        this.statusDataList.push(new SelectMenuData(Status.TODO, '　未着手', 'status-todo'));
        this.statusDataList.push(new SelectMenuData(Status.DOING, '作業中', 'fa-spinner status-doing'));
        this.statusDataList.push(new SelectMenuData(Status.DONE, '完了', 'fa-check-circle status-done'));

        TodoListApiCall.get()
            .then((todoList) => {
                this._todoList = todoList;
                this.todoList = todoList.todoList;
                callback();
            })
            .catch((error) => {
                this.showDialog('TODOリスト取得に失敗しました。');
                callback();
            });
    }

    // TODO入力を表示します。
    showTodoInput(targetIdx: number = -1): void {
        this.isOverlay(true);
        this.isShowTodoInput(true);
        this.targetIdx(targetIdx);

        if (targetIdx >= 0) {

            let todo: Todo = this._todoList.todoList()[targetIdx];

            this.selectedPriority(todo.priority());
            this.selectedStatus(todo.status());
            this.inputContent(todo.content());
        }
    }

    // TODO入力を閉じます。
    closeTodoInput(): void {
        this.isOverlay(false);
        this.isShowTodoInput(false);
        this.targetIdx(-1);
        this.selectedPriority(Priority.MIDDLE);
        this.selectedStatus(Status.TODO);
        this.inputContent('');
    }

    // 優先度を選択します。
    selectPriority(priority: Priority): void {
        this.selectedPriority(priority);
        this.showPriorityMenu(false);
    }

    // ステータスを選択します。
    selectStatus(status: Status): void {
        this.selectedStatus(status);
        this.showStatusMenu(false);
    }

    // TODOを追加または更新できるかチェックします。
    canAddOrUpdate(): boolean {

        if (this.targetIdx() < 0) {
            return this.canAdd();
        } else {
            return this.canUpdate();
        }
    }

    // 選択された優先度のSelectMenuDataを返します。
    findPriority(): SelectMenuData {
        return this.priorityDataList.filter(data => data.val === this.selectedPriority())[0];
    }

    // 選択されたステータスのSelectMenuDataを返します。
    findStatus(): SelectMenuData {
        return this.statusDataList.filter(data => data.val === this.selectedStatus())[0];
    }

    // TODO入力を追加できるかチェックします。
    canAdd(): boolean {
        return this._todoList.canAdd(
            this.selectedPriority(), this.selectedStatus(), this.inputContent());
    }

    // TODO入力を更新できるかチェックします。
    canUpdate(): boolean {
        return this._todoList.canUpdate(
            this.selectedPriority(), this.selectedStatus(), this.inputContent(), this.targetIdx());
    }

    // TODO入力を削除できるかチェックします。
    canDelete(): boolean {
        return this._todoList.canDelete(this.targetIdx());
    }

    // TODO入力を追加または更新します。
    addOrUpdate(): void {
        if (this.targetIdx() < 0) {
            this.add();
        } else {
            this.update();
        }
    }

    // TODO入力を追加します。
    add(): void {
        if (!this.canAdd()) {
            return;
        }
        this._todoList.add(
            this.selectedPriority(), this.selectedStatus(), this.inputContent());
        this.closeTodoInput();
    }

    // TODO入力を更新します。
    update(): void {
        if (!this.canUpdate()) {
            return;
        }
        this._todoList.update(
            this.selectedPriority(), this.selectedStatus(), this.inputContent(), this.targetIdx());
        this.closeTodoInput();
    }

    // TODO入力を削除します。
    delete(targetIdx: number): void {

        this.targetIdx(targetIdx);

        if (!this.canDelete()) {
            return;
        }
        this._todoList.delete(this.targetIdx());
        this.targetIdx(-1);
    }

    // TODOリストを保存します。
    save() {

        TodoListApiCall.save(this._todoList)
            .then(() => {
                this.showDialog('保存しました。');
            })
            .catch(() => {
                this.showDialog('保存に失敗しました。');
            });
    }

    // ダイアログを表示します。
    showDialog(message: string) {
        this.isShowDialog(true);
        this.dialogMessage(message);
        this.isOverlay(true);
    }

    // ダイアログを閉じます。
    closeDialog() {
        this.isShowDialog(false);
        this.dialogMessage('');
        this.isOverlay(false);
    }
}
