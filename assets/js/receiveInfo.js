$(document).ready(function() {
    showYear();
    const table = TableReceive();
    function TableReceive() {
        var year = $('#yearSelect').val();
        var month = $('#monthSelect').val();
        
        $.ajax({
            url: API_URL + "Receive/getReceiveInfo",
            type: 'POST',
            dataType: 'json',
            data:{
                year: year,
                month: month
            }
        })
        .done(function(data) {
            console.log(data); // Use console.log for better debugging
            
            // Clear existing table rows
            $('tbody').empty();
    
            // Populate table with new data
            var table = $('#tblStockRecive').DataTable({
                data: data,
                destroy: true,
                columns: [
                    { data: null, render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }},
                    { data: 'isd_doc_number' },
                    { data: 'isd_inv_date' },
                    { data: 'isd_inv_no' },
                    { data: 'isd_po_number' },
                    { data: 'total' },
                    { data: 'isd_id', render: function(data) {
                        return '<a href="#" class="btn btn-secondary float-center" data-id="' + data + '" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
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
    function showYear() {
        var yearSelect = $("#yearSelect");
        var monthSelect = $("#monthSelect");

        // Get the current year and month
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1; // January is 0

        // Populate years
        for (var year = currentYear; year >= 1900; year--) {
            yearSelect.append($("<option></option>").attr("value", year).text(year));
        }

        // Populate months
        for (var month = 1; month <= 12; month++) {
            var monthName = new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
            monthSelect.append($("<option></option>").attr("value", month).text(monthName));
        }

        // Set current year and month as selected
        yearSelect.val(currentYear);
        monthSelect.val(currentMonth);

        
        $('#monthSelect, #yearSelect').on('change', function() {
            TableReceive();
        });

        // Trigger change events

    }

  });