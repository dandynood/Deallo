/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var indiProduct = angular.module('individualProuductService',[]);
indiProduct.controller("individualProuductCtrl",function($scope, $location, $http, searchFactory,localStorageService,$routeParams)
{
    "use strict";
    $scope.firstParameter = $routeParams.id;
    
});