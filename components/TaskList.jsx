import { useState } from "react";
import TaskUpdateForm from "./TaskUpdateForm";

function TaskList({ data, onUpdateData }) {
  const [updateId, setUpdateId] = useState(-1);

  const handleUpdateButton = function (taskId) {
    setUpdateId(taskId);
  };

  const handleDeleteButton = async function (taskId) {
    console.log("here");
    let response = await fetch("http://localhost:3000/tasks/" + taskId, {
      method: "DELETE",
    });
    console.log("cvccvc");

    response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();

    onUpdateData(data);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.owner}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => handleUpdateButton(task.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteButton(task.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  {updateId === task.id && (
                    <TaskUpdateForm
                      setUpdateId={setUpdateId}
                      data={task}
                      onUpdateData={onUpdateData}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
