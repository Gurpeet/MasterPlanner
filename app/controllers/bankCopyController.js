(function () {
    angular.module('app')
        .controller('bankCopyController', [function () {

            var self = this;
            function init() {
                self.gridOptions = {
                    columnDefs: [
                        { name: 'Item', field: 'item' },
                        { name: 'Item Price', field: 'item_price' }                        
                    ]
                };
            };

            init();
        }])
})();