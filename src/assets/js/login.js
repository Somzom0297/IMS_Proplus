
$(document).ready(function () {

    $('#btnLogin').click(function (e) {
        e.preventDefault();
  
        var empCode = $('#username').val();
        var empPassword = $('#password').val();
  
        if (empCode == '' || empPassword == '') {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: 'Please enter both username and password.',
                showConfirmButton: true
            })
        } else {
            var apiUrl = 'http://127.0.0.1/api/';
  
            var requestData = {
                empCode: empCode,
                empPassword: empPassword
            };
  
            var url = apiUrl + "Api_Controller/chk_login";
            $.ajax({
                url: base_url("Login/callApiLogin?url=" + url),
                type: 'POST',
                data: {
                    requestData: requestData,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.result == 1) {
                        window.location.href = base_url('Dashboard/dashboard');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Your computer shutting down',
                            html: response.message // Assuming the error message is in the 'message' property
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    });
  });
  


