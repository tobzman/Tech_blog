const createBtn = document.querySelector(`#create-blog`);
const warningText = document.querySelector(`.warning`);
const makeBtn = document.querySelector(`#start-blog`);
const blogForm = document.querySelector(`#blog-form`);
const editBlog = document.querySelector(`.edit-blog-section`);
const deleteBtn = document.querySelector(`.delete-card`);
const title = document.querySelector(`#title`);
const content = document.querySelector(`#content`);

makeBtn.addEventListener(`click`, async function (e) {
  const response = await fetch("/api/users/idle");
  const { message } = response.json();

  if (message === "relogin") return window.location.replace("/relogin");

  blogForm.dataset.id = 0;
  title.value = "";
  content.textContent = "";
  createBtn.textContent = "Create Blog!";
  makeBtn.classList.add(`hidden`);
  createBtn.classList.remove(`hidden`);
  blogForm.classList.remove(`hidden`);
  blogForm.classList.add(`create-blog-form`);
});

createBtn.addEventListener(`click`, async function (e) {
  const blogTitle = title.value;
  const blogContent = content.value;

  if (!blogTitle || !blogContent) {
    warningText.textContent = `Please fill out all fields`;
    warningText.style.display = `inline`;
    showWarning(warningText);
    return;
  }

  const id = Number(blogForm.dataset.id);

  if (id === 0) {
    makeNewBlog(blogTitle, blogContent);
  } else {
    editCurrentBlog(blogTitle, blogContent, id);
  }
});

function showWarning(content) {
  setTimeout(function () {
    content.style.display = `none`;
    content.textContent = ``;
  }, 5000);
}

editBlog.addEventListener(`click`, function (e) {
  if (e.target.classList.contains("delete-card")) return deleteCard(e);

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  const blog = e.target.closest(`button`);
  const cardTop = blog.children[0];
  const blogTitle = cardTop.children[0].textContent;

  const cardBottom = blog.children[1];
  const blogContent = cardBottom.children[0].textContent;

  title.value = blogTitle;
  content.textContent = blogContent;
  createBtn.textContent = "Edit Blog!";
  blogForm.classList.remove(`hidden`);
  blogForm.classList.add(`create-blog-form`);
  makeBtn.classList.remove(`hidden`);
  createBtn.classList.remove(`hidden`);

  blogForm.dataset.id = blog.dataset.id;
});

async function makeNewBlog(title, content) {
  const response = await fetch(`/api/blogs`, {
    method: `POST`,
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  returnResponse(response);
}

async function editCurrentBlog(title, content, id) {
  const response = await fetch(`/api/blogs/edit`, {
    method: `POST`,
    body: JSON.stringify({ title, content, id }),
    headers: { "Content-Type": "application/json" },
  });

  await returnResponse(response);
}

async function returnResponse(response) {
  const { message } = await response.json();
  console.log(message);
  const warning = message || `Sorry there has been an error uploading the blog`;

  if (message === "relogin") return window.location.replace("/relogin");
  if (response.ok) {
    window.location.reload();
  } else {
    warningText.textContent = warning;
    warningText.style.display = `inline`;
    showWarning(warningText);
  }
}

async function deleteCard(e) {
  const mainBtn = e.target.previousElementSibling;
  const id = mainBtn.dataset.id;
  console.log(id);

  const response = await fetch(`/api/blogs/${id}`, {
    method: `DELETE`,
  });

  const message = await response.json();
  console.log(message);

  if (message === `relogin`) return;

  window.location.replace("/relogin");

  if (response.ok) {
    window.location.reload();
  } else {
    window.location.replace("/relogin");
  }
}
