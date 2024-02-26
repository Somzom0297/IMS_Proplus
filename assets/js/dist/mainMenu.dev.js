"use strict";

$(function () {
  showMainMenu(); //-------------------------- Table MainMenu ----------------------------------

  function showMainMenu() {
    var url = API_URL + "Manage_mainmenu/show_main_menu";
    $.ajax({
      method: "get",
      url: base_url("MainMenu/callApi?url=" + url),
      dataType: 'Json',
      success: function success(response) {
        console.log(response);

        if (response.length > 0) {
          var html = "";

          for (var i = 0; i < response.length; i++) {
            var data = response[i];
            var btnStatus;

            if (data.status == 1) {
              btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-success btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.smm_id, "\">Anable</button>");
            } else {
              btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-warning btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.smm_id, "\">Disable</button>");
            }

            html += "\n                    <tr>\n                        <td class=\"text-center\">".concat(i + 1, "</td>\n                        <td class=\"text-center\">").concat(data.smm_name, "</td>\n                        <td class=\"text-center\"><i class=\"").concat(data.smm_icon, "\"></i></td>\n                        <td class=\"text-center\">").concat(data.order_no, "</td>\n                        <td class=\"text-center\">").concat(data.created_date, "</td>\n                        <td class=\"text-center\">").concat(data.created_by, "</td>\n                        <td class=\"text-center\">").concat(btnStatus, "</td>\n                        <td class=\"text-center\">\n                            <a data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdropEdit\" class=\"tblDelBtn\" data-id=\"").concat(data.smm_id, "\"\">\n                                <i class=\"fa fa-pencil\"></i>\n                            </a>\n                        </td>\n                      </tr>");
          }

          $("#tbody").html(html).promise().done(function () {
            $("#tblMainMenu").DataTable({
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
        var url = API_URL + "Manage_mainmenu/upd_status_main_menu?main_id=" + id;
        $.ajax({
          url: base_url('MainMenu/callApiUpdateStatus'),
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
    var MainMenuName = $('#inpMainMenuName').val();
    var MainMenuIcon = $('#inpMainMenuIcon').val();

    if (MainMenuName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter main menu'
      });
    } else if (MainMenuIcon == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter main menu icon'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to add Main Menu",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,add!'
      }).then(function (result) {
        if (result.isConfirmed) {
          arrDataAdd.push({
            MainMenuName: MainMenuName,
            MainMenuIcon: MainMenuIcon
          });
          console.log(arrDataAdd);
          var url = API_URL + "Manage_mainmenu/ins_main_menu";
          $.ajax({
            url: base_url("MainMenu/callApiAddMainMenu?url=" + url),
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
                  html: 'Add Main Menu success',
                  timer: 1000
                }).then(function () {
                  location.reload();
                });
              } else if (res.result == 9) {
                Swal.fire({
                  icon: 'error',
                  title: 'Ooops...',
                  html: 'This Main Menu already exists.'
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
  }); //-------------------------- Show Main Menu ----------------------------------

  var mainId;
  $(document).on('click', '.tblDelBtn', function () {
    var id = $(this).attr('data-id');
    mainId = id;
    var url = API_URL + "Manage_mainmenu/show_upd_main_menu?main_id=" + id;
    $.ajax({
      url: base_url('MainMenu/callApiShowEdit?url=' + url),
      type: 'POST',
      data: {
        id: id
      },
      dataType: 'Json',
      success: function success(response) {
        for (var i = 0; i < response.length; i++) {
          var data = response[i];
          $('#edtMainMenu').val(data.smm_name).trigger("change");
          $('#edtMainIcon').val(data.smm_icon).trigger("change");
          $('#edtOrderNo').val(data.order_no).trigger("change");
        }
      }
    });
  }); //-------------------------- Save Edit Main Menu ----------------------------------

  $(document).on('click', '#btnSaveEdit', function () {
    var arrDataEdit = [];
    var MainMenuName = $('#edtMainMenu').val();
    var MainMenuIcon = $('#edtMainIcon').val();
    var OrderNo = $('#edtOrderNo').val();

    if (MainMenuName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter Main Menu Name'
      });
    } else if (MainMenuIcon == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter Main Menu Icon'
      });
    } else if (OrderNo == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter Order No.'
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
          arrDataEdit.push({
            mainId: mainId,
            MainMenuName: MainMenuName,
            MainMenuIcon: MainMenuIcon,
            OrderNo: OrderNo
          });
          console.log(arrDataEdit);
          var url = API_URL + "Manage_mainmenu/upd_main_menu";
          $.ajax({
            url: base_url("MainMenu/callApiSaveEdit?url=" + url),
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
                  html: 'Edit main menu success',
                  timer: 1000
                }).then(function () {
                  location.reload();
                });
              } else if (res.result == 9) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  html: 'Edit main menu success',
                  timer: 1000
                }).then(function () {
                  location.reload();
                });
              } else if (res.result == 3) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Ooops...',
                  html: 'This Main Menu already exists.'
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