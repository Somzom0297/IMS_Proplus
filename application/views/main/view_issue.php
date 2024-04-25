<div class="container-fluid">
    <!--  Row 1 -->
    <div>
        <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body pb-0 pt-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8"><i class="ti-file"></i> Goods Issue </h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                                <li class=" breadcrumb-item" aria-current="page"> Goods Issue
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
                        <table class="table card-table border" style="width:100%" id="tblStockIssue">
                            <thead>
                                <tr>
                                    <th class="text-center">NO.</th>
                                    <th class="text-center">Doc No.</th>
                                    <th class="text-center">DATE</th>
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
    <div class="modal fade" id="createModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i>Issue Details</h3>
                    <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="RegisterReceive" enctype="multipart/form-data">
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-12 mb-3">
                                <label class="col-form-label">
                                    <h4 style="font-weight: 600;"><i class="ti-file" style="padding-right: 7px;"></i>Form input location stock</h4>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Document Number</label>
                                <input type="text" id="inpAddDoc" class="form-control" placeholder="Enter Document Number">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainIcon" class="form-label">Document Date</label>
                                <input type="date" id="inpAddDocDate" class="form-control">
                            </div>
                        </div>
                    </form>
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
                    <button type="button" class="btn btn-primary" id="btnSaveReceive">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="detailsModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width:1200px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" style="padding: 0px 10px;margin: 10px 0px;font-weight: 600;"><i class="ti-pencil-alt mr-3"></i> Issue Details</h3>
                    <button type="button" class="btn-close me-2 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form id="RegisterReceive" enctype="multipart/form-data">
                        <div class="form-group row mb-2" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                            <div class="col-lg-12 mb-3">
                                <label class="col-form-label">
                                    <h4 style="font-weight: 600;"><i class="ti-file" style="padding-right: 7px;"></i>List Goods Issue</h4>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainMenu" class="form-label">Document Number</label>
                                <input type="text" id="inpAddDocDetail" class="form-control" placeholder="Enter Document Number">
                            </div>
                            <div class="col-lg-3">
                                <label for="edtMainIcon" class="form-label">Document Date</label>
                                <input type="date" id="inpAddDocDateDetail" class="form-control">
                            </div>
                        </div>
                    </form>
                    <div class="form-group row mb-3 mt-3" style="padding: 0px 10px;padding-bottom: 20px;margin: 10px 0px;">
                        <div class="table-responsive text-nowrap">
                            <div class="card-datatable table-responsive pt-0">
                                <table class="table card-table border" style="width:100%" id="tblProductIssueDetails">
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