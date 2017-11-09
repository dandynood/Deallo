/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('checkoutService',[])
.controller("checkoutCtrl",function($scope, $location, $cookies, $http,localStorageService,$window,$rootScope)
{
    "use strict";
    
    $scope.successRemove = false;
    $scope.successOrder = false;
    
    if(localStorageService.get("userdata")){
        $scope.accountID = localStorageService.get("userdata").accountID;
    }
    else{  $window.history.back();}
    
    $scope.checkoutcart = localStorageService.get("cart");
    $scope.totalCost = 0;
    
    $scope.getTotal = function(){
        var i;
        $scope.totalCost = 0;
        if($scope.checkoutcart !== null){
            for(i=0;i<$scope.checkoutcart.length;i++){
                if($scope.checkoutcart[i].quantity === 0 || $scope.checkoutcart[i].quantity === undefined) 
                { 
                   $scope.checkoutcart[i].quantity = 1;
                }
                $scope.totalCost = $scope.totalCost + ($scope.checkoutcart[i].price * $scope.checkoutcart[i].quantity);
            }
        }
    };
    
    
    $scope.getTotal();
    
    $scope.isGold = function(num,val){
        return num <= val ? true : false;
    };
    
    $scope.selectCartItem = function(item){
        $scope.selectedCartItem = item;
        $scope.successRemove = false;
    };
    
    $scope.openConfirmOrder = function(){
        $scope.successOrder = false;
    };
    
    $scope.orderItems = function(){
        $http({method: 'POST', url:'php/postOrders.php', data: {cart: $scope.checkoutcart, accountID: encodeURIComponent($scope.accountID)}, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.errorMsg = "Can't seem to post your order on this user! Sorry";
               console.log(response.data);
           } else {
               $scope.success = response.data;
               console.log(response.data);
               $scope.successOrder = true;
               $scope.cartSummary = $scope.checkoutcart;
               $scope.checkoutcart = [];
               localStorageService.set("cart",$scope.checkoutcart);
               $rootScope.$emit("callGetShoppingCart",{});
           }});
    };
    
    $scope.removeFromCart = function(selectedCartItem){
        $scope.successRemove = true;
        var x;
        for(x=0;x<$scope.checkoutcart.length;x++){
            if($scope.checkoutcart[x].productId === selectedCartItem.productId){
                $scope.checkoutcart.splice(x,1);  
            }
        }
        $scope.getTotal();
        localStorageService.set("cart", $scope.checkoutcart);
        $rootScope.$emit("callGetShoppingCart", {});
    };
   
});