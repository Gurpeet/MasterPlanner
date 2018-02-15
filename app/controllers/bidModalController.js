(function () {
    angular.module('app')
        .controller('bidModalController', [
            '$q', '$filter', '$stateParams', '$state', 'providerService', 'utils', 'tableName', 'bidestimates', 'projectDetails',
            function ($q, $filter, $stateParams, $state, providerService, utils, tableName, bidestimates, projectDetails) {

                // const { remote } = require('electron');
                // const { ipcRenderer, ipcMain } = remote;
                // let win;

                var self = this;
                let allestimates = bidestimates;
                self.bidheader = projectDetails[0];

                function init() {
                    self.bid = $filter('filter')(allestimates, function (item) {
                        return (item['id'] == $stateParams.itemid);
                    })[0];
                };
                
                self.save = function () {
                    save().then(function(){
                        self.cancel();
                    });
                };

                self.cancel = function() {
                    $state.go('menu.bidestimate', $stateParams);
                };

                function save() {
                    return providerService.writeFile(tableName, allestimates).then(function (res) {
                        console.log('saved');
                    }, function (err) {
                        console.log('error');
                    });
                };

                function get() {
                    return providerService.readFile(tableName);
                };

                init();
            }])
})();