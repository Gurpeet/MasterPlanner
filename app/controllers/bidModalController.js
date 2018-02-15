(function () {
    angular.module('app')
        .controller('bidModalController', [
            '$q', '$stateParams', '$state', 'providerService', 'utils', 'tableName', 'bidestimates', 'projectDetails',
            function ($q, $stateParams, $state, providerService, utils, tableName, bidestimates, projectDetails) {

                // const { remote } = require('electron');
                // const { ipcRenderer, ipcMain } = remote;
                // let win;

                var self = this;
                let allestimates = bidestimates;
                self.bidheader = projectDetails[0];

                function init() {
                    console.log(allestimates);
                    console.log(self.bidheader);
                };
                

                
                self.save = function () {
                    self.cancel();
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

                function bindGrid() {
                    self.gridOptions.data = utils.filterDetailsForProject(allestimates, $stateParams.id, 'projectid');
                };

                init();
            }])
})();