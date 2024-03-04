$(document).ready(function() {
  var url = `${API_URL}Inv_stockinfo/showStockinfoTable`;

  $.ajax({
    url: `${base_url("Stockinfo/callApiShowData?url=")}${url}`,
    type: 'POST',
    dataType: 'json'
  })
  .done(function(data) {
    console.log(data); // Use console.log for better debugging


    $.each(data, function(index, item) {
      var row = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.mb_name}</td>
                    <td>${item.mpc_name}</td>
                    <td>${item.mpc_model}</td>
                    <td>${item.description}</td>
                    <td>${item.Qty}</td>
                    <td>${item.iir_reserve_qty}</td>
                </tr>`;
                $('tbody').append(row);
    });

    // Initialize DataTables
    // $('#tblStockinfo tbody').html(row)
    $('#tblStockinfo').DataTable()
        .promise()
        .done(() => {
            $("#tblStockinfo").DataTable({
                scrollX: true,
            });
        });
  })
  .fail(function(xhr, status, error) {
    var errorMessage = `${status}: ${error}`;
    console.log('Error:', errorMessage);
    // Optionally display error message to the user
    // $('#errorContainer').text('An error occurred: ' + errorMessage);
  });
});