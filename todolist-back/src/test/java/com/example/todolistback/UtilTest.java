package com.example.todolistback;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

import org.junit.Test;

public class UtilTest {

    @Test
    public void getEnum_指定の値に対応した定数が取得できる() {

        Status status = Util.getEnum(Status.class, 1);

        assertThat(status, is(Status.DOING));
    }

    @Test
    public void getEnum_指定の値に対応した定数がない() {

        Status status = Util.getEnum(Status.class, 99);

        assertThat(status, is(nullValue()));
    }
}
