// TODOデータのリストを表すクラスです。
class TodoList {

    // TODOの最大入力文字数
    static readonly MAX_CONTENT_LENGTH = 25;

    // TODOリスト
    todoList: KnockoutObservableArray<Todo> = ko.observableArray([]);

    constructor(todoList: Array<Todo>) {
        this.sort(todoList);
        this.todoList(todoList);
    }

    // TODOデータを追加できるかチェックします。
    canAdd(priority: Priority, status: Status, content: string): boolean {
        return (!Util.isEmpty(priority)
            && !Util.isEmpty(status)
            && !Util.isEmpty(content)
            && content.length <= TodoList.MAX_CONTENT_LENGTH);
    }

    // TODOデータを更新できるかチェックします。
    canUpdate(priority: Priority, status: Status, content: string, idx: number): boolean {
        return (!Util.isEmpty(priority)
            && !Util.isEmpty(status)
            && !Util.isEmpty(content)
            && content.length <= TodoList.MAX_CONTENT_LENGTH
            && idx >= 0);
    }

    // TODOデータを削除できるかチェックします。
    canDelete(idx: number): boolean {
        return idx >= 0;
    }

    // TODOデータを追加します。
    add(priority: Priority, status: Status, content: string): void {

        if (!this.canAdd(priority, status, content)) {
            return;
        }
        
        let todoList = this.todoList();

        let todo: Todo = new Todo();
        todo.priority(priority);
        todo.status(status);
        todo.content(content);

        todoList.push(todo);

        this.sort(todoList);

        this.todoList(todoList);
    }

    // TODOデータを更新します。
    update(priority: Priority, status: Status, content: string, idx: number): void {

        if (!this.canUpdate(priority, status, content, idx)) {
            return;
        }

        let todoList = this.todoList();

        let todo: Todo = new Todo();
        todo.priority(priority);
        todo.status(status);
        todo.content(content);

        todoList[idx] = todo;

        this.sort(todoList);

        this.todoList(todoList);
    }

    // TODOデータを削除します。
    delete(idx: number): void {

        if (!this.canDelete(idx)) {
            return;
        }

        this.todoList.splice(idx, 1);
    }

    // TODOリストを優先度、ステータスの昇順に並び替えます。
    sort(todoList: Array<Todo>): void {

        todoList.sort((a, b) => {
            let compare = b.priority() - a.priority();
            if (compare === 0) {
                compare = a.status() - b.status();
            }
            return compare;
        });
    }
}
