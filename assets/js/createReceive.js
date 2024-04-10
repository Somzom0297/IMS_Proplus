$(document).ready(function() {
    // initializeDataTable();
    function initializeDataTable() {
        var doc_id = $('#inpAddDoc').val();
        // var doc_id = 'doc';
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
                    }},
                    { data: 'mb_name' },
                    { data: 'mpc_name' },
                    { data: 'mpc_model' },
                    { data: 'mpc_discription' },
                    { data: 'isd_qty' },
                    { data: 'isd_price_unit' }

                ],
            });

        })
    }
    selProductCode();
    selIndexBox();
    selBrand();

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
           
        })
    })

    $('#inpAddPriceUnit').keyup(function(){
        var qty = parseFloat($('#inpAddQaulity').val());
        var price = parseFloat($('#inpAddPriceUnit').val());
        var amount = qty * price;
        $('#inpAddAmount').val(amount.toFixed(2)); // Format to two decimal places
    })

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

    $('#btnSubmit').click(function() {
      
                Swal.fire({
                    title: "Success!",
                    text: "tum kan add succefully",
                    icon: "success"
                  });
                resetForm();
    });

    $('#mldAddProduct').on('shown.bs.modal', function() {
        $('#selAddProductCode').trigger('change');
    });

});

