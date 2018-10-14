class TodoListViewModel {

    priorityDataList: Array<SelectMenuData> = [];

    statusDataList: Array<SelectMenuData> = [];

    todoList: KnockoutObservableArray<Todo>;

    selectedPriority: KnockoutObservable<Priority> = ko.observable(Priority.MIDDLE);

    selectedStatus: KnockoutObservable<Status> = ko.observable(Status.TODO);

    inputContent: KnockoutObservable<string> = ko.observable('');

    targetIdx: KnockoutObservable<number> = ko.observable(-1);

    isOverlay: KnockoutObservable<boolean> = ko.observable(false);

    isShowTodoInput: KnockoutObservable<boolean> = ko.observable(false);

    isShowPriorityMenu: KnockoutObservable<boolean> = ko.observable(false);

    isShowStatusMenu: KnockoutObservable<boolean> = ko.observable(false);

    private _todoList: TodoList;

    init(callback: () => void): void {

        this.priorityDataList.push(new SelectMenuData(Priority.HIGH, '高', 'fa-exclamation-circle priority-high'));
        this.priorityDataList.push(new SelectMenuData(Priority.MIDDLE, '中', 'fa-exclamation-circle priority-middle'));
        this.priorityDataList.push(new SelectMenuData(Priority.LOW, '低', 'fa-exclamation-circle priority-low'));

        this.statusDataList.push(new SelectMenuData(Status.TODO, '　未着手', 'status-todo'));
        this.statusDataList.push(new SelectMenuData(Status.DOING, '作業中', 'fa-spinner status-doing'));
        this.statusDataList.push(new SelectMenuData(Status.DONE, '完了', 'fa-check-circle status-done'));

        TodoListApiCall.get((todoList) => {
            this._todoList = todoList;
            this.todoList = todoList.todoList;

            callback();
        });
    }

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

    closeTodoInput(): void {
        this.isOverlay(false);
        this.isShowTodoInput(false);
        this.targetIdx(-1);
        this.selectedPriority(Priority.MIDDLE);
        this.selectedStatus(Status.TODO);
        this.inputContent('');
    }

    showPriorityMenu(): void {
        this.isShowPriorityMenu(true);
    }

    closePriorityMenu(): void {
        this.isShowPriorityMenu(false);
    }

    showStatusMenu(): void {
        this.isShowStatusMenu(true);
    }

    closeStatusMenu(): void {
        this.isShowStatusMenu(false);
    }

    selectPriority(priority: Priority): void {
        this.selectedPriority(priority);
        this.closePriorityMenu();
    }

    selectStatus(status: Status): void {
        this.selectedStatus(status);
        this.closeStatusMenu();
    }

    canAddOrUpdate(): boolean {

        if (this.targetIdx() < 0) {
            return this.canAdd();
        } else {
            return this.canUpdate();
        }
    }

    findPriority(): SelectMenuData {
        return this.priorityDataList.filter(data => data.val === this.selectedPriority())[0];
    }

    findStatus(): SelectMenuData {
        return this.statusDataList.filter(data => data.val === this.selectedStatus())[0];
    }

    canAdd(): boolean {
        return this._todoList.canAdd(
            this.selectedPriority(), this.selectedStatus(), this.inputContent());
    }

    canUpdate(): boolean {
        return this._todoList.canUpdate(
            this.selectedPriority(), this.selectedStatus(), this.inputContent(), this.targetIdx());
    }

    canDelete(): boolean {
        return this._todoList.canDelete(this.targetIdx());
    }

    addOrUpdate(): void {
        if (this.targetIdx() < 0) {
            this.add();
        } else {
            this.update();
        }
    }

    add(): void {
        if (!this.canAdd()) {
            return;
        }
        this._todoList.add(
            this.selectedPriority(), this.selectedStatus(), this.inputContent());
        this.closeTodoInput();
    }

    update(): void {
        if (!this.canUpdate()) {
            return;
        }
        this._todoList.update(
            this.selectedPriority(), this.selectedStatus(), this.inputContent(), this.targetIdx());
        this.closeTodoInput();
    }

    delete(targetIdx: number): void {

        this.targetIdx(targetIdx);

        if (!this.canDelete()) {
            return;
        }
        this._todoList.delete(this.targetIdx());
        this.targetIdx(-1);
    }

    save() {

        TodoListApiCall.save(this._todoList, () => {
            console.log('OK!');
        })
    }
}
