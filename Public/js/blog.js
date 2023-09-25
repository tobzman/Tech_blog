const commentForm = document.querySelector(`form`);
const blogId = document.querySelector(`.blog-article`).dataset.id;

commentForm.addEventListener(`submit`, async function (e) {
  e.preventDefault();
  const commentInput = document.querySelector(`#add-comment`);
  const comment = commentInput.value.trim();

  if (!comment) {
    // Add error handling here if needed
    return;
  }

  try {
    const response = await fetch(`/api/comments`, {
      method: `POST`,
      body: JSON.stringify({ comment, id: blogId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      // Handle the response error here
      const errorMessage = await response.json();
      // You can display the error message or perform other actions as needed
    }
  } catch (error) {
    // Handle any network or unexpected errors here
    console.error("An error occurred:", error);
  }
});
