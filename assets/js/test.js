function fetchDataAndPopulateTable() {
	$.ajax({
		url: "http://127.0.0.1/api/Receive/ListProductDetailAll",
		type: "POST",
		dataType: "json",
	})
		.done(function (data) {
			console.log(data); // Use console.log for better debugging

			// Check if DataTable is already initialized
			var table = $("#dataTable").DataTable();
			if (table) {
				// Clear existing data
				table.clear();
				// Add new data
				table.rows.add(data);
				// Redraw the table
				table.draw();
			} else {
				// Initialize DataTable
				$("#dataTable").DataTable({
					data: data,
					columns: [
						{
							data: null,
							render: function (data, type, row, meta) {
								return meta.row + 1; // Add 1 to meta.row to display 1-based index
							},
						},
						{ data: "mb_name" },
						{ data: "mpc_name" },
						{ data: "mpc_model" },
						{ data: "mpc_discription" },
						{ data: "isd_qty" },
						{ data: null, render: function(data) {
							return '<a href="javascript:void(0)" class="btn btn-secondary float-center mdlReceiveDetail" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="ti-search"></i> Details</a>';
						}}
					],
				});
			}
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.error("Error:", textStatus, errorThrown);
		});
}

// Call the function to fetch and populate data when the page loads
$(document).ready(function () {
	fetchDataAndPopulateTable();
});
