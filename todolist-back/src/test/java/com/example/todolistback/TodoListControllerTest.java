package com.example.todolistback;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class TodoListControllerTest {

    @Mock
    private HttpServletResponse response;

    @Test
    public void handleException_引数がIllegalArgumentException以外() {

        Map<String, String> result = TodoListController.handleException(new Exception(), response);

        assertThat(result.get("error"), is("system error."));

        verify(response, times(1)).setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

    @Test
    public void handleException_引数がIllegalArgumentException() {

        IllegalArgumentException iae = new IllegalArgumentException("Test");

        Map<String, String> result = TodoListController.handleException(iae, response);

        assertThat(result.get("error"), is("Test"));

        verify(response, times(1)).setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        verify(response, times(1)).setStatus(HttpServletResponse.SC_BAD_REQUEST);
    }
}
