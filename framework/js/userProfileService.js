/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var userProfile = angular.module('userProfileService',[]);
userProfile.controller("userProfileCtrl",function($scope, $location, $http, searchFactory,localStorageService,$routeParams)
{
    "use strict";
    $scope.firstParameter = $routeParams.username;
    if(localStorageService.get("userdata")){
        $scope.accountID = localStorageService.get("userdata").accountID;
    } 
    
    $scope.getUserProfile = function(){
    var str = {username: encodeURIComponent($scope.firstParameter)};
    $http({method: 'POST', url:'php/userProfile.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to retrieve info on this user! Sorry";
           alert($scope.errorMsg);
       } else {
           $scope.userProfile = response.data;
           console.log($scope.userProfile.accountID);
           $scope.getBuyerOrders($scope.userProfile.accountID);
       }});
    };
    
    $scope.getBuyerOrders = function(id){
        var str = {accountID: encodeURIComponent(id)};
        $http({method: 'POST', url:'php/getBuyingHistory.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               console.log(response.data);
               $scope.noOrders = "No orders found";
               $scope.buyerOrders = "";
           } else {
               $scope.noOrders = "";
               $scope.recentOrders = response.data[0];
               console.log(response.data);
           }});
    };
    
    $scope.getUserProfile();
});