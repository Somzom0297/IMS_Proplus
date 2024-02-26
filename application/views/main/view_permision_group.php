<div class="container-fluid">
    <!--  Row 1 -->
    <div>
        <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body px-5 py-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8">Permision Group</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                                <li class=" breadcrumb-item" aria-current="page">Permision Group
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div class="col-3">
                        <div class="text-center mb-n5">
                            <!-- <img src="../assets/images/breadcrumb/ChatBc.png" alt="" class="img-fluid mb-n4" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- start page container -->
        <!-- Content wrapper -->
        <div class="content-wrapper">
            <!-- Content -->

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="card">

                    <div class="card-body">
                        <div class="row py-2 mt-2">
                            <span class="fs-5 fw-bold text-primary-emphasis mb-5">Permission Group</span>
                            <div class="col-md-6 col-sm-10 col-5">
                                <div class="row ">
                                    <div class="col-lg-3 p-t-20 mb-4">
                                        <span>Permission Group Name</span><span class="red-text"></span>
                                    </div>
                                    <div class="col">
                                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                            <input class="form-control" type="text" id="inpPermisGroup" oninput="InputAdd(this)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md col-sm-2 col-2 p-t-20">
                                <button type="button" class="btn btn-circle btn-primary" id="btnSaveAdd"><i class="fa fa-plus"></i> Add Permision Group</button>
                            </div>
                            <div class="col justify-content-start ms-1">
                                <div id="errMegadd" style="color: red; display: none;">Please enter in English only.</div>
                            </div>
                        </div>
                        <hr>
                        <div class="table-responsive text-nowrap">
                            <div class="card-datatable table-responsive pt-0">
                                <table class="table card-table" id="tblPermisGP">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No.</th>
                                            <th class="text-center">Permission Group Name</th>
                                            <th class="text-center">Update Date</th>
                                            <th class="text-center">Update By</th>
                                            <th class="text-center">Status</th>
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
                                <h5 class="modal-title" id="exampleModalLabel1">Edit Permission Group</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col mb-3">
                                        <label for="edtGroup" class="form-label">Permission Group Name</label>
                                        <input type="text" id="edtGroup" class="form-control" placeholder="Enter Permission Group Name">
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