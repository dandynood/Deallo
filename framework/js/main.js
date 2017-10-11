/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var app = angular.module("mainApp",['ngRoute','homepage']);
app.controller("mainCtrl", function($scope,$location,$http)
{
    "use strict";
});

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) 
{
    "use strict";
    //$locationProvider.hashPrefix('!');
    //$locationProvider.html5Mode(true);
    $routeProvider
    .otherwise({
        redirectTo: '/'
    });
    
}]);