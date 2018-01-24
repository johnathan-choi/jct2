// public/core.js


function getDateTime(date, mode){ //turns dates legible
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
    if (mode == "date"){ // YYYY/MM/DD
        return date.getFullYear() + "/" + month + "/" + day;
    }
    else if (mode == "time"){ // HH:MM
        return hours + ":" + minutes;
    }
    else{ // YYYY/MM/DD HH:MM
        return date.getFullYear() + "/" + month + "/" + day + " " + hours + ":" + minutes;
    }
    
}

var app = angular.module('jct', []);

app.controller('indexPage', function($scope, $http){
    $scope.currTime = getDateTime(new Date());

    $http.get('/api/tickets')
        .then(function(response){ //success
            angular.forEach(response.data, function(value, key){ //iterates each item in GET JSON
                value.openDate = getDateTime(new Date(value.openDate), "date"); //makes date legible
            });
            $scope.allTickets = response.data; //binds to html
        });
});

app.controller('createTicketPage', function($scope, $http){
    $scope.formData = {
        time: getDateTime(new Date()),
    };
    $scope.createTicket = function(){
        $http.post('/api/tickets', $scope.formData)
            .then(function(response){
                alert("Ticket created"); //success
            }, function(response) {
                alert("Something went wrong. I don't know what."); //failure.
            }).finally(function(){                
                window.location.replace("index.html"); //go back to homepage
            });
    };
});