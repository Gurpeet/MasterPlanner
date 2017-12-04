(function () {
    angular.module('app')
        .controller('photoController', ['images', function (images) {
            var self = this;
            //var _ = require('lodash');

            function init() {
                self.images = images;
                //self.currentImage = _.first(self.images);
                //self.imageCategories = _.uniq(_.pluck(self.images, 'category'));
                self.setCurrentImage = function (image) {
                    self.currentImage = image;
                };
            };

            init();

        }])
})();
