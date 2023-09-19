"use strict";
if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      saveToStorage("userActive", userActive);

      //Cập nhật lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;
      saveToStorage("userArr", userArr);

      //reser form nhập
      alert("Cài đặt thành công!");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  ///////////////////////
  //Hàm validate dữ liệu
  function validate() {
    let isValidate = true;

    //Kiểm tra inputPageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Số tin tức mỗi trang không hợp lệ!");
      isValidate = false;
    }

    //Kiểm tra inputCategory
    if (inputCategory.value === "") {
      alert("Vui lòng nhập News Category!");
      isValidate = false;
    }

    return isValidate;
  }
} else {
  alert("Vui lòng Đăng nhập/Đăng ký để thực hiện chức năng!");
  window.location.assign("../index.html");
}
