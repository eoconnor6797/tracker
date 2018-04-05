import store from './store';
import $ from 'jquery';

class TheServer {
    request_tasks() {
        $.ajax("/api/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASK_LIST',
                    tasks: resp.data,
                });
            },
        });
    }

    request_users() {
        $.ajax("/api/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'USERS_LIST',
                    users: resp.data,
                });
            },
        });
    }

    submit_task(data) {
        $.ajax("/api/tasks", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ token: data.token, task: data }),
            success: (resp) => {
                store.dispatch({
                    type: 'ADD_TASK',
                    task: resp.data,
                });
            },
        });
    }
    update_task(data, task_id, token) {
        $.ajax("/api/tasks/" + task_id, {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ token: token, task: data }),
            success: (resp) => {
        this.request_tasks()},
        });
    }
    submit_login(data) {
        $.ajax("/api/token", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: resp,
                });
            },
        });
    }
    signup(data) {
        $.ajax("/api/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                this.request_users();
                this.submit_login(data);
            },
        });
    }
}

export default new TheServer();
