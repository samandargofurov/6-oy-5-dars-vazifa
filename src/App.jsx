import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nat, setNat] = useState("uzbek");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    let u = getUsers();
    setUsers(u)
  }, [])

  function validate(name, age, nat, desc) {
    if (name.trim().length < 3) {
      alert("name is empty");
      return false;
    }

    if (age < 0 && age > 150) {
      alert("age is empty");
      return false;
    }

    if (!Number(age)) {
      alert("age is empty");
      return false;
    }

    if (desc.trim().length < 3) {
      alert("description is empty");
      return false;
    }

    return true;
  }

  function handleClick(e) {
    e.preventDefault();

    const isValid = validate(name, age, nat, desc);

    if (isValid) {
      const user = {
        name: name,
        age: age,
        nat: nat,
        desc: desc,
      };

      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setUsers(copied);

      setName("");
      setAge(0);
      setNat("");
      setDesc("");
    }
  }

  function getUsers() {
    let users = [];
  
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    }

    return users;
  }

  function handleDelete(item) {
    let isDelete = confirm("Rostdan ham ochirmoqchimisiz");
    if (isDelete) {
      let copied = JSON.parse(JSON.stringify(users));
      copied = copied.filter((user) => {
        return user.id != item.id
      });
      localStorage.setItem('users', JSON.stringify(copied));
      setUsers(copied)
    }
  }

  return (
    <>
      <div className="todo-wrapper container d-flex flex-column gap-4 mt-3">
        <header className="d-flex justify-content-center">
          <h1>Ma'lumotlarni kiritish</h1>
        </header>
        <main className="shadow p-3 mb-5 bg-body-tertiary rounded p-2 d-flex flex-column align-items-start gap-5">
          <form className="d-flex mx-auto flex-column gap-3 w-50">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />

            <span>Nationality*</span>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked
                value={nat}
                onChange={(e) => {
                  setNat(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                uzbek
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                english
              </label>
            </div>

            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>

            <button onClick={handleClick} className="btn btn-primary">
              Submit
            </button>
          </form>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>N_</th>
                <th>Name</th>
                <th>Age</th>
                <th>Language</th>
                <th>Description</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users && users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.nat}</td>
                      <td>{user.desc}</td>
                      <td>
                        <FaRegTrashAlt
                          onClick={() => {
                            handleDelete(user);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

export default App;
