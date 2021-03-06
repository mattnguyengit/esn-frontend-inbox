(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox')
    .controller('inboxComposerIdentitySelectorController', inboxComposerIdentitySelectorController);

  function inboxComposerIdentitySelectorController(_, inboxIdentitiesService) {
    var self = this;

    self.$onInit = $onInit;
    self.onIdentityChange = onIdentityChange;
    self.getIdentityLabel = getIdentityLabel;

    function $onInit() {
      inboxIdentitiesService.getAllIdentities()
        .then(function(identities) {
          self.identities = identities.filter(function(identity) {
            return identity.usable;
          });

          self.identity = self.identity || _.find(self.identities, { default: true }) || self.identities[0];
        })
        .then(onIdentityChange);
    }

    function onIdentityChange() {
      self.onIdentityUpdate({ $identity: self.identity });
    }

    function getIdentityLabel(identity) {
      return identity.name + ' <' + identity.email + '>';
    }
  }
})();
