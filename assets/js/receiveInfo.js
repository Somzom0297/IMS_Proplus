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
            // Initialize DataTable for #tblStockRecive
            var table = $('#tblStockRecive').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }},
                    { data: 'isd_doc_number', className: 'text-center' }, // Centering content of this column
                    { data: 'isd_inv_date', className: 'text-center' }, // Centering content of this column
                    { data: 'isd_inv_no', className: 'text-center' }, // Centering content of this column
                    { data: 'isd_po_number', className: 'text-center' }, // Centering content of this column
                    { data: 'total', className: 'text-center' }, // Centering content of this column
                    { data: 'isd_inv_no', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlReceiveDetail" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
                    }, className: 'text-center' } // Centering content of this column
                ],
                dom: 'Bfrtip', // Buttons for export
                searching: false,
                buttons: [
                    {
                        
                        extend: 'pdfHtml5',
                        text: 'Download PDF',
                        filename: 'stock_info_pdf',
                        download: 'open',
                        customize: function(doc) {
                            // Customize the PDF document
                            doc.content[1].table.widths = ['10%', '15%', '20%', '15%', '15%', '10%', '20%']; // Example: Set custom widths for each column
                            // var signatureText = '(___________________________)                             (___________________________)                             (___________________________)\n\n.    Noraphat jirasetthasiri                                         Noraphat jirasetthasiri                                         Noraphat jirasetthasiri \n\n   date_____________________                                  date_____________________                                   date_____________________';
                            // doc.content.push({ text: signatureText, margin: [0, 210, 0, 0] });
                        }
                    }
                ]
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
    
    $('#tblReceiveDetail').on('click', '.mdlEditReceive', function (ev) {
        $('#mdlEditReceive').modal('show');
        $('#detailsModal').modal('hide');
        ev.preventDefault();
        var isd_id = $(this).data('id');
        
        showEditReceiveDetail(isd_id);
    });
    
    $('#tblReceiveDetail').on('click', '.mdlDeleteReceive', function (ev) {
        ev.preventDefault();
        var isd_id = $(this).data('id');
        var inv = $('#invNumber').val();

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // If user confirms deletion
            if (result.isConfirmed) {
                // Send AJAX request to delete the record
                $.ajax({
                    url: API_URL + "Receive/deleteReceive",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: isd_id
                    }
                }).done(function(data) {
                    // Handle success response
                    // console.log("2222",data);

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The record has been deleted.',
                        icon: 'success'
                    }).then(() => {
                        // Reload the receive detail
                        showReceiveDetail(inv);
                    });
           
                })
            }
        });
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

    $('#mdlEditReceive').on('hidden.bs.modal', function() {
        $('#detailsModal').modal('show');
        $('#mdlEditReceive').modal('hide');
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

    $('#selEditProductCode').on('change',function(){
        var product_id = $('#selEditProductCode').val();
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
           $('#selEditModel').val(data[0].mpc_model)
           $('#inpEditDiscription').val(data[0].mpc_discription)
           $('#inpEditIndex').val(data[0].mib_number)
           $('#inpEditSize').val(data[0].mib_size)
           $('#selEditBrand').val(data[0].mb_name)
           
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
                // console.log(data);
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
                                <a href="#" class="btn btn-secondary mdlEditReceive" data-id="${data[i].isd_id}"><i class="ti-pencil"></i></a>
                                <a href="#" class="btn btn-danger mdlDeleteReceive" data-id="${data[i].isd_id}"><i class="ti-trash"></i></a>
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

    function showEditReceiveDetail(isd_id) {
        var apiUrl = 'http://127.0.0.1/api/Receive/getEditReceiveDetail';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            data: { isd_id: isd_id },
            success: function(data) {
                $('#inpEditQaulity').val(data.result1[0].isd_qty)
                $('#inpEditPriceUnit').val(data.result1[0].isd_price_unit)
                $('#inpProductId').val(data.result1[0].isd_id)
                // console.log(data.result1[0].isd_qty);
                $('#selEditProductCode').empty();
                // Append new options from data received
                $.each(data.result2, function(index, item) {
                    var option = $('<option>', {
                        value: item.mpc_id,
                        text: item.mpc_name
                    });

                    if (data.result1 && data.result1.some(i => i.mpc_id === item.mpc_id)) {
                        option.prop('selected', true);
                    }
                    $('#selEditProductCode').append(option);
                });
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
            // console.log(data); // Use console.log for better debugging
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

    $('#btnSaveReceive').click(function() {
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
        var inv = $('#invNumber').val();
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
                  $('#mdlAddReceiveDetail').modal('hide');
                showReceiveDetail(inv);
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(xhr.responseText);
            }
        });
    });

    $('#btnSaveEidtReceive').click(function() {
        alert($('#inpEditPriceUnit').val());
        var formData = new FormData();
        formData.append('ProductId', $('#inpProductId').val());
        formData.append('product_id', $('#selEditProductCode').val());
        formData.append('qty', $('#inpEditQaulity').val());
        formData.append('price', $('#inpEditPriceUnit').val());
        formData.append('discription', $('#inpEditDiscription').val());
        // console.log(formData);
        var inv = $('#invNumber').val();
        $.ajax({
            url: API_URL + "Receive/updateReceive",
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
                  $('#mdlEditReceive').modal('hide');
                showReceiveDetail(inv);
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

    $('#mdlEditReceive').on('shown.bs.modal', function() {
        $('#selEditProductCode').trigger('change');
    });

  });
