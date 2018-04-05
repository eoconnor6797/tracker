import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
export default function task(params) {
  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p>Assigned to: <b>{ task.user.name }</b></p>
        <p>Title: { task.title }</p>
        <p>Body: { task.body }</p>
        <p> Time Spent: <b>{ task.time }</b></p>
        <p> Completed: <b>{ String(task.completed) }</b></p>
        <Link to={"/tasks/" + params.task.id }>EDIT</Link>
      </div>
    </CardBody>
  </Card>;
}
