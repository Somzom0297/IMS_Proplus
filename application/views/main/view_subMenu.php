<div class="container-fluid">
    <!--  Row 1 -->
    <div>
        <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
            <div class="card-body px-5 py-3">
                <div class="row align-items-center">
                    <div class="col-9">
                        <h4 class="fw-semibold mb-8">Manage Sub Menu</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
                                </li>
                                <li class=" breadcrumb-item" aria-current="page">Manage Sub Menu
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

        <div class="card">
            <div class="card-body">
                <!-- start page container -->
                <div class="page-container">
                    <div class="row py-2">
                        <div class="col-1">
                            Main Menu
                        </div>
                        <div class="col">
                            <select class="form-control selMainMenu" id="selMainMenu">
                                <option value="">Choose main menu</option>
                            </select>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-circle btn-primary" id="btnSerchMain">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" style="display: none;" id="content">
            <div class="col-sm-12 mt-3">
                <div class="row ">
                    <div class="col-md-12">
                        <div class="card container">
                            <div class="row py-2 mt-2">
                                <span class="fs-5 fw-bold text-primary-emphasis mb-4">Register Sub Menu</span>
                                <div class="col-md-5 col-sm-10 col-5">
                                    <div class="row ">
                                        <div class="col-lg-3 p-t-20">
                                            <span>Sub Menu</span><span class="red-text">*</span>
                                        </div>
                                        <div class="col-lg">
                                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                <input class="form-control" type="text" id="inpSubMenuName" oninput="InputAdd(this)">

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
                                                <input class="form-control" type="text" id="inpSubMenuCon" oninput="InputAdd(this)">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md col-sm-2 col-2 p-t-20">
                                    <button type="button" class="btn btn-circle btn-primary" id="btnSaveAdd">Add</button>
                                </div>
                                <div class="col-12 col-sm-12 justify-content-start">
                                    <div id="errMegadd" style="color: red; display: none;">Please enter in English only.</div>
                                </div>                             
                                <div class="card-body">
                                    <div class="table-responsive text-nowrap">
                                        <div class="card-datatable table-responsive pt-0">
                                            <table class="table card-table" id="tblSubMenu">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Sub Menu</th>
                                                        <th>Menu Controller</th>
                                                        <th>Update Date</th>
                                                        <th>Update By</th>
                                                        <th>Stasus</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0" id="tbody">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--/ Bordered Table -->

                            <!--Edit Modal -->
                            <!-- Modal -->
                            <div class="modal fade" id="mdlEdit" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropEdit">Modal title</h5>
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