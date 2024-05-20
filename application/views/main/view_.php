<div class="container-fluid">
    <!--  Row 1 -->
    <div>
        <div class="card bg-info-subtle  shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body pb-0 pt-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8"><i class="ti-file"></i> Goods Receive</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                                <li class=" breadcrumb-item" aria-current="page">Inventory
                                </li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
        <div class="form-group row mb-3">
            <div class="col-lg-12 mb-4">
                <button type="button" class="btn btn-circle btn-success" style="background-color: #15CEA2!important;float:right" id="btnCreate"><i class="ti-plus"></i> <b>Create new</b></button>
            </div>


            <div class="col-lg-3">
                <button type="button" class="btn btn-circle btn-light " id="btnPrint"><i class="ti-printer"></i> Print</button>
                <button type="button" class="btn btn-circle btn-danger" id="btnpdf"><i class="ti-file"></i> PDF</button>
            </div>

            <div class="col-lg-5">

            </div>

            <div class="col-lg-2">

                <label for="" class="form-label">Select Year</label>
                <select id="yearSelect" class="form-control" placeholder="Select Year">
                </select>
            </div>

            <div class="col-lg-2">

                <label for="" class="form-label">Select Month</label>
                <select id="monthSelect" class="form-control" placeholder="Select Month">
                </select>
            </div>

        </div>
        <div class="card border">
            <div class="card-body">
                <!-- start page container -->
                <div class="table-responsive text-nowrap">
                    <div class="card-datatable table-responsive pt-0">
                        <table class="table card-table border" style="width:100%" id="tblStockRecive">
                            <thead>
                                <tr>
                                    <th class="text-center">NO.</th>
                                    <th class="text-center">Doc No.</th>
                                    <th class="text-center">DATE</th>
                                    <th class="text-center">INV No.</th>
                                    <th class="text-center">PO NO</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            <tbody class="table-border-bottom-0 text-center">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="card" style="display: none;" id="content">
                <div class="col-sm-12 mt-3">
                    <div class="row ">
                        <div class="col-md-12">
                            <div class="card container">
                                <div class="row py-2 mt-2">
                                    <span class="fs-5 fw-bold text-primary-emphasis">Register Permission</span>
                                    <div class="col-md-5 col-sm-10 col-5 mt-3">
                                        <div class="row ">
                                            <div class="col-lg-3 p-t-20">
                                                <span>Sub Menu</span><span class="red-text">*</span>
                                            </div>
                                            <div class="col-lg">
                                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                    <select class="form-control" id="selMenuGroupName">
                                                        <option value="">Choose main menu</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5 col-sm-2 col-5">
                                        <div class="row ">
                                            <div class="col-lg-5 p-t-20">
                                                <span>Sub Menu controller</span><span class="red-text">*</span>
                                            </div>
                                            <div class="col-lg">
                                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                    <select class="form-control" id="selSubMenuName">
                                                        <option value="">Choose main menu</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md col-sm-2 col-2 p-t-20">
                                        <button type="button" class="btn btn-circle btn-primary" id="btnSaveAddPer">Add</button>
                                    </div>
                                    <div class="col-12 col-sm-12 justify-content-start">
                                        <div id="errMegadd" style="color: red; display: none;">Please enter in English only.</div>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive text-nowrap">
                                            <div class="card-datatable table-responsive pt-0">
                                                <table class="table card-table" id="tblPermis">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">No.</th>
                                                            <th class="text-center">Main Menu</th>
                                                            <th class="text-center">Sub Menu</th>
                                                            <th class="text-center">Update Date</th>
                                                            <th class="text-center">Update By</th>
                                                            <th class="text-center">Stasus</th>
                                                            <th class="text-center">Action</th>
                                                            <th class="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table-border-bottom-0 text-center" id="tbody">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="card-foot mt-2">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--/ Bordered Table -->

                                <!-- Button trigger modal -->

                                <!-- Modal -->
                                <div class="modal fade" id="mdlEdit" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropEdit">Edit Menu </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <div class="col mb-3">
                                                        <label for="edtSubMenu" class="form-label">Main Menu</label>
                                                        <input type="text" id="edtSubMenu" class="form-control" placeholder="Enter Main Menu">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col mb-3">
                                                        <label for="edtController" class="form-label">Main Menu Icon</label>
                                                        <input type="text" id="edtController" class="form-control" placeholder="Enter Main Menu Icon">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col mb-3">
                                                        <label for="edtOrderNo" class="form-label">Order No.</label>
                                                        <input type="text" id="edtOrderNo" class="form-control" placeholder="Enter Order No.">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" id="btnSaveEdit">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Receive Details</h3>
                    <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="col-lg-12 mb-3">
                            <label class="col-form-label">
                                <h5 style="font-weight: 600;"><i class="ti-file" style="padding-right: 7px;"></i>Form input location stock</h5>
                            </label>
                        
                           <button type="button" class="btn btn-circle btn-secondary float-end" id="btnDownload">Download</button>
                        </div>
                        
                        <div class="col-lg-3">
                            <label for="edtMainMenu" class="form-label">Document Number</label>
                            <input type="text" id="docNumber" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Invoice Number</label>
                            <input type="text" id="invNumber" class="form-control">
                        </div>

                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">PO Number</label>
                            <input type="text" id="poNumber" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtMainIcon" class="form-label">Create Date</label>
                            <input type="text" id="invDate" class="form-control">
                        </div>
                    </div>
                    
                    <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Date</label>
                            <input type="Date" id="edtOrderNo" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Date</label>
                            <input type="Date" id="edtOrderNo" class="form-control">
                        </div>
                        <div class="col-lg-6">
                            <label for="edtOrderNo" class="form-label">Supplier Name </label>
                            <input type="text" id="edtOrderNo" class="form-control">
                        </div>
                    </div>
                    <hr>
                    <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-circle btn-success" id="btnDownload"><i class="ti-plus"></i>Add</button>
                        </div>
                        <div class="col-lg-10">
                            <button type="button" class="btn btn-circle btn-danger float-end" id="btnDownload"><i class="ti-file"></i> PDF</button>
                            <button type="button" class="btn btn-circle btn-light float-end me-2" id="btnDownload"><i class="ti-printer"></i> Print</button>
                        </div>
                        
                    </div>
                        <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="table-responsive text-nowrap">
                                <div class="card-datatable table-responsive pt-0">
                                    <table class="table card-table border" style="width:100%" id="tblReceiveDetail">
                                        <thead>
                                            <tr>
                                                <th class="text-center">NO.</th>
                                                <th class="text-center">BRAND</th>
                                                <th class="text-center">PRODUCT</th>
                                                <th class="text-center">MODEL</th>
                                                <th class="text-center">DESCRIPTION</th>
                                                <th class="text-center">QTY</th>
                                                <th class="text-center">PRICE</th>
                                                <th class="text-center">ACTION</th>
                                            </tr>
                                        <tbody class="table-border-bottom-0 text-center">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnSaveEdit">Save changes</button>
                </div>
            </div>
        </div>
    </div>