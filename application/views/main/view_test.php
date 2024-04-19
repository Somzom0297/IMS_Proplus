<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modal Example</title>
    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">

    <!-- DataTables JS -->
    <script type="text/javascript" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>

    <!-- jsPDF JS -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <!-- External JavaScript -->
    <script src="script.js"></script>
</head>

<body>
    <button id="exportPdfButton">Export to PDF</button>

    <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
<script>
    
    $(document).ready(function() {
    var table = $('#example').DataTable();
    
    // Export to PDF button click handler
    $('#exportPdfButton').click(function() {
        // Initialize jsPDF
        var doc = new jsPDF();
        
        // Get the table data
        var data = table.rows().data();
        
        // Define the columns for the table
        var columns = [];
        table.columns().every(function() {
            columns.push(this.header().textContent);
        });
        
        // Add the table data to the PDF
        doc.autoTable({
            head: [columns],
            body: data.toArray()
        });
        
        // Save the PDF
        doc.save('table.pdf');
    });
});
</script>