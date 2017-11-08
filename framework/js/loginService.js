/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
angular.module('loginService',[])
.controller("loginCtrl",function($scope, $location, $cookies, $http,localStorageService,$window)
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
               alert($scope.errorMsg);
           } else {
               $cookies.put('user', response.data);
               $scope.errorMsg = "";
               $scope.inputData = [{}];
               localStorageService.set("loginstatus",'in');
               localStorageService.set("userdata",response.data);
               console.log(response.data);
                $window.history.back();
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
        //alert(str);
        //console.log(str);
    };
   
});

