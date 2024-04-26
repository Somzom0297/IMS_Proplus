$(document).ready(function() {
    // initializeDataTable();
    function initializeDataTable() {
        var doc_id = $('#inpAddDoc').val();
        $.ajax({
            url: API_URL + "Receive/ListProductDetail",
            type: 'POST',
            dataType: 'json',
            data: {
                doc_id: doc_id
            }
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging

            // Clear existing table rows
            // $('#tblStockRecive tbody').empty();

            // Populate table with new data
            var table = $('#tblProductDetail').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },className:'text-center'},
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
                    { data: 'isd_qty',className:'text-center' },
                    { data: 'isd_price_unit',className:'text-center' },

                ],
            });

        })
    }


    selIndexBox();
    selBrand();

    function showProductDetail(product_id){

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
           $('#inpIndexId').val(data[0].mib_id)
           $('#inpAddSize').val(data[0].mib_size)
           $('#selAddBrand').val(data[0].mb_name)
           $('#selBrandId').val(data[0].mb_id)
           $('#inpAddUnit').val(data[0].mpc_unit)
           $('#inpAddPriceUnit').val(data[0].mpc_cost_price)

           
        })
    }

    $('#inpAddPriceUnit').keyup(function(){
        var qty = parseFloat($('#inpAddQaulity').val());
        var price = parseFloat($('#inpAddPriceUnit').val());
        var amount = qty * price;
        $('#inpAddAmount').val(amount.toFixed(2)); // Format to two decimal places
    })

    function selProductCode(productid){
        $.ajax({
            url: API_URL + "Receive/getSelProductCodebyID",
            type: 'POST',
            dataType: 'json',
            data:{
                id:productid
            }
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

    function selIndexBox(){

        $.ajax({
            url: API_URL + "Receive/getSelIndexBox",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selAddIndexNo').empty();
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selAddIndexNo').append($('<option>', {
                    value: item.mib_id,
                    text: item.mib_number+':'+item.mib_size
                }));
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.log('Error:', errorMessage);
        });
    }

    function selBrand(){
        $.ajax({
            url: API_URL + "Receive/getselBrand",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selAddBrand').empty();
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selAddBrand').append($('<option>', {
                    value: item.mb_id,
                    text: item.mb_name
                }));
            });
        })
        .fail(function(xhr, status, error) {
            var errorMessage = `${status}: ${error}`;
            console.log('Error:', errorMessage);
        });
    }

    function resetForm(){
        $('#inpAddDoc').val('');
        $('#inpAddDocDate').val('');
        $('#inpAddInv').val('');
        $('#inpAddInvDate').val('');
        $('#inpAddPo').val('');
        $('#inpAddPoDate').val('');
        $('#inpAddSupplier').val('');
        $('#inpAddFileInv').val('');
        initializeDataTable();
    }

    function showListProduct() {
        var apiUrl = 'http://127.0.0.1/api/Receive/showListProduct';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += `
                        <tr>
                            <td class="text-center">${i + 1}</td>
                            <td class="text-center"><img src="http://127.0.0.1/IMS_Proplus/assets/img/stock_img/${data[i].mpc_img}" height="80px" alt="Product Image"></td>
                            <td class="text-center">${data[i].mb_name}</td>
                            <td class="text-center">${data[i].mpc_name}</td>
                            <td class="text-center">${data[i].mpc_model}</td>
                            <td class="text-center">${data[i].mpc_discription}</td>
                            <td class="text-center"><a href="#" class="btn btn-secondary btnAddListProduct" data-id="${data[i].mpc_id}"><i class="ti-plus"></i></a></td>
                        </tr>`;
                }
                $('#tblListproduct tbody').html(html);
    
                // Initialize DataTables after updating the table content
                // $('#tblListproduct').DataTable(); // Initialize DataTable with default settings
            },
            error: function(xhr, status, error) {
                console.error(status + ": " + error);
            }
        });
    }
    
    // Function to handle search input
    $(document).on('keyup', '#searchInput', function() {
        var searchText = $(this).val().toLowerCase();
        $('#tblListproduct tbody tr').each(function() {
            var rowData = $(this).text().toLowerCase();
            if (rowData.indexOf(searchText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    
    // Call the function to show the list of products
    showListProduct();

    $('#btnSaveAdd').click(function() {
        var formData = new FormData();
        formData.append('doc_number', $('#inpAddDoc').val());
        formData.append('doc_date', $('#inpAddDocDate').val());
        formData.append('invoice_number', $('#inpAddInv').val());
        formData.append('invoice_date', $('#inpAddInvDate').val());
        formData.append('purchase_order', $('#inpAddPo').val());
        formData.append('purchase_order_date', $('#inpAddPoDate').val());
        formData.append('supplier_name', $('#inpAddSupplier').val());
        formData.append('file_inventory', $('#inpAddFileInv')[0].files[0]);
        formData.append('product_id', $('#selAddProductCode').val());
        formData.append('model_id', $('#selAddModel').val());
        formData.append('brand_id', $('#selAddBrand').val());
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
                $('#mldAddProduct').modal('hide');
                Swal.fire({
                    title: "Success!",
                    text: "tum kan add succefully",
                    icon: "success"
                  });
                  
                initializeDataTable();
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(xhr.responseText);
            }
        });
    });

    $('#btnSubmit').click(function() {
        Swal.fire({
            title: "Success!",
            text: "Item has been added successfully",
            icon: "success"
        }).then(function() {
            window.location.href = "http://127.0.0.1/IMS_Proplus/Product/mngProduct";
        });
    });

    $('#btnCancel').click(function() {
      
                Swal.fire({
                    title: "Success!",
                    text: "tum kan add succefully",
                    icon: "success"
                  });
                resetForm();
    });

    $('#btnAddProduct').click(function(){
        $('#mldSelectProduct').modal('show')
        showListProduct();
        
    })

    $('#tblListproduct').on('click', '.btnAddListProduct', function (ev) {
        $('#mldAddProduct').modal('show');
        $('#mldSelectProduct').modal('hide');
        var productid = $(this).data('id');
        // alert(productid);
        selProductCode(productid);
        showProductDetail(productid);
    });



});

