$(document).ready(function() {
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

            // Clear existing table rows
            $('#tblStockRecive tbody').empty();

            // Populate table with new data
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
        showReceiveDetail(inv);
    });

    function showReceiveDetail(invoiceNumber) {
        $.ajax({
            url: API_URL + "Receive/getReceiveDetail",
            type: 'POST',
            dataType: 'json',
            data: {
                inv: invoiceNumber
            }
        })
        .done(function(data) {
            console.log(data)
            $('#docNumber').val(data[0].isd_doc_number);
            $('#invDate').val(data[0].isd_inv_date);
            $('#invNumber').val(data[0].isd_inv_no);
            $('#poNumber').val(data[0].isd_po_number);

            $('#tblReceiveDetail tbody').empty();
            $('#tblReceiveDetail').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1 },
                    { data: 'mb_name' },
                    { data: 'mpc_name' },
                    { data: 'mpc_model' },
                    { data: 'isd_description' },
                    { data: 'isd_qty' },
                    { data: 'isd_price_unit' },
                    {
                        data: 'isd_inv_no',
                        render: data =>
                            `
                                <a href="#" class="btn btn-secondary mdlReceiveDetail me-2" data-id="${data}" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i></a>
                                <a href="#" class="btn btn-danger mdlOtherButton" data-id="${data}"><i class="ti-trash"></i></a>
                            `
                    }
                ],
                // scrollX: true
            });
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
  });
