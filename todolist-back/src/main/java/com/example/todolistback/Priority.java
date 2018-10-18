package com.example.todolistback;

// 優先度の定数定義enumです。
public enum Priority implements IReturnValue<Integer> {
	
	// 優先度高
	HIGH(3),
	// 優先度中
	MIDDLE(2),
	// 優先度低
	LOW(1);
	
	private Integer value;
	
	private Priority(int value) {
		this.value = value;
	}

	@Override
	public Integer getValue() {
		return this.value;
	}
}