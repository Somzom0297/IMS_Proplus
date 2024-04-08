$(document).ready(function() {

    selProductCode();
    selIndexBox();
    selBrand();

    $('#addRowBtn').click(function() {

        var newRow = `
            <tr>
                <td>
                    <select class="form-select" name="selProductCode">
                        <option value="">- Product Code -</option>
                    </select>
                </td>
                <td>
                    <select class="form-select" name="selIndexBox">
                        <option value="">- Index -</option>
                    </select>
                </td>
                <td>
                    <select class="form-select" name="selBrand">
                        <option value="">- Brand -</option>
                    </select>
                </td>
                <td><input type="text" class="form-control" name="inpModel" placeholder="Model"></td>
                <td><input type="text" class="form-control" name="inpDiscription" placeholder="Description"></td>
                <td><input type="text" class="form-control" name="inpQty" placeholder="Qty"></td>
                <td><input type="text" class="form-control" name="inpPriceU" placeholder="Price/Unit"></td>
                <td><input type="text" class="form-control" name="inpAmount" placeholder="Amount"></td>
            </tr>
        `;
        $('#tableBody').append(newRow);
        // Initialize Select2 for the newly added select elements
        $('select.form-select').select2({
            width: '100%', // Adjust the width as needed
            placeholder: 'Select an option', // Placeholder text
            allowClear: true // Enable to clear selection
        });
        selProductCode();
        selIndexBox();
        selBrand();
    });

    $('#selProductCode').on('change',function(){
        var product_id = $('#selProductCode').val();
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
           $('#inpModel').val(data[0].mpc_model)
           $('#inpDiscription').val(data[0].mpc_discription)
           
        })
    })

    $('#inpPriceU').keyup(function(){
        var qty = parseFloat($('#inpQty').val());
        var price = parseFloat($('#inpPriceU').val());
        var amount = qty * price;
        $('#inpAmount').val(amount.toFixed(2)); // Format to two decimal places
    })

    function selProductCode(){
        $('#selProductCode').select2({
            width: '100%', // Adjust the width as needed
            allowClear: true // Enable to clear selection
        });
  
        $.ajax({
            url: API_URL + "Receive/getSelProductCode",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selProductCode').empty();
            $('#selProductCode').append($('<option>', {
                value: 'select',
                text: '- Product -',
                disabled: true,
                selected: true  
            }));
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selProductCode').append($('<option>', {
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
        $('#selIndexBox').select2({
            width: '100%', // Adjust the width as needed
            allowClear: true // Enable to clear selection
        });

        $.ajax({
            url: API_URL + "Receive/getSelIndexBox",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selIndexBox').empty();
            $('#selIndexBox').append($('<option>', {
                value: 'select',
                text: '- Index -',
                disabled: true,
                selected: true  
            }));
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selIndexBox').append($('<option>', {
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
        $('#selBrand').select2({
            width: '100%', // Adjust the width as needed
            allowClear: true // Enable to clear selection
        });
  
        $.ajax({
            url: API_URL + "Receive/getselBrand",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            // Clear existing table rows
            $('#selBrand').empty();
            $('#selBrand').append($('<option>', {
                value: 'select',
                text: '- Brand -',
                disabled: true,
                selected: true  
            }));
            // Append new options from data received
            $.each(data, function(index, item) {
                $('#selBrand').append($('<option>', {
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



        $('#btnSave').click(function() {
        });
    });

