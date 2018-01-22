(function () {
    angular.module('app')
        .controller('flowchartController',
        ['$q', '$scope', '$stateParams', 'providerService', 'utils', 'tableName', 'flowcharts',
            function ($q, $scope, $stateParams, providerService, utils, tableName, flowcharts) {

                var self = this;
                let allFlowcharts = flowcharts;

                function init() {
                    self.gridOptions = {};
                    self.gridOptions.enableCellEditOnFocus = true;
                    self.gridOptions.columnDefs = [
                        { name: 'Scheduled Task', field: 'task_name' },
                        { name: 'Subcontractor', field: 'subcontractor_name' },
                        { name: 'Phone Number', field: 'phone' },
                        { name: 'Date Called', field: 'date_called' },
                        { name: 'Scheduled Date', field: 'scheduled_date' },
                        { name: 'Day Installed', field: 'day_installed' },
                        { name: 'Notes', field: 'notes' }
                    ]
                    bindGrid();

                    self.gridOptions.onRegisterApi = function (gridApi) {
                        // set gridApi on scope
                        self.gridApi = gridApi;
                        self.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                            // console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                            save().then(function (res) {
                                // Read file and bind details again
                                get().then(function (response) {
                                    allFlowcharts = response;
                                    bindGrid();
                                });
                            });
                        });
                    };
                };

                self.addNew = function () {
                    let itemId = 1;
                    if (allFlowcharts.length > 0) {
                        itemId = Math.max.apply(Math, allFlowcharts.map(function (item) { return item.id; })) + 1;
                    }
                    allFlowcharts.push({ "id": itemId, "projectid": parseInt($stateParams.id) });
                    bindGrid();
                };

                function save() {
                    return providerService.writeFile(tableName, allFlowcharts).then(function (res) {
                        console.log('saved');
                    }, function (err) {
                        console.log('error');
                    });
                };

                function get() {
                    return providerService.readFile(tableName);
                };

                function bindGrid() {
                    self.gridOptions.data = utils.filterDetailsForProject(allFlowcharts, $stateParams.id, 'projectid');
                };


                init();
            }])
})();