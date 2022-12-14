<?php

/*
 * This file is part of the overtrue/wechat.
 *
 * (c) overtrue <i@overtrue.me>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * Card.php.
 *
 * @author    overtrue <i@overtrue.me>
 * @copyright 2016 overtrue <i@overtrue.me>
 *
 * @see      https://github.com/overtrue
 * @see      http://overtrue.me
 */

namespace EasyWeChat\Card;

use Doctrine\Common\Cache\Cache;
use Doctrine\Common\Cache\FilesystemCache;
use EasyWeChat\Core\AbstractAPI;
use EasyWeChat\Support\Arr;
use Psr\Http\Message\ResponseInterface;

class Card extends AbstractAPI
{
    /**
     * Cache.
     *
     * @var Cache
     */
    protected $cache;

    /**
     * Ticket cache prefix.
     */
    const TICKET_CACHE_PREFIX = 'overtrue.wechat.card_api_ticket.';

    const API_GET_COLORS = 'https://api.weixin.qq.com/card/getcolors';
    const API_CREATE_CARD = 'https://api.weixin.qq.com/card/create';
    const API_CREATE_QRCODE = 'https://api.weixin.qq.com/card/qrcode/create';
    const API_SHOW_QRCODE = 'https://mp.weixin.qq.com/cgi-bin/showqrcode';
    const API_GET_CARD_TICKET = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';
    const API_CREATE_LANDING_PAGE = 'https://api.weixin.qq.com/card/landingpage/create';
    const API_DEPOSIT_CODE = 'https://api.weixin.qq.com/card/code/deposit';
    const API_GET_DEPOSIT_COUNT = 'https://api.weixin.qq.com/card/code/getdepositcount';
    const API_CHECK_CODE = 'https://api.weixin.qq.com/card/code/checkcode';
    const API_GET_HTML = 'https://api.weixin.qq.com/card/mpnews/gethtml';
    const API_SET_TEST_WHITE_LIST = 'https://api.weixin.qq.com/card/testwhitelist/set';
    const API_GET_CODE = 'https://api.weixin.qq.com/card/code/get';
    const API_CONSUME_CARD = 'https://api.weixin.qq.com/card/code/consume';
    const API_DECRYPT_CODE = 'https://api.weixin.qq.com/card/code/decrypt';
    const API_GET_CARD_LIST = 'https://api.weixin.qq.com/card/user/getcardlist';
    const API_GET_CARD = 'https://api.weixin.qq.com/card/get';
    const API_LIST_CARD = 'https://api.weixin.qq.com/card/batchget';
    const API_UPDATE_CARD = 'https://api.weixin.qq.com/card/update';
    const API_SET_PAY_CELL = 'https://api.weixin.qq.com/card/paycell/set';
    const API_MODIFY_STOCK = 'https://api.weixin.qq.com/card/modifystock';
    const API_UPDATE_CODE = 'https://api.weixin.qq.com/card/code/update';
    const API_DELETE_CARD = 'https://api.weixin.qq.com/card/delete';
    const API_DISABLE_CARD = 'https://api.weixin.qq.com/card/code/unavailable';
    const API_ACTIVATE_CARD = 'https://api.weixin.qq.com/card/membercard/activate';
    const API_ACTIVATE_USER_FORM = 'https://api.weixin.qq.com/card/membercard/activateuserform/set';
    const API_GET_MEMBER_USER_INFO = 'https://api.weixin.qq.com/card/membercard/userinfo/get';
    const API_UPDATE_MEMBER_CARD_USER = 'https://api.weixin.qq.com/card/membercard/updateuser';
    const API_CREATE_SUB_MERCHANT = 'https://api.weixin.qq.com/card/submerchant/submit';
    const API_UPDATE_SUB_MERCHANT = 'https://api.weixin.qq.com/card/submerchant/update';
    const API_GET_SUB_MERCHANT = 'https://api.weixin.qq.com/card/submerchant/get';
    const API_LIST_SUB_MERCHANT = 'https://api.weixin.qq.com/card/submerchant/batchget';
    const API_GET_CATEGORIES = 'https://api.weixin.qq.com/card/getapplyprotocol';

    /**
     * ??????????????????.
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getColors()
    {
        return $this->parseJSON('get', [self::API_GET_COLORS]);
    }

    /**
     * ????????????.
     *
     * @param string $cardType
     * @param array  $baseInfo
     * @param array  $especial
     * @param array  $advancedInfo
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function create($cardType = 'member_card', array $baseInfo = [], array $especial = [], array $advancedInfo = [])
    {
        $params = [
            'card' => [
                'card_type' => strtoupper($cardType),
                strtolower($cardType) => array_merge(['base_info' => $baseInfo], $especial, $advancedInfo),
            ],
        ];

        return $this->parseJSON('json', [self::API_CREATE_CARD, $params]);
    }

    /**
     * ???????????????.
     *
     * @param array $cards
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function QRCode(array $cards = [])
    {
        return $this->parseJSON('json', [self::API_CREATE_QRCODE, $cards]);
    }

    /**
     * ticket ?????????????????????.
     *
     * @param string $ticket
     *
     * @return array
     */
    public function showQRCode($ticket = null)
    {
        $params = [
            'ticket' => $ticket,
        ];

        $http = $this->getHttp();

        /** @var ResponseInterface $response */
        $response = $http->get(self::API_SHOW_QRCODE, $params);

        return [
            'status' => $response->getStatusCode(),
            'reason' => $response->getReasonPhrase(),
            'headers' => $response->getHeaders(),
            'body' => strval($response->getBody()),
            'url' => self::API_SHOW_QRCODE.'?'.http_build_query($params),
        ];
    }

    /**
     * ??????ticket??????????????? ??????.
     *
     * @param string $ticket
     *
     * @return string
     */
    public function getQRCodeUrl($ticket)
    {
        return self::API_SHOW_QRCODE.'?ticket='.$ticket;
    }

    /**
     * ?????? ?????? Api_ticket.
     *
     * @param bool $refresh ??????????????????
     *
     * @return string $apiTicket
     */
    public function getAPITicket($refresh = false)
    {
        $key = self::TICKET_CACHE_PREFIX.$this->getAccessToken()->getAppId();

        $ticket = $this->getCache()->fetch($key);

        if (!$ticket || $refresh) {
            $result = $this->parseJSON('get', [self::API_GET_CARD_TICKET, ['type' => 'wx_card']]);

            $this->getCache()->save($key, $result['ticket'], $result['expires_in'] - 500);

            return $result['ticket'];
        }

        return $ticket;
    }

    /**
     * ???????????????JSAPI ????????????.
     *
     * @param array $cards
     *
     * @return string
     */
    public function jsConfigForAssign(array $cards)
    {
        return json_encode(array_map(function ($card) {
            return $this->attachExtension($card['card_id'], $card);
        }, $cards));
    }

    /**
     * ?????? js??????????????? ????????? card_list ???.
     *
     * @param string $cardId
     * @param array  $extension
     *
     * @return string
     */
    public function attachExtension($cardId, array $extension = [])
    {
        $timestamp = time();
        $ext = [
            'code' => Arr::get($extension, 'code'),
            'openid' => Arr::get($extension, 'openid', Arr::get($extension, 'open_id')),
            'timestamp' => $timestamp,
            'outer_id' => Arr::get($extension, 'outer_id'),
            'balance' => Arr::get($extension, 'balance'),
        ];
        $ext['signature'] = $this->getSignature(
            $this->getAPITicket(),
            $timestamp,
            $cardId,
            $ext['code'],
            $ext['openid'],
            $ext['balance']
        );

        return [
            'cardId' => $cardId,
            'cardExt' => json_encode($ext),
        ];
    }

    /**
     * ????????????.
     *
     * @return string
     */
    public function getSignature()
    {
        $params = func_get_args();
        sort($params, SORT_STRING);

        return sha1(implode($params));
    }

    /**
     * ??????????????????.
     *
     * @param string $banner
     * @param string $pageTitle
     * @param bool   $canShare
     * @param string $scene     [SCENE_NEAR_BY ??????,SCENE_MENU ???????????????,SCENE_QRCODE ?????????,SCENE_ARTICLE ???????????????,
     *                          SCENE_H5 h5??????,SCENE_IVR ????????????,SCENE_CARD_CUSTOM_CELL ???????????????cell]
     * @param array  $cardList
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function createLandingPage($banner, $pageTitle, $canShare, $scene, $cardList)
    {
        $params = [
            'banner' => $banner,
            'page_title' => $pageTitle,
            'can_share' => $canShare,
            'scene' => $scene,
            'card_list' => $cardList,
        ];

        return $this->parseJSON('json', [self::API_CREATE_LANDING_PAGE, $params]);
    }

    /**
     * ??????code??????.
     *
     * @param string $cardId
     * @param array  $code
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function deposit($cardId, $code)
    {
        $params = [
            'card_id' => $cardId,
            'code' => $code,
        ];

        return $this->parseJSON('json', [self::API_DEPOSIT_CODE, $params]);
    }

    /**
     * ????????????code??????.
     *
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getDepositedCount($cardId)
    {
        $params = [
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_GET_DEPOSIT_COUNT, $params]);
    }

    /**
     * ??????code??????.
     *
     * @param string $cardId
     * @param array  $code
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function checkCode($cardId, $code)
    {
        $params = [
            'card_id' => $cardId,
            'code' => $code,
        ];

        return $this->parseJSON('json', [self::API_CHECK_CODE, $params]);
    }

    /**
     * ??????Code??????.
     *
     * @param string $code
     * @param bool   $checkConsume
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getCode($code, $checkConsume, $cardId)
    {
        $params = [
            'code' => $code,
            'check_consume' => $checkConsume,
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_GET_CODE, $params]);
    }

    /**
     * ??????Code??????.
     *
     * @param string $code
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function consume($code, $cardId = null)
    {
        if (strlen($code) === 28 && $cardId && strlen($cardId) !== 28) {
            list($code, $cardId) = [$cardId, $code];
        }

        $params = [
            'code' => $code,
        ];

        if ($cardId) {
            $params['card_id'] = $cardId;
        }

        return $this->parseJSON('json', [self::API_CONSUME_CARD, $params]);
    }

    /**
     * Code????????????.
     *
     * @param string $encryptedCode
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function decryptCode($encryptedCode)
    {
        $params = [
            'encrypt_code' => $encryptedCode,
        ];

        return $this->parseJSON('json', [self::API_DECRYPT_CODE, $params]);
    }

    /**
     * ????????????????????????.
     *
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getHtml($cardId)
    {
        $params = [
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_GET_HTML, $params]);
    }

    /**
     * ?????????????????????.
     *
     * @param array $openids
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function setTestWhitelist($openids)
    {
        $params = [
            'openid' => $openids,
        ];

        return $this->parseJSON('json', [self::API_SET_TEST_WHITE_LIST, $params]);
    }

    /**
     * ?????????????????????(by username).
     *
     * @param array $usernames
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function setTestWhitelistByUsername($usernames)
    {
        $params = [
            'username' => $usernames,
        ];

        return $this->parseJSON('json', [self::API_SET_TEST_WHITE_LIST, $params]);
    }

    /**
     * ?????????????????????????????????.
     *
     * @param string $openid
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getUserCards($openid, $cardId = '')
    {
        $params = [
            'openid' => $openid,
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_GET_CARD_LIST, $params]);
    }

    /**
     * ??????????????????.
     *
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getCard($cardId)
    {
        $params = [
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_GET_CARD, $params]);
    }

    /**
     * ?????????????????????.
     *
     * @param int    $offset
     * @param int    $count
     * @param string $statusList
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function lists($offset = 0, $count = 10, $statusList = 'CARD_STATUS_VERIFY_OK')
    {
        $params = [
            'offset' => $offset,
            'count' => $count,
            'status_list' => $statusList,
        ];

        return $this->parseJSON('json', [self::API_LIST_CARD, $params]);
    }

    /**
     * ???????????????????????? and ????????????????????????.
     *
     * @param string $cardId
     * @param string $type
     * @param array  $baseInfo
     * @param array  $especial
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function update($cardId, $type, $baseInfo = [], $especial = [])
    {
        $card = [];
        $card['card_id'] = $cardId;
        $card[$type] = [];

        $cardInfo = [];
        if ($baseInfo) {
            $cardInfo['base_info'] = $baseInfo;
        }

        $card[$type] = array_merge($cardInfo, $especial);

        return $this->parseJSON('json', [self::API_UPDATE_CARD, $card]);
    }

    /**
     * ????????????????????????.
     * ??????????????? card_id ?????????????????????????????????????????????.
     *
     * @param string $cardId
     * @param bool   $isOpen
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function setPayCell($cardId, $isOpen = true)
    {
        $params = [
            'card_id' => $cardId,
            'is_open' => $isOpen,
        ];

        return $this->parseJSON('json', [self::API_SET_PAY_CELL, $params]);
    }

    /**
     * ????????????.
     *
     * @param string $cardId
     * @param int    $amount
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function increaseStock($cardId, $amount)
    {
        return $this->updateStock($cardId, $amount, 'increase');
    }

    /**
     * ????????????.
     *
     * @param string $cardId
     * @param int    $amount
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function reduceStock($cardId, $amount)
    {
        return $this->updateStock($cardId, $amount, 'reduce');
    }

    /**
     * ??????????????????.
     *
     * @param string $cardId
     * @param int    $amount
     * @param string $action
     *
     * @return \EasyWeChat\Support\Collection
     */
    protected function updateStock($cardId, $amount, $action = 'increase')
    {
        $key = $action === 'increase' ? 'increase_stock_value' : 'reduce_stock_value';
        $params = [
            'card_id' => $cardId,
            $key => abs($amount),
        ];

        return $this->parseJSON('json', [self::API_MODIFY_STOCK, $params]);
    }

    /**
     * ??????Code??????.
     *
     * @param string $code
     * @param string $newCode
     * @param array  $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function updateCode($code, $newCode, $cardId = [])
    {
        $params = [
            'code' => $code,
            'new_code' => $newCode,
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_UPDATE_CODE, $params]);
    }

    /**
     * ??????????????????.
     *
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function delete($cardId)
    {
        $params = [
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_DELETE_CARD, $params]);
    }

    /**
     * ??????????????????.
     *
     * @param string $code
     * @param string $cardId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function disable($code, $cardId = '')
    {
        $params = [
            'code' => $code,
            'card_id' => $cardId,
        ];

        return $this->parseJSON('json', [self::API_DISABLE_CARD, $params]);
    }

    /**
     * ?????????????????????.
     *
     * @param array $info
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function activate($info = [])
    {
        return $this->parseJSON('json', [self::API_ACTIVATE_CARD, $info]);
    }

    /**
     * ????????????????????????.
     *
     * @param string $cardId
     * @param array  $requiredForm
     * @param array  $optionalForm
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function activateUserForm($cardId, array $requiredForm = [], array $optionalForm = [])
    {
        $params = array_merge(['card_id' => $cardId], $requiredForm, $optionalForm);

        return $this->parseJSON('json', [self::API_ACTIVATE_USER_FORM, $params]);
    }

    /**
     * ????????????????????????.
     *
     * @param string $cardId
     * @param string $code
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getMemberCardUser($cardId, $code)
    {
        $params = [
            'card_id' => $cardId,
            'code' => $code,
        ];

        return $this->parseJSON('json', [self::API_GET_MEMBER_USER_INFO, $params]);
    }

    /**
     * ??????????????????.
     *
     * @param array $params
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function updateMemberCardUser(array $params = [])
    {
        return $this->parseJSON('json', [self::API_UPDATE_MEMBER_CARD_USER, $params]);
    }

    /**
     * ???????????????.
     *
     * @param array $info
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function createSubMerchant(array $info = [])
    {
        $params = [
            'info' => Arr::only($info, [
                'brand_name',
                'logo_url',
                'protocol',
                'end_time',
                'primary_category_id',
                'secondary_category_id',
                'agreement_media_id',
                'operator_media_id',
                'app_id',
            ]),
        ];

        return $this->parseJSON('json', [self::API_CREATE_SUB_MERCHANT, $params]);
    }

    /**
     * ???????????????.
     *
     * @param int   $merchantId
     * @param array $info
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function updateSubMerchant($merchantId, array $info = [])
    {
        $params = [
            'info' => array_merge(['merchant_id' => $merchantId],
                Arr::only($info, [
                    'brand_name',
                    'logo_url',
                    'protocol',
                    'end_time',
                    'primary_category_id',
                    'secondary_category_id',
                    'agreement_media_id',
                    'operator_media_id',
                    'app_id',
                ])),
        ];

        return $this->parseJSON('json', [self::API_UPDATE_SUB_MERCHANT, $params]);
    }

    /**
     * ?????????????????????.
     *
     * @param int $merchantId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getSubMerchant($merchantId)
    {
        return $this->parseJSON('json', [self::API_GET_SUB_MERCHANT, ['merchant_id' => $merchantId]]);
    }

    /**
     * ???????????????????????????.
     *
     * @param int    $beginId
     * @param int    $limit
     * @param string $status
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function listSubMerchants($beginId = 0, $limit = 50, $status = 'CHECKING')
    {
        $params = [
            'begin_id' => $beginId,
            'limit' => $limit,
            'status' => $status,
        ];

        return $this->parseJSON('json', [self::API_LIST_SUB_MERCHANT, $params]);
    }

    /**
     * ??????????????????????????????.
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getCategories()
    {
        return $this->parseJSON('get', [self::API_GET_CATEGORIES]);
    }

    /**
     * Set cache manager.
     *
     * @param \Doctrine\Common\Cache\Cache $cache
     *
     * @return $this
     */
    public function setCache(Cache $cache)
    {
        $this->cache = $cache;

        return $this;
    }

    /**
     * Return cache manager.
     *
     * @return \Doctrine\Common\Cache\Cache
     */
    public function getCache()
    {
        return $this->cache ?: $this->cache = new FilesystemCache(sys_get_temp_dir());
    }

    /**
     * Set current url.
     *
     * @param string $url
     *
     * @return Card
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }
}
