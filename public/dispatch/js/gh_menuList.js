﻿$(function() {        // 侧边导航一级菜单切换（展开式）    $('.nav-tabs').each(function(){         $(this).find('dt').each(function(i){              $(this).click(function(){                 $('.admin_subnav').hide();				_modules = $(this).parents('dl').attr('data-param');                 $('.nav-tabs').removeClass('navaA');                $(this).parents('dl').addClass('navaA'); 				$('#admincpNavTabs_' + _modules).find('.admin_subnav').show();				$('#admincpNavTabs_' + _modules).find('.admin_subnav li:first').click();             });         });     });     // 侧边导航二级级菜单点击    $('.admin_subnav').find('li').click(function(){        openItem($(this).attr('data-param'));     }); 	      if ($.cookie('workspaceParam') == null) {         // 默认选择第一个菜单        $('.admin_left_nav').find('.admin_nav:first').click(); 		 // $('.admin_left_nav').find('dl:first').click();       } else {        openItem($.cookie('workspaceParam'));     }   　　　});// 点击菜单，iframe页面跳转function openItem(param) {    $('.admin_subnav').find('li').removeClass('active');     data_str = param.split('|');     $this = $('dl[id^="admincpNavTabs_"]').find('li[data-param="' + param + '"]');     $this.addClass('active').parents('.admin_subnav').show().parents('dl:first').addClass('navaA');	var farmurl = siteurl + '/'+mainindex+'?c=' + data_str[0] + '&act=' + data_str[1];	console.log(farmurl);    $('#workspace').attr('src',farmurl);    //alert($('#workspace').attr('src'));    $.cookie('workspaceParam', data_str[0] + '|' + data_str[1], { expires: 1 ,path:"/"}); }