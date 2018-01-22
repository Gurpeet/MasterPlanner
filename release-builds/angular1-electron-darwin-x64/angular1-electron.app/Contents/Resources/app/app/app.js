(function () {
    angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.selection', 'app.config', 'app.services'])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'app/views/home/index.html',
                        controller: 'homeController as ctrl'
                    })
                    .state('menu', {
                        url: '/menu/:id',
                        templateUrl: 'app/views/menu/index.html',
                        controller: 'menuController as ctrl'
                    })
                    .state('menu.bankcopy', {
                        url: '/bankcopy/:id',
                        templateUrl: 'app/views/bankcopy/index.html',
                        controller: 'bankCopyController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'bank-copy';
                            }]
                        }
                    })
                    .state('menu.tableofcontent', {
                        url: '/toc/:id',
                        templateUrl: 'app/views/tableofcontent/index.html'
                    })
                    .state('menu.bidestimate', {
                        url: '/bid/:id',
                        templateUrl: 'app/views/bidestimate/index.html',
                        controller: 'bidController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'bid-estimates';
                            }],
                            projectDetails: ['$stateParams', 'providerService', 'utils', function ($stateParams, providerService, utils) {
                                return providerService.readFile('projects').then(function (projects) {
                                    return utils.filterDetailsForProject(projects, $stateParams.id, 'id');
                                });
                            }],
                            bidestimates: ['providerService', function (providerService) {
                                return providerService.readFile('bid-estimates');
                            }]
                        }
                    })
                    .state('menu.bidnotes', {
                        url: '/bidnotes/:id',
                        templateUrl: 'app/views/bidnotes/index.html',
                        resolve: {
                            tableName: [function () {
                                return 'bid-notes';
                            }]
                        }
                    })
                    .state('menu.biddetails', {
                        url: '/bidestimates',
                        templateUrl: 'app/views/bidestimate/bidestimates.html',
                        controller: 'bidEstimatesController as ctrl'
                    })
                    .state('projectlist', {
                        url: '/projectlist',
                        templateUrl: 'app/views/projectlist/index.html',
                        controller: 'projectListController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'projects';
                            }],
                            projects: ['providerService', function (providerService) {
                                return providerService.readFile('projects');
                            }]
                        }
                    })
                    .state('project', {
                        url: '/project',
                        templateUrl: 'app/views/project/index.html',
                        controller: 'projectController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'projects';
                            }],
                            itemList: ['providerService', function (providerService) {
                                return providerService.readFile('item-list');
                            }],
                        }
                    })
                    .state('menu.updateproject', {
                        url: '/project/:id',
                        templateUrl: 'app/views/project/index.html',
                        controller: 'projectController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'projects';
                            }]
                        }
                    })
                    .state('menu.projectstatus', {
                        url: '/projectstatus/:id',
                        templateUrl: 'app/views/projectstatus/index.html',
                        controller: 'projectStatusController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'project-status';
                            }],
                            projectDetails: ['$stateParams', 'providerService', 'utils', function ($stateParams, providerService, utils) {
                                return providerService.readFile('projects').then(function (projects) {
                                    return utils.filterDetailsForProject(projects, $stateParams.id, 'id');
                                });
                            }]
                        }
                    })
                    .state('menu.costvariance', {
                        url: '/costvariance/:id',
                        templateUrl: 'app/views/costvariance/index.html',
                        controller: 'costvarianceController as ctrl',
                        resolve: {
                            items: ['providerService', function (providerService) {
                                return providerService.readFile('item-list');
                            }],
                            costvariance: ['providerService', function (providerService) {
                                return providerService.readFile('cost-variance');
                            }]
                        }
                    })
                    .state('menu.photos', {
                        url: '/photos/:id',
                        templateUrl: 'app/views/photos/index.html',
                        controller: 'photoController as ctrl',
                        resolve: {
                            images: ['providerService', function (providerService) {
                                return providerService.readDir('./data/images/');
                            }]
                        }
                    })
                    .state('menu.punch', {
                        url: '/punch/:id',
                        templateUrl: 'app/views/punch/index.html'
                    })
                    .state('menu.flowchart', {
                        url: '/flowchart/:id',
                        templateUrl: 'app/views/flowchart/index.html',
                        controller: 'flowchartController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'flow-chart';
                            }],
                            flowcharts: ['providerService', function (providerService) {
                                return providerService.readFile('flow-chart');
                            }]
                        }
                    })
                    .state('menu.subcontractors', {
                        url: '/subcontractors/:id',
                        templateUrl: 'app/views/subcontractors/index.html',
                        controller: 'subContractorController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'sub-contractors';
                            }],
                            subcontractors: ['providerService', function (providerService) {
                                return providerService.readFile('sub-contractors');
                            }]
                        }
                    })
                    .state('menu.suppliers', {
                        url: '/suppliers/:id',
                        templateUrl: 'app/views/suppliers/index.html',
                        controller: 'suppliersController as ctrl',
                        resolve: {
                            tableName: [function () {
                                return 'suppliers';
                            }],
                            suppliers: ['providerService', function (providerService) {
                                return providerService.readFile('suppliers');
                            }]
                        }
                    })

                $urlRouterProvider.when('', 'home')
                    .otherwise('home')
            }
        ])

}());
