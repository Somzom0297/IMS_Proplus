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
                    { data: null, render: function(data) {
                        return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlReceiveDetail" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
                    }}
                ],
            });
        })
    }
});