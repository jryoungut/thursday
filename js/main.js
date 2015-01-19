'use strict';


// Declare app level module which depends on views, and components
var checkoffApp = angular.module('checkoffApp', [
  'ngRoute',
  'ngGrid',
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



var CONST_SETTING_MAJOR_GROUP_NAME = 1;

/*******************************************************************************************/

checkoffApp.factory("transformRequestAsFormPost",function () {

                // I prepare the request data for the form post.
                function transformRequest(data, getHeaders) {
                    var headers = getHeaders();
                    headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
                    return (serializeData(data));
                }

                // Return the factory value.
                return (transformRequest);

                // ---
                // PRVIATE METHODS.
                // ---


                // I serialize the given Object into a key-value pair string. This
                // method expects an object and will default to the toString() method.
                // --
                // NOTE: This is an atered version of the jQuery.param() method which
                // will serialize a data collection for Form posting.
                // --
                // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
                function serializeData(data) {

                    // If this is not an object, defer to native stringification.
                    if (!angular.isObject(data)) {
                        return ((data == null) ? "" : data.toString());
                    }

                    var buffer = [];

                    // Serialize each key in the object.
                    for (var name in data) {
                        if (!data.hasOwnProperty(name)) {
                            continue;
                        }

                        var value = data[name];

                        buffer.push(
                            encodeURIComponent(name) +
                            "=" +
                            encodeURIComponent((value == null) ? "" : value)
                        );
                    }

                    // Serialize the buffer and clean it up for transportation.
                    var source = buffer
                        .join("&")
                        .replace(/%20/g, "+")
                    ;

                    return (source);
                }
            });


checkoffApp.controller('AdminController', ['$scope', '$http', '$q', '$modal', '$rootScope', 'transformRequestAsFormPost', function ($scope, $http, $q, $modal, $rootScope, transformRequestAsFormPost) {
    $scope.tab = 'CHECKOFF';
    $scope.admin = {};
    $scope.form = {};
    $scope.majorGroupsList = [];
    $scope.stationsList = [];
    $scope.apparatusList = [];
    $scope.majorGroupsName = '';
    $scope.includeMajorGroupsInactive = false;
    $scope.majorGroupsListData = [];
    $scope.gridOptionsMajorGroups = {
        data: 'majorGroupsListData',
        showGroupPanel: true,
        rowTemplate:'<div style="height: 100%" ng-class="{inactiveRow: row.getProperty(\'active\') === 0}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                           '<div ng-cell></div>' +
                     '</div></div>',
        columnDefs: [
            { displayName: 'Edit', width: 34, cellTemplate: '<div><div class="ngCellText"><img src="/thursday/img/edit.png" alt="" ng-click="admin.editMajorGroups(row.entity)" title="Edit" /></div></div>' },
            { field: 'name', displayName: 'Name' },
            { field: 'active', displayName: 'Active', cellTemplate: '<div><div class="ngCellText">{{row.getProperty(col.field) === "1" ? "Yes" : "No"}}</div></div>' }
        ]
    };

    $scope.getMajorGroupsName = function (i) {
        $http.get('/thursday/php/getSetting.php', { params: { id: i } }).
        success(function (data, status, headers, config) {
            $scope.majorGroupsName = data[0].value;
        }).
        error(function (data, status, headers, config) {
        });
    };
    $scope.getMajorGroupsName(CONST_SETTING_MAJOR_GROUP_NAME);

    $rootScope.tireCnts = [4, 6, 10];
    $rootScope.trackingType = [{ id: 'hr', name: 'Hours' }, { id: 'mi', name: 'Mileage' }];

    $scope.gridOptionsStationsList = {
        enableSorting: true,
        data: $scope.stationsList,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editStation(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'name', displayName: 'Station Name', width: 300 },
          { field: 'number', displayName: 'Number', width: 140 },
          { field: 'stationEmail', displayName: 'Station Email', width: 300 },
          { field: 'active', displayName: 'Active', width: 140, cellTemplate: '<div class="ui-grid-cell-contents alignCenter"><span>{{COL_FIELD === \'0\' ? \'---\' : \'Yes\'}}</span></div>' }
        ]
    };

    $scope.gridOptionsApparatusList = {
        enableSorting: true,
        data: $scope.apparatusList,
        enableFiltering: true,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        showFooter: true,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editApparatus(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'Apparatus', displayName: 'Apparatus' },
          { field: 'FleetNum', displayName: 'Fleet Number' },
          { field: 'Location', displayName: 'Location' },
          { field: 'Active', displayName: 'Active', width: 140, cellTemplate: '<div class="ui-grid-cell-contents alignCenter"><span>{{COL_FIELD === \'0\' ? \'---\' : \'Yes\'}}</span></div>' }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApparatusApi = gridApi;
        }
    };

    $scope.gridOptionsMajorGroupsList = {
        enableSorting: true,
        data: $scope.majorGroupsList,
        enableFiltering: true,
        multiSelect: false,
        showFooter: true,
        columnDefs: [
          { name: 'edit', displayName: '', width: 34, cellTemplate: '<img class="btn-small btn-icon" ng-click="getExternalScopes().editMajorGroups(row.entity)" src="/thursday/img/edit.png" alt="" title="Edit" /> ' },
          { field: 'name', displayName: 'Name' },
          { field: 'active', displayName: 'Active', width: 140, cellTemplate: '<div class="ui-grid-cell-contents alignCenter"><span>{{COL_FIELD === \'0\' ? \'---\' : \'Yes\'}}</span></div>' }
        ]
    };



    $scope.changetab = function (t) {
        $scope.tab = t;

        switch (t) {
            case 'CHECKOFFS': //Checkoffs
                break;
            case 'STATIONS': //Stations
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
            case 'APPARATUS': //Apparatus
                $http.get('/thursday/php/getApparatusAll.php').
                success(function (listdata, status, headers, config) {
                    window.setTimeout(function () {
                        $scope.gridOptionsApparatusList.data = listdata;
                    }, 10);
                }).
                error(function (data, status, headers, config) {
                    if (!angular.isObject(data) || !data.message) {
                        return ($q.reject("An unknown error occurred."));
                    }
                    // Otherwise, use expected error message.
                    return ($q.reject(data.message));
                });

                window.setTimeout(function () {
                    var newWidth = document.getElementById('divApparatusGridHolder').offsetWidth;
                    angular.element(document.getElementsByClassName('apparatusListGrid')[0]).css('width', newWidth + 'px');
                    var winHeight = $(window).height();
                    var elTop = document.getElementById('divApparatusGridHolder').offsetTop;
                    //var newHeight = document.getElementById('divApparatusGridHolder').offsetHeight;
                    var newHeight = winHeight - elTop - 40;
                    angular.element(document.getElementsByClassName('apparatusListGrid')[0]).css('height', newHeight + 'px');
                }, 10);

                break;
            case 'MAJOR_GROUPS': //Batallions
                var b = $scope.includeMajorGroupsInactive;
                $http.get('/thursday/php/getMajorGroupsAll.php', { params: { onlyActive: $scope.includeMajorGroupsInactive } }).
                success(function (listdata, status, headers, config) {
                    $scope.majorGroupsListData = listdata;
                    window.setTimeout(function () {
                    }, 100);
                }).
                error(function (data, status, headers, config) {
                    if (!angular.isObject(data) || !data.message) {
                        return ($q.reject("An unknown error occurred."));
                    }
                    // Otherwise, use expected error message.
                    return ($q.reject(data.message));
                });

                window.setTimeout(function () {
                    var newWidth = document.getElementById('divMajorGroupsGridHolder').offsetWidth;
                    angular.element(document.getElementsByClassName('majorGroupsListGrid')[0]).css('width', newWidth + 'px');
                    var winHeight = $(window).height();
                    var elTop = document.getElementById('divMajorGroupsGridHolder').offsetTop;
                    var newHeight = winHeight - elTop - 40;
                    angular.element(document.getElementsByClassName('majorGroupsListGrid')[0]).css('height', newHeight + 'px');
                }, 10);

                break;
            case 'SETTINGS': //Settings
                break;
            case 'USERS': //Users
                break;
        }
    };  //END changetab

    $scope.items = ['item1', 'item2', 'item3'];
    $scope.majorGroupEdit = {};
    $scope.majorGroupEdit.changed = false;
    $scope.admin.editMajorGroups = function (obj) {
        if (obj !== undefined) {
            $scope.majorGroupEdit = obj;
            $scope.majorGroupEdit.changed = false;
            $scope.majorGroupEdit.mode = 'edit';
        }
        else {
            $scope.majorGroupEdit.mode = 'add';
            $scope.majorGroupEdit.changed = false;
            $scope.majorGroupEdit.name = '';
            $scope.majorGroupEdit.active = '1';
        }
        $scope.majorGroupEdit.mainName = $scope.majorGroupsName;

        var modalInstance = $modal.open({
            templateUrl: '/thursday/content/dialogs/majorGroups.html',
            controller: 'ModalInstanceCtrlMajorGroups',
            resolve: {
                items: function () {
                    return $scope.majorGroupEdit;
                }
            }
        });

        modalInstance.result.then(function (items) {
            if (items.changed === true) {
                //Save changes
                $http.get(
                    '/thursday/php/updateMajorGroup.php',
                    {
                        params: {
                            id: items.id,
                            name: items.name,
                            active: items.active,
                            modifiedDate: items.modifiedDate
                        }
                    })
                //////var request = $http({
                //////    method: 'GET',
                //////    url: '/thursday/php/updateMajorGroup.php',
                //////    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //////    data: '?test=jack'
                //////    //data: {majorGroupInfo: items}
                //////})
                    .
                success(function (data, status, headers, config) {
                    $scope.changetab('MAJOR_GROUPS');
                }).
                error(function (data, status, headers, config) {
                });

            }
        });


        //////if (obj !== undefined) {
        //////    $scope.majorGroupEdit = obj;
        //////    $scope.majorGroupEdit.changed = false;
        //////    $scope.majorGroupEdit.mode = 'EDIT';
        //////}
        //////else {
        //////    $scope.majorGroupEdit.mode = 'ADD';
        //////}

        //////var modalInstance = $modal.open({
        //////    templateUrl: '/thursday/content/dialogs/majorGroups.html',
        //////    controller: 'ModalInstanceCtrlMajorGroups',
        //////    resolve: {
        //////        majorGroupEdit: function () {
        //////            return $scope.majorGroupEdit;
        //////        }
        //////    }
        //////});

        //////modalInstance.result.then(function (majorGroupsEdit) {
        //////    if (majorGroupsEdit.changed === true) {
        //////        //Save changes
        //////        $http.get('/thursday/php/updateMajorGroups.php', { params: { majorGroupInfo: majorGroupEdit, mode: majorGroupsEdit.mode } }).
        //////        success(function (data, status, headers, config) {
        //////        }).
        //////        error(function (data, status, headers, config) {
        //////        });

        //////    }
        //////});
    };


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
            //templateUrl: 'myModalContent.html',
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


//////angular.module('checkoffApp').controller('ModalInstanceCtrlMajorGroups', function ($scope, $modalInstance, majorGroupEdit) {

//////    $scope.majorGroupEdit = majorGroupEdit;

//////    $scope.majorGroupName = $scope.majorGroupEdit.name;
//////    $scope.majorGroupActive = $scope.majorGroupEdit.active;
//////    //$scope.majorGroupChanged = $scope.majorGroupEdit.changed;

//////    //$scope.ok = function () {
//////    //    if ($scope.frmMajorGroupsEdit.$valid === true) {
//////    //        if ($scope.majorGroupEdit.name !== $scope.majorGroupName) {
//////    //            $scope.majorGroupEdit.name = $scope.majorGroupName;
//////    //            $scope.majorGroupEdit.changed = true;
//////    //        }
//////    //        if ($scope.majorGroupEdit.active !== $scope.majorGroupActive) {
//////    //            $scope.majorGroupEdit.active = $scope.majorGroupActive === true ? '1' : '0';
//////    //            $scope.majorGroupEdit.changed = true;
//////    //        }

//////    //        $scope.majorGroupEdit.modifiedDate = getCurrentDateTime();
//////    //        $modalInstance.close($scope.majorGroupEdit);
//////    //    }
//////    //};

//////    $scope.cancel = function () {
//////        $modalInstance.dismiss('cancel');
//////    };
//////});

angular.module('checkoffApp').controller('ModalInstanceCtrlMajorGroups', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.majorGroupEdit = [];
    angular.copy($scope.items, $scope.majorGroupEdit);

    $scope.ok = function () {
        if ($scope.form.frmMajorGroupsEdit.$valid === true) {
            if ($scope.majorGroupEdit.name !== $scope.items.name) {
                //////$scope.majorGroupEdit.name = $scope.items.name;
                $scope.majorGroupEdit.changed = true;
            }
            if ($scope.majorGroupEdit.active !== $scope.items.active) {
                //////$scope.majorGroupEdit.active = $scope.items.active === true ? '1' : '0';
                $scope.majorGroupEdit.changed = true;
            }

            $scope.majorGroupEdit.modifiedDate = getCurrentDateTime();
            $modalInstance.close($scope.majorGroupEdit);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

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



