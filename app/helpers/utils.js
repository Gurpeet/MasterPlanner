(function () {
    angular.module('app.config')
        .service('utils', [function () {

            this.getMaxId = function(arr){
                let maxId = 0;
                if(arr.length > 0){
                    maxId = Math.max.apply(Math, arr.map(function (item) { return item.id; }));
                }
                return maxId;
            }
        }])
}());