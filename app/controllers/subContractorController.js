(function () {
    angular.module('app')
        .controller('subContractorController', ['$q', 'subcontractors', '$scope', '$stateParams', 'providerService', 'utils', 'tableName',
            function ($q, subcontractors, $scope, $stateParams, providerService, utils, tableName) {
                var self = this;
                let allSubcontractors = subcontractors;
                function save() {
                    return providerService.writeFile(tableName, allSubcontractors).then(function (res) {
                        console.log('saved');
                    }, function (err) {
                        console.log('error');
                    });
                };

                function get() {
                    return providerService.readFile(tableName);
                };

                function bindGrid() {
                    self.gridOptions.data = utils.filterDetailsForProject(allSubcontractors, $stateParams.id, 'projectid');
                };


                function init() {
                    self.gridOptions = {};
                    self.gridOptions.enableCellEditOnFocus = true;
                    self.gridOptions.columnDefs = [
                        { name: 'id', field: 'id', enableCellEdit: false, visible: false },
                        { name: 'Subcontractor', field: 'name', enableCellEdit: true },
                        { name: 'Mailing Address', field: 'email', enableCellEdit: true },
                        { name: 'Phone', field: 'phone', enableCellEdit: true },
                        { name: 'S S #', field: 'ssn', enableCellEdit: true },
                        { name: 'Workers Comp', field: 'worker_compensation', enableCellEdit: true },
                        { name: 'Liability Ins.', field: 'liability_ins', enableCellEdit: true },
                        { name: 'Agreement Signed', field: 'agreement_signed', enableCellEdit: true },
                    ];

                    bindGrid();

                    self.gridOptions.onRegisterApi = function (gridApi) {
                        // set gridApi on scope
                        self.gridApi = gridApi;
                        self.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                            // console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                            save().then(function (res) {
                                // Read file and bind details again
                                get().then(function (response) {
                                    allSubcontractors = response;
                                    bindGrid();
                                });
                            });
                        });
                    };
                };

                self.addNew = function () {
                    let itemId = 1;
                    if (allSubcontractors.length > 0) {
                        itemId = Math.max.apply(Math, allSubcontractors.map(function (item) { return item.id; })) + 1;
                    }
                    allSubcontractors.push({ "id": itemId, "projectid": parseInt($stateParams.id) });
                    bindGrid();
                };

                // let filterDetailsForProject = function (arrData, projectid) {
                //     return $filter('filter')(arrData, function (item) {
                //         return (item.projectid == projectid);
                //     });
                // };

                init();
            }])
})();