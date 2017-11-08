/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var userProfile = angular.module('editProfileService', []);
userProfile.controller("editProfileCtrl", function ($scope, $location, $http, searchFactory, localStorageService, $window,$timeout) {
    "use strict";

    if (localStorageService.get("userdata")) {
        $scope.accountID = localStorageService.get("userdata").accountID;
    } else {
        $window.history.back();
    }

    $scope.getUserProfile = function () {
        var str = {
            accountID: encodeURIComponent($scope.accountID)
        };
        $http({
                method: 'POST',
                url: 'php/getProfileEditing.php',
                data: str,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                if (response.data === "failed") {
                    $scope.errorMsg = "Can't seem to retrieve info on this user! Sorry";
                    console.log(response.data);
                } else {
                    $scope.editUserProfile = response.data;
                    $scope.editForm = response.data;
                    console.log(response.data);
                }
            });
    };

    $scope.getUserProfile();
    

    $scope.back = function () {
        $window.history.back();
    };
    
    $scope.checkUserInfoEdit = function(){
        console.log($scope.editForm);
    };

    $scope.saveEdit = function () {
        var str = {
            accountID: encodeURIComponent($scope.accountID),
            email: encodeURIComponent($scope.editForm.email),
            phoneNumber: encodeURIComponent($scope.editForm.phoneNumber),
            address: encodeURIComponent($scope.editForm.address),
            city: encodeURIComponent($scope.editForm.city),
            postcode: encodeURIComponent($scope.editForm.postcode),
            state: encodeURIComponent($scope.editForm.state),
            country: encodeURIComponent($scope.editForm.country)
        };
        
        $http({
                method: 'POST',
                url: 'php/editProfile.php',
                data: str,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                if (response.data === "failed") {
                    $scope.errorMsg = "Can't seem to edit your info! Sorry";
                    console.log($scope.errorMsg);
                } else {
                    console.log(response.data);
                    $timeout(function(){                   $location.path('/user/'+$scope.editUserProfile.username);},400);
                    
                }
            });

    };

});
