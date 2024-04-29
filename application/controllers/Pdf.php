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

    // Additional methods if needed
}