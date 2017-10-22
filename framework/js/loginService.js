/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('loginService',[])
.controller("loginCtrl",function($scope, $location, $cookies, $http,localStorageService)
{
    "use strict";
    $scope.inputData = [{}];
    $scope.inputData.username = "";
    $scope.inputData.password = "";
    $scope.errorMsg = "";
    
    $scope.login = function(){
        var str = {username: encodeURIComponent($scope.inputData.username), password: encodeURIComponent($scope.inputData.password)};
        $http({method: 'POST', url:'php/login.php', data: str, header:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
           if(response.data === "failed"){
               $scope.errorMsg = 'Either the username or password is incorrect';
               //alert($scope.errorMsg);
           } else {
               $cookies.put('user', response.data);
               $location.path("/home");
               $scope.errorMsg = "";
               $scope.currentLoggedInUser = $cookies.get('user');
               $scope.inputData = [{}];
               localStorageService.set("loginstatus",true);
               alert(response.data);
               
           }
        });
    };
    
    this.logout = function(){
        this.inputData.username = "";
        this.inputData.password = "";
        $cookies.remove('user');
        $location.path('/home');
        $scope.currentLoggedInUser = "";
    };
    
    $scope.showStuff = function(){
        var str = {username: encodeURIComponent($scope.inputData.username), password: encodeURIComponent($scope.inputData.password)};
        alert(str);
        console.log(str);
    };
   
});
