"use strict";

$(function () {
  showMainMenu(); //-------------------------- Select MainMenu ----------------------------------

  function showMainMenu() {
    var url = API_URL + "Manage_mainmenu/show_main_menu";
    $.ajax({
      method: "get",
      url: base_url("SubMenu/callApi?url=" + url),
      dataType: 'Json',
      success: function success(response) {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
          var data = response[i];
          $('#selMainMenu').append("<option value=\"".concat(data.smm_id, "\">").concat(data.smm_name, "</option>"));
        }
      },
      error: function error(err) {
        console.log(err);
      }
    });
  }

  ; //------------------------------- show Table --------------------------------------

  $(document).on('click', '#btnSerchMain', function () {
    var mainId = $('#selMainMenu').val();
    $('#tblMainMenu').dataTable().fnDestroy();
    var x = document.getElementById("content");

    if (x.style.display === "none") {
      x.style.display = "block";
    }

    var url = API_URL + "Manage_submenu/show_submenu?mainId=" + mainId;
    $.ajax({
      method: "POST",
      url: base_url("SubMenu/callApiShowData?url=" + url),
      data: {
        mainId: mainId
      },
      dataType: 'Json',
      success: function success(response) {
        console.log(response);
        var html = "";

        for (var i = 0; i < response.length; i++) {
          var data = response[i];
          var btnStatus;

          if (data.status == 1) {
            btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-success btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.smm_id, "\">Anable</button>");
          } else {
            btnStatus = "<button type=\"button\" class=\"btn btn-circle btn-warning btnStatus\" value=\"".concat(data.status, "\" data-id=\"").concat(data.smm_id, "\">Disable</button>");
          }

          html += "\n                            <tr>\n                                <td class=\"text-center\">".concat(i + 1, "</td>\n                                <td class=\"text-center\">").concat(data.smenu_name, "</td>\n                                <td class=\"text-center\">").concat(data.controller, "</td>\n                                <td class=\"text-center\">").concat(data.created_date, "</td>\n                                <td class=\"text-center\">").concat(data.created_by, "</td>\n                                <td class=\"text-center\">").concat(btnStatus, "</td>\n                                <td class=\"text-center\">\n                                    <a data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdropEdit\" class=\"tblDelBtn\" data-id=\"").concat(data.smm_id, "\"\">\n                                        <i class=\"fa fa-pencil\"></i>\n                                    </a>\n                                </td>\n                              </tr>");
        }

        $("#tbody").html(html).promise().done(function () {
          $("#tblMainMenu").DataTable({
            scrollX: true
          });
        });
      },
      error: function error(err) {
        console.log(err);
      }
    });
  }); //-------------------------- Update flg status ----------------------------------
  // $(document).on('click', '.btnStatus', function() {
  //     let id = $(this).attr('data-id');
  //     var btnStatus = $(this).closest('td').find('.btnStatus').val()
  //         // alert(btnStatus)
  //     if (btnStatus == 1) {
  //         var upDateStatus = '0'
  //     } else {
  //         var upDateStatus = '1'
  //     }
  //     Swal.fire({
  //         icon: 'warning',
  //         title: 'Are you sure?',
  //         text: "You want be chang status",
  //         // icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, chang!'
  //     }).then((result) => {
  //         if (result.isConfirmed) {
  //             var url = API_URL + "Manage_mainmenu/upd_status_main_menu?main_id=" + id;
  //             $.ajax({
  //                 url: base_url('MainMenu/callApiUpdateStatus'),
  //                 type: 'POST',
  //                 data: {
  //                     id: id,
  //                     upDateStatus: upDateStatus,
  //                 },
  //                 dataType: 'Json',
  //                 success: (response) => {
  //                     if (response.result == 1) {
  //                         Swal.fire({
  //                             icon: 'success',
  //                             title: 'Success !',
  //                             html: 'Chang status success',
  //                             timer: 1000,
  //                         }).then(() => {
  //                             location.reload();
  //                         })
  //                     }
  //                 }
  //             });
  //         }
  //     })
  // })
  //-------------------------- add Sub menu ----------------------------------

  $(document).on('click', '#btnSaveAdd', function () {
    var arrDataAdd = [];
    var SubMenuName = $('#inpSubMenuName').val();
    var SubMenuCon = $('#inpSubMenuCon').val();

    if (SubMenuName == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter sub menu'
      });
    } else if (SubMenuCon == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Plese enter sub menu controller'
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
            SubMenuName: SubMenuName,
            SubMenuCon: SubMenuCon
          });
          console.log(arrDataAdd); // var url = API_URL + "Manage_mainmenu/ins_main_menu";
          // $.ajax({
          //     url: base_url("MainMenu/callApiAddMainMenu?url=" + url),
          //     type: 'POST',
          //     data: {
          //         arrDataAdd: arrDataAdd
          //     },
          //     dataType: 'json',
          //     success: function(res) {
          //         if (res.result == 1) {
          //             Swal.fire({
          //                 icon: 'success',
          //                 title: 'Success !',
          //                 html: 'Add account success',
          //                 timer: 1000,
          //             }).then(() => {
          //                 location.reload();
          //             })
          //         } else if (res.result == 9) {
          //             Swal.fire({
          //                 icon: 'error',
          //                 title: 'Ooops...',
          //                 html: 'This employee code already exists.',
          //             })
          //         } else {
          //             Swal.fire({
          //                 icon: 'error',
          //                 title: 'Ooops...',
          //                 html: 'A system error has occurred.',
          //             })
          //         }
          //     }
          // })
        }
      });
    }
  }); //-------------------------- Show Main Menu ----------------------------------
  // var accId
  // $(document).on('click', '.tblDelBtn', function() {
  //     let id = $(this).attr('data-id');
  //     accId = id
  //     var url = API_URL + "Manage_mainmenu/show_upd_main_menu?main_id=" + id;
  //     $.ajax({
  //         url: base_url('MainMenu/callApiShowEdit?url=' + url),
  //         type: 'POST',
  //         data: {
  //             id: id,
  //         },
  //         dataType: 'Json',
  //         success: (response) => {
  //             for (let i = 0; i < response.length; i++) {
  //                 const data = response[i];
  //                 $('#edtMainMenu').val(data.smm_name).trigger("change")
  //                 $('#edtMainIcon').val(data.smm_icon).trigger("change")
  //             }
  //         }
  //     });
  // })
  //-------------------------- Save Edit Main Menu ----------------------------------
  // $(document).on('click', '#btnSaveEdit', function() {
  //     var arrDataEdit = []
  //     var MainMenuName = $('#edtMainMenu').val()
  //     var MainMenuIcon = $('#edtMainIcon').val()
  //     var OrderNo = $('#edtOrderNo').val()
  //     if (MainMenuName == '') {
  //         Swal.fire({
  //             icon: 'warning',
  //             title: 'Oops...',
  //             text: 'Plese enter Main Menu Name',
  //         })
  //     } else if (MainMenuIcon == '') {
  //         Swal.fire({
  //             icon: 'warning',
  //             title: 'Oops...',
  //             text: 'Plese enter Main Menu Icon',
  //         })
  //     } else if (OrderNo == '') {
  //         Swal.fire({
  //             icon: 'warning',
  //             title: 'Oops...',
  //             text: 'Plese enter Order No.',
  //         })
  //     } else {
  //         Swal.fire({
  //             title: 'Are you sure?',
  //             text: "Do you want to save edit",
  //             icon: 'warning',
  //             showCancelButton: true,
  //             confirmButtonColor: '#3085d6',
  //             cancelButtonColor: '#d33',
  //             confirmButtonText: 'Yes,save!'
  //         }).then((result) => {
  //             if (result.isConfirmed) {
  //                 arrDataEdit.push({
  //                     accId: accId,
  //                     MainMenuName: MainMenuName,
  //                     MainMenuIcon: MainMenuIcon,
  //                     OrderNo: OrderNo,
  //                 })
  //                 console.log(arrDataEdit);
  //                 // var url = API_URL + "Manage_account/upd_User";
  //                 // $.ajax({
  //                 //     url: base_url("ManageAccount/callApiUpdateAccount?url=" + url),
  //                 //     type: 'POST',
  //                 //     data: {
  //                 //         arrDataEdit: arrDataEdit
  //                 //     },
  //                 //     dataType: 'json',
  //                 //     success: function(res) {
  //                 //         console.log(res);
  //                 //         if (res.result == 1) {
  //                 //             Swal.fire({
  //                 //                 icon: 'success',
  //                 //                 title: 'Success !',
  //                 //                 html: 'Add account success',
  //                 //                 timer: 1000,
  //                 //             }).then(() => {
  //                 //                 location.reload();
  //                 //             })
  //                 //         } else if (res.result == 9) {
  //                 //             Swal.fire({
  //                 //                 icon: 'success',
  //                 //                 title: 'Success!',
  //                 //                 html: 'save edits success',
  //                 //             }).then(() => {
  //                 //                 location.reload();
  //                 //             })
  //                 //         } else {
  //                 //             Swal.fire({
  //                 //                 icon: 'error',
  //                 //                 title: 'Ooops...',
  //                 //                 html: 'A system error has occurred.',
  //                 //             })
  //                 //         }
  //                 //     }
  //                 // })
  //             }
  //         })
  //     }
  // })
});