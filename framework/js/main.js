/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",['ngRoute']);
app.controller("mainCtrl", function($scope)
{
    "use strict";
    
    
    $scope.searchText = "";
    $scope.categorySelect = "All Categories";
    
    $scope.search = function(){

    };
    
});

//whenever you load/refresh the webpage it will always go to the index/start
app.run(function($window, $location, $rootScope){
    "use strict";
    $window.onbeforeunload = function(){
        $location.path('/course');
    };
});


app.config(['$routeProvider', function($routeProvider) 
{
    "use strict";
    $routeProvider
    .when('/home', {
        templateUrl: 'template/home-unregistered.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);
