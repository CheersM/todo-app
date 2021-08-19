import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import editSvg from '../../assets/icon/edit.svg';

import './Tasks.scss';
import AddTasksForm from './AddTasksForm';
import Task from './Task';

function Tasks({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default Tasks;
