// LANDING CONTROLLER //


angular.module("typeOne")
    .controller("landingCtrl", function($scope, serviceOne, $http, SweetAlert, $location) {

        $scope.postUser = function(user) {
            //console.log("HELLO", user);
            serviceOne.postUser(user).then(function(response) {
                //console.log("It worked!", response);
                $location.path('/demo');
            })
        }
    });



// DEMO CONTROLLER //


angular.module("typeOne")
    .controller("demoCtrl", function($scope, serviceOne, $http, SweetAlert, $location, email) {

        $scope.email = email;
        //console.log("Email in demoCtrl", $scope.email);


        $scope.open = function() {
            serviceOne.open().then(function(response) {
                $location.path('/results');
            })
        }



    });


// RESULTS CONTROLLER //


angular.module("typeOne")

.controller("resultCtrl", function($scope, serviceOne, $http, SweetAlert, $location, token) {

    $scope.tokenObject = token;
    //console.log("Token in resultCtrl", $scope.tokenObject);

    $scope.results = {};
    $scope.unlock = function() {
        //console.log("Controller: posting the reslts");
        serviceOne.getResults().then(function(response) {
            //console.log("It worked!", response);
            $scope.results = response;
            for (var i = 0; i < response.length; i++) {

                var obj = response[i];

                for (var key in obj) {
                    if (obj[key] === "Likely Sprinter") {

                        SweetAlert.swal({
                            title: "Star Olympian!",
                            text: "Amazing! Did You Know You Have Athletic Ability?",
                            imageUrl: "http://i.imgur.com/FXEZvTe.png"
                        });



                    } else {

                        SweetAlert.swal({
                            title: "You are Talentless!",
                            text: "Unfortunately....need I say more?",
                            imageUrl: "http://i.imgur.com/OD5qaqG.png"
                        });

                    }


                }


            }

        })
    }


    $scope.test = function() {
        SweetAlert.swal({
            title: "You are Talentless!",
            text: "Unfortunately....need I say more?",
            imageUrl: "http://i.imgur.com/OD5qaqG.png"
        });

    }




});
