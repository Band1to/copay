'use strict';

angular.module('copayApp.services').factory('feeService', function($log, $stateParams, bwcService, walletService, configService, gettext, lodash, txFormatService, gettextCatalog, CUSTOMNETWORKS) {
  var root = {};
  var defaults = configService.getDefaults()
  // Constant fee options to translate
  root.feeOpts = {
    urgent: gettext('Urgent'),
    priority: gettext('Priority'),
    normal: gettext('Normal'),
    economy: gettext('Economy'),
    superEconomy: gettext('Super Economy')
  };

  root.getCurrentFeeLevel = function() {
    return configService.getSync().wallet.settings.feeLevel || 'normal';
  };

  root.getCurrentFeeValue = function(network, cb) {
    network = network || defaults.defaultNetwork;
    var feeLevel = root.getCurrentFeeLevel();

    root.getFeeLevels(network, function(err, levels) {
      if (err) return cb(err);

      var feeLevelValue = lodash.find(levels[defaults.defaultNetwork], { //hardcode livenet here
        level: feeLevel
      });

      if (!feeLevelValue || !feeLevelValue.feePerKB) {
        return cb({
          message: gettextCatalog.getString("Could not get dynamic fee for level: {{feeLevel}}", {
            feeLevel: feeLevel
          })
        });
      }

      var fee = feeLevelValue.feePerKB;
      $log.debug('Dynamic fee: ' + feeLevel + ' ' + fee + ' SAT');

      return cb(null, fee);
    });
  };

  root.getFeeLevels = function(network, cb) {
    network = network || defaults.defaultNetwork;
    var walletClient = bwcService.getClient(null, {bwsurl:CUSTOMNETWORKS[network].bwsUrl});
    var unitName = configService.getSync().wallet.settings.unitName;

    walletClient.getFeeLevels('livenet', function(errLivenet, levelsLivenet) {
      walletClient.getFeeLevels('testnet', function(errTestnet, levelsTestnet) {
        if (errLivenet || errTestnet) {
          return cb(gettextCatalog.getString('Could not get dynamic fee'));
        } else {
          lodash.each(lodash.union(levelsLivenet, levelsTestnet), function(level) {
            level.feePerKBUnit = txFormatService.formatAmount(level.feePerKB) + ' ' + unitName;
          });
        }
        walletClient.getFeeLevels(defaults.networkName, function(errDefaultnet, levelsDefaultnet) {
          var retObj = {
            'livenet': levelsLivenet,
            'testnet': levelsTestnet
          };
          retObj[defaults.networkName] = levelsDefaultnet
          
          return cb(null, retObj);
        });

      });
    });
  };

  return root;
});
