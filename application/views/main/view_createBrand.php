<div class="container-fluid">
        <div class="mb-5">
            <div class="card-body pb-0 pt-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8"><i class="ti-file"></i> Brand </h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
        </div>

        <div class="form-group row mb-3">
            <div class="col-lg-3">
                <!-- <button type="button" class="btn btn-circle btn-light " id="btnPrint"><i class="ti-printer"></i> Print</button>
                <button type="button" class="btn btn-circle btn-danger" id="btnpdf"><i class="ti-file"></i> PDF</button> -->
            </div>

            <div class="col-lg-9">
                <button type="button" class="btn btn-success mb-3" style="float:right" id="btnAddBrand"><i class="ti-plus"></i> Add Brand</b></button>
            </div>
        </div>

        <div class="card border">
            <div class="card-body">
                <div class="table-responsive text-nowrap">
                    <div class="card-datatable table-responsive pt-0">
                        <table class="table card-table border" style="width:100%" id="tblBrandDetail">
                            <thead>
                                <tr>
                                    <th class="text-center">NO.</th>
                                    <th class="text-center">BRAND</th>
                                    <th class="text-center">CREATE BY</th>
                                    <th class="text-center">CREATE DATE</th>
                                    <th class="text-center">STATUS</th>
                                    <th class="text-center">ACTION</th>
                                    
                                </tr>
                            <tbody class="table-border-bottom-0 text-center">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

        <div class="modal fade" id="mldAddBrand" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl" style="width:1200px" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" style="margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Add Brand</h3>
                    </div>
                    <div class="modal-body">
                        <form id="formAddProduct" enctype="multipart/form-data">
                            <hr>
                            <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                                <div class="col-lg-12 mb-3">
                                    <label class="col-form-label">
                                        <h4 style="font-weight: 600;"><i class="ti-package" style="padding-right: 7px;"></i>Form input brand</h4>
                                    </label>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="edtMainMenu" class="form-label">Brand</label>
                                    <input type="text " id="inpAddBrand" class="form-control" placeholder="Enter Brand">
                                </div>
                            </div>
                            <hr>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="btnAddSaveBrand">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="mldEditBrand" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" style="margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Edit Brand</h3>
                    </div>
                    <div class="modal-body">
                        <form id="formAddProduct" enctype="multipart/form-data">
                            <hr>
                            <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                                <div class="col-lg-12 mb-3">
                                    <label class="col-form-label">
                                        <h4 style="font-weight: 600;"><i class="ti-package" style="padding-right: 7px;"></i>Form input brand</h4>
                                    </label>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="edtMainMenu" class="form-label">Brand</label>
                                    <input type="text " id="inpEditBrand" class="form-control" placeholder="Enter Brand">
                                    <input type="hidden" id="inpBrandId" class="form-control" placeholder="Enter Brand">
                                </div>
                            </div>
                            <hr>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="btnEditSaveBrand">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


        
    </div>