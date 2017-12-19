(function () {
    angular.module('app')
        .controller('menuController', ['$stateParams', function ($stateParams) {
            let self = this;
            self.id = $stateParams.id;
        }])
})();