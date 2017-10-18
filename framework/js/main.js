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

app.config(['$routeProvider','$locationProvider', function($routeProvider) 
{
    "use strict";
    $routeProvider
    .when('/product-catalog/:searchTags', {
        templateUrl: 'modalContainer'
    })
    .when('/home/', {
        templateUrl: 'template/home-unregistered.html'
    })
    .when('/product/:id', {
        templateUrl: 'template/AdminSettingsTemplate.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
    
}]);
