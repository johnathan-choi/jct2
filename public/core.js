// public/core.js

var app = angular.module('jct2', []);  
app.controller('mainController', function($scope){
    $scope.createTicket = function(){
        alert(1);
        $scope.formBody = "test";
    }
});