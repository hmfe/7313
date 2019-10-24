"use strict";
// Searchbox with no REST API
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Rest API
const ul = document.getElementById("output"),
  url = "https://randomuser.me/api/?gender=female&results=10";

const createNode = element => {
  return document.createElement(element);
};
const append = (parent, el) => {
  return parent.appendChild(el);
};

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    let output = data.results;
    return output.map(runner => {
      let li = createNode("li"),
        img = createNode("img"),
        span = createNode("span");
      img.src = runner.picture.medium;
      span.innerHTML = `${runner.name.first} ${runner.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    });
  })
  .catch(error => {
    console.log(error);
  });

// Rest API posts
document.getElementById("getPosts").addEventListener("click", getPosts => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      let output = "<h2>Posts</h2>";
      data.forEach(post => {
        output += `
             <div>
             <h3>${post.title}</h3>
             <p>${post.body} </p>
             </div>
             `;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(err => console.log(err));
});
