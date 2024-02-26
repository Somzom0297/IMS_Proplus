"use strict";

$(function () {
  var subMenu;
  var mainId;
  var url = API_URL + "Login/show_menu";
  $.ajax({
    url: base_url("Login/callApiPermis?url=" + url),
    type: 'POST',
    dataType: 'json',
    success: function success(res) {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        var data = res[i];
        var mianMenu = data.main_menu;
        subMenu = data.sub_menu;
        mainId = mianMenu.smm_id;
        console.log(subMenu);
        $('#sideBar_menu').append("\t\n                <li class=\"nav-item\">\n                <a href=\"#\" class=\"nav-link nav-toggle\">\n                <i class=\"".concat(mianMenu.smm_icon, "\"></i> <span class=\"title\">").concat(mianMenu.smm_name, "</span> <span class=\"arrow\"></span>\n                </a>\n                <ul class=\"sub-menu\" id=\"subMunu_").concat(mianMenu.smm_id, "\">\n                    \n                </ul>\n            </li>\n                "));

        for (var _i = 0; _i < subMenu.length; _i++) {
          var _data = subMenu[_i];

          if (_data.main_menu_id == mainId) {
            $("#subMunu_".concat(mainId)).append("\t\n                        <li class=\"nav-item\">\n                            <a href=\"../".concat(_data.ctrl_menu, "\" class=\"nav-link \"> \n                            <span class=\"title\">").concat(_data.sud_menu_name, "</span>\n                            </a>\n                        </li>\n                    "));
          }
        }
      }
    }
  });
  var permis = [];
  var plant = [];
  var url = API_URL + "Manage_account/show_drop_down";
  $.ajax({
    url: base_url('Login/callApiDropDown?url=' + url),
    type: 'POST',
    dataType: 'Json',
    success: function success(response) {
      // console.log(response);
      permis = response.permis;
      plant = response.plant;

      for (var i = 0; i < permis.length; i++) {
        var data = permis[i]; // console.log(data);

        $('.selPermission').append("<option value=\"".concat(data.spg_id, "\">").concat(data.spg_name, "</option>"));
      }

      for (var _i2 = 0; _i2 < plant.length; _i2++) {
        var _data2 = plant[_i2]; // console.log(data);

        $('.selPlant').append("<option value=\"".concat(_data2.mpc_id, "\">").concat(_data2.mpc_name, "</option>"));
      }
    }
  });
  $(document).on('click', '#btnLogout', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Log Out!'
    }).then(function (result) {
      if (result.isConfirmed) {
        window.location.href = 'http://127.0.0.1/sysCenterTemp/';
      }
    });
  });
  $(document).on('click', '#edtProfile', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Log Out!'
    }).then(function (result) {
      if (result.isConfirmed) {}
    });
  });
});