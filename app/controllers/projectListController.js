(function () {
    angular.module('app')
        .controller('projectListController', ['projects', function (projects) {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Project', field: 'name', enableCellEdit: true, enableCellEditOnFocus: true },
                        { name: 'Owner', field: 'owner.first_name' },
                        { name: 'Address', field: 'job.address' },
                        { name: '', field: 'id', width: "5%", cellTemplate: '<i class="fa fa-sign-in fa-lg" ui-sref="menu.bidestimate({id: row.entity.id})" aria-hidden="true"></i>' }
                    ],
                    data: projects
                };
            };

            init();
        }])
})();