import { useEffect } from "react";
import TaskList from "../components/TaskList";
import { useState } from "react";
import CreateTaskForm from "../components/CreateTaskForm";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getData = async function () {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();

      setTaskList(data);
    };

    getData();
  }, []);

  return (
    <div>
      <TaskList data={taskList} onUpdateData={setTaskList} />
      <CreateTaskForm onUpdateData={setTaskList} />
    </div>
  );
}

export default App;
