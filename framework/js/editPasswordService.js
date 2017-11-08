/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var userProfile = angular.module('editPasswordService',[]);
userProfile.controller("editPasswordCtrl",function($scope, $location, $http, searchFactory,localStorageService,$window, $timeout)
{
    "use strict";
    $scope.currentPassword = "";
    $scope.newPassword = "";
    $scope.confirmPassword = "";
    $scope.successEdit = false;
    
    if (localStorageService.get("userdata")) {
        $scope.accountID = localStorageService.get("userdata").accountID;
        $scope.username = localStorageService.get("userdata").username;
    } else {
        $window.history.back();
    }

        
    $scope.getPassword = function(){
    var str = {accountID: encodeURIComponent($scope.accountID)};
    $http({method: 'POST', url:'php/getPassword.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to retrieve info on this user! Sorry";
       } else {
           $scope.userPassword = response.data;
       }});
    };
    
    $scope.getPassword();
    
    $scope.saveNewPassword = function(){
    var str = {accountID: encodeURIComponent($scope.accountID),
               password: encodeURIComponent($scope.newPassword)
              };
    $http({method: 'POST', url:'php/editPassword.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response){
       if(response.data === "failed"){
           $scope.errorMsg = "Can't seem to retrieve info on this user! Sorry";
           console.log($scope.errorMsg);
       } else {
           $scope.userPassword = response.data;
           console.log(response.data);
           $scope.successEdit = true;
       }});
    };

    
    $scope.checkUserPasswordEdit = function(){
        var validate = false;
        
        if($scope.currentPassword === $scope.userPassword.password){
            //console.log("correct current password");
            validate = true;
        }
        
        if($scope.newPassword !== $scope.confirmPassword){
            //console.log("Not correct new password");
            validate = false;
        }
        
        if($scope.editPasswordForm.newpassword.$valid && $scope.editPasswordForm.confirmpassword.$valid)
        {
            //console.log($scope.editPasswordForm.newpassword.$valid);
            validate = true; 
        } else {
            //console.log($scope.editPasswordForm.newpassword.$valid);
            validate = false;
        }
        
        return validate;
    };
    
    $scope.back = function () {
        $window.history.back();
    };
    
    $scope.backAfterSaving = function(){
        $timeout(function(){                   
        $location.path('/user/'+$scope.username);},400);
    };
    
});