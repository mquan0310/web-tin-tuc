"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

///////
//Hàm hiển thị nội dung trang Home
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    //Thêm thông báo chào mừng
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

////////////
//Bắt sự kiện ấn nút logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn chắc chắn muốn đăng xuất chứ?");
  if (isLogout) {
    //Để giá trị userActive về null
    userActive = null;

    //Cập nhật dữ liệu
    saveToStorage("userActive", userActive);

    //Hiển thị trang Home
    displayHome();
  }
});
