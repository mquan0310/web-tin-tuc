"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  //Kiểm tra xem người dùng đã nhập username và password chưa
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value && item.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công!");

      //Lưu thông tin user
      saveToStorage("userActive", user);

      //Chuyển về trang chủ
      window.location.assign("../index.html");
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại!");
    }
  }
});

////////////
//Hàm validate dữ liệu người dùng
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Vui lòng nhập tên đăng nhập!");
    isValidate = false;
  }

  if (inputPassword.value === "") {
    alert("Vui lòng nhập mật khẩu!");
    isValidate = false;
  }

  return isValidate;
}
