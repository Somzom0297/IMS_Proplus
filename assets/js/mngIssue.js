$(document).ready(function() {
    showYear();
    // var id_doc = $('#inpAddDoc').val();
    $('#yearSelect, #monthSelect').trigger('change');
    // showIssueDetail(id_doc);

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

    const table = TableProduct();
    // This function clears the content of all modals

    const table1 = TableReceive();
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

            var table1 = $('#tblStockIssue').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },className:'text-center'},
                    { data: 'isi_document',className:'text-center' },
                    { data: 'isi_document_date',className:'text-center' },
                    { data: 'total',className:'text-center' },
                    { data: 'isi_document', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlIssueDetails" data-id="' + data + '" ><i class="ti-search"></i> Details</a>';
                    },className:'text-center'}
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
                            doc.content[1].table.widths = ['25%', '25%', '25%', '25%']; // Example: Set custom widths for each column
                            doc.content[1].table.body.forEach(row => {
                                row.splice(-1, 1); // Remove the last cell from each row (corresponding to the fifth column)
                            });
                            // var signatureText = '(___________________________)                             (___________________________)                             (___________________________)\n\n.    Noraphat jirasetthasiri                                         Noraphat jirasetthasiri                                         Noraphat jirasetthasiri \n\n   date_____________________                                  date_____________________                                   date_____________________';
                            // doc.content.push({ text: signatureText, margin: [0, 210, 0, 0] });
                        }
                    }
                ]
            });
            });
    }
    
    
    function TableProduct() {

        $.ajax({
            url: API_URL + "Receive/showProductIssue",
            type: 'POST',
            dataType: 'json'
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging

            var table = $('#tblProductIssueDetail').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    className: 'text-center'
                },
                    {
                        data: 'mpc_img',
                        render: function(data, type, row) {
                            return '<img src="http://127.0.0.1/IMS_Proplus/assets/img/stock_img/' + data + '" height="80px" alt="Product Image">';
                        },
                        className:'text-center'
                    },
                    { data: 'mb_name',className:'text-center' },
                    { data: 'mpc_name',className:'text-center' },
                    { data: 'mpc_model',className:'text-center' },
                    { data: 'mpc_discription',className:'text-center' },
                    { data: 'qtyy',className:'text-center' },
                    
                    { data: 'mpc_name', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlIssueDetail" data-id="' + data + '"><i class="ti-shopping-cart"></i> Issue</a>';
                    },className:'text-center'}
                ],
                scrollX: true
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.log('Error:', errorMessage);
        });
    }
    
    $('#tblStockIssue').on('click', '.mdlIssueDetails', function (ev) {
        $('#detailsModal').modal('show');
        ev.preventDefault();
        var isd = $(this).data('id');
        // var inv = '12401001';
        // alert(isd)
        showIssueDetail(isd);
    });
    
    $('#tblProductIssueDetail').on('click', '.mdlIssueDetail', function (ev) {
        $('#mldAddIssue').modal('show');
        ev.preventDefault();
        var product = $(this).data('id');
        // var inv = '12401001';
        $('#selAddProductCode').val(product);
        // alert(product)
        showProductDetail();
        // showIssueDetail(inv);
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
                    $('#inpAddDocDetail').val(data[0].isi_document);
                    $('#inpAddDocDateDetail').val(data[0].isi_document_date);
                    $('#inpAddInv').val(data[0].isi_invoice);
                    $('#inpAddCustomer').val(data[0].isi_customer);
                }
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += `
                        <tr>
                            <td class="text-center">${i+1}</td>
                            <td class="text-center"><img src="http://127.0.0.1/IMS_Proplus/assets/img/stock_img/${data[i].mpc_img}" height="80px" alt="Product Image"></td>
                            <td class="text-center">${data[i].mb_name}</td>
                            <td class="text-center">${data[i].mpc_name}</td>
                            <td class="text-center">${data[i].mpc_model}</td>
                            <td class="text-center">${data[i].mpc_discription}</td>
                            <td class="text-center">${data[i].isi_qty}</td>
                            <td class="text-center">${data[i].isi_priceofunit}</td>
                            <td class="text-center">${data[i].isi_qty * data[i].isi_priceofunit}</td>
                        </tr>`;
                }
                $('#tblProductIssueDetails tbody').html(html);

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
    $('#btnAddIssue').on('click', function() {
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
    
    function showProductDetail(){
        var product_id = $('#selAddProductCode').val();
        // alert(product_id)

        // alert(dataId)
        $.ajax({
            url: API_URL + "Receive/getModelByIdPname",
            type: 'POST',
            dataType: 'json',
            data:{
                id:product_id
            }
        })
            .done(function(data) {
            //    alert(data[0].mpc_model)
            
               $('#inpQty').val((data[0].total != null) ? data[0].total : 0)
               $('#selAddModel').val(data[0].mpc_model)
               $('#inpAddDiscription').val(data[0].mpc_discription)
               $('#inpAddIndex').val(data[0].mib_number)
               $('#inpAddSize').val(data[0].mib_size)
               $('#selAddBrand').val(data[0].mb_name)
               $('#costPrice').val(data[0].mpc_cost_price)
               $('#isdID').val(data[0].isd_id)
            
            })
        
    }

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

    $('#btnAddSaveIssue').click(function() {
        var qtyRemain = parseInt($('#inpQty').val());
        var qty = parseInt($('#inpAddQaulity').val());
        
        if (qtyRemain < qty) {
            Swal.fire({
                title: "Warning!",
                text: "Qty not enough",
                icon: "warning"
            });
            return;
        }
        var costP = $('#costPrice').val();
        var priceU = $('#inpAddPriceUnit').val();
        if(priceU < costP){
            Swal.fire({
                title: "Warning!",
                text: "Price should not be less than " + costP,
                icon: "warning"
              });
              return;
        }

        // Get the value of the data-id attribute
        var dataId = $('#isdID').val();
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
                  $('#mldAddIssue').modal('hide');
                // showIssueDetail(inv);
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

    $('#btnConfirmIssue').click(function() {
        $('#mldConfirmIssue').modal('show');
        showIssueConfirm();
    });
        function showIssueConfirm(){
        var apiUrl = 'http://127.0.0.1/api/Receive/getConfirmProductDetail';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',

            success: function(data) {
                // console.log(data);
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += `
                        <tr>
                            <td class="text-center">${i+1}</td>
                            <td class="text-center"><img src="http://127.0.0.1/IMS_Proplus/assets/img/stock_img/${data[i].mpc_img}" height="80px" alt="Product Image"></td>
                            <td class="text-center">${data[i].mb_name}</td>
                            <td class="text-center">${data[i].mpc_name}</td>
                            <td class="text-center">${data[i].mpc_model}</td>
                            <td class="text-center">${data[i].mpc_discription}</td>
                            <td class="text-center">${data[i].isi_qty}</td>
                            <td class="text-center">
                                <a href="#" class="btn btn-danger mdlDeleteIssue" data-id="${data[i].lsi_id}"><i class="ti-trash"></i></a>
                            </td>
                        </tr>`;
                }
                $('#tblProductIssueConfirm tbody').html(html);

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

    $('#tblProductIssueConfirm').on('click', '.mdlDeleteIssue', function (ev) {
        ev.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: API_URL + "Receive/deleteIssueConfirm",
            type: 'GET',
            data: {
                id: id
            },
            success: function(response) {
                // Handle success response
                Swal.fire({
                    title: "Success!",
                    text: "Delete succefully",
                    icon: "success"
                  });
                  showIssueConfirm();
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(xhr.responseText);
            }
        })
    });

    $('#mdlEditReceive').on('shown.bs.modal', function() {
        $('#selEditProductCode').trigger('change');
    });

    $('#mldAddIssue').on('hidden.bs.modal', function() {
        resetForm();
    });

    $('#btnAddSaveIssueConfirm').click(function() {
        $.ajax({
            url: API_URL + "Receive/insertIssueConfirm",
            type: 'GET',
            contentType: false,
            processData: false,
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "tum kan add succefully",
                    icon: "success"
                  });
                  $('#mldConfirmIssue').modal('hide');
                  TableProduct();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });

    });

    $('#btnSubmit').click(function() {
      
        Swal.fire({
            title: "Success!",
            text: "tum kan add succefully",
            icon: "success"
          });
        resetForm();
    });

    $('#btnCancel').click(function() {

            Swal.fire({
                title: "Success!",
                text: "tum kan add succefully",
                icon: "success"
              });
            resetForm();
    });

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
    
    function resetForm() {
        $('#inpAddQaulity').val('');
        $('#inpAddPriceUnit').val('');
        $('#inpAddTotal').val('');


    }
  });
