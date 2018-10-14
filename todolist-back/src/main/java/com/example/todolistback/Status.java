package com.example.todolistback;

public enum Status {
	
	TODO(0),
	DOING(1),
	DONE(2);
	
	private int value;
	
	private Status(int value) {
		this.value = value;
	}

	public int getValue() {
		return value;
	}
	
	public static Status of(Integer value) {
		
		if (value == null) {
			return null;
		}
		
		for (Status status : values()) {
			if (status.value == value.intValue()) {
				return status;
			}
		}
		
		return null;
	}
}
