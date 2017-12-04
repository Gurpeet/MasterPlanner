(function () {
    angular.module('app')
        .controller('flowchartController', [function () {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Scheduled Task', field: 'task_name' },
                        { name: 'Subcontractor', field: 'subcontractor_name' },
                        { name: 'Phone Number', field: 'phone' },
                        { name: 'Date Called', field: 'date_called' },
                        { name: 'Scheduled Date', field: 'scheduled_date' },
                        { name: 'Day Installed', field: 'day_installed' },
                        { name: 'Notes', field: 'notes' }
                    ]
                };
            };

            init();
        }])
})();