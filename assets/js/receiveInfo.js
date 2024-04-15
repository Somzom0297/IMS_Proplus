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
    // This function clears the content of all modals

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
    
    $('#tblStockRecive').on('click', '.mdlReceiveDetail', function (ev) {
        $('#detailsModal').modal('show');
        ev.preventDefault();
        var inv = $(this).data('id');
        // var inv = '12401001';
        // alert(inv)
        showReceiveDetail(inv);
    });
    // $('#mdlAddReceiveDetail').on('shown.bs.modal', function() {
    $('#btnAddReceiveDetail').on('click', function() {
        $('#detailsModal').modal('hide');
        $('#mdlAddReceiveDetail').modal('show');
        selProductCode();
    });

    $('#mdlAddReceiveDetail').on('hidden.bs.modal', function() {
        $('#detailsModal').modal('show');
        $('#mdlAddReceiveDetail').modal('hide');
    });
    
    
    $('#selAddProductCode').on('change',function(){
        var product_id = $('#selAddProductCode').val();
        // alert(product_id)
        $.ajax({
            url: API_URL + "Receive/getModelById",
            type: 'POST',
            dataType: 'json',
            data:{
                id:product_id
            }
        })
        .done(function(data) {
        //    alert(data[0].mpc_model)
           $('#selAddModel').val(data[0].mpc_model)
           $('#inpAddDiscription').val(data[0].mpc_discription)
           $('#inpAddIndex').val(data[0].mib_number)
           $('#inpAddSize').val(data[0].mib_size)
           $('#selAddBrand').val(data[0].mb_name)
           
        })
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
                                <a href="#" class="btn btn-secondary mdlReceiveDetail" data-id="${data[i].isd_inv_no}" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-pencil"></i></a>
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

    function insertProductDetail(invoiceNumber) {
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
    
    function selProductCode(){
        $.ajax({
            url: API_URL + "Receive/getSelProductCode",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selAddProductCode').empty();
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selAddProductCode').append($('<option>', {
                    value: item.mpc_id,
                    text: item.mpc_name
                }));
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.log('Error:', errorMessage);
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


    $('#btnSaveAdd').click(function() {
        var formData = new FormData();
        formData.append('doc_number', $('#docNumber').val());
        formData.append('doc_date', $('#docDate').val());
        formData.append('invoice_number', $('#invNumber').val());
        formData.append('invoice_date', $('#invDate').val());
        formData.append('purchase_order', $('#poNumber').val());
        formData.append('purchase_order_date', $('#poDate').val());
        formData.append('supplier_name', $('#supplierName').val());
        formData.append('product_id', $('#selAddProductCode').val());
        formData.append('qty', $('#inpAddQaulity').val());
        formData.append('price', $('#inpAddPriceUnit').val());
        formData.append('discription', $('#inpAddDiscription').val());

        $.ajax({
            url: API_URL + "Receive/insertReceive",
            type: 'POST',
            data: formData,
            processData: false, // Prevent jQuery from automatically processing data
            contentType: false, // Prevent jQuery from automatically setting contentType
            success: function(response) {
                // Handle success response
                Swal.fire({
                    title: "Success!",
                    text: "tum kan add succefully",
                    icon: "success"
                  });
                //   $('#mldAddProduct').modal('hide');
                initializeDataTable();
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(xhr.responseText);
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

    $('#mdlAddReceiveDetail').on('shown.bs.modal', function() {
        $('#selAddProductCode').trigger('change');
    });

  });
