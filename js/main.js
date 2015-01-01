'use strict';


// Declare app level module which depends on views, and components
var checkoffApp = angular.module('checkoffApp', [
  'ngRoute',
  'ui.grid',
  'ui.bootstrap'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/getStations', {
            templateUrl: '/php/getStations.php',
            controller: 'MainController'
        }).
        otherwise({
            redirectTo: '/view1'
        });
}]);


checkoffApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.stations = [];
    $scope.apparatus = [];
    $scope.selectedStation = 0;
    $scope.selectedApparatus = "";
    $scope.selectedTab = 1;

    $scope.date = moment().format("D MMMM YYYY (dddd)");
    $scope.weekOfYear = moment().week() + '-' + moment().weekYear();

    $scope.checkoffData = [];

    $scope.checkoffData.issues = [
        {"issue": "Right Front blinker doesn't blink"}
    ];


    // Get the list of stations
    //
    $scope.getStations = function () {
        $http.get('/thursday/php/getStations.php').
        success(function (data, status, headers, config) {
            $scope.stations = data;
        }).
        error(function (data, status, headers, config) {
            var t = data;
        });
    };

    // Get the list of apparatus for the selected station
    $scope.fillApparatus = function () {
        $scope.apparatus = [];
        $scope.selectedApparatus = '';
        $http.get('/thursday/php/getApparatus.php', { params: {stationID: $scope.selectedStation.id}}).
        success(function (data, status, headers, config) {
            $scope.apparatus = data;
            $scope.setSelectedApparatus(0);
        }).
        error(function (data, status, headers, config) {
            var t = data;
        });
    };

    $scope.setSelectedApparatus = function ($index) {
        $scope.selectedApparatus = $scope.apparatus[$index];
    };

    $scope.getStations();

    angular.element(document).ready(function () {
        console.log('Hello World');
    });
}]);





/*******************************************************************************************/
checkoffApp.controller('AdminController', ['$scope', '$http', '$q', '$modal', '$rootScope', function ($scope, $http, $q, $modal, $rootScope) {
    $scope.tab = 1;
    $scope.admin = {};
    $scope.stationsList = [];
    $scope.apparatusList = [];

    $rootScope.tireCnts = [4, 6, 10];
    $rootScope.trackingType = [{ id: 'hr', name: 'Hours' }, { id: 'mi', name: 'Mileage' }];

    $scope.gridOptionsStationsList = {
        enableSorting: true,
        data: $scope.stationsList,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editStation(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'name', displayName: 'Station Name', width: 300 },
          { field: 'number', displayName: 'Number', width: 140 },
          { field: 'stationEmail', displayName: 'Station Email' },
          { field: 'active', displayName: 'Active', width: 140, cellTemplate: '<div class="ui-grid-cell-contents alignCenter"><span>{{COL_FIELD === \'0\' ? \'---\' : \'Yes\'}}</span></div>' }
        ]
    };

    $scope.gridOptionsApparatusList = {
        enableSorting: true,
        data: $scope.apparatusList,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editApparatus(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'Apparatus', displayName: 'Apparatus' },
          { field: 'FleetNum', displayName: 'Fleet Number' },
          { field: 'Location', displayName: 'Location' },
          { field: 'Active', displayName: 'Active', width: 140, cellTemplate: '<div class="ui-grid-cell-contents alignCenter"><span>{{COL_FIELD === \'0\' ? \'---\' : \'Yes\'}}</span></div>' }
        ]
    };



    $scope.changetab = function (t) {
        $scope.tab = t;

        switch (t) {
            case 1: //Checkoffs
                break;
            case 2: //Stations
                $http.get('/thursday/php/getStationsAll.php').
                success(function (listdata, status, headers, config) {
                    $scope.gridOptionsStationsList.data = listdata;
                }).
                error(function (data, status, headers, config) {
                    if (!angular.isObject(data) || !data.message) {
                        return ($q.reject("An unknown error occurred."));
                    }
                    // Otherwise, use expected error message.
                    return ($q.reject(data.message));
                });

                break;
            case 3: //Apparatus
                $http.get('/thursday/php/getApparatusAll.php').
                success(function (listdata, status, headers, config) {
                    $scope.gridOptionsApparatusList.data = listdata;
                }).
                error(function (data, status, headers, config) {
                    if (!angular.isObject(data) || !data.message) {
                        return ($q.reject("An unknown error occurred."));
                    }
                    // Otherwise, use expected error message.
                    return ($q.reject(data.message));
                });

                break;
            case 4: //Settings
                break;
        }
    };  //END changetab

    $scope.stationEdit = {};
    $scope.admin.editStation = function (obj) {
        $scope.stationEdit = obj;
        $scope.stationEdit.changed = false;

        var modalInstance = $modal.open({
            templateUrl: '/thursday/content/dialogs/stations.html',
            controller: 'ModalInstanceCtrlStations',
            resolve: {
                station: function () {
                    return $scope.stationEdit;
                }
            }
        });

        modalInstance.result.then(function (stationEdit) {
            if (stationEdit.changed === true) {
                //Save changes
                $http.get('/thursday/php/updateStation.php', { params: { stationInfo: stationEdit } }).
                success(function (data, status, headers, config) {
                }).
                error(function (data, status, headers, config) {
                });

            }
        });
    };


    $scope.apparatusEdit = {};
    $scope.admin.editApparatus = function (obj) {
        $scope.apparatusEdit = obj;
        $scope.apparatusEdit.changed = false;

        var modalInstance = $modal.open({
            templateUrl: '/thursday/content/dialogs/apparatus.html',
            controller: 'ModalInstanceCtrlApparatus',
            resolve: {
                apparatus: function () {
                    return $scope.apparatusEdit;
                }
            }
        });

        modalInstance.result.then(function (apparatusEdit) {
            if (apparatusEdit.changed === true) {
                //Save changes
                $http.get('/thursday/php/updateApparatus.php', { params: { apparatusInfo: apparatusEdit } }).
                success(function (data, status, headers, config) {
                }).
                error(function (data, status, headers, config) {
                });

            }
        });
    };

}]);


angular.module('checkoffApp').controller('ModalInstanceCtrlStations', function ($scope, $modalInstance, station) {

    $scope.stationEdit = station;

    $scope.stationName = $scope.stationEdit.name;
    $scope.stationNumber = $scope.stationEdit.number;
    $scope.stationEmail = $scope.stationEdit.stationEmail;
    $scope.stationActive = $scope.stationEdit.active;
    $scope.stationChanged = $scope.stationEdit.changed;

    $scope.ok = function () {
        if ($scope.frmStationEdit.$valid === true) {
            if ($scope.stationEdit.name !== $scope.stationName) {
                $scope.stationEdit.name = $scope.stationName;
                $scope.stationEdit.changed = true;
            }
            if ($scope.stationEdit.number !== $scope.stationNumber) {
                $scope.stationEdit.number = $scope.stationNumber;
                $scope.stationEdit.changed = true;
            }
            if ($scope.stationEdit.stationEmail !== $scope.stationEmail) {
                $scope.stationEdit.stationEmail = $scope.stationEmail;
                $scope.stationEdit.changed = true;
            }
            if ($scope.stationEdit.active !== $scope.stationActive) {
                $scope.stationEdit.active = $scope.stationActive === true ? '1' : '0';
                $scope.stationEdit.changed = true;
            }

            $scope.stationEdit.modifiedDate = getCurrentDateTime();
            $modalInstance.close($scope.stationEdit);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});



angular.module('checkoffApp').controller('ModalInstanceCtrlApparatus', function ($scope, $modalInstance, apparatus) {

    $scope.apparatusEdit = apparatus;

    $scope.apparatusName = $scope.apparatusEdit.Apparatus;
    $scope.apparatusNumber = $scope.apparatusEdit.FleetNum;
    $scope.apparatusLocation = $scope.apparatusEdit.Location;
    $scope.selectedTireCnt = $scope.apparatusEdit.TireCnt;

    for (var i = 0; i < $scope.tireCnts.length; i++) {
        if (parseInt($scope.apparatusEdit.TireCnt) === $scope.tireCnts[i]) {
           $scope.selectedTireCnt = $scope.tireCnts[i];
            break;
        }
    };

    for (var i = 0; i < $scope.trackingType.length; i++) {
        if ($scope.apparatusEdit.MotorTracking === $scope.trackingType[i].id) {
            $scope.selectedTrackingType = $scope.trackingType[i];
            break;
        }
    };

    $scope.apparatusActive = $scope.apparatusEdit.Active;

    $scope.apparatusChanged = $scope.apparatusEdit.changed;

    $scope.ok = function () {
        if ($scope.frmapparatusEdit.$valid === true) {
            if ($scope.apparatusEdit.name !== $scope.apparatusName) {
                $scope.apparatusEdit.name = $scope.apparatusName;
                $scope.apparatusEdit.changed = true;
            }
            if ($scope.apparatusEdit.number !== $scope.apparatusNumber) {
                $scope.apparatusEdit.number = $scope.apparatusNumber;
                $scope.apparatusEdit.changed = true;
            }
            if ($scope.apparatusEdit.apparatusEmail !== $scope.apparatusEmail) {
                $scope.apparatusEdit.apparatusEmail = $scope.apparatusEmail;
                $scope.apparatusEdit.changed = true;
            }
            if ($scope.apparatusEdit.active !== $scope.apparatusActive) {
                $scope.apparatusEdit.active = $scope.apparatusActive === true ? '1' : '0';
                $scope.apparatusEdit.changed = true;
            }

            $scope.apparatusEdit.modifiedDate = getCurrentDateTime();
            $modalInstance.close($scope.apparatusEdit);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

function getCurrentDateTime() {

    var d = new Date();
    var curdt = d.getFullYear();
    curdt += '-';
    curdt += addZero(d.getMonth() + 1);
    curdt += '-';
    curdt += d.getDate();
    curdt += ' ';
    curdt += addZero(d.getHours());
    curdt += ':';
    curdt += addZero(d.getMinutes());
    curdt += ':';
    curdt += addZero(d.getSeconds());

    return curdt;
};

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};
