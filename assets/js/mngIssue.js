$(document).ready(function() {
    $('#btnpdf').on('click', function() {
        var doc = new jsPDF();

        // Convert the table to a PDF table
        doc.autoTable({ html: '#tblStockRecive' });
        // Save the PDF
        doc.save('table.pdf');
    });
    showYear();
    var id_doc = $('#inpAddDoc').val();
    showIssueDetail(id_doc)
    $('#inpAddPriceUnit').keyup(function(){
        var qty = parseFloat($('#inpAddQaulity').val());
        var price = parseFloat($('#inpAddPriceUnit').val());
        var amount = qty * price;
        if(amount < 0 && qty <0 && price < 0){
            $('#inpAddTotal').val('0.00'); // Format to two decimal places
        }else{
            $('#inpAddTotal').val(amount.toFixed(2)); // Format to two decimal places
        }
    })
    const table = TableReceive();
    // This function clears the content of all modals

    function TableReceive() {
        var year = $('#yearSelect').val();
        var month = $('#monthSelect').val();
    
        $.ajax({
            url: API_URL + "Receive/getIssueInfo",
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
                    { data: 'isi_document' },
                    { data: 'isi_document_date' },
                    { data: 'total' },
                    { data: 'isi_document', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlIssueDetail" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
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
    
    $('#tblStockRecive').on('click', '.mdlIssueDetail', function (ev) {
        $('#detailsModal').modal('show');
        ev.preventDefault();
        var inv = $(this).data('id');
        // var inv = '12401001';
        // alert(inv)
        showIssueDetail(inv);
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
        alert(inv)
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
    $('#btnAddIssue').on('click', function() {
        // $('#detailsModal').modal('hide');
        // $('#mdlAddReceiveDetail').modal('show');
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
        var selectedOption = $(this).find('option:selected');
    
        // Get the value of the data-id attribute
        var dataId = selectedOption.data('id');
        // alert(dataId)
        if(dataId === undefined){
            Swal.fire({
                title: "Warning!",
                text: "No have qty for this product",
                icon: "warning"
              });
            $('#selAddModel').val('')
            $('#inpAddDiscription').val('')
            $('#inpAddIndex').val('')
            $('#inpAddSize').val('')
            $('#selAddBrand').val('')
        }else{
        // alert(dataId)
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
    }
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

    function showIssueDetail(invoiceNumber) {
        // var invoiceNumber = 'IS2402001'
        var apiUrl = 'http://127.0.0.1/api/Receive/getIssueDetail';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            data: { doc_id: invoiceNumber },
            success: function(data) {
                // console.log(data[0].isi_document);

                if (data.length > 0) {
                    $('#inpAddDoc').val(data[0].isi_document);
                    $('#inpAddDocDate').val(data[0].isi_document_date);
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
                        </tr>`;
                }
                $('#tblProductIssueDetail tbody').html(html);

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
            url: API_URL + "Receive/getSelProductCodeIssue",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data.result2); // Use console.log for better debugging
            // Clear existing table rows
            
            $('#selAddProductCode').empty();
            // Append new options from data received
            
            $.each(data.result2, function(index, item) {
                $('#selAddProductCode').append($('<option>', {
                    value: item.mpc_id,
                    text: item.mpc_name,
                    'data-id': item.isd_id
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

    $('#btnAddSaveIssue').click(function() {
        var selectedOption = $('#selAddProductCode').find('option:selected');
    
        // Get the value of the data-id attribute
        var dataId = selectedOption.data('id');
        var formData = new FormData();
        formData.append('isd_id', dataId);
        formData.append('doc_number', $('#inpAddDoc').val());
        formData.append('doc_date', $('#inpAddDocDate').val());
        formData.append('invoice_number', $('#invNumber').val());
        formData.append('invoice_date', $('#invDate').val());
        formData.append('purchase_order', $('#poNumber').val());
        formData.append('purchase_order_date', $('#poDate').val());
        formData.append('product_id', $('#selAddProductCode').val());
        formData.append('customer', $('#inpCustomer').val());
        formData.append('qty', $('#inpAddQaulity').val());
        formData.append('Unit', $('#inpAddUnit').val());
        formData.append('price', $('#inpAddPriceUnit').val());

        var inv = $('#inpAddDoc').val();
        $.ajax({
            url: API_URL + "Receive/insertIssue",
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
                showIssueDetail(inv);
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

    $('#mldAddIssue').on('shown.bs.modal', function() {
        $('#selAddProductCode').trigger('change');
    });

    $('#mdlEditReceive').on('shown.bs.modal', function() {
        $('#selEditProductCode').trigger('change');
    });

  });
