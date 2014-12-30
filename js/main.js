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
checkoffApp.controller('AdminController', ['$scope', '$http', '$q', '$modal', function ($scope, $http, $q, $modal) {
    $scope.tab = 1;
    $scope.admin = {};
    $scope.stationsList = [];

    $scope.gridOptionsStationsList = {
        enableSorting: true,
        data: $scope.stationsList,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editStation(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'name', displayName: 'Station Name' },
          { field: 'number', displayName: 'Station Number' },
          { field: 'stationEmail', displayName: 'Station Email' },
          { field: 'active', displayName: 'Active', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD === \'No\' ? \'---\' : \'Yes\'}}</span></div>' }
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

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
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

    //$scope.selected = {
    //    item: $scope.items[0]
    //};

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
                $scope.stationEdit.active = $scope.stationActive;
                $scope.stationEdit.changed = true;
            }

            $modalInstance.close($scope.stationEdit);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});