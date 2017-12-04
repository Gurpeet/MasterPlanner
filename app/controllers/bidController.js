(function () {
    angular.module('app')
        .controller('bidController', [function () {
            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Task', field: 'project' },
                        { name: 'Notes', field: 'owner' },
                        { name: 'Is Allowance?', field: 'address' },
                        { name: 'Price/Square Footage', field: 'address' },
                        { name: 'Square Footage', field: 'address' },
                        { name: 'Total', field: 'address' }
                    ]
                };
            }

            init();
        }])
})();