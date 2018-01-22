(function () {
    angular.module('app')
        .controller('projectStatusController', ['projectDetails', function (projectDetails) {
            var self = this;
            self.statusheader = projectDetails[0];
            function init() {
                self.gridBidOptions = {
                    columnDefs: [
                        { name: 'Task', field: 'project' },
                        { name: 'Description', field: 'owner' },
                        { name: 'Total', field: 'address' },
                        { name: '% Total', field: 'address' },
                        { name: 'Actual', field: 'address' },
                        { name: 'Variance', field: 'address' },
                        { name: 'Completed', field: 'address' }
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
