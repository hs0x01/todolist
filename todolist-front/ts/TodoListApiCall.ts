class TodoListApiCall {

    static get(callback: (todoList: TodoList) => void): void {

        
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

                callback(new TodoList(list));
            })
            .catch(error => console.log(error));
    }

    static save(todoList: TodoList, callback: () => void): void {


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
            callback();
        })
        .catch(error => console.log(error));
    }
}
