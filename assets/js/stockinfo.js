$(document).ready(function() {
  var apiUrl = 'http://127.0.0.1/api/Receive/getStockInfo';
  $.ajax({
    url: apiUrl,
    type: 'POST',
    dataType: 'json'
  })
  .done(function(data) {
    console.log(data); // Use console.log for better debugging
    $.each(data, function(index, item) {
      var qtyyy
      if(item.isd_qty == null){
          qtyyy = 0
      }else{
        qtyyy = item.isd_qty
      }
      var row = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.mb_name}</td>
                    <td>${item.mpc_name}</td>
                    <td>${item.mpc_model}</td>
                    <td>${item.mpc_discription}</td>
                    <td>${(item.qtyy == null) ? qtyyy : item.qtyy}</td>

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