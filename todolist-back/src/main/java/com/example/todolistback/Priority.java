package com.example.todolistback;

public enum Priority implements IReturnValue<Integer> {
	HIGH(3),
	MIDDLE(2),
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
