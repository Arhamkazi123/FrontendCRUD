import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setrender] = useState(false);
  const [fd, setFd] = useState({
    username: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:8000/api/crud/allusers");
      setUsers(res.data.message);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/crud/createuser",
        fd
      );
      setrender(true);
      alert(res.data.message);
      setFd({
        username: " ",
        email: " ",
        age: " ",
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handledelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/crud/user/${id}`);

    // this is imp for fetchind data again except deleted user
    const newusers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newusers);
  };

  return (
    <>
      <h1 className="header">CRUD APPLICATION</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={fd.username}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={fd.email}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Age:
            <input
              type="number"
              name="age"
              autoComplete="off"
              value={fd.age}
              onChange={(e) =>
                setFd({ ...fd, [e.target.name]: e.target.value })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <br />

      {/* table starts here  */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handledelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Home;
