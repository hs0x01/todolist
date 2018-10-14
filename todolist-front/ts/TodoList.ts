class TodoList {

    static readonly MAX_CONTENT_LENGTH = 25;

    todoList: KnockoutObservableArray<Todo> = ko.observableArray([]);

    constructor(todoList: Array<Todo>) {
        this.sort(todoList);
        this.todoList(todoList);
    }

    canAdd(priority: Priority, status: Status, content: string): boolean {
        return (!Util.isEmpty(priority)
            && !Util.isEmpty(status)
            && !Util.isEmpty(content)
            && content.length <= TodoList.MAX_CONTENT_LENGTH);
    }

    canUpdate(priority: Priority, status: Status, content: string, idx: number): boolean {
        return (!Util.isEmpty(priority)
            && !Util.isEmpty(status)
            && !Util.isEmpty(content)
            && content.length <= TodoList.MAX_CONTENT_LENGTH
            && idx >= 0);
    }

    canDelete(idx: number): boolean {
        return idx >= 0;
    }

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

    delete(idx: number): void {

        if (!this.canDelete(idx)) {
            return;
        }

        this.todoList.splice(idx, 1);
    }

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
