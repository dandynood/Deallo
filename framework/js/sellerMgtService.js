/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerMgtService',[])
.controller("sellerMgtCtrl",function($scope, $location, $cookies, $http, localStorageService)
{
    "use strict";
    $scope.accountID = 1;
    $scope.sellerProducts = null;
    $scope.buyerOrders = null;
    $scope.sellerHistory = null;
    $scope.pendingTransaction = null;
    $scope.totalRevenue = 0.00;
    
    $scope.getSellersProducts = function(){
    var str = {accountID: encodeURIComponent($scope.accountID)};
    $http({method: 'POST', url:'php/sellerProducts.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
           alert($scope.noResult);
       } else {
           $scope.sellerProducts = response.data[0];
           console.log(response.data[0]);
           return response.data[0];
       }});
    };
    
    console.log($scope.getSellersProducts());
    console.log($scope.sellerProducts);

    $scope.getBuyerOrders = function(){
        var str = {accountID: encodeURIComponent($scope.accountID)};
        $http({method: 'POST', url:'php/getOrders.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
                alert($scope.noResult);
           } else {
               $scope.buyerOrders = response.data[0];
               $scope.pendingTransaction = response.data[0].length;
               console.log(response.data[0]);
               return response.data[0];
           }});
    };

    $scope.getBuyerOrders();

    $scope.getSellerHistory = function()
    {
        var str = {accountID: encodeURIComponent($scope.accountID)};
        $http({method: 'POST', url:'php/getSales.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.noResult = "Server Error: We unfortunately can't retrieve your products!";
               alert($scope.noResult);
       
           } else {
               $scope.sellerHistory = response.data[0];
               console.log(response.data[0]);
            $scope.calculateRevenue(response.data[0]);
               
               return response.data[0];
            //   console.log($scope.sellerProducts[0]);
          
           }});
    };

    $scope.getSellerHistory();



    $scope.calculateRevenue = function(object)
    {
        for (var i =0 ; object.length;i++)
            {
                if(object[i].sales!=null)
                {
                   $scope.totalRevenue = $scope.totalRevenue + parseFloat(object[i].sales);
                }
            }
        
    }
});
