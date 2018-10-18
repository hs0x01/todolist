package com.example.todolistback;

// ステータスの定数定義enumです。
public enum Status implements IReturnValue<Integer> {
	
	// 未着手
	TODO(0),
	// 作業中
	DOING(1),
	// 完了
	DONE(2);
	
	private int value;
	
	private Status(int value) {
		this.value = value;
	}

	@Override
	public Integer getValue() {
		return this.value;
	}
}
