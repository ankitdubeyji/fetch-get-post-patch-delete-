// const fetchData = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setIsLoading(false);
  //     setUsers(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const newResponse = await fetch(
    //   "https://jsonplaceholder.typicode.com/posts",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newData),
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }
    // );
    // const newUsers = await newResponse.json();
    // setUsers([...users, newUsers]);


    //in filterHandler
    // const filterId = users.filter((user) => {
    //   return user.id.toString() === idFetch;
    // });
    // setFilteredUsers(filterId);


    // try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${editData.id}`,
    //     {
    //       method: "PATCH",
    //       body: JSON.stringify(editData),
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await response.json();

    //   // update the filteredUsers state variable with the updated data
    //   setFilteredUsers([data]);
    //   // Clear the editData state to hide the edit form
    //   setEditData(null);
    // } catch (error) {
    //   console.error(error);
    // }



    // try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${id}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   if (response.ok) {
    //     // Remove the deleted user from the filteredUsers state
    //     setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    //   }
    // } catch (error) {
    //   console.error(error);
    // }


    