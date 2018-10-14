package com.example.todolistback;

public enum Priority {
	HIGH(3),
	MIDDLE(2),
	LOW(1);
	
	private int value;
	
	private Priority(int value) {
		this.value = value;
	}

	public int getValue() {
		return value;
	}
	
	public static Priority of(Integer value) {
		
		if (value == null) {
			return null;
		}
		
		for (Priority priority : values()) {
			if (priority.value == value.intValue()) {
				return priority;
			}
		}
		
		return null;
	}
}
