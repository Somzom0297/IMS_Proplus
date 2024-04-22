<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate PDF</title>
    <!-- Include jsPDF library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
    <!-- Your HTML content here -->
    <button id="export-pdf">Export PDF</button>

    <!-- Your JavaScript code here -->
    <script>
        // Add event listener to the button
        document.getElementById('export-pdf').addEventListener('click', function() {
            // Create a new instance of jsPDF
            var doc = new jsPDF();

            // Add content to the PDF
            doc.text('Hello, world!', 10, 10);

            // Save the PDF
            doc.save('document.pdf');
        });
    </script>
</body>
</html>
