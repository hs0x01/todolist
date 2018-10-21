package com.example.todolistback;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// todolistテーブルの1行分の情報を詰めるデータクラスです。
@Entity
@Table(name = "todolist")
public class Todo {

    // TODOの最大入力文字数
    public static final int MAX_CONTENT_LENGTH = 25;

    // テーブル行を特定するID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 優先度
    private Integer priority;

    // ステータス
    private Integer status;

    // 入力されたTODO
    private String content;

    public Todo() {
        super();
    }

    public Todo(Integer id, Integer priority, Integer status, String content) {
        super();
        this.id = id;
        this.priority = priority;
        this.status = status;
        this.content = content;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
