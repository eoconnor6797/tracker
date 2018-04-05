import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import $ from 'jquery'
import _ from 'underscore'
import Nav from './nav';
import Feed from './feed';
import TaskForm from './task-form';

export default function tracker_init(store) {
    let root = document.getElementById('root');
    ReactDOM.render(<Provider store={store}>
        <Tracker state={store.getState()}/>
        </Provider>, root);
}

let Tracker = connect((state) => state)((props) => {
    if (props.form.token != "") {
    return (
        <Router>
        <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
            <div>
            <TaskForm users={props.users} />
            <Feed tasks={props.tasks} />
            </div>
        } />
        <Route path="/completed" exact={true} render={() =>
            <Feed tasks={_.filter(props.tasks, (pp) =>
                pp.completed)
            } />
        } />
        <Route path="/mine" exact={true} render={() =>
            <Feed tasks={_.filter(props.tasks, (pp) =>
                pp.user.id == props.token.user_id)
            } />
        } />
        <Route path="/tasks/:task_id" render={({match}) => <TaskForm token={props.token} users={props.users} task={_.filter(props.tasks, (pp) => match.params.task_id == pp.id)
            }/>
        } />
        </div>
        </Router>
    );
    } else {
    return (
        <Router>
        <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
            <div>
            <TaskForm users={props.users} />
            <Feed tasks={props.tasks} />
            </div>
        } />
        <Route path="/completed" exact={true} render={() =>
            <Feed tasks={_.filter(props.tasks, (pp) =>
                pp.completed)
            } />
        } />
        <Route path="/tasks/:task_id" render={({match}) => <TaskForm users={props.users} task={_.filter(props.tasks, (pp) => match.params.task_id == pp.id)
            }/>
        } />
        </div>
        </Router>
    );
    }
});
