package com.example.todolistback;

public enum Status implements IReturnValue<Integer> {
	
	TODO(0),
	DOING(1),
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
