(function () {
    angular.module('app')
        .controller('subContractorController', ['subcontractors', '$scope', function (subcontractors, $scope) {

            var self = this;
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
                self.gridOptions.data = subcontractors;
                self.gridOptions.onRegisterApi = function (gridApi) {
                    //set gridApi on scope
                    self.gridApi = gridApi;
                    self.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                        //update file save new value
                        console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                        save();
                        //$scope.$apply();
                    });
                };
            };

            self.addNew = function () {
                let itemId = 1;
                if (subcontractors.length > 0) {
                    itemId = Math.max.apply(Math, subcontractors.map(function (item) { return item.id; })) + 1;
                }
                subcontractors.push({ "id": itemId });
            }

            let save = function () {
                console.log(self.gridOptions.data);
            };

            init();
        }])
})();