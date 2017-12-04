(function () {
    angular.module('app')
        .controller('suppliersController', [function () {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Item', field: 'vendor_name' },
                        { name: 'Company', field: 'company' },
                        { name: 'Address', field: 'address' },
                        { name: 'Contact Person', field: 'contact_person' },
                        { name: 'Phone Number', field: 'phone' },
                    ]
                };
            };

            init();
        }])
})();