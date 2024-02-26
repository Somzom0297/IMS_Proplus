"use strict";

$(function () {
  showProjectlistManage(); //-------------------------- Table Account ----------------------------------

  function showProjectlistManage() {
    var url = API_URL + "Manage_account/show_user"; // alert(url);

    $.ajax({
      method: "get",
      url: base_url("ManageAccount/callApi?url=" + url),
      dataType: 'Json',
      success: function success(response) {
        // console.log(response);
        if (response.everyone.length > 0) {
          var html = "";

          for (var i = 0; i < response.everyone.length; i++) {
            var data = response.everyone[i];
            var btnStatus;

            if (data.status == 1) {
              btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-success btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.user_id, "\">Anable</button>");
            } else {
              btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-warning btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.user_id, "\">Disable</button>");
            }

            html += "\n\t                    <tr>\n\t                        <td class=\"text-center\">".concat(i + 1, "</td>\n\t                        <td class=\"text-center\">").concat(data.emp_code, "</td>\n\t                        <td class=\"text-center\">").concat(data.group_name, "</td>\n                            <td class=\"text-center\">").concat(data.firstname, "</td>\n\t                        <td class=\"text-center\"><a href=\"mailto:").concat(data.email, "\">\n                            ").concat(data.email, " </a></td>\n                            <td class=\"text-center\">").concat(btnStatus, "</td>\n                            <td class=\"text-center\">\n                                <a data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\" class=\"tblDelBtn\" data-id=\"").concat(data.user_id, "\"\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-pencil\"></i>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</td>\n\t                      </tr>");
          }

          $("#tbody").html(html).promise().done(function () {
            $("#tblManageAccount").DataTable({
              scrollX: true
            });
          });
        }
      },
      error: function error(err) {
        console.log(err);
      }
    });
  }

  ; //-------------------------- Updaye flg status ----------------------------------

  $(document).on('click', '.btnStatus', function () {
    var id = $(this).attr('data-id');
    var btnStatus = $(this).closest('td').find('.btnStatus').val(); // alert(btnStatus)

    if (btnStatus == 1) {
      var upDateStatus = '0';
    } else {
      var upDateStatus = '1';
    }

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You want be chang status",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, chang!'
    }).then(function (result) {
      if (result.isConfirmed) {
        var url = API_URL + "Manage_account/upd__status_User?user_id=" + id;
        $.ajax({
          url: base_url('ManageAccount/callApiUpdateStatus'),
          type: 'POST',
          data: {
            id: id,
            upDateStatus: upDateStatus
          },
          dataType: 'Json',
          success: function success(response) {
            if (response.result == 1) {
              Swal.fire({
                icon: 'success',
                title: 'Success !',
                html: 'Chang status success',
                timer: 1000
              }).then(function () {
                location.reload();
              });
            }
          }
        });
      }
    });
  }); //-------------------------- add Account ----------------------------------

  $(document).on('click', '#btnSaveAdd', function () {
    var arrDataAdd = [];
    var EmpCode = $('#inpEmpCode').val();
    var EmpPassword = $('#inpEmpPassword').val();
    var FirstName = $('#inpFirstName').val();
    var LastName = $('#inpLastName').val();
    var Email = $('#inpEmail').val();
    var Permission = $('#selPermissionAdd').val();
    var Plant = $('#selPlantAdd').val();

    if (EmpCode == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter employee code'
      });
    } else if (EmpPassword == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter password'
      });
    } else if (FirstName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter FirstName'
      });
    } else if (LastName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter LastName'
      });
    } else if (Permission == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese choose Permission'
      });
    } else if (Plant == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese choose Plant'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to add Account",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add account!'
      }).then(function (result) {
        if (result.isConfirmed) {
          arrDataAdd.push({
            EmpCode: EmpCode,
            EmpPassword: EmpPassword,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Permission: Permission,
            Plant: Plant
          });
          var url = API_URL + "Manage_account/ins_User";
          $.ajax({
            url: base_url("ManageAccount/callApiAddAccount?url=" + url),
            type: 'POST',
            data: {
              arrDataAdd: arrDataAdd
            },
            dataType: 'json',
            success: function success(res) {
              if (res.result == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success !',
                  html: 'Add account success',
                  timer: 1000
                }).then(function () {
                  location.reload();
                });
              } else if (res.result == 9) {
                Swal.fire({
                  icon: 'error',
                  title: 'Ooops...',
                  html: 'This employee code already exists.'
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ooops...',
                  html: 'A system error has occurred.'
                });
              }
            }
          });
        }
      });
    }
  }); //-------------------------- Updaye Account ----------------------------------

  var accId;
  $(document).on('click', '.tblDelBtn', function () {
    var id = $(this).attr('data-id');
    accId = id;
    var url = API_URL + "Manage_account/show_upd_User?user_id=" + id;
    $.ajax({
      url: base_url('ManageAccount/callApiEditAccount?url=' + url),
      type: 'POST',
      data: {
        id: id
      },
      dataType: 'Json',
      success: function success(response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
          var data = response[i];
          $('#edtEmpCode').val(data.emp_code).trigger("change");
          $('#edtFirstName').val(data.firstname).trigger("change");
          $('#edtLastName').val(data.lastname).trigger("change");
          $('#edtEmail').val(data.email).trigger("change");
          $('#edtPermissionEdit').val(data.permis_id).trigger("change");
          $('#edtPlantEdit').val(data.plant).trigger("change");
        }
      }
    });
  }); //-------------------------- Save Edit ----------------------------------

  $(document).on('click', '#btnSaveEdit', function () {
    var arrDataEdit = [];
    var EmpPassword = $('#edtEmpPassword').val();
    var FirstName = $('#edtFirstName').val();
    var LastName = $('#edtLastName').val();
    var Email = $('#edtEmail').val();
    var Permission = $('#edtPermissionEdit').val();
    var Plant = $('#edtPlantEdit').val();

    if (FirstName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter FirstName'
      });
    } else if (LastName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter LastName'
      });
    } else if (Permission == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese choose Permission'
      });
    } else if (Plant == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese choose Plant'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save edit",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,save!'
      }).then(function (result) {
        if (result.isConfirmed) {
          if (EmpPassword == '') {
            arrDataEdit.push({
              accId: accId,
              EmpPassword: null,
              FirstName: FirstName,
              LastName: LastName,
              Email: Email,
              Permission: Permission,
              Plant: Plant
            });
          } else {
            arrDataEdit.push({
              accId: accId,
              EmpPassword: EmpPassword,
              FirstName: FirstName,
              LastName: LastName,
              Email: Email,
              Permission: Permission,
              Plant: Plant
            });
          }

          var url = API_URL + "Manage_account/upd_User";
          $.ajax({
            url: base_url("ManageAccount/callApiUpdateAccount?url=" + url),
            type: 'POST',
            data: {
              arrDataEdit: arrDataEdit
            },
            dataType: 'json',
            success: function success(res) {
              console.log(res);

              if (res.result == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success !',
                  html: 'Add account success',
                  timer: 1000
                }).then(function () {
                  location.reload();
                });
              } else if (res.result == 9) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  html: 'save edits success'
                }).then(function () {
                  location.reload();
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ooops...',
                  html: 'A system error has occurred.'
                });
              }
            }
          });
        }
      });
    }
  });
});