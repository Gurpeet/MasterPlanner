(function () {
    angular.module('app')
        .controller('costvarianceController', ['costvariance', 'items', function (costvariance, items) {

            var self = this;
            function init() {

                angular.forEach(costvariance, function (row, idx) {
                    row.getItem = function () {
                        let item_id = this.item_id;
                        var filterItem = items.filter(function (item) {
                            return item.item_id == item_id;
                        });
                        return filterItem[0].task;
                    };
                });

                self.gridOptions = {
                    columnDefs: [
                        { name: 'Task', field: 'getItem()', width: "35%" },
                        { name: 'Contractor Name', field: 'contactor_id' },
                        { name: 'Total', field: 'total' },
                        { name: 'Actual Cost', field: 'actual_cost' },
                        { name: 'Variance', field: 'variance' }
                    ],
                    data: costvariance
                };
            };
            init();
        }])
})();