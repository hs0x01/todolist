describe('TodoListクラスのテスト', () => {

    var setUpTodoList = (): TodoList => {
        let list: Array<Todo> = [];

        for (let i = 0; i < 2; i++) {
            let todo: Todo = new Todo();
            todo.priority(Priority.HIGH);
            todo.status(Status.DOING);
            todo.content('TODO入力テスト' + i);
            list.push(todo);
        }
        
        return new TodoList(list);
    }

    describe('canAddメソッドのテスト', () => {

        it('優先度が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canAdd(null, Status.DOING, 'てすとTODO');
            expect(result).toBe(false);
        });

        it('ステータスが不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canAdd(Priority.HIGH, null, 'てすとTODO');
            expect(result).toBe(false);
        });

        it('TODO入力が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canAdd(Priority.HIGH, Status.DOING, null);
            expect(result).toBe(false);

            result = todoList.canAdd(Priority.HIGH, Status.DOING, '');
            expect(result).toBe(false);

            result = todoList.canAdd(Priority.HIGH, Status.DOING, 'あああああああああああああああああああああああああa');
            expect(result).toBe(false);
        });

        it('入力が正しいとき、trueが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canAdd(Priority.HIGH, Status.DOING, 'あああああああああああああああああああああああああ');
            expect(result).toBe(true);
        });
    });

    describe('canUpdateメソッドのテスト', () => {

        it('優先度が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canUpdate(null, Status.DOING, 'てすとTODO', 0);
            expect(result).toBe(false);
        });

        it('ステータスが不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canUpdate(Priority.HIGH, null, 'てすとTODO', 0);
            expect(result).toBe(false);
        });

        it('TODO入力が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canUpdate(Priority.HIGH, Status.DOING, null, 0);
            expect(result).toBe(false);

            result = todoList.canAdd(Priority.HIGH, Status.DOING, '');
            expect(result).toBe(false);

            result = todoList.canAdd(Priority.HIGH, Status.DOING, 'あああああああああああああああああああああああああa');
            expect(result).toBe(false);
        });

        it('更新対象の添え字が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canUpdate(Priority.HIGH, Status.DOING, 'てすとTODO', -1);
            expect(result).toBe(false);
        });

        it('入力が正しいとき、trueが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canUpdate(Priority.HIGH, Status.DOING, 'あああああああああああああああああああああああああ', 0);
            expect(result).toBe(true);
        });
    });

    describe('canDeleteメソッドのテスト', () => {

        it('更新対象の添え字が不正値のとき、falseが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canDelete(-1);
            expect(result).toBe(false);
        });

        it('入力が正しいとき、trueが返る', () => {

            let todoList: TodoList = new TodoList([]);

            let result = todoList.canDelete(0);
            expect(result).toBe(true);
        });

    });

    describe('addメソッドのテスト', () => {

        it('入力が正しいとき、追加されること', () => {

            let todoList: TodoList = new TodoList([]);

            todoList.add(Priority.HIGH, Status.DOING, 'TODO入力テスト');

            expect(todoList.todoList().length).toBe(1);
            expect(todoList.todoList()[0].priority()).toBe(Priority.HIGH);
            expect(todoList.todoList()[0].status()).toBe(Status.DOING);
            expect(todoList.todoList()[0].content()).toBe('TODO入力テスト');
        });

        it('入力が不正なとき、追加されないこと', () => {

            let todoList: TodoList = new TodoList([]);

            todoList.add(Priority.HIGH, Status.DOING, '');

            expect(todoList.todoList().length).toBe(0);
        });
    });

    describe('updateメソッドのテスト', () => {

        it('入力が正しいとき、更新されること', () => {

            let todoList: TodoList = setUpTodoList();
            
            todoList.update(Priority.HIGH, Status.DOING, 'TODO入力テスト-update', 1);

            expect(todoList.todoList().length).toBe(2);
            expect(todoList.todoList()[0].content()).toBe('TODO入力テスト0');
            expect(todoList.todoList()[1].priority()).toBe(Priority.HIGH);
            expect(todoList.todoList()[1].status()).toBe(Status.DOING);
            expect(todoList.todoList()[1].content()).toBe('TODO入力テスト-update');
        });

        it('入力が不正なとき、更新されないこと', () => {

            let todoList: TodoList = setUpTodoList();
            
            todoList.update(null, Status.DOING, 'TODO入力テスト-update', 1);

            expect(todoList.todoList().length).toBe(2);
            expect(todoList.todoList()[0].content()).toBe('TODO入力テスト0');
            expect(todoList.todoList()[1].priority()).toBe(Priority.HIGH);
            expect(todoList.todoList()[1].status()).toBe(Status.DOING);
            expect(todoList.todoList()[1].content()).toBe('TODO入力テスト1');
        });
    });

    describe('deleteメソッドのテスト', () => {

        it('入力が正しいとき、削除されること', () => {

            let todoList: TodoList = setUpTodoList();
            
            todoList.delete(1);

            expect(todoList.todoList().length).toBe(1);
            expect(todoList.todoList()[0].content()).toBe('TODO入力テスト0');
        });

        it('入力が不正なとき、削除されないこと', () => {

            let todoList: TodoList = setUpTodoList();
            
            todoList.delete(-1);

            expect(todoList.todoList().length).toBe(2);
        });
    });

    describe('sortメソッドのテスト', () => {

        it('優先度順に並ぶこと', () => {

            let todoList: Array<Todo> = [];
            [Priority.MIDDLE, Priority.HIGH, Priority.LOW].forEach(p => {
                let todo: Todo = new Todo();
                todo.priority(p);
                todoList.push(todo);
            });

            new TodoList([]).sort(todoList);

            expect(todoList[0].priority()).toBe(Priority.HIGH);
            expect(todoList[1].priority()).toBe(Priority.MIDDLE);
            expect(todoList[2].priority()).toBe(Priority.LOW);
        });

        it('優先度が同じとき、ステータス順に並ぶこと', () => {

            let todoList: Array<Todo> = [];
            [Status.DOING, Status.DONE, Status.TODO].forEach(s => {
                let todo: Todo = new Todo();
                todo.priority(Priority.HIGH);
                todo.status(s);
                todoList.push(todo);
            });

            new TodoList([]).sort(todoList);

            expect(todoList[0].status()).toBe(Status.TODO);
            expect(todoList[1].status()).toBe(Status.DOING);
            expect(todoList[2].status()).toBe(Status.DONE);
        });
    });

});
