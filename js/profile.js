$(document).ready(function () {
  // Handle form submission
  $("#edit-profile-form").submit(function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const email = $("#email").val();

    // Send AJAX request to update profile endpoint
    $.ajax({
      url: "/api/profile",
      method: "PUT",
      data: { username, email },
    })
      .done(function (response) {
        $("#profile-message").text("Profile updated successfully.");
      })
      .fail(function (error) {
        $("#profile-message").text("Error updating profile.");
      });
  });
});
