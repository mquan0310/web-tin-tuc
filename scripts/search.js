"use strict";

if (userActive) {
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;
  let keywords = "";

  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newContainer.innerHTML = "";

    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("Vui lòng nhập keywords!");
    } else {
      // navPageNum.classList.remove("hide");
      keywords = inputQuery.value;

      getDataNewsByKeywords(keywords, 1);
    }
  });

  ////////////
  //Hàm đồng bộ lấy dữ liệu từ từ khóa tìm kiếm
  async function getDataNewsByKeywords(keywords, page) {
    try {
      //Kết nối API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=78176192439a448fb554601ea3791c38`
      );
      const data = await res.json();

      //Check lỗi quá 100 lần request
      if (data.status === "error" && data.code === "rateLimited") {
        //Ấn nút chuyển trang nếu có lỗi
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }

      //Nếu không có bài viết thì thông báo
      if (data.totalResults == 0) {
        //Ấn nút chuyển trang nếu có lỗi
        navPageNum.style.display = "none";
        throw new Error(
          "Không có bài viết phù hợp với từ khóa, vui lòng thử từ khóa khác!"
        );
      }

      //Bắt lỗi khi chạy tập tin không thông qua server
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      //Gọi hàm để hiển thị List News
      displayNewList(data);

      //Bắt lỗi
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  //////////
  //Hàm kiểm tra điều kiện ấn và ấn nút Prev
  function checkBtnPrev() {
    //Nếu số trang là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  ////////////////
  //Hàm kiểm tra điều kiện và ấn nút Next
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  ////////
  //Bắt sự kiện ấn nút Prev
  btnPrev.addEventListener("click", function () {
    //Gọi hàm lấy dữ liệu và hiển thị danh sách News trước đó
    getDataNewsByKeywords(keywords, --pageNum.textContent);
  });

  ////////
  //Bắt sự kiện ấn nút Next
  btnNext.addEventListener("click", function () {
    //Gọi hàm lấy dữ liệu và hiển thị danh sách News tiếp theo
    getDataNewsByKeywords(keywords, ++pageNum.textContent);
  });

  //////////
  //Hàm hiển thị tin tức
  function displayNewList(data) {
    //Lấy giá trị cho totalResults
    totalResults = data.totalResults;
    //Kiểm tra các nút Prev, Next
    checkBtnPrev();
    checkBtnNext();

    let html = "";
    //Tạo code html cho các tin tức hiển thị
    //1 số ảnh có giá trị đường dẫn thay thế cho no_image_available.jpg
    data.articles.forEach(function (article) {
      html += `
      <div class="new-content">
      <div class="img-banner">
        <img src=${article.urlToImage ? article.urlToImage : "no_image_available.jpg"} 
        alt="img" />
      </div>

      <div class="content">
        <h4>${article.title}</h4>
        <p>${article.description}</p>
        <button class="button-28" role="button"><a href=${
          article.url
        } target="_blank">View more</a></button>
      </div>
      </div>
      `;
    });

    newContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng Đăng nhập/Đăng ký để xem tin tức!");
  window.location.assign("../index.html");
}
