package com.example.todolistback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// todolistテーブルにアクセスするクラスです。
@Repository
public interface TodoListRepository extends JpaRepository<Todo, Integer> {
}
