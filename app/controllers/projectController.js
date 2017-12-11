(function () {
    angular.module('app')
        .controller('projectController', ['$stateParams', 'providerService', function ($stateParams, providerService) {

            var self = this;
            function init() {
                console.log($stateParams);
                //If id exist in state params then edit
                //else add new project
            };

            self.add = function () {
                //Get all projects
                //Get max id and add 1 to create new project and set its id
                //Append new project definition: json.push(new project)
                //save the data: providerService.writeFile("projects.json", JSON.stringify(json))
                //add projectid to every record in all tables
                //Create master data for new project
            }


            init();
        }])
})();