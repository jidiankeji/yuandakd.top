<?php
namespace app\admin\controller;
use think\Db;
use think\Cache;

class Usercash extends Base{
	
	
    public function index(){
		$map = array('type' =>'user');
        if($account = input('account','', 'trim,htmlspecialchars')){
            $map['account'] = array('LIKE', '%' . $account . '%');
            $this->assign('account', $account);
        }
		if($cash_id = (int) input('cash_id')){
            $map['cash_id'] = $cash_id;
            $this->assign('cash_id', $cash_id);
        }
		if($user_id = (int) input('user_id')){
            $map['user_id'] = $user_id;
            $users = Db::name('users')->find($user_id);
            $this->assign('nickname', $users['nickname']);
            $this->assign('user_id', $user_id);
        }
		if($status = (int) input('status')){
            if($status != 999){
                $map['status'] = $status;
            }
            $this->assign('status', $status);
        }else{
            $this->assign('status', 999);
        }
		if($code = input('code','', 'trim,htmlspecialchars')){
            if($code != 999) {
                $map['code'] = $code;
            }
            $this->assign('code', $code);
        }else{
            $this->assign('code', 999);
        }
        $count = Db::name('users_cash')->where($map)->count();
        $Page = new \Page($count, 25);
        $show = $Page->show();
        $list = Db::name('users_cash')->where($map)->order(array('cash_id' => 'desc'))->limit($Page->firstRow . ',' . $Page->listRows)->select();
        $ids = array();
        foreach ($list as $row) {
            $ids[] = $row['user_id'];
        }
        $map = array();
        $map['user_id'] = array('in', $ids);
        $ex = Db::name('users_ex')->where($map)->select();
        $tmp = array();
        foreach($ex as $row){
            $tmp[$row['user_id']] = $row;
        }
        foreach($list as $key => $row){
            $list[$key]['bank_name'] = empty($list[$key]['bank_name']) ? $tmp[$row['user_id']]['bank_name'] : $list[$key]['bank_name'];
            $list[$key]['bank_num'] = empty($list[$key]['bank_num']) ? $tmp[$row['user_id']]['bank_num'] : $list[$key]['bank_num'];
            $list[$key]['bank_branch'] = empty($list[$key]['bank_branch']) ? $tmp[$row['user_id']]['bank_branch'] : $list[$key]['bank_branch'];
            $list[$key]['bank_realname'] = empty($list[$key]['bank_realname']) ? $tmp[$row['user_id']]['bank_realname'] : $list[$key]['bank_realname'];
        }
		$this->assign('user_cash', round($user_cash = Db::name('users_cash')->where(array('type' => user,'status' =>1))->sum('money')/100,2));
		$this->assign('user_cash_commission', round($user_cash_commission = Db::name('users_cash')->where(array('type' => user,'status' =>1))->sum('commission')/100,2));
        $this->assign('list', $list);
        $this->assign('page', $show);
        return $this->fetch();
    }
	
  
	
	//??????
    public function audit($cash_id,$code='weixin'){
		
		$cash_id = (int) input('cash_id');
		if(!$cash_id){
			$this->error('ID??????');
        }
		$code = input('code');
		if(!$code){
			$this->error('code??????');
        }
		
		if(!($detail = Db::name('users_cash')->find($cash_id))){
			$this->error('????????????????????????');
        }
		if($detail['status'] != 0){
			$this->error('????????????');
        }
		
		if($code == 'weixin'){
			$codeName = '????????????';
		 }elseif($code == 'alipay'){
			$codeName = '???????????????';
		 }elseif($code == 'bank'){
			$codeName = '???????????????';
		 }else{
			$codeName = '????????????';
		 }
			 
		if(request()->post()){
			 $value = input('value','', 'trim,htmlspecialchars');
			 if(empty($value)){
				 $this->jinMsg('??????????????????');
			 }
			
			 
			 $admin = Db::name('admin')->where(array('admin_id'=>$this->_admin['admin_id']))->find();
			
			
			 $data['cash_id'] = $cash_id;
			 $data['reason'] = $value;
			 $data['status'] = 1;
			 $data['payment_time'] = time();
				
			 if($code == 'weixin'){
				if(false == model('UsersCash')->weixinUserCach($cash_id,1)){
					$this->jinMsg(model('UsersCash')->getError());
				}
			 }elseif($code == 'alipay'){
				if(false == model('UsersCash')->alipayUserCach($cash_id,1)){
					$this->jinMsg(model('UsersCash')->getError());
				}
			 }
			 
			 if($detail['type'] == 'money'){
				 $url = url('usercash/index');
			 }elseif($detail['type'] == 'prestige'){
				 $url = url('usercash/prestige');
			 }elseif($detail['type'] == 'gold'){
				 $url = url('usercash/gold');
			 }
			 
			 $res = Db::name('users_cash')->update($data);
			 if($res){
				$this->jinMsg($codeName.'??????',$url); 
			 }
			 $this->jinMsg('????????????');
		}else{
			$this->assign('code',$code);
			$this->assign('codeName',$codeName);
			$this->assign('detail',$detail);
            echo $this->fetch();
		}
    }
	



    //??????????????????
    public function jujue($cash_id){
		$cash_id = (int) input('cash_id');
		if(!$cash_id){
			$this->error('ID??????');
        }
		
		if(!($detail = Db::name('users_cash')->find($cash_id))){
			$this->error('????????????????????????');
        }
		if($detail['status'] != 0){
			$this->error('????????????');
        }
		if(request()->post()){
			 $value = input('value','', 'trim,htmlspecialchars');
			 if(empty($value)){
				 $this->jinMsg('????????????????????????');
			 }
			
			 
			 $admin = Db::name('admin')->where(array('admin_id'=>$this->_admin['admin_id']))->find();
			
			
			 model('Users')->addMoney($detail['user_id'], $detail['money'] + $detail['commission'], '??????ID???'.$cash_id.'?????????????????????????????????????????????'.$value.'???',3);
			 $url = url('usercash/index');
			 
			 if($rest = Db::name('users_cash')->update(array('cash_id'=>$cash_id,'payment_time'=>time(),'status' =>2,'reason'=>$value))){
				$this->jinMsg('????????????',$url);
			 }else{
				 $this->jinMsg('????????????');
			}
		}else{
			$this->assign('detail',$detail);
            echo $this->fetch();
		}
    }
	
	
   
   
}