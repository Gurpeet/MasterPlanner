(function () {
    angular.module('app')
        .controller('homeController', [ function () {

            var fs = require('fs'),
                path = require('path'),
                //filePath = path.join(__dirname, 'index.js');
                filePath = './data/data.json';

            var self = this;

            function init() {
                // self.gridOptions = {
                //     //enableSorting: true,
                //     columnDefs: [
                //         { name: 'Project', field: 'project' },
                //         { name: 'Owner', field: 'owner' }
                //     ],
                //     data: projects
                // };
            };

            // function init() {
            //     self.gridOptions = {
            //         //enableSorting: true,
            //         columnDefs: [
            //             { name: 'Project', field: 'project' },
            //             { name: 'Owner', field: 'owner' }
            //         ],
            //         data: projects
            //     };
                // self.gridOptions = {
                //     enableSorting: true,
                //     columnDefs: [
                //         { name: 'firstName', field: 'first-name' },
                //         { name: '1stFriend', field: 'friends[0]' },
                //         { name: 'city', field: 'address.city' },
                //         { name: 'getZip', field: 'getZip()', enableCellEdit: false }
                //     ],
                //     data: [{
                //         "first-name": "Cox",
                //         "friends": ["friend0"],
                //         "address": { street: "301 Dove Ave", city: "Laurel", zip: "39565" },
                //         "getZip": function () { return this.address.zip; }
                //     }]
                // };


                //Filesystem
                //Save file
                // fs.writeFile(filePath, '[{"projectId": "1" ,"project": "HomeApp", "owner": "Gurpreet"}]', function (err) {
                //     if (err) {
                //         return console.log(err);
                //     }

                //     console.log("The file was saved!");
                // });
                //Read file
                // fs.readFile(filePath, { encoding: 'utf-8' }, function (err, fileData) {
                //     if (!err) {
                //         let myData = JSON.parse(fileData);
                //         console.log(myData);
                //         self.gridOptions.data = myData;
                //         console.log(self.gridOptions);
                //     } else {
                //         console.log(err);
                //     }
                // });

                //Mongo
                //Schema
                // var Schema = mongoose.Schema,
                //     ObjectId = Schema.ObjectId;

                // var Project = new Schema({
                //     project_name: String,
                //     owner_name: String
                // });

                //Db connection
                // mongoose.Promise = global.Promise;
                // mongoose.connect('mongodb://localhost/MasterPlanner', { useMongoClient: true });

                // var proj = mongoose.model('Projects', Project);
                // var pro = new proj({ project_name: 'Electron', owner_name: 'Pathan' });

                //For saving data
                // pro.save(function (err) {
                //     if (err) {
                //         console.log(err);
                //     }
                //     console.log('saved');
                // });

                //For fetching data
                // proj.find({ owner_name: 'Sivia Saab' }, function (err, data) {
                //     if (err) {
                //         console.log(err);
                //         return;
                //     }
                    //For Update
                    // data[0].owner_name = 'Sivia Saab';
                    // data[0].save(function (errs) {
                    //     if (errs) {
                    //         console.log(errs);
                    //         return;
                    //     }
                    //     console.log('Update');
                    // })
                //});

                //For updating data

                // self.myData = [
                //     {
                //         "firstName": "Cox",
                //         "lastName": "Carney",
                //         "company": "Enormo",
                //         "employed": true
                //     },
                //     {
                //         "firstName": "Lorraine",
                //         "lastName": "Wise",
                //         "company": "Comveyer",
                //         "employed": false
                //     },
                //     {
                //         "firstName": "Nancy",
                //         "lastName": "Waters",
                //         "company": "Fuelton",
                //         "employed": false
                //     }
                // ];

            //}

            init();
        }]);
}())