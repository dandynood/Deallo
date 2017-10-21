/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var indiProduct = angular.module('individualProuductService',[]);
indiProduct.controller("individualProuductCtrl",function($scope, $location, $http, searchFactory,localStorageService,$routeParams)
{
    "use strict";
    $scope.firstParameter = $routeParams.id;
    
    $scope.searchIndiProduct = function(){
    var str = {productID: encodeURIComponent($scope.firstParameter)};
    $http({method: 'POST', url:'php/searchIndi.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to retrieve info on this product! Sorry";
       } else {
           $scope.product= response.data;
           console.log($scope.product);
       }});
    };
    
    $scope.searchIndiProduct();
});