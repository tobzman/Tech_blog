$(document).ready(function () {
  // Handle form submission
  $("#login-form").submit(function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    // Send AJAX request to login endpoint
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: { username, password },
    })
      .done(function (response) {
        // Redirect to dashboard on successful login
        window.location.href = "/dashboard";
      })
      .fail(function (error) {
        $("#login-message").text(
          "Login failed. Please check your credentials."
        );
      });
  });
});
