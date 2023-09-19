"use strict";

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Lấy dữ liệu userArr từ LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

//Chuyển đổi về dang class Instance
const userArr = users.map((user) => parseUser(user));

//Lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

//Lấy dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

//Chuyển đổi về dang class Instance
const todoArr = todos.map((todo) => parseTask(todo));

///////
//Hàm chuyển từ JS object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,

    //Thuộc tính tính năng số 9
    userData.pageSize,
    userData.category
  );

  return user;
}

///////
//Hàm chuyển từ JS object sang Class Instance của task class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
