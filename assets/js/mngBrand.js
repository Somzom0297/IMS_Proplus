$(document).ready(function(){
    const table = initializeDataTable();
});
    function initializeDataTable() {
        $.ajax({
            url: API_URL + "Receive/ListBrandDetail",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            return $('#tblBrandDetail').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                        },className:'text-center'
                    },
                    { data: 'mb_name',className:'text-center' },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return 'K.' +row.sa_firstname + ' ' + row.sa_lastname; // Concatenate first name and last name
                        },
                        className: 'text-center'
                    },
                    { data: 'mb_created_date',className:'text-center' },

                    { 
                        data: 'mb_status_flg', 
                        render: function(data, type, row) {
                            var [btnClass, btnText, status] = data !== '0' ? ['btn-success', 'Enable' ,'0'] : ['btn-danger', 'Disable', '1'];
                            return '<a href="javascript:void(0)" class="btn float-center btn-edit-brand ' + btnClass + '" id="btnStatusBrand" data-status="' + status + '" data-id="' + row.mb_id + '">'+ btnText +'</a>';
                        },
                        className:'text-center'
                    },

                    { data: 'mb_id', render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-warning float-center" id="btnEditBrand" data-id="' + data + '"><i class="ti-pencil"></i> Edit</a>';
                    },className:'text-center'}
                ],
            });
        })
    }

    $('#tblBrandDetail').on('click', '#btnStatusBrand', function () {
        // $('#mldEditBrand').modal('show');
        var mb_id = $(this).data('id');
        var status = $(this).data('status');
        // var inv = '12401001';
        updateStautus(mb_id,status);
    });

    $('#tblBrandDetail').on('click', '#btnEditBrand', function () {
        $('#mldEditBrand').modal('show');
        var brand_id = $(this).data('id');
        // var inv = '12401001';
        // alert(product_code)
        showEditBrand(brand_id);
    });

    function insertBrand() {
        var brand = $('#inpAddBrand').val();
        var userID = $('#inpUserId').val();
        $.ajax({
            url: API_URL + "Receive/insertBrand",
            type: 'POST',
            dataType: 'json',
            data:{
                mb_name: brand,
                userID: userID
            }
        })
        .done(function(data) {
            if (data.success == "true") {
            Swal.fire({
                title: "Success!",
                text: "tum kan add succefully",
                icon: "success"
            });
            $('#inpAddBrand').val('');
            $('#mldAddBrand').modal('hide');
            initializeDataTable();
        } else if (data.success == "false") {
            Swal.fire({
                title: "Error!",
                text: "This brand already exists",
                icon: "error"
            });
            $('#inpAddBrand').addClass('border-danger');
        }
        })
    }

    function updateBrand() {
        var brand = $('#inpEditBrand').val();
        var brandid = $('#inpBrandId').val();
        $.ajax({
            url: API_URL + "Receive/updateBrand",
            type: 'POST',
            dataType: 'json',
            data:{
                mb_name: brand,
                brandid: brandid
            }
        })
        .done(function(data) {
            if (data.success == "true") {
                
            
            Swal.fire({
                title: "Success!",
                text: "Update Brand succefully",
                icon: "success"
            });
            $('#mldEditBrand').modal('hide');
            initializeDataTable();
            }else{
                Swal.fire({
                    title: "Error!",
                    text: "This brand already exists",
                    icon: "error"
                });
                $('#inpEditBrand').addClass('border-danger');
            }
        })
    }

    function updateStautus(mb_id,status) {
        $.ajax({
            url: API_URL + "Receive/updateStautus",
            type: 'POST',
            dataType: 'json',
            data:{
                mb_id: mb_id,
                status: status
            }
        })
        .done(function(data) {
            
            Swal.fire({
                title: "Success!",
                text: "Change Status succefully",
                icon: "success"
            });
            initializeDataTable();
        })
    }

    function showEditBrand(brand_id) {

        $.ajax({
            url: API_URL + "Receive/getBrand",
            type: 'POST',
            dataType: 'json',
            data:{
                brand_id: brand_id,
            }
        })
        .done(function(data) {

            $('#inpEditBrand').val(data[0].mb_name);
            $('#inpBrandId').val(data[0].mb_id);

        })
    }

    $('#btnAddBrand').click(function(){
        $('#mldAddBrand').modal('show');
    });

    $('#btnAddSaveBrand').click(function(){
        insertBrand();
    });

    $('#btnEditSaveBrand').click(function(){
        updateBrand();
    });

    function reloadTable() {
        table.ajax.reload(null, false);
    }
    
