(function () {
    angular.module('app')
        .controller('suppliersController', ['$q', '$scope', '$stateParams', 'providerService', 'utils', 'tableName', 'suppliers',
            function ($q, $scope, $stateParams, providerService, utils, tableName, suppliers) {

                var self = this;
                let allSuppliers = suppliers;

                function init() {
                    self.gridOptions = {};
                    self.gridOptions.enableCellEditOnFocus = true;
                    self.gridOptions.columnDefs = [
                        { name: 'id', field: 'id', enableCellEdit: false, visible: false },
                        { name: 'Item', field: 'vendor_name', enableCellEdit: true },
                        { name: 'Company', field: 'company', enableCellEdit: true },
                        { name: 'Address', field: 'address', enableCellEdit: true },
                        { name: 'Contact Person', field: 'contact_person', enableCellEdit: true },
                        { name: 'Phone Number', field: 'phone', enableCellEdit: true },
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
                                    allSuppliers = response;
                                    bindGrid();
                                });
                            });
                        });
                    };
                };

                self.addNew = function () {
                    let itemId = 1;
                    if (allSuppliers.length > 0) {
                        itemId = Math.max.apply(Math, allSuppliers.map(function (item) { return item.id; })) + 1;
                    }
                    allSuppliers.push({ "id": itemId, "projectid": parseInt($stateParams.id) });
                    bindGrid();
                };

                function save() {
                    return providerService.writeFile(tableName, allSuppliers).then(function (res) {
                        console.log('saved');
                    }, function (err) {
                        console.log('error');
                    });
                };

                function get() {
                    return providerService.readFile(tableName);
                };

                function bindGrid() {
                    self.gridOptions.data = utils.filterDetailsForProject(allSuppliers, $stateParams.id);
                };


                init();
            }])
})();