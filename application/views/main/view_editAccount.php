<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">My Profile /</span> Account</h4>

  <div class="card mb-4">
    <!-- Account -->
    <div class="card-body d-flex justify-content-center">
      <div class="d-flex align-items-start align-items-sm-center gap-4">
        <img src="{base_url}src/assets/images/profile/PF_ad.jpg" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
      </div>
    </div>
    <div class="text-center  mb-4">
      <span><h5><?php echo $this->session->userdata('firstname');?></h5></span>
      <span><h5><?php echo $this->session->userdata('lastname');?></h5></span>
    </div>

    <hr class="my-0" />
    <div class="card-body">
      <form id="formAccountSettings" method="POST" onsubmit="return false">
        <div class="row">

          <div class="mb-3 col-md-6">
            <label for="empcode" class="form-label">Empcode</label>
            <input class="form-control" type="text" name="empcode" id="edtEmpCode" readonly/>
          </div>
          <div class="mb-3 col-md-6">
            <label for="firstName" class="form-label">Password</label>
            <input class="form-control" type="text" id="edtPassword" name="password" />
          </div>
          <div class="mb-3 col-md-6">
            <label for="firstName" class="form-label">First Name</label>
            <input class="form-control" type="text" id="edtFirstName" name="firstName" />
          </div>
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label">Last Name</label>
            <input class="form-control" type="text" name="lastName" id="edtLastName"   />
          </div>
          <div class="mb-3 col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input class="form-control" type="text" id="edtEmail" name="email"  placeholder="xxxx@xxx.xxx"  />
          </div>
        
          <div class="d-flex justify-content-end mt-2 pr-2">
            <button class="btn btn-primary me-2" id="btnSaveEdit">Save changes</button>
            <button type="reset" class="btn btn-outline-secondary">Cancel</button>
          </div>
      </form>
    </div>
  </div>
</div>