(function () {
    angular.module('app.config')
        .service('utils', ['$filter', function ($filter) {

            this.getMaxId = function (arr) {
                let maxId = 0;
                if (arr.length > 0) {
                    maxId = Math.max.apply(Math, arr.map(function (item) { return item.id; }));
                }
                return maxId;
            };

            this.filterDetailsForProject = function (arrData, fieldVal, fieldName) {
                return $filter('filter')(arrData, function (item) {
                    return (item[fieldName] == fieldVal);
                });
            };

        }])
}());