package com.example.todolistback;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TodoListController {
	
	@Autowired
	private TodoListService todoListService;
	
	@GetMapping
	public String index() {
		return "todolist";
	}
	
	@RequestMapping(path = "/todolist",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
			produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public Object save(@RequestBody List<Todo> todoList, HttpServletResponse response) {
		Map<String, Object> responseJson = new HashMap<>();
		try {
			todoListService.save(todoList);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		return responseJson;
	}
	
	@RequestMapping(path = "/todolist",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public Object findAll(HttpServletResponse response) {
		try {
			return todoListService.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return new HashMap<>();
		}
	}
}
