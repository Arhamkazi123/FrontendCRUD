import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [fd, setFd] = useState({
    username: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const getsingledata = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/crud/singleuser/${id}`
      );
      setFd(res.data);
    };
    getsingledata();
  }, [id]);

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/crud/user/${id}`,
        fd
      );
      alert("user has been updated");
      nav("/");
    } catch (error) {
      alert("user not updated due to some error");
    }
  };

  return (
    <>
      <h1 className="header">UPDATE DETAILS</h1>
      <form className="form" onSubmit={handleupdate}>
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
    </>
  );
};

export default Edit;
