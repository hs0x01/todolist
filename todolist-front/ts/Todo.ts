class Todo {

    priority: KnockoutObservable<Priority> = ko.observable(Priority.MIDDLE);

    status: KnockoutObservable<Status> = ko.observable(Status.TODO);

    content: KnockoutObservable<string> = ko.observable('');
}
