$(document).ready(function(){
    initializeDataTable();
    
    function initializeDataTable() {
        $.ajax({
            url: API_URL + "Receive/ListProductDetailAll",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging

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
                    { data: 'mpc_id', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlProductDetail" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailProduct"><i class="ti-search"></i> Details</a>';
                    }}
                ],
            });
        })
    }
    $('#tblProductDetail').on('click', '.mdlProductDetail', function () {
        var product_code = $(this).data('id');
        // var inv = '12401001';
        // alert(product_code)
        showReceiveDetail(product_code);
    });
    function showReceiveDetail(product_code) {
        var apiUrl = 'http://127.0.0.1/api/Receive/getProductDetail';
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            data: { mpc_id: product_code },
            success: function(data) {
                console.log(data);
                if (data.length > 0) {
                    $('#inpTotal').val(data[0].total_qty);
                    $('#inpIndex').val(data[0].mib_number);
                    $('#inpSize').val(data[0].mib_size);
                   
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
});