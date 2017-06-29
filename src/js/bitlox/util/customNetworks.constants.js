(function(window, angular) {
    'use strict';

    angular.module('app.util')
        .constant('CUSTOMNETWORKS', {
      dogecoin: {
        name: 'dogecoin',
        alias: 'dogecoin',
        code: 'xdg',
        symbol: 'XDG',
        pubkeyhash: 0x17,
        privatekey: 0x80,
        scripthash: 0x1C,
        xpubkey: 0x0488b21e,
        xprivkey: 0x0488ade4,
        bwsUrl: 'https://bws.aureus.cc/bws/api',
        port: 9697,
        magic: 0x6ee58c2a,
        explorer: 'https://explorer.deuscoin.org/'
      },
      litecoin: {
        name: 'litecoin',
        alias: 'litecoin',
        code: 'ltc',
        symbol: 'LTC',
        pubkeyhash: 0x1e,
        privatekey: 0x80,
        scripthash: 0x23,
        xpubkey: 0x0488b21e,
        xprivkey: 0x0488ade4,
        bwsUrl: 'https://bws.deuscoin.org/bws/api',
        port: 19697,
        magic: 0x9ee8bc5a,
        explorer: 'https://explorer.deuscoin.org/'
      }}
)

})(window, window.angular);