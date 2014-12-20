'use strict';


// Declare app level module which depends on views, and components
var jpcsApp = angular.module('jpcsApp', [
  'ngRoute']).
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


jpcsApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.stations = [];
    $scope.apparatus = [];
    $scope.selectedStation = 0;
    $scope.selectedApparatus = "";
    $scope.selectedTab = 1;

    $scope.date = moment().format("D MMMM YYYY (dddd)");
    $scope.weekOfYear = moment().week() + '-' + moment().weekYear();

    $scope.checkoffData = [];


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