import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "./Apifetch";
import { Table, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./Store";

const Home = () => {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  /*Replaced the useState hook(of users) that is currently using to 
store the API response, with the useSelector hook:*/

  const [isLoading, setIsLoading] = useState(true);
  const [showData, setShowData] = useState(false);
  const [idFetch, setIdFetch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editData, setEditData] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    dispatch(getUsers());
    setIsLoading(false);
    //   const fetchDatafromApi = async () => {
    //     const getApi = await apiGet();
    //     setIsLoading(false);
    //     setUsers(getApi);
    //     /*indirectly we are setting setUsers to dataGet which is from Apifetch.js */
    //   };
    //   fetchDatafromApi();
    //   // fetchData(API);
  }, []);

  const submitHandler = async (event) => {
    //on form submission prevent default
    event.preventDefault();

    //constructed Formdata object, which fires formElement event
    const formElement = new FormData(event.target);

    // formElement gets modified
    const newData = {
      id: formElement.get("id"),
      title: formElement.get("title"),
      body: formElement.get("body"),
    };

    // Making a post request using the apiPost imported function
    try {
      const newUsers = await apiPost(newData);
      setUsers([...users, newUsers]);
    } catch (error) {
      console.error(error);
    }

    // Reset the form to clear input fields
    event.target.reset();
  };

  const showHandler = () => {
    setShowData(true);
  };

  const idFetchHandler = (event) => {
    setIdFetch(event.target.value);
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      setFilteredUsers([data]);
      /*if we don't put square bracket in a data then setFilteredUsers will not 
become an array and filteredUsers will not become an array*/
      setEditData(data);
      /*setting setEditData with fetched data*/
    } catch (error) {
      console.error(error);
    }
  };

  const filterHandler = (event) => {
    event.preventDefault();
    fetchUserById(idFetch);
    /*value of input tag which we write will come in idFetch variable and we can 
  check it by putting it in console*/
    // console.log(idFetch);
  };

  const editHandler = async () => {
    try {
      const result = await apiPatch(
        `https://jsonplaceholder.typicode.com/posts/${editData.id}`,
        editData
      );
      setFilteredUsers([result]);
      // Clear the editData state to hide the edit form
      setEditData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    editHandler();
    setEditData(filteredUsers[0]);
  };

  const deleteHandler = async (id) => {
    try {
      const result = await apiDelete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        filteredUsers
      );
      setFilteredUsers(result.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      {!showData && (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="number"
                name="id"
                placeholder="Enter ID"
                style={{ width: 200 + "px", marginLeft: 580 + "px", textAlign:"center"}}
              />
              <Form.Text className="text-muted">
                We'll never share your ID with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                style={{ width: 200 + "px", marginLeft: 580 + "px", textAlign:"center"}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body:</Form.Label>
              <Form.Control
                type="text"
                name="body"
                placeholder="Enter Body"
                style={{ width: 200 + "px", marginLeft: 580 + "px", textAlign:"center"}}
              />
            </Form.Group>
            <Button type="submit">Add New Record</Button>
          </Form>
          <br />
          <Button onClick={showHandler}>Show Data</Button>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>BODY</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.title}</td>
                    <td>{user.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
      {showData && (
        <>
          <form>
            <label>
              <i>Enter ID Number:</i>&nbsp;&nbsp;&nbsp;
              <input type="number" name="id" onChange={idFetchHandler} />
            </label>
            <button type="submit" onClick={filterHandler}>
              Show Data
            </button>
          </form>
          <table border={1}>
            <thead>
              <tr>
                <td>ID</td>
                <td>TITLE</td>
                <td>BODY</td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editData && editData.id === user.id ? (
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(event) => {
                            setEditData({
                              ...editData,
                              title: event.target.value,
                            });
                          }}
                        />
                      ) : (
                        user.title
                      )}
                    </td>
                    <td>
                      {editData && editData.id === user.id ? (
                        <input
                          type="text"
                          value={editData.body}
                          onChange={(event) => {
                            setEditData({
                              ...editData,
                              body: event.target.value,
                            });
                          }}
                        />
                      ) : (
                        user.body
                      )}
                    </td>
                    <td>
                      <button onClick={handleEdit}>Edit Data</button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button onClick={() => deleteHandler(user.id)}>
                        Delete Data
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
export default Home;
