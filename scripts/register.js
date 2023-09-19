"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordconfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

/////////////
//Bắt sự kiện ấn nút Đăng ký
btnSubmit.addEventListener("click", function () {
  //Lấy dữ liệu nhập vào
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  //Check validate
  const isValidate = validate(user);

  if (isValidate) {
    //Thêm vào mảng userArr
    userArr.push(user);

    //Lưu dữ liệu lại
    saveToStorage("userArr", userArr);

    //Thông báo
    alert("Đăng ký thành công!");

    //Điều hướng lại trang login
    window.location.assign("../pages/login.html");
  }
});

/////////////////
//Hàm validate thông tin đăng ký của người dùng nhập vào form
function validate(user) {
  let isValidate = true;

  //Thông báo nếu có trường bị bỏ trống
  if (user.firstname.trim().length === 0) {
    alert("Vui lòng nhập First Name!");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Vui lòng nhập Last Name!");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Vui lòng nhập User Name!");
    isValidate = false;
  }

  if (user.password === "") {
    alert("Vui lòng nhập mật khẩu!");
    isValidate = false;
  }

  if (inputPasswordconfirm.value === 0) {
    alert("Vui lòng xác thực mật khẩu!");
    isValidate = false;
  }

  //User name mới nhập vào không được trùng với username có đã có sẵn
  if (!userArr.every((item) => (item.username !== user.username ? true : false))) {
    alert("User Name đã tồn tại!");
    isValidate = false;
  }

  //Mật khẩu và mật khẩu xác thực không giống nhau
  if (user.password !== inputPasswordconfirm.value) {
    alert("Mật khẩu xác thực không đúng!");
    isValidate = false;
  }

  //Mật khẩu phải có nhiều hơn 8 ký tự
  if (user.password.length <= 8) {
    alert("Mật khẩu phải có nhiều hơn 8 ký tự!");
    isValidate = false;
  }

  return isValidate;
}
