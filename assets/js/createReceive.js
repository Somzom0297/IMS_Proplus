$(document).ready(function() {
    $('#btnSaveReceive').on('click', function() {
        // Serialize form data
        var formData = new FormData($('#RegisterReceive')[0]);
        console.log(formData);
        // Perform AJAX request
        $.ajax({
            url: API_URL + "Receive/addReceive",
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                // Handle success response
                alert("success")
                // Optionally, do something with the response
            },
            error: function(xhr, status, error) {
                // Handle error
                console.log('Error:', error);
                // Optionally, display error message to the user
            }
        });
    });
});
