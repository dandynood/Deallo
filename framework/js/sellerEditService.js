/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('sellerEditService',['ngRoute'])
.controller("sellerEditCtrl",function($scope,$route, $location,$window,$interval, $cookies, $http, localStorageService)
{
    "use strict";

    $scope.productID = localStorageService.get("editid");
    $scope.productprice = localStorageService.get("editprice");
    $scope.productdiscount = localStorageService.get("editdiscount");
    $scope.productCategoryID = localStorageService.get("editcategory");
    $scope.productCategoryName = localStorageService.get("editcategory");
    $scope.productname = localStorageService.get("editname");
    $scope.productstock = localStorageService.get("editstock");
    $scope.details = localStorageService.get("editdetails");
    $scope.extradetails = localStorageService.get("editxdetails");


    $scope.editItem = function(){
        var str = {
            accountID: encodeURIComponent(localStorageService.get("userdata").accountID),
            productID: encodeURIComponent($scope.productID),
            shippingPrice: encodeURIComponent("0"),
            discount: encodeURIComponent($scope.productdiscount),
            categoryID: encodeURIComponent($scope.productCategoryID),
            productName: encodeURIComponent($scope.productname),
            price: encodeURIComponent($scope.productprice),
            stock: encodeURIComponent($scope.productstock),
            description: encodeURIComponent($scope.details),
            extraDetails: encodeURIComponent($scope.extradetails)};
        
        $http({method: 'POST', url:'php/editProduct.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
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
