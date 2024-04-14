$(document).ready(function() {
    $('#btnpdf').on('click', function() {
        var doc = new jsPDF();

        // Convert the table to a PDF table
        doc.autoTable({ html: '#tblStockRecive' });

        // Save the PDF
        doc.save('table.pdf');
    });
    showYear();
    const table = TableReceive();
    function TableReceive() {
        var year = $('#yearSelect').val();
        var month = $('#monthSelect').val();
    
        $.ajax({
            url: API_URL + "Receive/getReceiveInfo",
            type: 'POST',
            dataType: 'json',
            data: {
                year: year,
                month: month
            }
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging

            var table = $('#tblStockRecive').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }},
                    { data: 'isd_doc_number' },
                    { data: 'isd_inv_date' },
                    { data: 'isd_inv_no' },
                    { data: 'isd_po_number' },
                    { data: 'total' },
                    { data: 'isd_inv_no', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlReceiveDetail" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
                    }}
                ],
                scrollX: true
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.log('Error:', errorMessage);
        });
    }
    
    $('#tblStockRecive').on('click', '.mdlReceiveDetail', function () {
        var inv = $(this).data('id');
        // var inv = '12401001';
        // alert(inv)
        showReceiveDetail(inv);
    });

    function showReceiveDetail(invoiceNumber) {
        var apiUrl = 'http://127.0.0.1/api/Receive/getReceiveDetail';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            data: { inv: invoiceNumber },
            success: function(data) {
                console.log(data);
                if (data.length > 0) {
                    $('#docNumber').val(data[0].isd_doc_number);
                    $('#docDate').val(data[0].isd_doc_date);
                    $('#invNumber').val(data[0].isd_inv_no);
                    $('#poNumber').val(data[0].isd_po_number);
                    $('#supplierName').val(data[0].isd_customer);
                    $('#invDate').val(data[0].isd_inv_date);
                    $('#poDate').val(data[0].isd_po_date);
                }
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${data[i].mb_name}</td>
                            <td>${data[i].mpc_name}</td>
                            <td>${data[i].mpc_model}</td>
                            <td>${data[i].mpc_discription}</td>
                            <td>${data[i].isd_qty}</td>
                            <td>${data[i].isd_price_unit}</td>
                            <td>${data[i].isd_qty * data[i].isd_price_unit}</td>
                            <td>
                                <a href="#" class="btn btn-secondary mdlReceiveDetail" data-id="${data[i].isd_inv_no}" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i></a>
                                <a href="#" class="btn btn-danger mdlOtherButton" data-id="${data[i].isd_inv_no}"><i class="ti-trash"></i></a>
                            </td>
                        </tr>`;
                }
                $('#tblReceiveDetail tbody').html(html);

                // Initialize DataTables after updating the table content
                // $('#tblReceiveDetail').DataTable({
                //     scrollX: true,
                // });
            },
            error: function(xhr, status, error) {
                console.error(status + ": " + error);
            }
        });
    
    }
    

    function showYear() {

        var yearSelect = $("#yearSelect");
        var monthSelect = $("#monthSelect");

        var currentYear = new Date().getFullYear();
        // var currentMonth = new Date().getMonth() + 1;

        for (var year = currentYear; year >= 1900; year--) {
            yearSelect.append($("<option></option>").attr("value", year).text(year));
        }

        var selectAllOption = $("<option></option>").attr("value", "all").text("All").prop("selected", true);
        monthSelect.prepend(selectAllOption);

        for (var month = 1; month <= 12; month++) {
            var monthName = new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
            monthSelect.append($("<option></option>").attr("value", month).text(monthName));
        }

        yearSelect.val(currentYear);
        // monthSelect.val(currentMonth);

        $('#monthSelect, #yearSelect').on('change', function() {
            TableReceive();
        });

    }

    $('#btnSaveReceive').on('click', function() {
        // Serialize form data
        var formData = new FormData($('#RegisterReceive')[0]);
        console.log(formData);
        // Perform AJAX request
        $.ajax({
            url: API_URL + "Receive/getReceiveInfo",
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

    $('#btnAddProduct').on('click', function() {
        $.ajax({
            url: API_URL + "Receive/getReceiveEdit",
            type: 'POST',
            contentType: false,
            processData: false,
            success: function(response) {
                alert(response);
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });
  });
