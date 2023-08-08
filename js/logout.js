$(document).ready(function () {
  // Handle logout button click
  $("#logout-button").click(function () {
    // Send AJAX request to logout endpoint
    $.ajax({
      url: "/api/logout",
      method: "POST",
    })
      .done(function (response) {
        // Redirect to homepage on successful logout
        window.location.href = "/";
      })
      .fail(function (error) {
        console.error("Logout failed:", error);
      });
  });
});
