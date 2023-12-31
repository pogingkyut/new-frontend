import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "http://127.0.0.1:8000/lists/";
  const [lists, setLists] = useState([]);
  const [task, setTask] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((res) => {
      setLists(res.data);
      setLoading(false);
    });
  }, [refresh]);

  const listAdd = (e) => {
    e.preventDefault();
    axios
      .post(url + "add/", {
        task,
      })
      .then(() => {
        setTask("");
        setLoading(true);
        setRefresh(!refresh);
      });
  };
  const listUpdate = (list, id) => {
    axios
      .put(url + "update/" + id + "/", {
        ...list,
        complete: !list.complete,
      })
      .then(() => {
        setLoading(true);
        setRefresh(!refresh);
      });
  };
  const listDelete = (id) => {
    axios.delete(url + "delete/" + id + "/").then(() => {
      setRefresh(!refresh);
      setLoading(true);
    });
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="App container mx-auto">
      <div className="card mt-2 mx-auto" style={{ width: "30rem" }}>
        <div className="card-header">
          <h1 className="mx-auto text-center">TODO APP</h1>
        </div>
        <div className="card-body">
          <form className="form-control" onSubmit={(e) => listAdd(e)}>
            <input
              type="text"
              autoFocus
              className="form-control mb-3"
              placeholder="Task"
              value={task}
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
                      width: "300px",
                    }}
                  >
                    {list.task}
                  </h4>
                  <div style={{ width: "120px" }}>
                    <button
                      className="btn btn-primary me-1"
                      onClick={() => listUpdate(list, list.id)}
                    >
                      update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => listDelete(list.id)}
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
