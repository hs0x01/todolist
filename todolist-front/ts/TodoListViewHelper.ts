class TodoListViewHelper {

    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            let viewModel = new TodoListViewModel();
            viewModel.init(() => {
                ko.applyBindings(viewModel);
            });
        });
    }
}
