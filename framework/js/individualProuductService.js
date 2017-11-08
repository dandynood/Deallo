/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var indiProduct = angular.module('individualProuductService',[]);
indiProduct.controller("individualProuductCtrl",function($scope, $location, $http, searchFactory,localStorageService,$routeParams)
{
    "use strict";
    if(localStorageService.get("userdata")){
        $scope.accountID = localStorageService.get("userdata").accountID;
    } 
    
    $scope.firstParameter = $routeParams.id;
    
    $scope.searchIndiProduct = function(){
    var str = {productID: encodeURIComponent($scope.firstParameter)};
    $http({method: 'POST', url:'php/searchIndi.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to retrieve info on this product! Sorry";
       } else {
           $scope.product = response.data[0];
       }});
    };
    
    $scope.searchIndiProduct();
    
    $scope.getRatings = function(){
    var sum = 0, i,
    str = {productID: encodeURIComponent($scope.firstParameter)};
    $http({method: 'POST', url:'php/ratings.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.noRating = "Cannot retrieve customer ratings. Sorry!";
       } else {
           $scope.productRatings = response.data[0];
           for(i=0;i<$scope.productRatings.length;i++)
           {
               sum += parseInt($scope.productRatings[i].rating,10);
           }
            $scope.averageRating = sum/$scope.productRatings.length;
       }});
    };
    
    $scope.getRatings();
    
    $scope.inStock = {
        "color": "green",
        "font-weight": "bold"
    };
    
    $scope.isGold = function(num,val){
        return num <= val ? true : false;
    };
    
    
    $scope.reviewForm = {reviewTitle: "",review:"",reviewRating:"3"};
    
    $scope.resetReviewForm = function(){
        $scope.reviewForm = {reviewTitle: "",review:"",reviewRating:"3"};
    };
    
    $scope.checkReview = function(){

    };
    
    $scope.postReview = function(){
        var str = {
            productID: encodeURIComponent($scope.firstParameter),
            accountID: encodeURIComponent($scope.accountID),
            title: encodeURIComponent($scope.reviewTitle),
            comment: encodeURIComponent($scope.review),
            rating: encodeURIComponent($scope.reviewRating)};
        $http({method: 'POST', url:'php/addRating.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
        if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to post your review! Sorry.";
        } else {
            $scope.postSuccess = "You submitted your review successfully!";
        }});
        
    };
    
    $scope.deleteReview = function(id){
        var str = {
            ratingID: encodeURIComponent(id)};
        $http({method: 'POST', url:'php/deleteRating.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
        if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to delete your review! Sorry.";
        } else {
            $scope.postSuccess = "You deleted your review successfully!";
        }});
        
    };
});