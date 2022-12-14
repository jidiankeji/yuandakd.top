<?php

namespace app\common\behavior;

use think\Exception;
use think\Request;
use think\Db;

class WebLog{
    public function run(&$param){
		
		
		//上线后这里都可注销
		
		
		//网站访问列表鉴权控制开始
        $arr = Db::name('admin_ip_auth')->select();
		$ip_config = array();
		foreach($arr as $k => $val){
            $ip_config[$k]['start'] = $val['start'];
            $ip_config[$k]['end'] = $val['end'];
        }
		$ip = request()->ip();
		$result = IpAuth($ip,$ip_config);
		if($result == 1){
			Db::name('admin_login_log')->insert(array('username' =>'禁止IP访问账户','password'=>'禁止IP访问','last_time' =>time(),'last_ip' =>$ip,'audit' => 0));
			die;exit;
		}
		
		
		
		//网站访问列表鉴权控制结束
		
        $request = Request::instance();
		//不记录的模块
		$not_log_module=config('web_log.not_log_module')?:array();

		//不记录的控制器 'module/controller'
		$not_log_controller=config('web_log.not_log_controller')?:array();

		//不记录的操作方法 'module/controller/action'
		$not_log_action=config('web_log.not_log_action')?:array();

		//不记录data的操作方法 'module/controller/action'	如涉及密码传输的地方：1、前、后台登录runlogin 2、前台重置密码runpwd_reset 3、前台runregister runchangepwd 4、后台member_runadd member_runedit 5、后台admin_runadd admin_runedit
		$not_log_data=['admin/Login/loging'];
		$not_log_data=array_merge($not_log_data,config('web_log.not_log_data')?:array());

		//不记录的请求类型
		$not_log_request_method=config('web_log.not_log_request_method')?:array();
		if (
            in_array($request->module(), $not_log_module) ||
			in_array($request->module().'/'.$request->controller(), $not_log_controller) ||
			in_array($request->module().'/'.$request->controller().'/'.$request->action(), $not_log_action) ||
            in_array($request->method(), $not_log_request_method)
        ) {
            return true;
        }
		//只记录存在的操作方法
		if(!has_action($request->module(),$request->controller(),$request->method())){
			return true;
		}
		try {
            if(in_array($request->module().'/'.$request->controller().'/'.$request->action(), $not_log_data)){
				$requestData='保密数据';
            }else{
				$requestData = $request->param();
				foreach ($requestData as &$v) {
					if (is_string($v)) {
						$v = mb_substr($v, 0, 200);
					}
				}
            }
            $data = [
                'uid'       =>session('session_user_id')?:0,
                'ip'        => $request->ip(),
                'location'  => implode(' ', \Ip::find($request->ip())),
                'os'        => getOs(),
                'browser'   => getBroswer(),
                'url'       => $request->url(),
                'module'    => $request->module(),
				'controller'=> $request->controller(),
                'action'    => $request->action(),
                'method'    => $request->isAjax()?'Ajax':($request->isPjax()?'Pjax':$request->method()),
                'data'      => serialize($requestData),
                'otime'     => time(),
            ];
            Db::name('web_log')->insert($data);
        } catch (Exception $e) {
        }
    }
}