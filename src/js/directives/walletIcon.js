'use strict';

angular.module('copayApp.directives')
  .directive('walletIcon', function($rootScope, $timeout) {
    return {
      restrict: 'A',
      templateUrl: 'views/includes/walletIcon.html',
      scope: {wallet: '=', network: '='},

      link: function(scope, element, attrs) {
        
        scope.$watch("wallet",function(newValue,oldValue) {
          updateScope();
        });
        scope.$watch("network",function(newValue,oldValue) {
          updateScope();
        }); 
        function updateScope() {       
          scope.bitlox = false;
          var v = scope.wallet;
          if(scope.wallet && typeof(scope.wallet.isPrivKeyExternal) === 'function' && scope.wallet.isPrivKeyExternal() && scope.wallet.getPrivKeyExternalSourceName().indexOf('bitlox') > -1) {
            scope.bitlox = true;
          } else if (scope.wallet && scope.wallet.isPrivKeyExternalString && scope.wallet.getPrivKeyExternalSourceNameString.indexOf('bitlox') > -1) {
            scope.bitlox = true
          } 

          if (!scope.wallet && scope.network) {
            scope.wallet = {network: scope.network}
          }      
        }
        updateScope();

      }
    };
  });
