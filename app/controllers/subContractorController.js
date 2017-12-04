(function () {
    angular.module('app')
        .controller('subContractorController', [function () {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Subcontractor', field: 'name' },
                        { name: 'Mailing Address', field: 'email' },
                        { name: 'Phone', field: 'phone' },
                        { name: 'S S #', field: 'ssn' },
                        { name: 'Workers Comp', field: 'worker_compensation' },
                        { name: 'Liability Ins.', field: 'liability_ins' },
                        { name: 'Agreement Signed', field: 'agreement_signed' },
                    ]
                };
            };

            init();
        }])
})();