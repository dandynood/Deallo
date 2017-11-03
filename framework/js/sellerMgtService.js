/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerMgtService',[])
.controller("sellerMgtCtrl",function($scope, $location, $cookies, $http, localStorageService)
{
    "use strict";
    $scope.accountID = 1;
    
    $scope.getSellersProducts = function(){
    var str = {accountID: encodeURIComponent($scope.accountID)};
    $http({method: 'POST', url:'php/sellerProducts.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
           alert($scope.noResult);
       } else {
           $scope.sellerProducts = response.data;
           console.log($scope.sellerProducts);
       }});
    };
    
    $scope.getSellersProducts();
    
});
