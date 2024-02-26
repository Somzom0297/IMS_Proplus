<div class="container-fluid">
	<!--  Row 1 -->
	<div>
		<div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-5">
			<div class="card-body px-5 py-3">
				<div class="row align-items-center">
					<div class="col-9">
						<h4 class="fw-semibold mb-8">Manage Account</h4>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item">
									<a class="text-muted text-decoration-none" href="<?php echo base_url('Dashboard/dashboard'); ?>">Home</a>
								</li>
								<li class=" breadcrumb-item" aria-current="page">Manage Account
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
		<!-- Content wrapper -->
		<div class="content-wrapper">
			<!-- Content -->
			<div class="container-xxl flex-grow-1 container-p-y">
				<!-- Bordered Table -->

				<div class="card">
					<div class="card-body">
						<div class="mb-5">
							<h4 class="fs-5 fw-bold text-primary-emphasis ">Account</h4>
						</div>
						<div class="d-flex justify-content-end mt-2 pr-2">
							<button type="button" class="btn btn-circle btn-primary" id="callmodelAdd" data-bs-toggle="modal" data-bs-target="#mdlAdd"><i class="fa fa-plus"></i>Add Account </button>
						</div>
						<hr>
						<div class="table-responsive text-nowrap">
							<!-- Removed scrollBody -->
							<div class="card-datatable table-responsive pt-0">
								<table class="table card-table" id="tblManageAccount">
									<thead>
										<tr>
											<th class="text-center">No.</th>
											<th class="text-center">Emp Code</th>
											<th class="text-center">Group</th>
											<th class="text-center">Name</th>
											<th class="text-center">Email</th>
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
			</div>
		</div>

		<!--/ Bordered Table -->



		<!-- Button trigger modal -->


		<!-- Modal Add-->
		<div class="modal fade" id="mdlAdd" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel1">ADD ACCOUNT</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form action="" id="add" autocomplete="off">
							<div class="row g-2">
								<div class="col mb-0">
									<label class="form-label">Employee Code</label><span class="red-text">*</span>
									<input type="text" id="inpEmpCode" class="form-control" placeholder="Emp Code" oninput="InputAddEmpcode(this)">
								</div>
								<div class="col mb-0">
									<label class="form-label">Employee Password</label><span class="red-text">*</span>
									<input type="password" id="inpEmpPassword" class="form-control" placeholder="Password">
								</div>
							</div>
							<div class="row g-2">
								<div class="col mb-0">
									<label class="form-label">First name</label><span class="red-text">*</span>
									<input type="text" id="inpFirstName" class="form-control" placeholder="FirstName" oninput="InputAddpersonal(this)">
								</div>
								<div class="col mb-0">
									<label class="form-label">Last name</label><span class="red-text">*</span>
									<input type="text" id="inpLastName" class="form-control" placeholder="LastName" oninput="InputAddpersonal(this)">
								</div>
							</div>
							<div class="row">
								<div class="col mb-3">
									<label class="form-label">Email</label><span class="red-text">*</span>
									<input type="email" id="inpEmail" class="form-control" placeholder="xxxx@xxx.xx" oninput="InputAdd(this)">
								</div>
							</div>



							<div class="row">
								<div class="col mb-3">
									<label class="form-label">Permission group</label><span class="red-text">*</span>
									<select id="selPermissionAdd" class="selPermissionAdd select2 form-select" data-allow-clear="true">
										<option value="">Choose Permission Group</option>
									</select>
								</div>
							</div>

							<div class="row">
								<div class="col mb-3">
									<label class="form-label">Plant</label><span class="red-text">*</span>
									<select id="selPlantAdd" class="selPlantAdd select2 form-select" data-allow-clear="true">
										<option value="">Choose Plant</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<div class="container col justify-content-start">
							<div id="errMegadd" style="display: none; color: red; ">Please enter in English only.</div>
							<div id="errAddempcode" style="display: none; color: red; ">Please enter Employee Code as (a-z ,A-Z ,0-9) only.</div>
							<div id="errAddpersonal" style="display: none; color: red; ">Please enter Firstname or Lastname as (a-z ,A-Z) only.</div>
						</div>
						<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" id="btnBack">Back</button>
						<button type="button" class="btn btn-primary" id="btnSaveAdd">Save</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End Modal Add-->



		<!-- Modal Edit-->
		<div class="modal fade" id="mdlEdit" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel1">Edit Account</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row g-2">
							<div class="col mb-0">
								<label class="form-label">Employee Code</label>
								<input type="text" id="edtEmpCode" class="form-control" placeholder="Emp Code" oninput="InputAddEmpcode(this)" readonly>
							</div>
							<div class="col mb-0">
								<label class="form-label">Employee Password</label>
								<input type="password" id="edtEmpPassword" class="form-control" placeholder="Password">
							</div>
						</div>
						<div class="row g-2">
							<div class="col mb-0">
								<label class="form-label">First name</label>
								<input type="text" id="edtFirstName" class="form-control" placeholder="FirstName" oninput="InputAddpersonal(this)">
							</div>
							<div class="col mb-0">
								<label class="form-label">Last name</label>
								<input type="text" id="edtLastName" class="form-control" placeholder="LastName" oninput="InputAddpersonal(this)">
							</div>
						</div>
						<div class="row">
							<div class="col mb-3">
								<label class="form-label">Email</label>
								<input type="email" id="edtEmail" class="form-control" placeholder="xxxx@xxx.xx" oninput="InputAdd(this)">
							</div>
						</div>



						<div class="row">
							<div class="col mb-3">
								<label class="form-label">Permission group</label>
								<select id="edtPermission" class="edtPermission select2 form-select" data-allow-clear="true">
									<option value="">Choose Permission Group</option>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="col mb-3">
								<label class="form-label">Plant</label>
								<select id="edtPlantEdit" class="edtPlantEdit select2 form-select" data-allow-clear="true">
									<option value="">Choose Plant</option>
								</select>
							</div>
						</div>

					</div>
					<div class="modal-footer">
						<div class="container col justify-content-start">
							<div id="errMegadd" style="display: none; color: red; ">Please enter in English only.</div>
							<div id="errAddempcode" style="display: none; color: red; ">Please enter Employee Code as (a-z ,A-Z ,0-9) only.</div>
							<div id="errAddpersonal" style="display: none; color: red; ">Please enter Firstname or Lastname as (a-z ,A-Z) only.</div>
						</div>
						<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" id="btnBack">Back</button>
						<button type="button" class="btn btn-primary" id="btnSaveEdit">Save</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End Edit Modal -->
	</div>
	<!-- <table id="ex" class="table">
        <thead>
            <tr>
                <th>No.</th>
                <th>Emp Code</th>
                <th>Group</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
				<th>Action</th>
            </tr>
        </thead>
        <tbody class="table-border-bottom-0 text-center" id="tbody">
           
            
        </tbody>
        <tfoot>
           
        </tfoot>
    </table> -->
</div>