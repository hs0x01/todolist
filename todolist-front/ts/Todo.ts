// TODOのデータクラスです。
class Todo {

    // 優先度
    priority: KnockoutObservable<Priority> = ko.observable(Priority.MIDDLE);

    // ステータス
    status: KnockoutObservable<Status> = ko.observable(Status.TODO);

    // 入力されたTODO
    content: KnockoutObservable<string> = ko.observable('');
}
