(function () {
    angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.edit'])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'app/views/home/index.html',
                        controller: 'homeController as ctrl'
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: 'app/views/menu/index.html',
                        controller: 'menuController as ctrl'
                    })
                    .state('menu.bankcopy', {
                        url: '/bankcopy',
                        templateUrl: 'app/views/bankcopy/index.html',
                        controller: 'bankCopyController as ctrl'
                    })
                    .state('menu.tableofcontent', {
                        url: '/toc',
                        templateUrl: 'app/views/tableofcontent/index.html'
                    })
                    .state('menu.bidestimate', {
                        url: '/bid',
                        templateUrl: 'app/views/bidestimate/index.html',
                        controller: 'bidController as ctrl'
                    })
                    .state('menu.bidnotes', {
                        url: '/bidnotes',
                        templateUrl: 'app/views/bidnotes/index.html'
                    })
                    // .state('menu.biddetails', {
                    //     url: '/bidestimates',
                    //     templateUrl: 'app/views/bidestimate/bidestimates.html',
                    //     controller: 'bidEstimatesController as ctrl'
                    // })
                    .state('menu.projectlist', {
                        url: '/projectlist',
                        templateUrl: 'app/views/projectlist/index.html',
                        controller: 'projectListController as ctrl',
                        resolve: {
                            projects: ['$q', function ($q) {
                                var fs = require('fs'),
                                    filePath = './data/data.json';
                                var dfd = $q.defer();
                                fs.readFile(filePath, { encoding: 'utf-8' }, function (err, fileData) {
                                    if (!err) {
                                        dfd.resolve(JSON.parse(fileData));
                                    } else {
                                        console.log(err);
                                    }
                                });
                                return dfd.promise;
                            }]
                        }
                    })
                    .state('menu.project', {
                        url: '/project',
                        templateUrl: 'app/views/project/index.html'
                    })
                    .state('menu.projectstatus', {
                        url: '/projectstatus',
                        templateUrl: 'app/views/projectstatus/index.html',
                        controller: 'projectStatusController as ctrl'
                    })

                    .state('menu.photos', {
                        url: '/photos',
                        templateUrl: 'app/views/photos/index.html',
                        controller: 'photoController as ctrl',
                        resolve: {
                            images: ['$q', function ($q) {
                                var fs = require('fs'),
                                    filePath = './data/images/';
                                var dfd = $q.defer();
                                var imgList = [];
                                fs.readdir(filePath, (err, files) => {
                                    files.forEach(file => {
                                        imgList.push({image: './data/images/' + file});
                                    });
                                    dfd.resolve(imgList);
                                });
                                return dfd.promise;
                            }]
                        }
                    })
                    .state('menu.punch', {
                        url: '/punch',
                        templateUrl: 'app/views/punch/index.html'
                    })
                    .state('menu.flowchart', {
                        url: '/flowchart',
                        templateUrl: 'app/views/flowchart/index.html',
                        controller: 'flowchartController as ctrl'
                    })
                    .state('menu.subcontractors', {
                        url: '/subcontractors',
                        templateUrl: 'app/views/subcontractors/index.html',
                        controller: 'subContractorController as ctrl'
                    })
                    .state('menu.suppliers', {
                        url: '/suppliers',
                        templateUrl: 'app/views/suppliers/index.html',
                        controller: 'suppliersController as ctrl'
                    })

                $urlRouterProvider.when('', 'home')
                    .otherwise('home')
            }
        ])

}());
