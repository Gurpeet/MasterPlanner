(function () {
    angular.module('app')
        .controller('bidController', [
            '$q', '$state', '$stateParams', '$scope', 'providerService', 'utils', 'tableName', 'bidestimates', 'projectDetails',
            function ($q, $state, $stateParams, $scope, providerService, utils, tableName, bidestimates, projectDetails) {

                const { remote } = require('electron');
                const { ipcRenderer, ipcMain } = remote;
                let win;

                var self = this;
                let allestimates = bidestimates;
                self.bidheader = projectDetails[0];

                function init() {
                    self.gridOptions = { multiSelect: false, enableFullRowSelection: true };
                    self.gridOptions.columnDefs = [
                        { name: 'BidId', field: 'id', visible: false },
                        { name: 'Task', field: 'task' },
                        { name: 'Notes', field: 'estimated_notes' },
                        { name: 'Is Allowance?', field: 'isallowance', cellTemplate: '<div ng-if="row.entity.isallowance && row.entity.isallowance == 0">No</div><div ng-if="row.entity.isallowance != 0">Yes</div>' },
                        { name: 'Price/Square Footage', field: 'price_per_sqfoot' },
                        { name: 'Square Footage', field: 'square_footage' },
                        { name: 'Total', field: 'total_price' }
                        //{ name: '', field: 'id', width: "5%", cellTemplate: '<div class="ngCellText ui-grid-cell-contents"><i class="fa fa-sign-in fa-lg" ng-click="grid.appScope.udpate(row.entity.id)" aria-hidden="true"></i></div>' }
                    ];
                    bindGrid();

                    self.gridOptions.onRegisterApi = function (gridApi) {
                        // set gridApi on scope
                        self.gridApi = gridApi;
                        self.gridApi.selection.on.rowSelectionChanged($scope, function (rowEntity) {
                            // bind the row with details in form
                            //console.log(rowEntity);
                            // const remote = require('electron').remote;
                            // const BrowserWindow = remote.BrowserWindow;
                            // var win = new BrowserWindow({ width: 800, height: 600 });
                            // win.loadURL(`file://${__dirname}/index.html`);
                            openModal(rowEntity);
                            //ipcRenderer.send('bid:open', rowEntity);
                        });
                    };
                };
                const url = require('url');
                const path = require('path')

                function openModal(rowEntity) {
                    $state.go('menu.bidmodal', { id: $stateParams.id, itemid: rowEntity.entity.id });

                    // win = new remote.BrowserWindow({
                    //     parent: remote.getCurrentWindow(),
                    //     modal: true,
                    //     height: 650
                    // });

                    // //var modalUrl = `file://${__dirname}/../views/bidestimate/bidmodal.html`;
                    // const indexPath = path.resolve(__dirname, '..', 'views', 'bidestimate', 'bidmodal.html');

                    // var indexUrl = url.format({
                    //     protocol: 'file',
                    //     pathname: indexPath,
                    //     slashes: true,
                    //     hash: encodeURIComponent(rowEntity)
                    // })


                    // win.setMenu(null);
                    // win.webContents.openDevTools();
                    // win.loadURL(indexUrl);
                    // //win.webContents.emit('bidopen', {data: rowEntity});
                    // //win.webContents.send('bid:open', rowEntity);
                }

                // process.once('loaded', () => {
                //     console.log(1);
                //   })

                // Catch bid add
                ipcMain.on('bid:add', function (event, bidItem) {
                    console.log(bidItem);
                    win.hide();
                });

                // self.addNew = function () {
                //     let itemId = 1;
                //     if (allestimates.length > 0) {
                //         itemId = Math.max.apply(Math, allestimates.map(function (item) { return item.id; })) + 1;
                //     }
                //     allestimates.push({ "id": itemId, "projectid": parseInt($stateParams.id) });
                //     bindGrid();
                // };

                self.save = function () {
                    console.log(2);
                    //save();
                };

                $scope.update = function (id) {
                    console.log(id);
                };

                function save() {
                    return providerService.writeFile(tableName, allestimates).then(function (res) {
                        console.log('saved');
                    }, function (err) {
                        console.log('error');
                    });
                };

                function get() {
                    return providerService.readFile(tableName);
                };

                function bindGrid() {
                    self.gridOptions.data = utils.filterDetailsForProject(allestimates, $stateParams.id, 'projectid');
                };

                init();
            }])
})();