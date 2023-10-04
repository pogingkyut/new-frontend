import { useEffect, useState } from "react";

function App() {
  const url = "http://127.0.0.1:8000/";
  const [lists, setLists] = useState([]);
  const [task, setTask] = useState("");

  const getlists = () => {
    fetch(url + "lists/")
      .then((res) => res.json())
      .then((data) => setLists(data))
      .catch((e) => console.log(e.Error));
  };

  useEffect(getlists, []);

  const listadd = (e) => {
    e.preventDefault();
    fetch(url + "lists/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: task,
      }),
    }).then((res) => res.json());
    setTask("");
    getlists();
  };

  const listupdate = (list, id) => {
    fetch("http://127.0.0.1:8000/lists/update/" + id + "/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: list.task,
        complete: !list.complete,
      }),
    }).then((res) => res.json());

    getlists();
    getlists();
  };

  const listdelete = (id) => {
    fetch(url + "lists/delete/" + id + "/", {
      method: "DELETE",
    });
    getlists();
    getlists();
  };

  return (
    <div className="App container mx-auto">
      <div className="card mt-2 mx-auto" style={{ width: "30rem" }}>
        <div className="card-header">
          <h1 className="mx-auto text-center">TODO APP</h1>
        </div>
        <div className="card-body">
          <form className="form-control" onSubmit={(e) => listadd(e)}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Task"
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn btn-primary form-control">Submit</button>
          </form>
        </div>
        <div className="card-footer">
          <ul className="list-group">
            {lists.map((list) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={list.id}
                >
                  <h4
                    style={{
                      textDecoration: list.complete ? "line-through" : "none",
                    }}
                  >
                    {list.task}
                  </h4>
                  <div>
                    <button
                      className="btn btn-primary me-1"
                      onClick={() => listupdate(list, list.id)}
                    >
                      update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => listdelete(list.id)}
                    >
                      x
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
