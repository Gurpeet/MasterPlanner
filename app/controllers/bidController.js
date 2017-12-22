(function () {
    angular.module('app')
        .controller('bidController', [
            '$q', '$stateParams', '$scope', 'providerService', 'utils', 'tableName', 'bidestimates', 'projectDetails',
            function ($q, $stateParams, $scope, providerService, utils, tableName, bidestimates, projectDetails) {

                var self = this;
                let allestimates = bidestimates;
                self.bidheader = projectDetails[0];

                function init() {
                    self.gridOptions = { multiSelect: false };
                    self.gridOptions.columnDefs = [
                        { name: 'BidId', field: 'bid_id', visible: false },
                        { name: 'Task', field: 'project' },
                        { name: 'Notes', field: 'owner' },
                        { name: 'Is Allowance?', field: 'address' },
                        { name: 'Price/Square Footage', field: 'address' },
                        { name: 'Square Footage', field: 'address' },
                        { name: 'Total', field: 'address' },
                        { name: '', field: 'id', width: "5%", cellTemplate: '<div class="ngCellText ui-grid-cell-contents"><i class="fa fa-sign-in fa-lg" ng-click="grid.appScope.udpate(row.entity.bid_id)" aria-hidden="true"></i></div>' }
                    ];
                    //'<div class="ngCellText ui-grid-cell-contents">  <div ng-click="grid.appScope.rowClick(row)">{{COL_FIELD}}</div></div>'
                    bindGrid();

                    self.gridOptions.onRegisterApi = function (gridApi) {
                        // set gridApi on scope
                        self.gridApi = gridApi;
                        // self.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                        //     // console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                        //     save().then(function (res) {
                        //         // Read file and bind details again
                        //         get().then(function (response) {
                        //             allestimates = response;
                        //             bindGrid();
                        //         });
                        //     });
                        // });
                        self.gridApi.selection.on.rowSelectionChanged($scope, function (rowEntity) {
                            // bind the row with details in form
                            console.log(rowEntity);
                        });
                    };
                };


                // self.addNew = function () {
                //     let itemId = 1;
                //     if (allestimates.length > 0) {
                //         itemId = Math.max.apply(Math, allestimates.map(function (item) { return item.id; })) + 1;
                //     }
                //     allestimates.push({ "id": itemId, "projectid": parseInt($stateParams.id) });
                //     bindGrid();
                // };

                self.save = function () {
                    console.log(2);
                    //save();
                };

                $scope.update = function (id) {
                    console.log(id);
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