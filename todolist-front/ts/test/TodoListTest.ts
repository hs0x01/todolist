describe('TodoListクラスのテスト', () => {

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
    });

});
