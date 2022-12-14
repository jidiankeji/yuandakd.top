<?php
class Jssdk {
  private $appId;
  private $appSecret;

  function __construct($appId, $appSecret) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
	$this->curl = new \Curl();
  }
  

  public function getSignPackage() {
    $jsapiTicket = $this->getJsApiTicket();
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $timestamp = time();
    $nonceStr = $this->createNonceStr();
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);
    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {
	$data =  new \stdClass();//申明空类
    $data = json_decode(@file_get_contents(ROOT_PATH."/access_token2.json"));
	if(!$data){
		  $accessToken = model('Weixin')->getSiteToken();
		  $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
		  $res = json_decode($this->curl->get($url));
		  if(!$res->errcode){
			  $ticket = $res->ticket;
			  if ($ticket) {
				$datas = new \stdClass();//申明空类
				$datas->expire_time = time() + 7000;
				$datas->jsapi_ticket = $ticket;
				$fp = fopen(ROOT_PATH."/jsapi_ticket.json", "w");
				fwrite($fp, json_encode($datas));
				fclose($fp);
			  }
		  }else{
			  $ticket = false;
		 }
	}else{
      $ticket = $data->jsapi_ticket;
    }
	return $ticket;
  }
  

  //获取带参数二维码
  public function getTemporaryQrcode($uid){
    $accessToken = $this->getAccessToken();
    $url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='.$accessToken;
    $qrcode = '{"expire_seconds": 7200, "action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id":'.$uid.'}}}';
    $result = $this->api_notice_increment($url, $qrcode);
    $result = json_decode($result, true);
    return urldecode($result['url']);
}

  
  public function api_notice_increment($url, $data){
    $ch = curl_init();
    $header = "Accept-Charset: utf-8";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $tmpInfo = curl_exec($ch);
    if (curl_errno($ch)) {
        curl_close( $ch );
        return $ch;
    }else{
        curl_close( $ch );
        return $tmpInfo;
    }

}


}

