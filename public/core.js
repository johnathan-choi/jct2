// public/core.js

//YYYY/MM/DD HH:MM
var date = new Date();
var month = date.getMonth()+1;
    if (month - 10 < 0){
        month = "0" + month;
    }
var day = date.getDate();
    if (day - 10 < 0){
        day = "0" + day;
    }
var hours = date.getHours();
    if (hours - 10 < 0){
        hours = "0" + hours;
    }
var minutes = date.getMinutes();
    if (minutes - 10 < 0){
        minutes = "0" + minutes;
    }
var currTime = date.getFullYear() + "/" + month + "/" + day + " " + hours + ":" + minutes; 


var app = angular.module('jct', []);  
app.controller('createTicketPage', function($scope, $http){
    $scope.formData = {
        time: currTime,
    };
    $scope.createTicket = function(){
        $http.post('/api/tickets', $scope.formData)
            .then(alert("POST success"), alert("POST failure"));
    };
});