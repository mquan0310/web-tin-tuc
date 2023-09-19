"use strict";

//Lớp User đại diện cho thông tin người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;

    //Thuộc tính yêu cầu 9
    this.pageSize = pageSize;
    this.category = category;
  }
}

//Lớp Task chứa thông tin về Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
