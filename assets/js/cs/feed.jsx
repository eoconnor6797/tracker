import React from 'react';
import Task from './task';
import _ from 'underscore';
export default function Feed(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} />);
  return <div>
    { tasks }
  </div>;
}

