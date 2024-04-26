    <div class="container-fluid">
        <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body pb-0 pt-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8"><i class="ti-file"></i> Product Detail </h4>
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
            <div class="col-lg-3">
                <!-- <button type="button" class="btn btn-circle btn-light " id="btnPrint"><i class="ti-printer"></i> Print</button>
                <button type="button" class="btn btn-circle btn-danger" id="btnpdf"><i class="ti-file"></i> PDF</button> -->
            </div>

            <div class="col-lg-9">
                <button type="button" class="btn btn-primary mb-3" style="float:right" id="btnAddProduct"><i class="ti-plus"></i> Add Product</b></button>
            </div>
        </div>

        <div class="card border">
            <div class="card-body">
                <div class="table-responsive text-nowrap">
                    <div class="card-datatable table-responsive pt-0">
                        <table class="table card-table border" style="width:100%" id="tblProductDetail">
                            <thead>
                                <tr>
                                    <th class="text-center">NO.</th>
                                    <th class="text-center">PICTURE</th>
                                    <th class="text-center">BRAND</th>
                                    <th class="text-center">PRODUCT ID</th>
                                    <th class="text-center">MODEL</th>
                                    <th class="text-center">DISCRPTION</th>
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

        <div class="modal fade" id="detailProduct" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl" style="width:1200px" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Receive Details</h3>
                        <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">

                            <div class="col-lg-4">
                                <label for="edtMainMenu" class="form-label">Total</label>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3">Total</span>
                                    <input type="text" class="form-control" id="inpTotal" aria-describedby="basic-addon3">
                                </div>
                            </div>
                            <div class="col-lg-4">

                                <label for="edtMainMenu" class="form-label">Product Code</label>
                                <input type="text" class="form-control" id="inpProduct" aria-describedby="basic-addon3">

                            </div>
                            <div class="col-lg-4">

                                <label for="edtMainMenu" class="form-label">Brand</label>
                                <input type="text" class="form-control" id="inpBrand" aria-describedby="basic-addon3">

                            </div>

                        </div>
                        <div class="form-group row" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-2">
                                <label for="edtMainMenu" class="form-label">Index</label>
                                <input type="text" class="form-control" id="inpIndex" aria-describedby="basic-addon3">
                            </div>
                            <div class="col-lg-2">
                                <label for="edtMainMenu" class="form-label">Size</label>
                                <input type="text" class="form-control" id="inpSize" aria-describedby="basic-addon3">
                            </div>
                            <div class="col-lg-4">
                                <label for="edtMainMenu" class="form-label">MODEL</label>
                                <input type="text" class="form-control" id="inpModel" aria-describedby="basic-addon3">
                            </div>
                            <div class="col-lg-4">
                                <label for="edtMainMenu" class="form-label">DISCRIPTION</label>
                                <input type="text" class="form-control" id="inpDis" aria-describedby="basic-addon3">
                            </div>
                        </div>

                        <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="table-responsive text-nowrap">
                                <div class="card-datatable table-responsive pt-0">
                                    <table class="table card-table border" style="width:100%" id="tblReceiveDetail">
                                        <thead>
                                            <tr>
                                                <th class="text-center">NO.</th>
                                                <th class="text-center">Document Number</th>
                                                <th class="text-center">Document Date</th>
                                                <th class="text-center">QTY</th>
                                                <th class="text-center">PRICE</th>
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
                        <!-- <button type="button" class="btn btn-primary" id="btnSaveEdit">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="mldAddProduct" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl" style="width:1200px" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" style="margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Add Product</h3>
                        <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formAddProduct" enctype="multipart/form-data">
                            <hr>
                            <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                                <div class="col-lg-12 mb-3">
                                    <label class="col-form-label">
                                        <h4 style="font-weight: 600;"><i class="ti-package" style="padding-right: 7px;"></i>Form input product</h4>
                                    </label>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="edtMainMenu" class="form-label">Brand</label>
                                    <input type="text " id="inpAddBrand" class="form-control" placeholder="Enter Brand">
                                </div>
                                <div class="col-lg-3">
                                    <label for="edtMainMenu" class="form-label">Index Number</label>
                                    <input type="text " id="inpAddIndex" class="form-control">
                                </div>
                                <div class="col-lg-3">
                                    <label for="edtMainMenu" class="form-label">Size Box / Location</label>
                                    <select name="selAddSize" id="selAddSize" class="form-control">
                                        <option value="">- Size -</option>
                                    </select>
                                </div>
                                <div class="col-lg-3">
                                    <label for="edtMainIcon" class="form-label">Product Code</label>
                                    <input type="text" id="inpAddProduct" class="form-control" placeholder="Enter Product">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="edtOrderNo" class="form-label">Model</label>
                                    <input type="text" id="inpAddModel" class="form-control" placeholder="Enter Model">
                                </div>
                                <div class="col-lg-3">
                                    <label for="edtOrderNo" class="form-label">Unit</label>
                                    <input type="text" id="inpAddUnit" class="form-control" placeholder="Enter Unit">
                                </div>
                                <div class="col-lg-3">
                                    <label for="edtOrderNo" class="form-label">Price of Unit</label>
                                    <input type="text" id="inpAddUnitPrice" class="form-control" placeholder="Enter Price of Unit">
                                </div>
                                <div class="col-lg-6">
                                    <label for="edtOrderNo" class="form-label">Discription</label>
                                    <textarea name="" id="inpAddDis" class="form-control" id="" cols="30" rows="5" placeholder="Enter Discription"></textarea>
                                </div>
                                <div class="col-lg-6">
                                    <label for="edtOrderNo" class="form-label">Picture Product</label>
                                    <input type="file" class="form-control" id="fileProduct">
                                </div>
                            </div>
                            <hr>

                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="btnAddSaveProduct">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        
    </div>