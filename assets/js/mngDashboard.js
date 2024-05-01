$(document).ready(function () {
    // Call the function to fetch data and create chart
    selProductCode();
    getTotalProductIssue();
    getTotalProduct();
});

    function selProductCode() {
        $.ajax({
            url: API_URL + "Receive/showChart",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(response) {
            console.log(response); // Use console.log for better debugging
            
            // Extract the array from the response object
            var data = response;
            
            // Check if the data is an array
            if (!Array.isArray(data)) {
                console.error("Response is not an array:", data);
                return;
            }

            // Extract labels and values from the data
            var labels = data.map(item => item.mpc_name);
            var values = data.map(item => parseInt(item.total));

            // Create a bar chart
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Quantity',
                        data: values,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.error('Error:', errorMessage);
        });
    }

    function getTotalProductIssue() {
        $.ajax({
            url: API_URL + "Receive/getTotalProductIssue",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            
            // Extract the total product issue from the data
            var totalProductIssue = parseInt(data[0].totalAll).toLocaleString();
            // Update the text with the total product issue
            $('#totalProductIssue').text(totalProductIssue);
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.error('Error:', errorMessage);
        });
    }

    function getTotalProduct() {
        $.ajax({
            url: API_URL + "Receive/getTotalProduct",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            
            // Extract the total product issue from the data
            var totalProductIssue = parseInt(data[0].total).toLocaleString();
            // Update the text with the total product issue
            $('#totalProduc').text(totalProductIssue);
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.error('Error:', errorMessage);
        });
    }
