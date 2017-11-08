/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerAddService',['ngRoute'])
.controller("sellerAddCtrl",function($scope,$route, $location,$window,$interval, $cookies, $http, localStorageService)
{
    "use strict";

    $scope.productCategoryID = null ;
    $scope.productCategoryName = "Product Category";

    $scope.accountID = localStorageService.get("userdata").accountID;


    $scope.addItem = function(){
        var str = {
            accountID: encodeURIComponent(localStorageService.get("userdata").accountID),
            shippingPrice: encodeURIComponent("0"),
            discount: encodeURIComponent($scope.productdiscount),
            categoryID: encodeURIComponent($scope.productCategoryID),
            productName: encodeURIComponent($scope.productname),
            price: encodeURIComponent($scope.productprice),
            stock: encodeURIComponent($scope.productstock),
            description: encodeURIComponent($scope.details),
            extraDetails: encodeURIComponent($scope.extradetails)};
        
        $http({method: 'POST', url:'php/addProduct.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.errorMsg = 'Registration failed! Somethere went wrong! Sorry';
               alert($scope.errorMsg);
               alert(response.data);
           } else {
               alert(response.data);
           }
        });
    };

    $scope.setCategory = function(str,str1)
    {
        $scope.productCategoryID = str;
        $scope.productCategoryName = str1;
    }
});
