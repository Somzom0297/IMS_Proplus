<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
	
	private $another_css;
    private $another_js;
    private $data;
	public function __construct() {

		parent::__construct();

		$this->load->helper('url');
		$this->load->library('parser');
		$this->load->library('session');

        
		$this->data["base_url"] = base_url();

		$result['base_url'] = base_url();
        $result['site_url'] = site_url();

        $this->data = $result;
        $this->header = $result;
        $this->slide_bar = $result;
        $this->footer = $result;


        if (!$this->session->userdata('userId')) {
            redirect(base_url() . 'Login/login');

        }

	}

	protected function render_view($path)
    {

        $this->data['another_css'] = $this->another_css;
        $this->data['another_js'] = $this->another_js;

    }
	public function testpdf()
	{
		$this->another_js = "<script src='" . base_url() . "assets/js/test.js'></script>";
		$this->load->view('main/view_test');
	}
}
