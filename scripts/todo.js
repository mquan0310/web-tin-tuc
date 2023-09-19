"use strict";

//Nếu đã đăng nhập
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();

  ///////////
  //Hàm hiển thị thông tin việc cần làm
  function displayTodoList() {
    let html = "";

    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `
      <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
      `;
      });

    todoList.innerHTML = html;

    //Bắt các sự kiện
    evenToggleTasks();
    evenDeleteTasks();
  }

  //////////////////////////
  //Bắt sự kiện ấn nút thêm các tasks
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
      alert("Hãy nhập việc cần làm!");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);
      //Thêm task mới vào mảng
      todoArr.push(todo);
      //Lưu dữ liệu
      saveToStorage("todoArr", todoArr);
      //Hiển thị công việc
      displayTodoList();
      //reset form nhập
      inputTask.value = "";
    }
  });

  ///////////////
  //Hàm bắt sự kiện Toggle Tasks
  function evenToggleTasks() {
    //Lấy tất cả các phần tử li chứ thông tin các task
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  /////////////////
  //Hàm xóa các task
  function evenDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        const isDelete = confirm("Bạn chắc chắn muốn xóa chứ?");
        if (isDelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );

          todoArr.splice(index, 1);
          saveToStorage("todoArr", todoArr);
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng Đăng nhập/Đăng ký để xem tin tức!");
  window.location.assign("../index.html");
}
