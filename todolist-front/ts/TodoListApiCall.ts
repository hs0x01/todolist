class TodoListApiCall {

    // TODOリストをサーバーから取得します。
    static get(): Promise<TodoList> {

        return new Promise<TodoList>((resolve, reject) => {

            fetch('/todolist')
                .then(response => response.json())
                .then((json: Array<any>) => {

                    let list: Array<Todo> = [];

                    json.forEach(todoJson => {

                        let todo: Todo = new Todo();
                        todo.priority(todoJson.priority);
                        todo.status(todoJson.status);
                        todo.content(todoJson.content);

                        list.push(todo);
                    });

                    resolve(new TodoList(list));
                })
                .catch(error => reject(error));
        });
    }

    // TODOリストを保存するため、サーバーに送信します。
    static save(todoList: TodoList): Promise<any> {

        return new Promise((resolve, reject) => {

            let todoListJson: Array<any> = [];
            todoList.todoList().forEach(todo => {

                let todoJson = {
                    priority: todo.priority(),
                    status: todo.status(),
                    content: todo.content()
                };

                todoListJson.push(todoJson);
            });

            fetch('/todolist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(todoListJson)
            })
            .then(response => response.json())
            .then((json: any) => {
                resolve();
            })
            .catch(error => reject(error));
        });
    }
}
