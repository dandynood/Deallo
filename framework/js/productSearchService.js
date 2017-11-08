/*jslint white:true */
/*global angular */
/*jslint plusplus:true*/
var productList = angular.module('productSearchService', ['ngRoute']);

productList.factory('searchFactory', function () {
    "use strict";
    var mySearch = null;
    return {
        getSearch: function () {
            return mySearch;
        },
        setSearch: function (val) {
            mySearch = val;
        }
    };
});

productList.controller("productSearchCtrl", function ($scope, $location, $http, searchFactory, localStorageService, $routeParams) {
    "use strict";
    $scope.firstParameter = $routeParams.params1;
    $scope.secondParameter = $routeParams.params2;
    $scope.ratingFilter = 0;

    $scope.search = function () {
        var str = {
            name: encodeURIComponent($scope.secondParameter),
            category: encodeURIComponent($scope.firstParameter)
        };
        $http({
                method: 'POST',
                url: 'php/search.php',
                data: str,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                if (response.data === "failed") {
                    $scope.noResult = "Cannot find what you're looking for. Sorry";
                } else {
                    $scope.productSearchResult = response.data;
                    localStorageService.set('result', $scope.productSearchResult);
                    searchFactory.setSearch($scope.productSearchResult);
                    console.log(response.data);
                }
            });
    };

    $scope.search();

    $scope.showingResultsFor = $scope.searchItemText;

    $scope.categoryIcons = [
        {
            categoryID: "ACCES",
            link: "https://png.icons8.com/bangles-filled/ios7/50"
        },
        {
            categoryID: "ARTS",
            link: "https://png.icons8.com/origami-filled/ios7/50"
        },
        {
            categoryID: "CLOTH",
            link: "https://png.icons8.com/t-shirt-filled/ios7/50"
        },
        {
            categoryID: "CRAFTS",
            link: "https://png.icons8.com/yarn-filled/ios7/50"
        },
        {
            categoryID: "JEWEL",
            link: "https://png.icons8.com/ring-side-view-filled/ios7/50"
        },
        {
            categoryID: "ROOM",
            link: "https://png.icons8.com/home-decorations-filled/ios7/50"
        },
        {
            categoryID: "TOYS",
            link: "https://png.icons8.com/go-kart-filled/ios7/50"
        },
        {
            categoryID: "WEDD",
            link: "https://png.icons8.com/wedding-rings/androidL/64"
        }
    ];

    $scope.priceFilter = function (product) {
        var price = parseFloat(product.price),
            min = parseFloat($scope.minPrice),
            max = parseFloat($scope.maxPrice);
        if (!price) {
            return false;
        }

        if (min && price < min) {
            return false;
        }

        if (max && price > max) {
            return false;
        }

        return true;
    };
    
    $scope.ratingFilter = function (product) {
        var rating = parseFloat(product.averageRating),
            selectedRating = parseFloat($scope.rating);
        
        if(!rating && selectedRating===0){
            return true;
        } else if (selectedRating && rating < selectedRating) {
            return false;
        }

        return true;
    };
    
    $scope.isGold = function(num,val){
        return num <= val ? true : false;
    };

});
