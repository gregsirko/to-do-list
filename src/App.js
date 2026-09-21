import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import ToDo from "./components/ToDo.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState(() => {
    const savedTasks = localStorage.getItem("toDo");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add task
  ///////////////////////////
  const addTask = () => {
    if (newTask.trim()) {
      const newEntry = {
        id: Date.now(),
        title: newTask.trim(),
        status: false,
      };

      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Delete task
  ///////////////////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark task as done or completed
  ///////////////////////////
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update task
  ///////////////////////////
  const updateTask = () => {
    const updatedTasks = toDo.map((task) =>
      task.id === updateData.id ? updateData : task,
    );

    setToDo(updatedTasks);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List App (ReactJS)</h2>
      <br />
      <br />

      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}

      {toDo && toDo.length ? "" : "No Tasks..."}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
