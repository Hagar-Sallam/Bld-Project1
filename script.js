const coursesDiv = document.getElementById("all-courses");
let searchTitle = "";
console.log("🚀 ~ file: script.js ~ line 2 ~ coursesDiv", coursesDiv)

function makeCard(course) {
  var card = document.createElement("div");
  card.classList.add("card");

  var courseImg = document.createElement("img");
  courseImg.src = course.image; // json
  courseImg.classList.add("course-card-img");
  // if (course.id == 3)
  //   courseImg.id = "python-green-img";

  card.appendChild(courseImg);

  var courseTitle = document.createElement("a");
  courseTitle.innerHTML = course.title; //json
  courseTitle.classList.add("course-links", "headers");
  card.appendChild(courseTitle);

  var courseAuthor = document.createElement("h6");
  courseAuthor.innerHTML = course.author; //json
  courseAuthor.classList.add("p-font");
  courseAuthor.style.color = "gray";
  card.appendChild(courseAuthor);

  var rateDiv = document.createElement("div");
  rateDiv.classList.add("rate");

  var rateVal = document.createElement("p");
  rateVal.innerHTML = course.rate; //json
  rateVal.style.color = "orange";

  var star1 = document.createElement("span");
  star1.classList.add("fa", "fa-star", "checked", "star");

  var star2 = document.createElement("span");
  star2.classList.add("fa", "fa-star", "checked", "star");

  var star3 = document.createElement("span");
  star3.classList.add("fa", "fa-star", "checked", "star");

  var star4 = document.createElement("span");
  star4.classList.add("fa", "fa-star", "checked", "star");

  var halfStar = document.createElement("i");
  halfStar.classList.add("fa", "fa-star-half-full", "star");

  var reviewers = document.createElement("h5");
  reviewers.classList.add("p-font");
  reviewers.style.color = "gray";
  reviewers.innerHTML = course.reviewers;

  rateDiv.append(rateVal, star1, star2, star3, star4, halfStar, reviewers);
  card.appendChild(rateDiv);

  var price = document.createElement("p");
  price.innerHTML = course.price;
  card.appendChild(price);

  coursesDiv.appendChild(card);
  console.log(card);

}
function search() {
  var x = document.getElementById("input-field");
  x.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      console.log(x.value);
      event.preventDefault();
      search2(x.value);
    }
  });

}
function search2(searchTitle) {
  searchTitle = searchTitle.toLowerCase();
  // console.log(searchTitle);
  while (coursesDiv.hasChildNodes()) {
    coursesDiv.removeChild(coursesDiv.firstChild);
  }
  for (var course of jsonData) {
    var titleLower = course.title.toLowerCase();
    if (titleLower.indexOf(searchTitle) != -1 || searchTitle.length == 0)
      makeCard(course);
  }
  if(!coursesDiv.hasChildNodes())
  {
    var btn=document.getElementById("back");
    btn.style.display="none";
    var btn=document.getElementById("frwd");
    btn.style.display="none";
  }
  else{
    var btn=document.getElementById("back");
    btn.style.display="block";
    var btn=document.getElementById("frwd");
    btn.style.display="block";
  }
  searchTitle = "";

}
function moveLeft() {
  if (coursesDiv.hasChildNodes()) {
    const tempFirstChild = coursesDiv.children[0];
    coursesDiv.removeChild(tempFirstChild);
    coursesDiv.appendChild(tempFirstChild);
  }
}
function moveRight() {
  if (coursesDiv.hasChildNodes()) {
    const tempLastChild = coursesDiv.children[coursesDiv.children.length-1];
    coursesDiv.removeChild(tempLastChild);
    coursesDiv.insertBefore(tempLastChild, coursesDiv.children[0]);
  }

}
let jsonData;
fetch('http://localhost:3000/courses')
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    for (var course of data) {
      makeCard(course);
    }
  });


