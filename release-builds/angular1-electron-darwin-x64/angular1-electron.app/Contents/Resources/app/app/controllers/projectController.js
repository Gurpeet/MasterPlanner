(function () {
    angular.module('app')
        .controller('projectController',
        ['$state', '$stateParams', 'providerService', 'utils', 'tableName', 'itemList',
            function ($state, $stateParams, providerService, utils, tableName, itemList) {

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
                            //get bid estimates file and append all default items with current projectid
                            providerService.readFile('bid-estimates').then(function (bidList) {
                                var maxId = utils.getMaxId(bidList);
                                //providerService.readFile('item-list').then(function (items) {
                                itemList.forEach(item => {
                                    var bidItem = {};
                                    bidItem.id = maxId = maxId + 1;
                                    bidItem.task=item.task;
                                    bidItem.itemid = item.id;
                                    bidItem.projectid = projectid;
                                    bidItem.notes = '';
                                    bidItem.isallowance = '';
                                    bidItem.price_per_square_footage = '';
                                    bidItem.square_footage = '';
                                    bidItem.total = '';
                                    bidList.push(bidItem);
                                });
                                //save items in bid file for current project
                                providerService.writeFile('bid-estimates', bidList).then(function (response) {
                                    if (!response) {
                                        console.log('error occured');
                                    }
                                    console.log('saved');
                                    $state.go('menu.updateproject', { id: projectid });
                                });
                            });

                        }
                    });
                }

                init();
            }])
})();