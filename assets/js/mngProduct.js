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
                // console.log(data);
                if (data.length > 0) {
                    $('#inpTotal').val(data[0].total_qty);
                    $('#inpProduct').val(data[0].mpc_name);
                    $('#inpModel').val(data[0].mpc_model);
                    $('#inpIndex').val(data[0].mib_number);
                    $('#inpDis').val(data[0].mpc_discription);
                    $('#inpBrand').val(data[0].mb_name);
                    $('#inpSize').val(data[0].mib_size);
                   
                }
                if(data[0].isd_doc_number !== undefined){
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        html += `
                            <tr>
                                <td>${i+1}</td>
                                <td>${data[i].isd_doc_number}</td>
                                <td>${data[i].isd_doc_date}</td>
     
                                <td>${data[i].isd_qty}</td>
                                <td>${data[i].isd_price_unit}</td>
                            </tr>`;
                    }
                }else{

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

    $('#detailProduct').on('hidden.bs.modal', function() {
        $('#inpTotal').val('');
        $('#inpIndex').val('');
        $('#inpSize').val('');
    });

    $('#btnAddProduct').click(function() {
        $('#mldAddProduct').modal('show');
        showBrand();
        showIndex();
        showSize();
    })

    $('#btnAddSaveProduct').click(function() {
        var brand = $('#selAddBrand').val();
        var Product = $('#inpAddProduct').val();
        var Model = $('#selAddModel').val();
        var dis = $('#selAddDis').val();
        var index = $('#inpAddIndex').val();
        var size = $('#selAddSize').val();

        $.ajax({
            url: API_URL + "Receive/insertProduct",
            type: 'POST',
            dataType: 'json',
            data: {
                brand: brand,
                Product: Product,
                Model: Model,
                dis: dis,
                index: index,
                size: size
            }
        })
        .done(function(data) {
            console.log("=>",data.success);
            if(data.success == "true"){
            Swal.fire({
                title: "Success!",
                text: "tum kan add succefully",
                icon: "success"
              });
              $('#mldAddProduct').modal('hide');
            }else{
                Swal.fire({
                    title: "Error!",
                    text: "This product code already exist",
                    icon: "error"
                  });
                  $('#inpAddProduct').addClass('border-danger');
            }
        })
    })
    
    function showBrand() {
        $.ajax({
            url: API_URL + "Receive/getBrandAll",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
        //    alert(data[0].mpc_model)
        $('#selAddBrand').empty();
        // Append new options from data received
        $.each(data, function(index, item) {
            $('#selAddBrand').append($('<option>', {
                value: item.mb_id,
                text: item.mb_name
            }));
        });

        })
    }

    function showIndex() {
        $.ajax({
            url: API_URL + "Receive/getIndexAll",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
        //    alert(data[0].mpc_model)
        $('#inpAddIndex').val(data[0].mib_number);

        })
    }

    function showSize() {
        $.ajax({
            url: API_URL + "Receive/getIndexSize",
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
        //    alert(data[0].mpc_model)

        $('#selAddSize').empty();
        // Append new options from data received
        $.each(data, function(index, item) {
            $('#selAddSize').append($('<option>', {
                value: item.mib_size,
                text: item.mib_size
            }));
        });

        })
    }
    
});