(function () {
    angular.module('app')
        .controller('projectListController', ['projects', function (projects) {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Project', field: 'project', enableCellEdit: true, enableCellEditOnFocus: true },
                        { name: 'Owner', field: 'owner' },
                        { name: 'Address', field: 'address' }
                    ],
                    data: projects
                };
            };

            init();
        }])
})();