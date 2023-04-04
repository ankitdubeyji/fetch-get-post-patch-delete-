import React from "react";

export const apiGet = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const dataGet = response.json();
    return dataGet;
  } catch (error) {
    console.error(error);
  }
};

export const apiPost = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataPost = await response.json();
    return dataPost;
  } catch (error) {
    console.error(error);
  }
};

export const apiPatch = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const patchedData = await response.json();
    return patchedData;
  } catch (error) {
    console.error(error);
  }
};

export const apiDelete = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if(response.ok){
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
