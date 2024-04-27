<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once APPPATH . '/libraries/fpdf.php';

class Pdf extends FPDF {
    
    public function __construct() {
        parent::__construct();
        
        // Your constructor code here
    }
    
    public function Header() {
        $data = [
            'col1' => 'Hello d!',
            'col2' => 'Hello d!',
            'col3' => 'Hello d!',
            'col4' => 'Hello d!',
            'col5' => 'Hello d!',
            'col6' => 'Hello d!',

        ];
        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial','B',16);
        $pdf->Cell(40,10,$data['title']);
        $pdf->Output();
    }
    public function generatePdf() {
        // Load data from the model
        $this->load->model('your_model');
        $data = $this->your_model->get_data(); // Assuming you have a method to get data from the model
        
        // Load the FPDF library and create a new instance of Test class
        require_once APPPATH . '/libraries/fpdf.php';
        require_once APPPATH . '/libraries/Test.php';
        $pdf = new Test($data);
        
        // Add a page
        $pdf->AddPage();
        
        // Generate content using the data
        $pdf->generateContent();
        
        // Output the PDF
        $pdf->Output();
    }
    // Additional methods if needed
}