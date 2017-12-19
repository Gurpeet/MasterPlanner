(function () {
    angular.module('app')
        .controller('projectController',
        ['$stateParams', 'providerService', 'utils',
            function ($stateParams, providerService, utils) {

                let self = this;
                let dbName = 'projects';
                let projectList = [];
                self.project = [];

                function init() {
                    providerService.readFile(dbName).then(function (projects) {
                        projectList = projects;
                        if ($stateParams.id > 0) {      //If id exist in state params then edit
                            projects.forEach(element => {
                                if (element.id == $stateParams.id) {    // Get project with project id = stateparams.id
                                    self.project = element;
                                }
                            });
                        } else {                        //else add new project
                            let id = utils.getMaxId(projects) + 1;
                            let project = { id: id };
                            self.project = project;
                        }
                    });
                };

                self.save = function () {
                    providerService.writeFile(dbName, projectList).then(function (response) {
                        if (response) {
                            console.log('saved');
                        }
                    });
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