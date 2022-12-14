$.fn.imagesLoaded=function(callback){var $this=$(this),$images=$this.find('img').add($this.filter('img')),len=$images.length,blank='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';function triggerCallback(){callback.call($this,$images)}function imgLoaded(event){if(--len<=0&&event.target.src!==blank){setTimeout(triggerCallback);$images.unbind('load error',imgLoaded)}}if(!len){triggerCallback()}$images.bind('load error',imgLoaded).each(function(){if(this.complete||typeof this.complete==="undefined"){var src=this.src;this.src=blank;this.src=src}});return $this};
$.fn.animationEnd=function(a){
	var t=this,d=["webkitAnimationEnd","OAnimationEnd","MSAnimationEnd","animationend"];
	if(a){
		for(var i=0;i<d.length;i++){
			t.on(d[i],a);
		}
	}
	return this;
}
;(function(){
	var isTouch = "ontouchend" in document.createElement("div"), 
	tstart = isTouch ? "touchstart" : "mousedown",
	tmove = isTouch ? "touchmove" : "mousemove",
	tend = isTouch ? "touchend" : "mouseup";
	$(document).on(tstart, function(e) {
		if(!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 0);
	});
	$(document).on(tmove, function(e) {
		if(!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 1);
	});
	$(document).on(tend, function(e) {
		if(!$(e.target).hasClass("disable") && $(e.target).data("isMoved") == 0) $(e.target).trigger("tap");
	});
	
	$(document).ready(function(){
		var header_back = $('#header_back');
		header_back.click(function(e){
			e.preventDefault();
			if(header_back.attr('href')!=='#'){window.location.href = header_back.attr('href');return false;}
			if(!!header_back.attr('onclick')&&header_back.attr('onclick')!==''){return false;}
			if(history.length>1){
				window.history.go(-1);
			}else{
				if(window.location.href.indexOf('house')!==-1){
					window.location.href = window['SiteUrl']+'house/index';
				}else{
					window.location.href = window['SiteUrl'];
				}
			}
		});
	});
})(jQuery);
function setCookie_p(pageid){
	$.cookie(window['cookieNameP'],pageid,{path:'/',expires:10});
	return true;
}
$.fn.tap = function(fn){ 
	var collection = this, 
	isTouch = "ontouchend" in document.createElement("div"), 
	tstart = isTouch ? "touchstart" : "mousedown",
	tmove = isTouch ? "touchmove" : "mousemove",
	tend = isTouch ? "touchend" : "mouseup",
	tcancel = isTouch ? "touchcancel" : "mouseout";
	collection.each(function(){
		var i = {};
		i.target = this;
		$(i.target).on('click',function(e){e.preventDefault();});
		$(i.target).on(tstart,function(e){
			var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
			i.startX = p.clientX;
			i.startY = p.clientY;
			i.endX = p.clientX;
			i.endY = p.clientY;
			i.startTime = + new Date;
		});
		$(i.target).on(tmove,function(e){
			var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
			i.endX = p.clientX;
			i.endY = p.clientY;
		});
		$(i.target).on(tend,function(e){
			if((+ new Date)-i.startTime<300){
				if(Math.abs(i.endX-i.startX)+Math.abs(i.endY-i.startY)<20){
					var e = e || window.event;
					e.preventDefault();
					fn.call(i.target);
				}
				i.startTime = undefined;
				i.startX = undefined;
				i.startY = undefined;
				i.endX = undefined;
				i.endY = undefined;
			}
		});
	});
	return collection;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
 // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
 return formatNumber( year ) + '-'+ formatNumber( month ) +'-'+ formatNumber( day ) + ' ' + formatNumber( hour ) + ':'+ formatNumber( minute ) +':'+ formatNumber( second ) ;
}
function formatTime_s(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  //return [year, month, day].map(formatNumber).join('-');
  return formatNumber( year ) + '-'+ formatNumber( month ) +'-'+ formatNumber(  day )  ;
}

function formatTime_cn(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return formatNumber( year ) + '???'+ formatNumber( month ) +'???'+ formatNumber(  day ) +'???' ;
}

function formatTime_short(date) {
	var month = date.getMonth() + 1 ;
	var day = date.getDate() ;
	var hour = date.getHours() ;
	var minute = date.getMinutes() ;
	var second = date.getSeconds() ;
	return formatNumber( month ) +'-'+ formatNumber( day )  ;
}
function formatTime_diff(timestamp) {
    // ?????????13???
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
	if(!!window['system_datetime']){
		
		now = new Date(window['system_datetime']).getTime();
		
	}
    var diffValue = now - timestamp;
    // ??????????????????????????????????????????
    if (diffValue < 0) {
        return '?????????';
    }
    // ???????????????????????????
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    // ?????????0??????
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    // ??????
    if (monthC > 12) {
        // ??????1???????????????????????????
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '???' + zero(date.getMonth() + 1) + '???' + zero(date.getDate()) + '???';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "??????";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "??????";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "??????";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "?????????";
    } else if (minC >= 1) {
        return parseInt(minC) + "?????????";
    }
    return '??????';
}
Date.prototype.Format = function (fmt) { 
	var o = {
		"M+": this.getMonth() + 1, //?????? 
		"d+": this.getDate(), //??? 
		"h+": this.getHours(), //?????? 
		"m+": this.getMinutes(), //??? 
		"s+": this.getSeconds(), //??? 
		"q+": Math.floor((this.getMonth() + 3) / 3), //?????? 
		"S": this.getMilliseconds() //?????? 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
function changeTwoDecimal(x){//?????????????????????????????????
	var f_x = parseFloat(x);
	if (isNaN(f_x)){
		console.info('function:changeTwoDecimal->parameter error');
		return false;
	}
	if(f_x.toString().lastIndexOf('.')!==-1){
		f_x=f_x.toFixed(2);
	}
	return f_x;
}
function changeTwoDecimal2(x){//????????????????????????????????????
	var f_x = parseFloat(x);
	if (isNaN(f_x)){
		console.info('function:changeTwoDecimal->parameter error');
		return false;
	}
	f_x=f_x.toFixed(3);
	f_x = f_x.substring(0,f_x.lastIndexOf('.')+3);
	return f_x;
}
function fixedWanQianNum(num){
	var result = 0;
	if(num===''||num===0){
		return result;
	}
	if(num>9999){
		result = num/10000;
		if(result.toString().lastIndexOf('.')!==-1){
			result=result.toFixed(1);
		}
		result = result.toString() + '???';
	}else if(num>999){
		result = num/1000;
		if(result.toString().lastIndexOf('.')!==-1){
			result=result.toFixed(1);
		}
		result = result.toString() + '???';
	}else{
		result = num.toString();
	}
	return result;
}
function TransparentHeader(){//????????????????????????????????????
	var header = $('#header'),header_height = header.height();
	header.addClass('header_transparent');
	$('body').eq(0).css({'padding-top':'0'});
	$(window).on('scroll', function() {
		var scrollH = $(this).scrollTop();
		if (scrollH > header_height){
			header.removeClass('header_transparent');
		}else{
        	header.addClass('header_transparent');
		}
	});
}
function is_weixn(){//??????????????????????????????????????????
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
function isIOS(){
	var Na=window.navigator.userAgent.toLowerCase(),q={},Hd;
	q.isChrome=function(){return-1<Na.indexOf('chrome')||-1<Na.indexOf('CrMo')};
	q.isDesktopSafari=function(){return!q.isIOS()&&-1!==Na.search('safari')};
	var lb;-1<Na.indexOf('iphone')?
	lb='iphone':-1<Na.indexOf('ipad')?lb='ipad':-1<Na.indexOf('android')&&q.isChrome()?lb='chromeandroid':-1<Na.indexOf('android')||-1<Na.indexOf('htc_evo3d')?lb='android':-1<Na.indexOf('playbook')?lb='playbook':-1<Na.indexOf('ipod')?lb='ipod':-1<navigator.platform.indexOf('Win')&&(lb='windows',(Hd=/msapphost\/(\d+\.\d+)/i.exec(Na))&&(Hd=parseFloat(Hd[1])));lb||(lb='unknown');
	q.type=lb;
	return'iphone'===q.type||'ipad'===q.type||'ipod'===q.type;
}
function set_i_weixinapp_share(shareTitle,shareContent,shareImg,shareLink){
	var url = nowdomain+'request.ashx?action=weixinfx&jsoncallback=?&url='+encodeURIComponent(window.location.href);
	$.getJSON(url,function(data){
		if(data[0].islogin !== '1'){
			//???????????????????????????????????????
			console.info('???????????????????????????????????????');
		}else{
			wx.config({
				debug: false, // ??????????????????,???????????????api???????????????????????????alert????????????????????????????????????????????????pc?????????????????????????????????log???????????????pc?????????????????????
				appId: data[0].MSG.appid, // ?????????????????????????????????
				timestamp: parseInt(data[0].MSG.timestamp), // ?????????????????????????????????
				nonceStr: data[0].MSG.noncestr, // ?????????????????????????????????
				signature: data[0].MSG.signature,// ???????????????????????????1
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','getLocation','openLocation','startRecord','stopRecord','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','translateVoice','chooseImage','uploadImage','getLocalImgData','downloadImage'] // ????????????????????????JS?????????????????????JS?????????????????????2
			});
			wx.ready(function(){
				wx.onMenuShareAppMessage({
					title: shareTitle, // ????????????
					desc: shareContent, // ????????????
					link: shareLink, // ????????????
					imgUrl: shareImg, // ????????????
					type: '', // ????????????,music???video???link??????????????????link
					dataUrl: '', // ??????type???music???video??????????????????????????????????????????
					success: function(){},
					cancel: function(){}
				});
				wx.onMenuShareQQ({
					title: shareTitle, // ????????????
					desc: shareContent, // ????????????
					link: shareLink, // ????????????
					imgUrl: shareImg, // ????????????
					success: function(){},
					cancel: function(){}
				});
				wx.onMenuShareTimeline({
					title: shareTitle, // ????????????
					link: shareLink, // ????????????
					imgUrl: shareImg, // ????????????
					success: function(){},
					cancel: function(){}
				});
				//gps??????
				if(typeof window['WX_GPS_DAOHANG'] !== 'undefined'){
					var chraddress_str = $('#chraddress_str').html();
					var chrtitle_str = $('#chrtitle_str').html();
					$('#daohang_gps,#daohang_gps2').click(function(e){
						e.preventDefault();
						var x = $(this).attr('data-x'),y = $(this).attr('data-y');
						wxopenLocation(x,y,chraddress_str,chrtitle_str);
					});
				}
				if(typeof window['WX_GPS_DAOHANG_PEISON'] !== 'undefined'){
					$('#peisong_order_list').on('click','.daohang_gps',function(e){
						e.preventDefault();
						var t = $(this);
						var x = t.attr('data-x'),y = t.attr('data-y');
						var chraddress_str = t.parent().parent().find('.chraddress_str').html();
						var chrtitle_str = t.parent().parent().find('.chrtitle_str').html();
						wxopenLocation(x,y,chraddress_str,chrtitle_str);
					});
					
				}
			});
		}
	});
}
function wxopenLocation(shop_x,shop_y,chraddress,chrtitle){
    //?????????????????????????????????
    qq.maps.convertor.translate(new qq.maps.LatLng(shop_y,shop_x), 3, function(res){
        latlng = res[0];
        wx.openLocation({
            latitude: latlng.lat, // ??????????????????????????????90 ~ -90
            longitude: latlng.lng, // ??????????????????????????????180 ~ -180???
            name: chrtitle, // ?????????
            address: chraddress, // ??????????????????
            scale: 28, // ??????????????????,?????????,?????????1~28??????????????????
            infoUrl: '' // ?????????????????????????????????????????????,???????????????
        });
    });
}
$.fn.share2015 = function(){
	new nativeShare('nativeShare',shareconfig);
	
	var t = $(this),node = $('#bdsharebuttonbox');
	
	if(!!is_weixn()){set_i_weixinapp_share(shareTitle,shareContent,shareImg,shareLink);}
	node.find('.cancal').click(function(e){
		e.preventDefault();
		node.slideUp();
		$('#mask').hide();
	});
	t.click(function(e){
		e.preventDefault();
		if(isapp === '1'){
			YDB.Share(shareTitle,shareContent,shareImg,shareLink);
		}else{
			node.slideDown();
			$('#mask').show();
		}
	});
}
function windowToShow(action_name,to_url,ok_url){//???????????????????????????//????????????????????????????????????
	var html = '<s class="s s1"></s><s class="s s2"></s>'+
	'<div class="txt">?????????????????????????????????????????????<br>?????????'+action_name+'???</div>'+
	'<a href="'+ok_url+'" class="btn">?????????'+action_name+'</a>???<a href="'+ok_url+'" class="btn">???????????????</a>';
	var divs = document.createElement('div');
	divs.id = 'alipayForSafari';
	divs.className = 'alipay_for_safari';
	divs.innerHTML = html;
	$('body').append(divs);
	$('#alipayForSafari').show();
	history.pushState(null, '', to_url);
}
function MSGwindowShow_JSON(data){
	
	if(data.action === "pay" && data.classid === "2" ){
		payAppsubmitGo(data);
	}else{
		if(data.islogin === '1'){
			$('#isrep').val('');
			$('#parentid').val('');
			$('#cmt_txt').html('');
			$('#chrcontent').html('');
			$('#chrcontent2').val('');
			$('#closeReply').trigger('click');
			if(data.isopen === '0'){
				MSGwindowShow('revert','0','?????????????????????????????????????????????????????????','','');
			}else{
				successPostRevert(data);
			}
		}else{
			MSGwindowShow('revert','0',data.error,'','');
		}
	}
}
function payAppsubmitGo(MSGkeyval){
	if(isapp ==="1"){
		var	YDB = new YDBOBJ();
		if(MSGkeyval.Payid === "7" ){//????????????app??????
			YDB.SetWxpaySend(MSGkeyval.appid, MSGkeyval.partnerid, MSGkeyval.prepayid, MSGkeyval.package_, MSGkeyval.noncestr, MSGkeyval.timestamp, MSGkeyval.sign, MSGkeyval.return_url, MSGkeyval.attach);
		}
		else if(MSGkeyval.Payid === "1" ){//????????????app??????
			
		}
	}
}
function windowlocationhref(url){
	if(url.length > 5){window.location.href=url;}
}
function MSGwindowShow(action,showid,str,url,formcode,i_option){
	if(!!$('#form_submit_disabled')[0]){
		$('#form_submit_disabled').removeClass('disabled').prop('disabled',false);
	}
	var sys_tips = '<div class="sys_tips" id="sys_tips" style="display:none;"><div class="inner" id="sys_tips_inner">'+
		'<div class="ico" id="sys_tips_ico"></div>'+
		'<div class="bd">'+
			'<div id="sys_tips_info" class="txt1"></div>'+
			'<div id="sys_tips_info2" class="txt2"></div>'+
			'<div class="btn"><a href="#" class="btn2" id="sys_tips_submit">??????</a></div>'+
		'</div>'+
		'<div class="close_btn" id="sys_tips_close" style="display:none;"></div>'+
	'</div></div>';
	if(!$('#sys_tips')[0]){
		$('body').append(sys_tips);
	}
	var sys_tips = $('#sys_tips'),sys_tips_inner = sys_tips.find('.inner'),sys_tips_ico = $('#sys_tips_ico'),sys_tips_info = $('#sys_tips_info'),sys_tips_info2 = $('#sys_tips_info2'),sys_tips_submit = $('#sys_tips_submit'),sys_tips_close = $('#sys_tips_close');
	
	if(typeof i_option !== 'undefined'){
		sys_tips_submit.html(i_option.btntxt);
		if(!!i_option.isCloseBtn){
			sys_tips_close.show().click(function(){
				sys_tips.hide();
			});
		}
		sys_tips_ico.addClass(i_option.icotype);
		sys_tips_submit.addClass(i_option.btntype);
		sys_tips_info2.html(i_option.bd2txt);
	}
	if(action === "pay"){
		$('#have_login').hide();
		if(showid=="2"){
			document.getElementById('formcode').value=formcode;//??????code
			document.forms['submitpay'].submit();//????????????
			//???????????????????????????????????????
		}else if(showid=="1"){
			showConsole('????????????',!0);
		}else if(showid=="0"){
			alert(str);
			if(url.length > 5){window.location.href=url;}
		}else{
			alert(str);
		}
		document.getElementById('formcode').value="payok";//?????????????????????????????????
	}else if(action === "jifen"){
		if(typeof formcode !== 'undefined' && formcode!=='0' && formcode!==0){
			str = str + '?????????'+formcode +window['jifenneme']+'???';
		}
		showConsole('??????',true);
	}else if(action === "jiaoyou_buy"){
		if(typeof getPageInfo !== 'undefined'){
			getPageInfo();
		}
	}else if(action === "jiaoyou_keep"){
		$('#keeptxt').html('?????????');
		$('#keepnum').html(formcode);
	}else if(action === "jiaoyou_flowers"){
		$('#flowernum').html(formcode);
		$('#flower').find('.closes').trigger('click');
		showConsole('??????',false);
	}else{
		if(showid=="7"){ //??????????????????????????????????????????????????????
			if(typeof MSGwindowShow_curPage !== 'undefined'){MSGwindowShow_curPage.call(this,url);}
			return false;
		}
		if(showid=="0"){ //??????????????????
			showConsole('??????',false);
		}else if(showid=="1"){ //???????????????
			showConsole('??????',true);
		}else if(showid=="2"){ //????????????
			windowlocationhref(url);
		}else if(showid=="3"){ //?????????????????????
			showConsole('?????????',true);
		}else if(showid=="4"){ //?????????????????????????????????
			showConsole('?????????',false);
			$('#submit_1')[0]&&$('#submit_1').removeClass('disabled').prop('disabled',false);
			if(typeof getCode !== 'undefined'){getCode();}//?????????????????????
		}else if(showid=="5"){ //?????????????????????????????????
			showConsole('??????',false);
		}else if(showid=="6"){ //??????????????????????????????????????????
			showConsole('??????',false);
		}else if(showid=="8"){ //??????????????????????????????????????????
			showConsole('??????',false);
		}else{
			return false;
		}
	}
	function showConsole(tit,isredirect){
		sys_tips_info.html(str);
		sys_tips_submit.unbind('click');
		sys_tips_submit.bind('click',function(e){
			e.preventDefault();
			sys_tips.hide();
			isredirect&&windowlocationhref(url);
			if(showid === '5'){
				window.parent.location.href=window.parent.location.href;
			}
			if(showid === '6'){
				if(typeof MSGwindowShow_curPage !== 'undefined'){MSGwindowShow_curPage.call(this);}
			}
			if(showid === '8'){
				if(typeof MSGwindowShow_curPage2 !== 'undefined'){MSGwindowShow_curPage2.call(this);}
			}
		});
		sys_tips.show();
		//var w_h = $(window).height(),d_h = sys_tips.height(),s_h = $(document).scrollTop(),top_val = (w_h-d_h)/2;
		//sys_tips.css({'top':top_val+'px'});
		var d_h = sys_tips_inner.height(),top_val = parseInt(d_h/2);
		sys_tips_inner.css({'margin-top':-top_val+'px'});
	}
}
//????????????
window['GPSpoint'] = null;
function reloadLocation(callback){//???????????? ??????????????????
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			//alert('???????????????'+r.point.lng+','+r.point.lat);
			callback&&callback.call(this,r.point);
		}
		else {
			if(typeof keyvalues !== 'undefined'){getPagingGlobal();}
			MSGwindowShow('location','0','????????????????????????????????????????????????','','');
		}        
	},{enableHighAccuracy: true});
}
function getLocation(callback){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			callback&&callback.call(this,r.point);
			
			var date = new Date();
			date.setTime(date.getTime()+(300*1000));//??????????????????10??????10??????
			$.cookie('myPoint',r.point.lng+','+r.point.lat,{path:'/',expires:date});
			window['GPSpoint'] = r.point;
		}
		else {
			if(typeof keyvalues !== 'undefined'){getPagingGlobal();}
			MSGwindowShow('location','0','????????????????????????????????????????????????','','');
		}        
	},{enableHighAccuracy: true});
}
function showMapGPSaddDizhi(point){
	var geoc = new BMap.Geocoder();
	geoc.getLocation(point, function(rs){
		var addComp = rs.addressComponents;
		$('#s_address').val(addComp.district + addComp.street + addComp.streetNumber).attr('placeholder','?????????????????????????????????');
		$('#shop_x').val(point.lng);
		$('#shop_y').val(point.lat);
	});
}
function showMapGPSre(point){
	if(typeof showGPSLocation !== 'undefined'){
		showGPSLocation(point);
		window['GPSpoint'] = point;
	}
	var geoc = new BMap.Geocoder();
	geoc.getLocation(point, function(rs){
		var addComp = rs.addressComponents;
		$('#curLocation2').html(addComp.district + addComp.street + addComp.streetNumber);
	});
}
function showMapGPS(point){
	var map = window['Lmap'] || new BMap.Map();
	window['GPSpoint'] = point;
	setMap(map,point);
	if(typeof keyvalues !== 'undefined'){
		getPagingGlobal({"p":"1",'x':point.lng,'y':point.lat},true);
	}
}
function showMapBD(longitude, latitude){
	if(longitude===''){return;}
	var map = window['Lmap'] || new BMap.Map();
	var myPoint = new BMap.Point(longitude, latitude); //GPS??????
	setMap(map,myPoint);
}
function setMap(map,point){
	var mapPointList = $('#mapPoint').find('.item');
	//??????????????????
	var geoc = new BMap.Geocoder();
	geoc.getLocation(point, function(rs){
		var addComp = rs.addressComponents;
		$('#curLocation').html(addComp.district + addComp.street + addComp.streetNumber);
	});
	if(typeof window['ifReloadNewGpsList'] !== 'undefined' && !!window['ifReloadNewGpsList']){
		//$('#pagingList').empty();
		window['ifReloadNewGpsList']=false;
		getPagingGlobal({"p":"1",'x':point.lng,'y':point.lat},true);
	}
	//????????????
	mapPointList.each(function(){
		var mapPoint = $(this);
		var dataX = mapPoint.attr('data-x'),dataY = mapPoint.attr('data-y');
		if(dataX === '' || dataX ==='0'){return;}
		var pointB = new BMap.Point(dataX,dataY);  // ????????????
		var txt = '<span class="getDistance">'+(map.getDistance(point,pointB)/1000).toFixed(2)+'<\/span>km';
		$(this).find('.juli').html(txt);
	});
}

//filter
function showFilter(option){
	var node = $('#'+option.ibox),
		fullbg = $('#'+option.fullbg),
		ct1 = $('#'+option.content1),
		ct2 = $('#'+option.content2),
		ctp1 = ct1.find('.innercontent'),
		ctp2 = ct2.find('.innercontent'),
		currentClass = 'current';
	var tabs = node.find('.tab .item'),
		conts = node.find('.inner');
	//fullbg.css({'height':$(document).height()+'px'});
	
	var timelist = node.find('.inner > ul > li').filter(function(index) {
			return $('ul', this).length > 0;
		}),
		timelist_no = node.find('.inner > ul > li').filter(function(index) {
			return $('ul', this).length === 0;
		}),
		childUL = null;
	timelist.each(function(){
		var that = $(this);
		that.addClass('hasUL');
		that.children('a').addClass('hasUlLink');
	});
	timelist_no.each(function(){
		var that = $(this);
		that.addClass('noUL');
		that.children('a').addClass('noUlLink');
	});
	ct1.on("click",".noUlLink",function(e){
		if($(this).attr('data-ajax')==='1'){////////////////////////////////////////////////////////////////
			var index=0;
			if(!!$(this).parent().attr('index')){
				index = $(this).parent().attr('index')
			}
			tabs.eq(index).attr('data-hasbigid',$(this).parent().attr('categoryid'));
		}
	});
	ct1.on("click",".hasUlLink",function(e){
		e.preventDefault();
		var that = $(this).parent();
		if(!window['myScroll_inner']){
			window['myScroll_inner'] = new IScroll('#'+option.content2, {
				click: true,
				scrollX: false,
				scrollY: true,
				scrollbars: false,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			});
		}
		if($(this).attr('data-ajax')==='1'){////////////////////////////////////////////////////////////////
			var index=0;
			if(!!$(this).parent().attr('index')){
				index = $(this).parent().attr('index')
			}
			tabs.eq(index).attr('data-hasbigid',$(this).parent().attr('categoryid'));
		}
		setTimeout(function(){
			ctp1.find('.hasUL_current').removeClass('hasUL_current');
			that.addClass('hasUL_current');
			ctp2.html('<ul>'+that.find('ul').html()+'</ul>').show();
			ct1.css({'width':'50%'});
			ct2.show();
			window['myScroll_inner'].refresh();
		},100);
	});
	tabs.each(function(i){
		$(this).bind("click",function(e){
			e.preventDefault();
			if($(this).attr('data-isopen')==='1'){
				hide_nav();
				return false;
			}
			tabs.attr('data-isopen','0');
			$(this).attr('data-isopen','1');
			if(!window['myScroll_parent']){
				window['myScroll_parent'] = new IScroll('#'+option.content1, {
					click: true,
					scrollX: false,
					scrollY: true,
					scrollbars: false,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					fadeScrollbars: true
				});
			}
			node.addClass('filter-fixed');
			ctp1[0].innerHTML = conts.eq(i).html();
			fullbg.fadeIn('fast');
			tabs.removeClass(currentClass);
			tabs.eq(i).addClass(currentClass);
			if($(this).attr('data-hasbigid') !== undefined){
				var triggerEle = ct1.find('.hasUL[categoryid="'+$(this).attr('data-hasbigid')+'"]');
				ct1.css({'width':'50%'}).show();
				ct2.show();
				triggerEle.find('.hasUlLink').trigger('click');
				
				var triggerEle = ct1.find('.noUL[categoryid="'+$(this).attr('data-hasbigid')+'"]');
				if(!!triggerEle[0]){
					ct1.css({'width':'100%'}).show();
					ct2.hide();
					triggerEle.addClass('hasUL_current');
				}
				
			}else{
				ct2.hide();
				ct1.css('width','100%').show();
			}
			setTimeout(function(){
				window['myScroll_parent'].refresh();
			},100);
			if($(this).attr('data-more') === '1'){
				node.addClass('filter-fixed-btn');
			}else{
				node.removeClass('filter-fixed-btn');
			}
		});
	});
	fullbg.bind('click',function(e){
		e.preventDefault();
		hide_nav();
	});
	function hide_nav(){
		node.removeClass('filter-fixed').removeClass('filter-fixed-btn');
		fullbg.fadeOut('fast');
		timelist.removeClass('hasUL_current');
		tabs.removeClass(currentClass).attr('data-isopen','0');
		ct1.css('width','100%').hide();
		ct2.hide();
	}
	
	option.callback && option.callback.call(this);
}
//?????????
function showNewPage(tit,html,callback){
	var windowIframe = $('#windowIframe'),windowIframeTitle = $('#windowIframeTitle'),windowIframeBody = $('#windowIframeBody');
	function showBox(){
		windowIframe.show();
		//$('body').css({'height':$(window).height()+'px','overflow':'hidden'});
		$('.p_main').hide();
		$('.wrapper').hide();
	}
	function hideBox(){
		windowIframe.hide();
		//$('body').css({'height':'auto','overflow':'visible'});
		$('.wrapper').show();
		$('.p_main').show();
	}
	var addEditAddressInit = function(){
		if(windowIframe.attr('data-loaded') === '0'){
			var w_h = $(window).height();
			windowIframeTitle.html(tit);
			windowIframeBody.html(html);
			windowIframe.css({'min-height':w_h+'px'});
		}
		showBox();
		callback&&callback.call(this);
		
	};
	
	addEditAddressInit();
	windowIframe.on('click','.close',function(e){
		e.preventDefault();
		hideBox();
	});
}
function getCategory(node,sid,callback){
	var url = window['siteUrl']+'request.ashx?jsoncallback=?&action=category&id='+sid;
	$.getJSON(url,function(data){
		var d = data[0].MSG;
		window['loadCat']++;
		callback&&callback.call(this,node,d);
		
	});
}
var IDC2 = (function(){
	jQuery.extend(jQuery.easing,{easeOutCubic:function(t,e,i,n,o){return n*((e=e/o-1)*e*e+1)+i}});
	var closeGG = function(node){
		var node = $('#'+node),btn = node.find('.close');
		if(!!node.find('a')[0]){node.show();}
		btn.click(function(){
			node.slideUp('easeOutCubic');
		});
	}
	var loginout = function(siteUrl){
		if(isapp === '1'){ YDB.CloseGPS();}
		var url = siteUrl+"request.ashx?action=loginout&json=1&jsoncallback=?&date=" + Math.random();
		$.getJSON(url,function(data){
			if(data[0].islogin === '0'){
				if(data[0].bbsopen === "open"){
					var   f=document.createElement("IFRAME")   
					f.height=0;
					f.width=0;
					f.src=data[0].bbsloginurl;
					if (f.attachEvent){
						f.attachEvent("onload", function(){
							setTimeout(function(){window.location.href=siteUrl;},50);
						});
					} else {
						f.onload = function(){
							setTimeout(function(){window.location.href=siteUrl;},50);
						};
					}
					document.body.appendChild(f);
				}else{
					setTimeout(function(){window.location.href=siteUrl;},50);
				}
			}else{
				alert("???????????????????????????");
			}
		}).error(function(){alert("???????????????????????????");});
	}
	var showLogin = function(){
		var loginIco = $('#login_ico'),
			login_inner = $('#login_inner'),
			login_ico = $('#login_ico');
		loginIco.click(function(){
			login_inner.slideToggle('easeOutCubic');
		});
	}
	var isLogin = function(siteUrl,siteName,source){
		var sourceS = source || '';
		var url = siteUrl+"request.ashx?action=islogin&tempid="+sourceS+"&json=1&jsoncallback=?",
			node = $("#login_inner"),login_ico = $('#login_ico'),txt='';
		var hash = '?from='+encodeURIComponent(window.location.href);
		
		$.getJSON(url,function(data){
			if(data[0].islogin==="1"){
				txt="<p><span class=\"username\">"+data[0].name+"</span>????????????????????????"+siteName+"???<br><a href=\""+siteUrl+"member\">[????????????]</a>??????<a href=\"javascript:IDC2.loginout('"+siteUrl+"');\">[??????]</a></p><input value=\"1\" id=\"isLogin\" type=\"hidden\" /><input value=\""+data[0].jibie+"\" id=\"user_jibie\" type=\"hidden\" />";
				login_ico.addClass('ico_ok');
				//loadWEBmessage();//????????????
				if(typeof getUserState !== 'undefined'){
					window['userDate'] = data[0];
					getUserState();
				}
			}else if(data[0].islogin==="2"){
				MSGwindowShow('login','1','??????????????????????????????????????????????????????',data[0].url,'');
			}else{
				$('#login_ico').attr({'href':siteUrl+'member/login.html'+hash});
				txt='<p>?????????????????????'+siteName+'???<br><a href="'+siteUrl+'member/login.html'+hash+'">[??????]</a>?????????<a href="'+siteUrl+'member/register.html">[??????]</a><input value="0" id="isLogin" type="hidden" /><input value="" id="user_jibie" type="hidden" /></p>';
				if(typeof getUserState !== 'undefined'){
					window['userDate'] = {};
					getUserState();
				}
			}
			node.html(txt);
		});
	}
	var getLoginUserInfo = function(siteUrl,siteName,source){
		var sourceS = source || '';
		var node = $("#login_inner"),LoginUserInfo = $('#LoginUserInfo'),login_ico = $('#login_ico'),txt='';
		var hash = '?from='+encodeURIComponent(window.location.href);
		
		var LoginUserInfo_userid = LoginUserInfo.val();
		if(LoginUserInfo_userid !== ''){
			var LoginUserInfo_chrname = LoginUserInfo.attr('data-chrname'),
				LoginUserInfo_chrpic = LoginUserInfo.attr('data-chrpic'),
				LoginUserInfo_isadmin = LoginUserInfo.attr('data-isadmin'),
				LoginUserInfo_styleid = LoginUserInfo.attr('data-styleid');
			txt="<p><span class=\"username\">"+LoginUserInfo_chrname+"</span>????????????????????????"+siteName+"???<br><a href=\""+siteUrl+"member\">[????????????]</a>??????<a href=\"javascript:IDC2.loginout('"+siteUrl+"');\">[??????]</a></p><input value=\"1\" id=\"isLogin\" type=\"hidden\" /><input value=\""+LoginUserInfo_styleid+"\" id=\"user_jibie\" type=\"hidden\" />";
			login_ico.addClass('ico_ok');
		}else{
			$('#login_ico').attr({'href':siteUrl+'member/login.html'+hash});
			txt='<p>?????????????????????'+siteName+'???<br><a href="'+siteUrl+'member/login.html'+hash+'">[??????]</a>?????????<a href="'+siteUrl+'member/register.html">[??????]</a><input value="0" id="isLogin" type="hidden" /><input value="" id="user_jibie" type="hidden" /></p>';
		}
		node.html(txt);
	}
	var tabADS = function(node){
		var obj = node;
		var currentClass = "current";
		var tabs = obj.find(".tab-hd").find(".item");
		var conts = obj.find(".tab-cont");
		var t;
		tabs.eq(0).addClass(currentClass);
		conts.hide();
		conts.eq(0).show();
		tabs.each(function(i){
			$(this).click(function(){
				conts.hide().eq(i).show();
				tabs.removeClass(currentClass).eq(i).addClass(currentClass);
			});
		});
	}
	var textMarquee = function(e){
		var n=$(e),r=n.width(),w=$(window).width(),i=n.html(),s=0,speed=Math.round(r/w*30);
		if(r<w){return;}
		n.html(i+i),s=r;
		var o=s/speed,
			u="marque"+(new Date).valueOf(),
			a="@-webkit-keyframes "+u+" { 0% {-webkit-transform:translate3d(0,0,0)} 100% {-webkit-transform:translate3d(-"+s+"px,0,0)}}\n";
		a+=a.replace(/\-webkit\-/g,"");
		$("head").append("<style>"+a+"</style>");
		var f=u+" "+o+"s linear infinite";
		n.css({"-webkit-animation":f,animation:f});
	}
	var footWorker = function(){
		var t = $('#shangjiaSelect'),node = $('#shangjiaSelectPo');
		t.click(function(e){
			e.preventDefault();
			if(t.attr('data-isShow')==='0'){
				node.show();
				t.attr('data-isShow','1');
			}else{
				node.hide();
				t.attr('data-isShow','0');
			}
		})
	}
	return {
		loginout:loginout,
		isLogin:isLogin,
		getLoginUserInfo:getLoginUserInfo,
		showLogin:showLogin,
		closeGG:closeGG,
		tabADS:tabADS,
		textMarquee:textMarquee,
		footWorker:footWorker
	}
})();
$.fn.radioForm = function(){
	this.each(function(){
		var list = $(this).find('.gx_radio');
		var forname = $(this).attr('data-name');
		var sid=$('input[name="'+forname+'"]:checked').attr('value');
		if(sid !=='' && !!sid){
			$(this).find('.gx_radio').removeClass('current');
			$(this).find('.gx_radio[data-val="'+sid+'"]').addClass('current');
		}
		list.click(function(e){
			e.preventDefault();
			$('input[name="'+forname+'"][value="'+$(this).attr('data-val')+'"]').prop('checked',true);
			list.removeClass('current');
			$(this).addClass('current');
		});
	});
}
$.fn.radioForm2 = function(){
	this.each(function(){
		var list = $(this).find('.gx_radio');
		list.click(function(e){
			e.preventDefault();
			$('#'+$(this).attr('data-id')+$(this).attr('data-val')).prop('checked',true);
			list.removeClass('checked');
			$(this).addClass('checked');
		});
	});
}
function setStatenum(selector){
	var statenum = Math.round(Math.random()*1E15);
	$(selector).val(statenum);
}
$.fn.get_TG_num = function(selector){
	var _t = $(this),list = _t.find(selector),arr_id = [],txt_id='';
	list.each(function(index,item){
		arr_id.push($(item).attr('data-tgid'));
	});
	txt_id = arr_id.join(',');
	var url = window['siteUrl']+'request.ashx?action=chrnum&key=tg&jsoncallback=?&id='+txt_id;
	$.getJSON(url, function(data){
		if(data[0]['islogin'] === '1'){
			for(var i=0;i<data[0]['MSG'].length;i++){
				for(var k in data[0]['MSG'][i]){
					_t.find('.tg_chrnum_'+k).html(data[0]['MSG'][i][k][0]['chrnum'])
				}
			}
		}
	});
}
$.fn.mUploadFile = function(){
	var t = $(this),btn = t.find('.a-upload'),showFileName = t.find('.showFileName');
	btn.on("change","input[type='file']",function(){
		var filePath=$(this).val();
		if(filePath.indexOf("jpg")!=-1 ||filePath.indexOf("jpeg")!=-1 || filePath.indexOf("png")!=-1 || filePath.indexOf("gif")!=-1){
			var arr=filePath.split('\\');
			var fileName=arr[arr.length-1];
			showFileName.html(fileName);
		}else{
			showFileName.html("??????????????????????????????");
			return false 
		}
	});
}
$.fn.zan_total = function(styleid,sid,val){
	var t = $(this);
	var urls = nowdomain+'request.ashx?action=dianzan&styleid='+styleid+'&id='+sid+'&jsoncallback=?';
	t.click(function(e){
		e.preventDefault();
		$.getJSON(urls,function(data){
			if(data[0].islogin === '1'){
				t.html(data[0].MSG[0][val]);
				
				var pn = t.parent();
				pn.addClass('ani_zanyixia');
				pn.animationEnd(function(){
					pn.removeClass('ani_zanyixia');
				});
				
			}else{
				MSGwindowShow('shopping','0',data[0].error,'','');
			}
		});
	});
}
$.fn.setTimerHe = function(callback){
	var hour_min_txt = 'hour_min';
	var mask = $('#mask');
	var hour_min = $('#'+hour_min_txt);
	function showTimerHe(o){
		var selector = o.attr('name')+'_'+o.attr('data-value');
		hour_min.attr({'data-forele':selector}).slideDown();
		var sibling = o.siblings('.setTimer');
		var cont = sibling.val();
		var type = sibling.attr('data-type');
		hour_min.find('.item').removeClass('disable');
		if(cont !== ''){
			if(type==='0'){
				hour_min.find('.item[title="'+cont+'"]').addClass('disable').prevAll('.item').addClass('disable');
			}else{
				hour_min.find('.item[title="'+cont+'"]').addClass('disable').nextAll('.item').addClass('disable');
			}
		}
	}
	hour_min.on('click','.closes',function(e){
		hour_min.slideUp();
		mask.hide();
	});
	hour_min.on('click','.item',function(e){
		e.preventDefault();
		if(!!$(this).hasClass('disable')){return false;}
		$('#'+hour_min.attr('data-forele')).val($(this).html());
		hour_min.slideUp();
		mask.hide();
		callback&&callback.call(this,$(this).attr('title'));
		return false;
	});
	mask.click(function(event){
		hour_min.slideUp();
		mask.hide();
	});
	return this.each(function(){
		var t = $(this);
		t.click(function(){
			showTimerHe($(this));
			mask.show();
		});
	});
}

var message_pid="-1";
var message_isstop = false;//???????????????????????????
var message_isforced = false;//????????????????????????????????????,?????????????????????????????????,?????????????????????
function loadWEBmessage(){
	var url = window['siteUrl']+'api/request.ashx?pid=' +message_pid + '&jsoncallback=?';
	$.getJSON(url,function(data){
		if(data[0].islogin === '1'){WebMessageShow(data);}
		if(data[0].islogin === '1' || data[0].islogin === '0'){
			/*if( message_pid != '-1' &&  message_pid != data[0].pid){
		  		$('#message_show').html('??????????????????,????????????????????????');
		    }*/
			message_pid=data[0].pid;
			window.setTimeout(function(){loadWEBmessage()},200);//????????????:???????????????100-200??????,?????????:??????1-2????????????
		}else{
			/*$('#message_show').html('????????????????????????????????????????????????????????????????????????');*/
			message_isstop = true;
			if(message_isforced){
				message_isforced=false;
			}else{
				if( message_pid === '-1' )message_pid='0';
			    window.setTimeout(function(){loadWEBmessage()},1*60000);////???????????????2????????????????????????,??????????????????????????????
			}
		}
	}).error(function(err){//??????2?????????????????????
		window.setTimeout(function(){loadWEBmessage()},2*60000);
	});
	/* 
	data[0].islogin:0?????????,1:?????????MSG,2:??????????????????,????????????????????????????????????.
	*/
	$(window).blur(function(){
		RunOnunload();
	});
	$(window).focus(function(){
		newloadWEBmessage();
	});
}
function newloadWEBmessage(){
	//????????????????????????????????????????????????????????????,?????????????????????????????????????????????,?????????????????????????????????????????????????????????
	//??????:?????????????????????????????????loadWEBmessage(),??????????????????,??????????????????.
	if(message_isstop){
	  	message_isstop = false;
		message_isforced =true;
    	message_pid="-1";
	    loadWEBmessage();
    }
}
function RunOnunload(){//???????????????????????????,??????????????????????????????,????????????????????????
	var url = window['siteUrl']+'api/request.ashx?action=close&pid=' +message_pid + '&jsoncallback=?';
	$.getJSON(url,function(data){});
}
function WebMessageShow(data){
	var idata = data[0]['MSG'];
	var newOrderId='webMessage';
	function countItem(){
		var len = $('#'+newOrderId).find('.item').length;
		$('#WebMessageNum').html(len);
		if(len === 0){
			$('#'+newOrderId).hide();	
		}
	}
	if(typeof idata['mp3'] !== 'undefined' && idata['mp3'] !==''){
		WebMessageMusic(idata['mp3']);
	}
	if(!$('#'+newOrderId)[0]){
		var divs = document.createElement('div');
		divs.id = newOrderId;
		$('body').append(divs);
		divs.innerHTML = '<div class="hd">??????<span id="WebMessageNum">0</span>????????????</div><div class="bd" id="WebMessageInner"></div><a href="#" class="close">??????</a><a href="#" class="remove">??????</a>';
		$('#'+newOrderId).find('.close').click(function(e){
			e.preventDefault();
			$('#WebMessageInner').slideToggle();
			$(this).toggleClass('open');
		}).end().find('.remove').click(function(e){
			e.preventDefault();
			$('#'+newOrderId).hide();
		}).end().on( "click", ".view", function(e){
			if(typeof idata['notViewCloseALL'] !=='undefined' && idata['notViewCloseALL'] === '1'){//???????????????????????????????????????
				$(this).parent().parent().remove();
			}else{
				$('#'+newOrderId).find('.tplid_'+$(this).attr('data-tplid')).remove();
			}
			countItem();
		}).on( "click", ".del", function(e){
			e.preventDefault();
			$(this).parent().parent().remove();
			countItem();
		});
	}else{
		$('#'+newOrderId).show();
		$('#WebMessageInner').slideDown();
	}
	var txt = $('<div class="item tplid_'+idata.tplid+'">'+idata.title+'<p class="date">'+idata.dtappenddate+'</p><span class="panel"><a href="'+idata.smsurl+'" class="view" data-tplid="'+idata.tplid+'">????????????</a> <a href="#" class="del">??????</a></span><s class="s"></s></div>');
	$('#WebMessageInner').prepend(txt);
	$('#WebMessageNum').html(parseInt($('#WebMessageNum').html())+1);
}
window['if_played_mp3'] = false;
function WebMessageMusic(file){
	if(!$('#html5_jplayer')[0]){
		$('body').append('<audio id="html5_jplayer" controls="false" hidden="true"></audio>');
		$(window).one('click',function(){
			$('#html5_jplayer').attr('src',file);
			$('#html5_jplayer')[0].play();
		});
		
	}else{
		$('#html5_jplayer').attr('src',file);
		$('#html5_jplayer')[0].play();
	}
	return false;
}
function showloupanAddTG(Loupan_loupanid){
	window['heightV'] = 318;
	var mask = $('#mask');
	var inner_iframe = $('#inner_iframe');
	inner_iframe.css({'top':'auto','bottom':'0','height':'0px'});
	mask.show();
	inner_iframe.show().animate({'height':window['heightV']+'px'},500,function(){});
	var myiframe = '<iframe src="../request.aspx?action=addtg&id='+Loupan_loupanid+'" scrolling="no" frameBorder="0" width="100%" height="'+window['heightV']+'"></iframe>';
	inner_iframe[0].innerHTML=myiframe;
	return false;
}
function LoginHide(){
	$('#inner_iframe').animate({'height':'0px'},500,function(){$('#mask').hide();});
}
//????????????
$.fn.showHtml2canvas = function(){
	var that = $(this);
	var html = '<div class="html2canvas_fixed" id="html2canvas_fixed"><div class="inner">'+
		'<div class="hd">???????????????????????????????????????</div>'+
		'<img src="" id="html2canvas_fixed_img" />'+
		'<div class="closes"></div>'+
		'<div class="btn">????????????</div>'+
	'</div></div>';
	$('body').eq(0).append(html);
	var html2canvas_fixed = $('#html2canvas_fixed'),html2canvas_fixed_img = $('#html2canvas_fixed_img');
	that.click(function(e){
		e.preventDefault();
		if(typeof mediaplay!=='undefined'){
			mediaplay.endVideo();
		}
		html2canvas(document.querySelector("#html2canvas_node"), {scale:2}).then(function(canvas){
			var dataURL = canvas.toDataURL("image/jpeg", .9);
			html2canvas_fixed_img.attr('src',dataURL);
			html2canvas_fixed.fadeIn();
		});
	});
	html2canvas_fixed.on('click','.btn,.closes',function(e){
		e.preventDefault();
		html2canvas_fixed.fadeOut();
	});
}
//????????????
$.fn.fixedBar = function(){
	var that = $(this);
	$(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
			that.stop(true,true).fadeIn();
        }else{
            that.stop(true,true).fadeOut();
        }
    });
    that.click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
}
function getQuan(shopid){
	var o_quan = $('#o_quan');
	var url = siteUrl+'request.ashx?action=getshopcard&shopid='+shopid+'&jsoncallback=?';
	$.getJSON(url,function(data){
		if(data[0].islogin === '1'){
			var arr = data[0].MSG;
			for(var i=0;i<arr.length;i++){
				if(parseInt(arr[i].nousercardcount) > 0){
					arr[i].disable = '';
				}else{
					if(arr[i].ismycard === "0"){
						arr[i].disable = 'disable';
					}else{
						arr[i].disable = '';
					}
				}
				var TPL=$('#tp_quan').html().replace(/[\n\t\r]/g, '');
				$('#o_quan').append(Mustache.to_html(TPL, data[0].MSG[i]));
			}
			$('#tab_item_quan')[0]&&$('#tab_item_quan').show();
			o_quan.on('click','li',function(e){
				e.preventDefault();
				if(!!$(this).hasClass('success1') || !!$(this).hasClass('disable')){return false;}
				lingQuan($(this),$(this).attr('data-picinum'),$(this).attr('data-styleid'));
			});
			if(typeof pageOneQuan !=='undefined'){
				pageOneQuan.call(this,data[0].MSG[0]);
			}
		}else{
			//MSGwindowShow('lingQuan','0',data[0].error,'','');
		}
	});
}
function lingQuan(o,picinum,styleid){
	if($('#isLogin').val()!=='1'){
		MSGwindowShow('lingQuan','1','????????????????????????',siteUrl+'member/login.html?from='+encodeURIComponent(window.location.href),'');
		return false;
	}
	var url = siteUrl+'request.ashx?action=setusercard&picinum='+picinum+'&styleid='+styleid+'&jsoncallback=?';
	$.getJSON(url,function(data){
		if(data[0].islogin === '1'){
			o.addClass('success1');
		}else{
			MSGwindowShow('lingQuan','0',data[0].error,'','');
		}
	});
}
function getHongbao(){//?????????
	if($.cookie("wap_hongbao") === '1'){
		return false;
	}
	var url = window['siteUrl']+'request.ashx?action=ismyhongbao&ishtml=1&jsoncallback=?';
	//moban:pc/main/default/member/IsMyHongbao.html
	$.getJSON(url,function(data){
		if(data[0].islogin === '1'){
			$.cookie("wap_hongbao",'1',{domain:"."+window['SiteYuming'],path:'/',expiress:1})
			$('body').append(data[0].MSG).on('click','#hongbaoNode .close',function(e){
				e.preventDefault();
				$('#hongbaoNode').hide();
				$('#mask').hide();
			});
			$('#mask').show();
			var node = $('#hongbaoNode');
			node.css({'margin-top':'-'+parseInt(node.height()/2)+'px'});
			node.find('li').each(function(){
				if(parseInt($(this).attr('data-nousercardcount'))<1){
					$(this).addClass('disable');
				}
				if($(this).attr('data-moneymin') === '0'){
					$(this).find('.moneymin').html('????????????');
				}
			});
			node.on('click','li',function(e){
				//e.preventDefault();
				if(!!$(this).hasClass('success1') || !!$(this).hasClass('disable')){return false;}
				lingQuan($(this),$(this).attr('data-picinum'),$(this).attr('data-styleid'));
			});
		}
	});
}
function gethongbaoList(tableid,arr){//???????????????????????????
	var cid = arr;
	if(!!$.isArray(arr)){
		cid = arr.join(',');
	}
	var url ='/api/hongbao.ashx?action=ishb&tableid='+tableid+'&cid='+cid+'&jsoncallback=?';
	$.getJSON(url,function(data){
		if(data[0].islogin === '1'){
			if(data[0].MSG.length !== 0){
				for(var i=0;i<data[0].MSG.length;i++){
					$('#item'+data[0].MSG[i]).find('.hashongbao_forbox,.hashongbao_fortit').addClass('display1');
				}
				
			}
		}
	});
}
function getFashareData(shareStyle,callback){//
	var url = '/wap/pinche/pageShareStyle?pageShareStyle='+shareStyle;
	$.ajax({url:url,success:function(res){
		callback&&callback.call(this,res);
	}});
}