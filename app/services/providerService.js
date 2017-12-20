(function () {
    angular.module('app.services', ['app.config'])
        .service('providerService', ['$q', 'dbPath', function ($q, dbPath) {
            let fs = require('fs');

            this.readFile = function (fileName) {
                let filePath = dbPath + fileName + '.json';
                var dfd = $q.defer();
                fs.readFile(filePath, { encoding: 'utf-8' }, function (err, fileData) {
                    if (!err) {
                        dfd.resolve(JSON.parse(fileData));
                    } else {
                        dfd.reject(err);
                    }
                });
                return dfd.promise;
            };

            this.writeFile = function (fileName, jsonData) {
                let filePath = dbPath + fileName + '.json';
                var dfd = $q.defer();
                fs.writeFile(filePath, JSON.stringify(jsonData), function (err) {
                    if (!err) {
                        dfd.resolve(true);
                    } else {
                        dfd.reject(false);
                    }
                });
                return dfd.promise;
            };

            this.readDir = function (dirPath) {
                let dfd = $q.defer();
                let fileList = [];
                fs.readdir(dirPath, (err, files) => {
                    files.forEach(file => {
                        fileList.push({ image: dirPath + file });       // TODO: change image to some other name
                    });
                    dfd.resolve(fileList);
                });
                return dfd.promise;
            }


        }])
})();