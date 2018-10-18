class Util {

    // valが空かどうかチェックします。
    static isEmpty(val: any): boolean {
        return (val === null || typeof val === 'undefined' || val === '');
    }
}
