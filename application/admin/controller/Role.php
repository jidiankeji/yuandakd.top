<?php

namespace app\admin\controller;
use think\Db;
use think\Cache;


class Role extends Base{
	

   
	
    public function index(){
        $keyword = input('keyword','', 'htmlspecialchars');
        $map = array();
        if($keyword){
            $map['role_name'] = array('LIKE', '%' . $keyword . '%');
        }
		if($type = (int) input('type')){
			$map['type'] = $type;
            $this->assign('type', $type);
        }
		$getSearchCityId = $this->getSearchCityId($this->city_id);
		if($getSearchCityId){
			$map['city_id'] = $getSearchCityId;
			$this->assign('city_id',$getSearchCityId);
		}
		if($area_id = (int) input('area_id')){
            $map['area_id'] = $area_id;
            $this->assign('area_id', $area_id);
        }
		
        $this->assign('keyword', $keyword);
        $count = Db::name('role')->where($map)->count();
        $Page = new \Page($count, 15);
        $show = $Page->show();
        $list = Db::name('role')->where($map)->limit($Page->firstRow . ',' . $Page->listRows)->select();
		foreach($list as $k => $val){
			$list[$k]['city'] = Db::name('city')->where(array('city_id'=>$val['city_id']))->find();
			$list[$k]['area'] = Db::name('area')->where(array('area_id'=>$val['area_id']))->find();
			$list[$k]['business'] = Db::name('business')->where(array('business_id'=>$val['business_id']))->find();
        }
        $this->assign('list', $list);
        $this->assign('page', $show);
        return $this->fetch();
    }
	
	
    public function auth($role_id = 0){
        if(($role_id = (int) $role_id) && ($detail = Db::name('role')->find($role_id))){
            if(request()->post()){
                $menu_ids = input('menu_id/a');
                Db::name('role_maps')->where(array('role_id'=>$role_id))->delete();
                foreach($menu_ids as $val){
                    if(!empty($val)){
                        $data = array('role_id' => $role_id, 'menu_id' => (int) $val);
                        Db::name('role_maps')->insert($data);
                    }
                }
                $this->jinMsg('????????????', url('role/auth', array('role_id' => $role_id)));
            }else{
                $this->assign('menus', model('Menu')->fetchAll());
                $this->assign('menuIds', model('RoleMaps')->getMenuIdsByRoleId($role_id));
                $this->assign('role_id', $role_id);
                $this->assign('detail', $detail);
                return $this->fetch();
            }
        }else{
            $this->error('????????????????????????');
        }
    }
	
	
    public function create(){
        if(request()->post()){
            $data = $this->checkFields(input('data/a', false), array('type','role_name','city_id','area_id','business_id'));
			if(empty($data['role_name'])){
				$this->jinMsg('?????????????????????');
			}
			$data['role_name'] = htmlspecialchars($data['role_name'], ENT_QUOTES, 'UTF-8');
			$data['type'] = (int) $data['type'];
			if(empty($data['type'])){
				$this->jinMsg('??????????????????');
			}
			$role = Db::name('role')->where(array('role_name'=>$data['role_name']))->find();
			if($role){
				$this->jinMsg('????????????????????????');
			}
			
			
			$data['city_id'] = (int) $data['city_id'];
			$data['area_id'] = (int) $data['area_id'];
			$data['business_id'] = (int) $data['business_id'];
			
            if(Db::name('role')->insert($data)){
                $this->jinMsg('????????????', url('role/index'));
            }
            $this->jinMsg('????????????');
        }else{
            echo $this->fetch();
        }
    }
	
	
	
    public function edit($role_id = 0){
        if($role_id = (int) $role_id){
            $role = Db::name('role')->where(array('role_id'=>$role_id))->find();
            if(!$role){
                $this->error('???????????????????????????');
            }
            if(request()->post()){
                $data = $this->checkFields(input('data/a', false), array('type','role_name','city_id','area_id','business_id'));
				if(empty($data['role_name'])){
					$this->jinMsg('?????????????????????');
				}
				$data['role_name'] = htmlspecialchars($data['role_name'], ENT_QUOTES, 'UTF-8');
				$data['type'] = (int) $data['type'];
				if(empty($data['type'])){
					$this->jinMsg('??????????????????');
				}
				$data['city_id'] = (int) $data['city_id'];
				$data['area_id'] = (int) $data['area_id'];
				$data['business_id'] = (int) $data['business_id'];
                $data['role_id'] = $role_id;
                if(Db::name('role')->update($data)){
                    $this->jinMsg('????????????', url('role/index'));
                }
                $this->jinMsg('????????????');
            }else{
                $this->assign('detail',$role);
                echo $this->fetch();
            }
        }else{
            $this->error('???????????????????????????');
        }
    }
	
    public function delete($role_id = 0){
        if($role_id = (int) $role_id){
            Db::name('role')->where('role_id',$role_id)->delete();
            $this->jinMsg('????????????', url('role/index'));
        }
        $this->jinMsg('????????????????????????');
    }
	
   
}