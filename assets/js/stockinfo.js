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
                    <td class="text-center"><img src="http://127.0.0.1/IMS_Proplus/assets/img/stock_img/${item.mpc_img}" height="80px" alt="Product Image"></td>
                    <td>${item.mb_name}</td>
                    <td>${item.mpc_name}</td>
                    <td>${item.mpc_model}</td>
                    <td>${item.mpc_discription}</td>
                    <td class="text-center">${(item.qtyy == null) ? qtyyy : item.qtyy}</td>

                </tr>`;
                $('tbody').append(row);
    });

    // Initialize DataTables
    // $('#tblStockinfo tbody').html(row)
$('#tblStockinfo').DataTable({
      // scrollX: true,
      searching: false,
      dom: 'Bfrtip', // Buttons for export
      buttons: [
        {
          extend: 'pdfHtml5',
          text: 'Download PDF',
          filename: 'stock_info_pdf',
          download: 'open',
          customize: function(doc) {
            // Add signature
            var signatureText = '(___________________________)                             (___________________________)                             (___________________________)\n\n.    Noraphat jirasetthasiri                                         Noraphat jirasetthasiri                                         Noraphat jirasetthasiri \n\n   date_____________________                                  date_____________________                                   date_____________________';
            doc.content.push({ text: signatureText, margin: [0, 210, 0, 0] });
          }
        }
      ]
    });
  })
  .fail(function(xhr, status, error) {
    var errorMessage = `${status}: ${error}`;
    console.log('Error:', errorMessage);
    // Optionally display error message to the user
    // $('#errorContainer').text('An error occurred: ' + errorMessage);
  });
});