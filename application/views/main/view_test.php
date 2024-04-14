<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 5 Modal Example</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>

<body>
    <table id="dataTable">
        <thead>
            <tr>
                <th>v</th>
                <th>v</th>
                <th>v</th>
                <th>v</th>
                <th>v</th>
                <th>v</th>
                <th>v</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <a href="javascript:void(0)" class="btn btn-secondary float-center mdlReceiveDetail" data-bs-toggle="modal" data-bs-target="#mdlEdit"><i class="ti-search"></i> Details</a>
    <div class="modal fade" id="mdlEdit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropEdit">Edit Menu </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnSaveEdit">Save changes</button>
                </div>
            </div>
        </div>
    </div>


    <button id="downloadPDF">Download PDF</button>
    <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>

</html>

<script src='http://127.0.0.1/IMS_Proplus/assets/js/test.js'></script>

<!-- <script>
    $(document).ready(function() {
        $('#downloadPDF').on('click', function() {
            var doc = new jsPDF();

            // Convert the table to a PDF table
            doc.autoTable({
                html: '#dataTable'
            });

            // Save the PDF
            doc.save('table.pdf');
        });
    });
</script> -->