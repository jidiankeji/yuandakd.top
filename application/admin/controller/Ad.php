<?php
namespace app\admin\controller;
use think\Db;
use think\Cache;


class Ad extends Base{
	
    private $create_fields = array('site_id','title','background','intro','city_id','link_url', 'photo', 'code', 'bg_date', 'end_date','is_target','is_wxapp','state','src','wb_src','xcx_name','appid','orderby');
    private $edit_fields = array('site_id','title','background','intro', 'city_id','link_url', 'photo', 'code', 'bg_date', 'end_date','is_target','is_wxapp','state','src','wb_src','xcx_name','appid','orderby');
    public function _initialize(){
        parent::_initialize();
        $this->citys = model('City')->fetchAll();
        $this->assign('citys', $this->citys);
    }
	
    public function index(){
		$map = array('closed' => 0);
        $keyword = input('keyword','', 'htmlspecialchars');
        if($keyword){
            $map['title'] = array('LIKE', '%' . $keyword . '%');
            $this->assign('keyword', $keyword);
        }
	    if($site_id = (int) input('site_id')){
            if($site_id != 999){
               $map['site_id'] = $site_id;
            }
            $this->assign('site_id', $site_id);
        }else{
            $this->assign('site_id', 999);
        }
		
	    $getSearchCityId = $this->getSearchCityId($this->city_id);
		if($getSearchCityId){
			$map['city_id'] = $getSearchCityId;
			$this->assign('city_id',$getSearchCityId);
		}
		
		if($is_target = (int) input('is_target')){
            if($is_target != 999){
               $map['is_target'] = $is_target;
            }
            $this->assign('is_target', $is_target);
        }else{
            $this->assign('is_target', 999);
        }
		if($is_wxapp = (int) input('is_wxapp')){
            if($is_wxapp != 999){
               $map['is_wxapp'] = $is_wxapp;
            }
            $this->assign('is_wxapp', $is_wxapp);
        }else{
            $this->assign('is_wxapp', 999);
        }
        $count = Db::name('ad')->where($map)->count();
        $Page = new \Page($count, 15);
        $show = $Page->show();
        $list = Db::name('ad')->where($map)->order(array('ad_id' => 'desc'))->limit($Page->firstRow . ',' . $Page->listRows)->select();
        $this->assign('list', $list);
        $this->assign('page', $show);
        $this->assign('sites', model('AdSite')->fetchAll());
        $this->assign('types', model('AdSite')->getType());
        return $this->fetch();
    }
	
    public function create($site_id = 0){
        if(request()->post()){
            $data = $this->createCheck();
            if(Db::name('ad')->insert($data)) {
                $this->jinMsg('????????????', url('ad/index', array('site_id' => $site_id)));
            }
            $this->jinMsg('???????????????');
        }else{
            $this->assign('site_id', $site_id);
            $this->assign('sites', model('AdSite')->fetchAll());
            $this->assign('types', model('AdSite')->getType());
            return $this->fetch();
        }
    }
	
    private function createCheck(){
        $data = $this->checkFields(input('data/a', false), $this->create_fields);
        $data['site_id'] = (int) $data['site_id'];
        if(empty($data['site_id'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['title'] = htmlspecialchars($data['title']);
        if(empty($data['title'])) {
            $this->jinMsg('????????????????????????');
        }
		$data['intro'] = htmlspecialchars($data['intro']);
       
        $data['link_url'] = htmlspecialchars($data['link_url']);
        $data['photo'] = htmlspecialchars($data['photo']);
        if(!empty($data['photo']) && !isImage($data['photo'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['code'] = $data['code'];
        $data['bg_date'] = htmlspecialchars($data['bg_date']);
        if(empty($data['bg_date'])) {
            $this->jinMsg('????????????????????????');
        }
        if(!isDate($data['bg_date'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['end_date'] = htmlspecialchars($data['end_date']);
        if(empty($data['end_date'])) {
            $this->jinMsg('????????????????????????');
        }
        if(!isDate($data['end_date'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['orderby'] = (int) $data['orderby'];
		$data['is_target'] = (int) $data['is_target'];
		$data['is_wxapp'] = (int) $data['is_wxapp'];
		$data['state'] = (int) $data['state'];
		$data['src'] = htmlspecialchars($data['src']);
		$data['wb_src'] = htmlspecialchars($data['wb_src']);
		$data['xcx_name'] = htmlspecialchars($data['xcx_name']);
		$data['appid'] = htmlspecialchars($data['appid']);
        $data['city_id'] = (int) $data['city_id'];
        return $data;
    }
	
	
	
    public function edit($ad_id = 0){
        if($ad_id = (int) $ad_id){
            if(!($detail = Db::name('ad')->find($ad_id))){
                $this->error('???????????????????????????');
            }
            if(request()->post()){
                $data = $this->editCheck();
                $data['ad_id'] = $ad_id;
                if (false !== Db::name('ad')->update($data)){
                    $this->jinMsg('????????????', url('ad/index', array('site_id' => $data['site_id'])));
                }
                $this->jinMsg('????????????');
            }else{
                $this->assign('detail', $detail);
                $this->assign('sites', model('AdSite')->fetchAll());
                $this->assign('types', model('AdSite')->getType());
                return $this->fetch();
            }
        }else{
            $this->error('???????????????????????????');
        }
    }
	
    private function editCheck(){
        $data = $this->checkFields(input('data/a', false), $this->edit_fields);
        $data['site_id'] = (int) $data['site_id'];
        if(empty($data['site_id'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['title'] = htmlspecialchars($data['title']);
        if(empty($data['title'])){
            $this->jinMsg('????????????????????????');
        }
		$data['intro'] = htmlspecialchars($data['intro']);
      
        $data['link_url'] = htmlspecialchars($data['link_url']);
        $data['photo'] = htmlspecialchars($data['photo']);
        if(!empty($data['photo']) && !isImage($data['photo'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['code'] = $data['code'];
        $data['bg_date'] = htmlspecialchars($data['bg_date']);
        if(empty($data['bg_date'])) {
            $this->jinMsg('????????????????????????');
        }
        if(!isDate($data['bg_date'])) {
            $this->jinMsg('???????????????????????????');
        }
        $data['end_date'] = htmlspecialchars($data['end_date']);
        if(empty($data['end_date'])){
            $this->jinMsg('????????????????????????');
        }
        if(!isDate($data['end_date'])){
            $this->jinMsg('???????????????????????????');
        }
        $data['orderby'] = (int) $data['orderby'];
		$data['is_target'] = (int) $data['is_target'];
		$data['is_wxapp'] = (int) $data['is_wxapp'];
		$data['state'] = (int) $data['state'];
		$data['src'] = htmlspecialchars($data['src']);
		$data['wb_src'] = htmlspecialchars($data['wb_src']);
		$data['xcx_name'] = htmlspecialchars($data['xcx_name']);
		$data['appid'] = htmlspecialchars($data['appid']);
        $data['city_id'] = (int) $data['city_id'];
        return $data;
    }
	
    public function delete($ad_id = 0){
        if (is_numeric($ad_id) && ($ad_id = (int) $ad_id)) {
			$detail = Db::name('ad')->where(array('ad_id' => $ad_id))->find();
            Db::name('ad')->where('ad_id',$ad_id)->delete();
            $this->jinMsg('????????????', url('ad/index',array('site_id'=>$detail['site_id'])));
        }else{
            $ad_id = input('ad_id/a', false);
            if(is_array($ad_id)){
                foreach ($ad_id as $id){
					Db::name('ad')->where('ad_id',$id)->delete();
                }
                $this->jinMsg('??????????????????', url('adsite/index'));
            }
            $this->jinMsg('???????????????????????????');
        }
    }
	
	public function reset($ad_id = 0,$site_id = 0) {
        $ad_id = (int) $ad_id;
		$site_id = (int) $site_id;
		if(!empty($ad_id)){
			Db::name('ad')->update(array('ad_id' => $ad_id, 'click' => 0,'reset_time' => time()));
        	$this->jinMsg('?????????????????????', url('ad/index',array('site_id'=>$site_id)));
		}else{
			$this->jinMsg('????????????????????????????????????');
		}
        
    }
}