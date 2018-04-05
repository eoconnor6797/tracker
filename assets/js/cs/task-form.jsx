import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import _ from 'underscore';
import $ from 'jquery';
import api from '../api';

function TaskForm(props) {
    function update(ev) {
        let tgt = $(ev.target);
        let data = {};
        //borrowed from piazza
        if (tgt.attr('name') == "completed") {
            data["completed"] = $(tgt).is(':checked') ? 'true' : 'false';
        } else {
            data[tgt.attr('name')] = tgt.val();
        }
        let action = {
            type: 'UPDATE_FORM',
            data: data,
        };
        props.dispatch(action);
    }

    function submit(ev) {
        let task = props.task;
        if (task) {
            let data = {};
            let token = "";
            if (props.form.user_id != "") {
                data.user_id = props.form.user_id
            }
            if (props.form.title != "") {
                data.title = props.form.title
            }
            if (props.form.body != "") {
                data.body = props.form.body
            }
            if (props.form.time != "") {
                data.time = props.form.time
            }
            if (props.form.completed != "") {
                data.completed = props.form.completed
            }
            if (props.form.token != "") {
                token = props.form.token
            }
            task = task[0]
            api.update_task(data, task.id, token);
        } else {
            api.submit_task(props.form);
        }
    }

    let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
    let task = props.task;
    if (props.form.token == "") {
        return <p>Please log in to Create Tasks</p> 
    } else {
        if (task) {
            task = task[0]
            if (props.token.user_id != task.user.id) {
                return <p>You are not authorized to edit this task</p>
            } else {
                return <div style={ {padding: "4ex"} }>
                    <h2>Edit Task</h2>
                    <FormGroup>
                    <Label for="user_id">User</Label>
                    <Input type="select" name="user_id" defaultValue={task.user.id} onChange={update}>
                    { users }
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" value={task.title} readOnly onChange={update} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="textarea" name="body" defaultValue={task.body} readOnly onChange={update} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="time">Time Spent</Label>
                    <Input type="number" name="time" step="15" defaultValue={task.time} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                    <Input type="checkbox" name="completed" className="form-check-input" defaultValue={task.completed} onChange={update} />
                    <Label className="form-check-label" for="completed">Completed?</Label>
                    </FormGroup>
                    <Button onClick={submit} color="primary">Submit</Button>
                    </div>;
            }
        } else {
            return <div style={ {padding: "4ex"} }>
                <h2>New Task</h2>
                <FormGroup>
                <Label for="user_id">User</Label>
                <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
                { users }
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" value={props.form.title} onChange={update} />
                </FormGroup>
                <FormGroup>
                <Label for="body">Body</Label>
                <Input type="textarea" name="body" value={props.form.body} onChange={update} />
                </FormGroup>
                <FormGroup>
                <Label for="time">Time Spent</Label>
                <Input type="number" name="time" step="15" value={props.form.time} onChange={update} />
                </FormGroup>
                <FormGroup>
                <Input type="checkbox" name="completed" className="form-check-input" value={props.form.completed} onChange={update} />
                <Label className="form-check-label" for="completed">Completed?</Label>
                </FormGroup>
                <Button onClick={submit} color="primary">Submit</Button>
                </div>;
        }
    }

}
function state2props(state) {
    return { form: state.form };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
