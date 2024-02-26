<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>IMS</title>
  <link rel="shortcut icon" type="image/png" href="{base_url}src/assets/images/logos/propluslg.png" />
  <link rel="stylesheet" href="{base_url}src/assets/css/styles.min.css" />
  <style>
    body {
      background-image: url('https://propluscorp.co.th/wp-content/uploads/2021/09/background-Wave-Pro.svg');
      background-repeat: no-repeat;
      background-size: cover; /* or "contain" depending on your preference */
      background-position: center center;
      background-attachment: fixed; /* This will make the background fixed */
    }
  </style>
</head>

<body>
  
  <!--  Body Wrapper -->
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a href="#" class="text-nowrap logo-img text-center d-block py-3 w-100 mb-4">
                  <img src="{base_url}src/assets/images/logos/propluslg.png" width="180" alt="">
                </a>
                <form autocomplete="off">
                  <div class="mb-3">
                    <label for="username" class="form-label">Employee Code</label>
                    <input type="text" class="form-control" id="username" name="username">
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password">
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                      <!-- <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                      <label class="form-check-label text-dark" for="flexCheckChecked">
                        Remeber this Device
                      </label> -->
                    </div>
                  </div>
                  <!-- <a href="./index.html" class="btn btn-primary w-100 py-8 fs-4 mb-5 rounded-2">Sign In</a> -->
                  <div class="d-grid gap-2">
                    <button id="btnLogin" type="button" class="btn btn-success w-100 py-8 fs-4 mb-5 rounded-2">
                      Login
                    </button>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-1 mb-0 fw-bold">Developed by </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- ============================================================== -->
  <!-- Create function baseUrl  -->
  <!-- ============================================================== -->

  <script>
  
    function base_url(url) {
        return '<?php echo $base_url; ?>' + url;
    }

    </script>

  <!-- ============================================================== -->
  <!-- All Required js -->
  <!-- ============================================================== -->

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <script src="{base_url}src/assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="{base_url}src/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="{base_url}src/assets/js/login.js"></script>
  
    <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->

</body>

</html>