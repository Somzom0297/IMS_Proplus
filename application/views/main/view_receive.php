<div class="container-fluid">
    <div>
        <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body pb-0 pt-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8"><i class="ti-file"></i> Goods Receive</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                                <li class=" breadcrumb-item" aria-current="page"> Goods Receive 
                                </li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
        <div class="form-group row mb-3">
            <div class="col-lg-12 mb-4">
                <!-- <button type="button" class="btn btn-circle btn-success" style="background-color: #15CEA2!important;float:right" id="btnCreate" data-bs-toggle="modal" data-bs-target="#createModal"><i class="ti-plus"></i> <b>Create new</b></button> -->
            </div>


            <div class="col-lg-3">
                <!-- <button type="button" class="btn btn-circle btn-light " id="btnPrint"><i class="ti-printer"></i> Print</button>
                <button type="button" class="btn btn-circle btn-danger" id="btnpdf"><i class="ti-file"></i> PDF</button> -->
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
                                    <th class="text-center">PO No.</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            <tbody class="table-border-bottom-0 text-center">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
 <!-- //////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="modal fade" id="mdlAddReceiveDetail" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i>Receive Details</h3>
                    <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data">
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-12 mb-3">
                                <label class="col-form-label">
                                    <h4 style="font-weight: 600;"><i class="ti-file" style="padding-right: 7px;"></i>Form input product</h4>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Product Code</label>
                                <select name="selAddProductCode" id="selAddProductCode" class="form-control">
                                    <option value="">- Product Code -</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Index Number</label>
                                <input type="text" id="inpAddIndex" class="form-control">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Size</label>
                                <input type="text " id="inpAddSize" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-3">
                                <label for="edtMainIcon" class="form-label">Brand</label>
                                <input type="text" id="selAddBrand" class="form-control">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Model</label>
                                <input type="text" id="selAddModel" class="form-control">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Qaulity</label>
                                <input type="text" id="inpAddQaulity" class="form-control" placeholder="Enter Qaulity">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Price /Unit </label>
                                <input type="text" id="inpAddPriceUnit" class="form-control" placeholder="Enter Price /Unit ">
                            </div>
                        </div>
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-6">
                                <label for="edtOrderNo" class="form-label">Discription </label>
                                <textarea name="" id="inpAddDiscription" cols="30" rows="5" class="form-control" placeholder="Enter Discription..."></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="CloseModal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnSaveReceive">Save changes</button>
                </div>
            </div>
        </div>
    </div>
 <!-- //////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="modal fade" id="mdlEditReceive" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i>Receive Details</h3>
                    <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data">
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-12 mb-3">
                                <label class="col-form-label">
                                    <h4 style="font-weight: 600;"><i class="ti-file" style="padding-right: 7px;"></i>Form input product</h4>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Product Number</label>
                                <select name="selEditProductCode" id="selEditProductCode" class="form-control">
                                    <option value="">- Product Code -</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Index Number</label>
                                <input type="text" id="inpEditIndex" class="form-control">
                                <input type="hidden" id="inpProductId" class="form-control">

                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Size</label>
                                <input type="text " id="inpEditSize" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-3">
                                <label for="edtMainIcon" class="form-label">Brand</label>
                                <input type="text" id="selEditBrand" class="form-control">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Model</label>
                                <input type="text" id="selEditModel" class="form-control">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Qaulity</label>
                                <input type="text" id="inpEditQaulity" class="form-control" placeholder="Enter Qaulity">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtOrderNo" class="form-label">Price /Unit </label>
                                <input type="text" id="inpEditPriceUnit" class="form-control" placeholder="Enter Price /Unit ">
                            </div>
                        </div>
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-6">
                                <label for="edtOrderNo" class="form-label">Discription </label>
                                <textarea name="" id="inpEditDiscription" cols="30" rows="5" class="form-control" placeholder="Enter Discription..."></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="CloseModal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnSaveEidtReceive">Save changes</button>
                </div>
            </div>
        </div>
    </div>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////// -->

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
                        </div>
                        <div class="col-lg-3">
                            <label for="edtMainMenu" class="form-label">Document Number</label>
                            <input type="text" id="docNumber" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtMainIcon" class="form-label">Document Date</label>
                            <input type="text" id="docDate" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Invoice Number</label>
                            <input type="text" id="invNumber" class="form-control">
                        </div>

                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Purchase Order</label>
                            <input type="text" id="poNumber" class="form-control">
                        </div>
                    </div>
                    
                    <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="col-lg-6">
                            <label for="edtOrderNo" class="form-label">Supplier Name </label>
                            <input type="text" id="supplierName" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Invoice Date</label>
                            <input type="Date" id="invDate" class="form-control">
                        </div>
                        <div class="col-lg-3">
                            <label for="edtOrderNo" class="form-label">Purchase Order Date</label>
                            <input type="Date" id="poDate" class="form-control">
                        </div>
                    </div>
                    <hr>

                    <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-circle btn-success" style="background-color: #15CEA2!important" id="btnAddReceiveDetail"><i class="ti-plus"></i> <b>Add</b></button>
                        </div>
                        <div class="col-lg-10">
                            <!-- <button type="button" class="btn btn-circle btn-danger float-end" id="btnDownload"><i class="ti-file"></i> PDF</button>
                            <button type="button" class="btn btn-circle btn-light float-end me-2" id="btnDownload"><i class="ti-printer"></i> Print</button> -->
                        </div>
                    </div>
                    <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="table-responsive text-nowrap">
                            <div class="card-datatable table-responsive pt-0">
                                <table class="table card-table border" style="width:100%" id="tblReceiveDetail">
                                    <thead>
                                        <tr>
                                            <th class="text-center">NO.</th>
                                            <th class="text-center">PIC</th>
                                            <th class="text-center">BRAND</th>
                                            <th class="text-center">PRODUCT</th>
                                            <th class="text-center">MODEL</th>
                                            <th class="text-center">DESCRIPTION</th>
                                            <th class="text-center">QTY</th>
                                            <th class="text-center">PRICE</th>
                                            <th class="text-center">AMOUNT</th>
                                            <th class="text-center">ACTION</th>
                                        </tr>
                                    <tbody class="table-border-bottom-0 text-center" id="tbody">
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
