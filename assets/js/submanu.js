// $(() => {
//     var subMenu
//     var mainId
// var url = API_URL + "Administrator/showMainMenu";
//     $.ajax({
//         url: base_url("http://127.0.0.1/ticket"),
//         type: 'GET',
//         dataType: 'json',
//         success: function(res) {
//             for (let i = 0; i < res.length; i++) {
//                 const data = res[i];
//                 var mianMenu = data.main_menu
//                 subMenu = data.sub_menu
//                 mainId = mianMenu.smm_id

//                 $('#sideBar_menu').append(`	
            //     <li class="menu-item">
            //   <a href="javascript:void(0);" class="menu-link menu-toggle">
            //     <i class="${mianMenu.smm_icon}"></i>
            //     <div data-i18n="${mianMenu.smm_name}">${mianMenu.smm_name}</div>
            //   </a>
            //   <ul class="menu-sub" id="subMunu_${mianMenu.smm_id}">
            //   </ul>
            //     </li>
//                 `)
//                 for (let i = 0; i < subMenu.length; i++) {
//                     const data = subMenu[i];
//                     if (data.smm_id == mainId) {
//                         $(`#subMunu_${mainId}`).append(`	
//                         <li class="nav-item">
//                             <a href="`+base_url(data.ctrl_menu)+`" class="nav-link "> 
//                                 <span class="title">${data.smm_name}</span>
//                             </a>
//                         </li>
//                     `)
//                     }
//                     const fullUrl = window.location.href;
//                     $(`a[href="${fullUrl}"]`).closest('li').addClass('active')
//                     $(`a[href="${fullUrl}"]`).closest('ul.sub-menu').css('display','block')
//                     $(`a[href="${fullUrl}"]`).closest('li.menu_side').addClass('open')
//                 }
//             }
//         }
//     }) } )

// const apiUrl = 'http://172.21.64.176/apiCarbonManage/Administrator/showMainMenu';
// console.log(apiUrl);

// fetch(apiUrl, {
//   method: 'GET', 
// })
//   .then(response => response.json())
//   .then(data => {

//     data.result.forEach(item => {
//       console.log("smm_id:", item.smm_id);
//       console.log("smm_name:", item.smm_name);
//       console.log("smm_status_flg:", item.smm_status_flg);
//       console.log("smm_updated_date:", item.smm_updated_date);
//       console.log("smm_updated_by:", item.smm_updated_by);
//       console.log("smm_icon:", item.smm_icon);
//       console.log("smm_order:", item.smm_order);
//     });
//   })
//   .catch(error => {
//     console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
//   });

// URL ของ API

// const apiUrl = 'http://172.21.64.176/apiCarbonManage/Administrator/showMainMenu';


// const sideBarMenu = document.getElementById('sideBar_menu');


// fetch(apiUrl, {
//   method: 'POST'
// })
//   .then(response => response.json())
//   .then(data => {

//     displayDataInSidebar(data.result);
//   })
//   .catch(error => {
//     console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
//   });


// function displayDataInSidebar(data) {

//   data.forEach(item => {
//     const menuItem = document.createElement('ul');
//     menuItem.innerHTML = `



//                 <li class="menu-item">
//               <a href="javascript:void(0);" class="menu-link menu-toggle">
//                 <i class="menu-icon tf-icons bx bx-dock-top"></i>
//                 <div data-i18n="${item.smm_name}">${item.smm_name}</div>
//               </a>
//               <ul class="menu-sub">
//                 <li class="menu-item">
//                   <a href="" class="menu-link">
//                     <div data-i18n="${item.smm_name}">${item.smm_name}</div>
//                   </a>
//                 </li>




//     `;

//     sideBarMenu.appendChild(menuItem);
//   });
// }



// $(document).ready(function () {
//   var url = API_URL + "Api_Controller/show_Menu";

//   $.ajax({
//     url: base_url("Login/callApiPermis?url=" + url),
//     type: 'GET',
//     dataType: 'json',
//     success: function (data) {
//       var groupedData = groupAndSortBy(data, 'smm_name', 'ssm_order_no');

//       var menuContainer = $('#sideBar_menu');

//       Object.keys(groupedData).forEach(function (smm_name) {
//         var items = groupedData[smm_name].sort((a, b) => a.ssm_order_no - b.ssm_order_no);

//         var menuItemsHtml = `
//             <li class="sidebar-item">
//                 <a href="" class="menu-link menu-toggle">
//                     <i class="sidebar-link ${items[0].smm_icon}">${items[0].smm_name}</i>
//                     <div class="sidebar-link has-arrow"${items[0].smm_name}">${items[0].smm_name}</div>
//                 </a>
//                 <ul class="menu-sub">
//         `;

//         items.forEach(function (menuItem) {
//           menuItemsHtml += `
//               <li class="sidebar-item">
//                   <a href="${base_url(menuItem.ssm_controller)}" class="menu-link">
//                       <div data-i18n="${menuItem.ssm_name}">${menuItem.ssm_name}</div>
//                   </a>
//               </li>
//           `;
//         });

//         menuItemsHtml += `
//                 </ul>
//             </li>
//         `;

//         menuContainer.append(menuItemsHtml);
//       });

//       const fullUrl = window.location.href;
//       $(`a[href="${fullUrl}"]`).closest('li').addClass('active');
//       $(`a[href="${fullUrl}"]`).closest('ul.menu-sub').css('display', 'block');
//       $(`a[href="${fullUrl}"]`).parents().eq(2).addClass('active');
//     },
//     error: function (xhr, status, error) {
//       console.error('Error:', error);
//     }
//   });

//   function groupAndSortBy(arr, groupKey, sortKey) {
//     return arr.reduce(function (acc, obj) {
//       var property = obj[groupKey];
//       acc[property] = acc[property] || [];
//       acc[property].push(obj);
//       return acc;
//     }, {});
//   }
// });


$(document).ready(function () {
    var url = API_URL + "Api_Controller/show_Menu";
  
    $.ajax({
      url: base_url("Login/callApiPermis?url=" + url),
      type: 'POST',
      dataType: 'json',
      success: function (menuData) {
        updateMenu(menuData);
      },

      
      error: function (xhr, textStatus, errorThrown) {
        console.log('Error fetching menu data:', errorThrown);
        console.log('Error response:', xhr.responseText);
      }
    });
  
    function updateMenu(menuData) {
      $('#sideBar_menu').empty();
  
      $.each(menuData, function (mainMenuName, subMenus) {
        var mainMenuHtml =
          '<li class="sidebar-item">' +
          '<a class="sidebar-link has-arrow" href="javascript:void(0)" aria-expanded="false">' +
          '<span class="d-flex">' +
          '<i class="' + subMenus.icon + '"></i>' +
          '</span>' +
          '<span class="menu-inner py-1">' + mainMenuName + '</span>' +
          '</a>' +
          '<ul aria-expanded="false" class="collapse first-level">';
          
           console.log(mainMenuName);
        $.each(subMenus.submenus, function (index, subMenu) {
          mainMenuHtml += '<li class="sideBar_menu">' +
            '<a href="' + base_url(subMenu.controller) +'" class="sidebar-link">' +
            '<div class="round-16 d-flex align-items-center justify-content-center"></div>' + 
            '<i class="ti-arrow-circle-right"></i>' +
            '<span class="hide-menu">' + subMenu.name + '</span>' +
            '</a>' +
            '</li>';
        });
  
        mainMenuHtml += '</ul></li>';
  
        $('#sidebarnav').append(mainMenuHtml);
      });
    }
  });



var permis = []
var plant = []
var url = API_URL + "Api_Controller/show_Menu";
$.ajax({
    url: base_url('Login/callApiDropDown?url=' + url),
    type: 'POST',
    dataType: 'Json',
    success: (response) => {
        // console.log(response);
        permis = response?.permis
        plant = response?.plant
        for (let i = 0; i < permis?.length; i++) {
            const data = permis[i];
            // console.log(data);
            $('.selPermission').append(`<option value="${data.spg_id}">${data.spg_name}</option>`)
        }
        for (let i = 0; i < plant?.length; i++) {
            const data = plant[i];
            // console.log(data);
            $('.selPlant').append(`<option value="${data.mpc_id}">${data.mpc_name}</option>`)
        }
    }
});


// })

