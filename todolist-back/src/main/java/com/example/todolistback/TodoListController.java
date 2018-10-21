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

// リクエストを受け付けるクラスです。
@Controller
public class TodoListController {

    @Autowired
    private TodoListService todoListService;

    // todolist.htmlファイルを返します。
    @GetMapping
    public String index() {
        return "todolist";
    }

    // TODOリストをtodolistテーブルに保存します。
    @RequestMapping(path = "/todolist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Object save(@RequestBody List<Todo> todoList, HttpServletResponse response) {
        try {
            todoListService.save(todoList);
            return new HashMap<>();
        } catch (Exception e) {
            return handleException(e, response);
        }
    }

    // TODOリストをtodolistテーブルから取得して返します。
    @RequestMapping(path = "/todolist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Object findAll(HttpServletResponse response) {
        try {
            return todoListService.findAll();
        } catch (Exception e) {
            return handleException(e, response);
        }
    }

    // 例外を処理します。
    static Map<String, String> handleException(Exception e, HttpServletResponse response) {

        Map<String, String> error = new HashMap<>();

        error.put("error", "system error.");
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

        if (e instanceof IllegalArgumentException) {
            IllegalArgumentException iae = (IllegalArgumentException) e;
            error.put("error", iae.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        return error;
    }
}
