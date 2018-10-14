package com.example.todolistback;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoListService {
	
	@Autowired
	private TodoListRepository todoListRepository;
	
	public void validateSave(List<Todo> todoList) {
		
		if (todoList == null) {
			todoList = new ArrayList<>();
		}
		
		for (Todo todo : todoList) {
			validateSave(todo);
		}
	}
	
	public void validateSave(Todo todo) {
		
		if (todo == null) {
			throw new IllegalArgumentException("Todo is null.");
		}
		if (todo.getId() != null && todo.getId() <= 0) {
			throw new IllegalArgumentException("Todo#id is invalid.");
		}
		if (todo.getPriority() == null
				|| Util.getEnum(Priority.class, todo.getPriority()) == null) {
			throw new IllegalArgumentException("Todo#priority is invalid.");
		}
		if (todo.getStatus() == null
				|| Util.getEnum(Status.class, todo.getStatus()) == null) {
			throw new IllegalArgumentException("Todo#status is invalid.");
		}
		if (todo.getContent() == null || todo.getContent().length() == 0
				|| todo.getContent().length() > Todo.MAX_CONTENT_LENGTH) {
			throw new IllegalArgumentException("Todo#content is invalid.");
		}
	}
	
	@Transactional
	public void save(List<Todo> todoList) {
		
		validateSave(todoList);
		
		if (todoList == null) {
			todoList = new ArrayList<>();
		}
		
		List<Todo> todoListInDb = todoListRepository.findAll();
		
		for (Todo todo : todoList) {
			
			Iterator<Todo> todoListInDbItr = todoListInDb.iterator();
			
			while (todoListInDbItr.hasNext()) {
				Todo todoInDb = todoListInDbItr.next();
				if (todo.getId() != null
						&& todo.getId().equals(todoInDb.getId())) {
					todoListInDbItr.remove();
					break;
				}
			}
		}
		
		if (!todoList.isEmpty()) {
			todoListRepository.saveAll(todoList);
		}
		if (!todoListInDb.isEmpty()) {
			todoListRepository.deleteAll(todoListInDb);
		}
	}
	
	@Transactional(readOnly = true)
	public List<Todo> findAll() {
		return todoListRepository.findAll();
	}
}
