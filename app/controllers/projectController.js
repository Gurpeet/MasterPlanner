(function () {
    angular.module('app')
        .controller('projectController',
        ['$state', '$stateParams', 'providerService', 'utils', 'tableName',
            function ($state, $stateParams, providerService, utils, tableName) {

                let self = this, projectid = $stateParams.id;
                let projectList = [];
                self.project = [];

                function init() {
                    providerService.readFile(tableName).then(function (projects) {
                        projectList = projects;
                        if (projectid > 0) {      //If id exist in state params then edit
                            projects.forEach(element => {
                                if (element.id == $stateParams.id) {    // Get project with project id = stateparams.id
                                    self.project = element;
                                }
                            });
                        } else {                        //else add new project
                            projectid = utils.getMaxId(projects) + 1;
                            let project = { id: projectid };
                            self.project = project;
                            projectList.push(project);
                        }
                    });
                };

                self.save = function () {
                    providerService.writeFile(tableName, projectList).then(function (response) {
                        if (response) {
                            console.log('saved');
                            $state.go('menu.updateproject', {id: projectid});
                        }
                    });
                }

                init();
            }])
})();