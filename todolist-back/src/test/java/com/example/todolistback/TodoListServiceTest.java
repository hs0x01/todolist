package com.example.todolistback;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class TodoListServiceTest {
	
	@InjectMocks
	private TodoListService todoListService;
	
	@Mock
	private TodoListRepository todoListRepository;
	
	@Test
	@SuppressWarnings("unchecked")
	public void save_引数のTODOリストでテーブルがリライトされること() {
		
		List<Todo> todoList = new ArrayList<>();
		List<Todo> todoInDbList = new ArrayList<>();
		
		Todo todo1 = new Todo(
				null, Priority.HIGH.getValue(), Status.TODO.getValue(), "added");
		Todo todo2 = new Todo(
				2, Priority.HIGH.getValue(), Status.TODO.getValue(), "updated");
		Todo todo3 = new Todo(
				3, Priority.HIGH.getValue(), Status.TODO.getValue(), "deleted");
		
		todoList.add(todo1);
		todoList.add(todo2);
		
		todoInDbList.add(todo2);
		todoInDbList.add(todo3);
		
		when(todoListRepository.findAll()).thenReturn(todoInDbList);
		
		todoListService.save(todoList);
		
		verify(todoListRepository, times(1)).saveAll(argThat(arg -> {
			
			assertTrue(arg instanceof List);
			
			List<Todo> argTodoList = (List<Todo>) arg;
			
			assertThat(argTodoList.size(), is(2));
			assertThat(argTodoList.get(0).getContent(), is("added"));
			assertThat(argTodoList.get(1).getContent(), is("updated"));
			
			return true;
		}));
		
		verify(todoListRepository, times(1)).deleteAll(argThat(arg -> {
			
			assertTrue(arg instanceof List);
			
			List<Todo> argTodoList = (List<Todo>) arg;
			
			assertThat(argTodoList.size(), is(1));
			assertThat(argTodoList.get(0).getContent(), is("deleted"));
			
			return true;
			
		}));
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void save_引数のnullの場合テーブルがリライトされること() {
		
		List<Todo> todoInDbList = new ArrayList<>();
		
		Todo todo1 = new Todo(
				1, Priority.HIGH.getValue(), Status.TODO.getValue(), "deleted1");
		Todo todo2 = new Todo(
				2, Priority.HIGH.getValue(), Status.TODO.getValue(), "deleted2");
		
		todoInDbList.add(todo1);
		todoInDbList.add(todo2);
		
		when(todoListRepository.findAll()).thenReturn(todoInDbList);
		
		todoListService.save(null);
		
		verify(todoListRepository, never()).saveAll(any());
		
		verify(todoListRepository, times(1)).deleteAll(argThat(arg -> {
			
			assertTrue(arg instanceof List);
			
			List<Todo> argTodoList = (List<Todo>) arg;
			
			assertThat(argTodoList.size(), is(2));
			assertThat(argTodoList.get(0).getContent(), is("deleted1"));
			assertThat(argTodoList.get(1).getContent(), is("deleted2"));
			
			return true;
			
		}));
	}

}
