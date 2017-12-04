(function () {
    angular.module('app')
        .controller('projectStatusController', [function () {
            var self = this;
            function init() {
                self.gridBidOptions = {
                    columnDefs: [
                        { name: 'Task', field: 'project' },
                        { name: 'Description', field: 'owner' },
                        { name: 'Total', field: 'address' },
                        { name: '% Total', field: 'address' },
                        { name: 'Actual', field: 'address' },
                        { name: 'Variance', field: 'address' }
                    ]
                };

                self.gridTaskOptions = {
                    columnDefs: [
                        { name: 'Invoice#', field: 'project' },
                        { name: 'Contractor Name', field: 'owner' },
                        { name: 'Phone', field: 'address' },
                        { name: 'Amount', field: 'address' }
                    ]
                };
            };

            init();
        }])
})();
