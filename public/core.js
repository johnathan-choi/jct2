// public/core.js

//YYYY/MM/DD HH:MM
var Date = new Date();
var month = Date.getMonth()+1;
    if (month - 10 < 0){
        month = "0" + month;
    }
var day = Date.getDate();
    if (day - 10 < 0){
        day = "0" + day;
    }
var hours = Date.getHours();
    if (hours - 10 < 0){
        hours = "0" + hours;
    }
var minutes = Date.getMinutes();
    if (minutes - 10 < 0){
        minutes = "0" + minutes;
    }
var currTime = Date.getFullYear() + "/" + month + "/" + day + " " + hours + ":" + minutes; 


var app = angular.module('jct', []);  
app.controller('createTicketPage', function($scope, $http){
    $scope.createTicket = function(){
        var submitData = [
            $scope.formSubject,
            $scope.formTime,
            $scope.formBody
        ];
        $http.post('/api/tickets', submitData)
            .then(alert("POST success"), alert("POST failure"));
    };
    $scope.formTime = currTime;
});