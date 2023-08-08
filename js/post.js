$(document).ready(function () {
  // Handle form submission
  $("#post-form").submit(function (event) {
    event.preventDefault();

    const title = $("#post-title").val();
    const content = $("#post-content").val();

    // Send AJAX request to create post endpoint
    $.ajax({
      url: "/api/posts",
      method: "POST",
      data: { title, content },
    })
      .done(function (response) {
        $("#post-message").text("Post created successfully.");
      })
      .fail(function (error) {
        $("#post-message").text("Error creating post.");
      });
  });
});
