angular.module("typeOne")

.factory("serviceOne", function($http, $q, SweetAlert) {

    var service = {};

    service.email = "Nothing";

    service.postUser = function(user) {
        console.log("Made it to the service");
        var dfd = $q.defer();
        $http.post('/signup', user)
            .success(function(response) {
                //console.log(response);
                dfd.resolve(response);
                service.email = response.local.email;
            })
            .error(function(error) {
                console.log(error);
            })
        return dfd.promise;
    }


    service.getEmail = function() {
        return service.email;
    }



    service.tokenObject = "Nothing";

    service.open = function() {
        var dfd = $q.defer();
        var options = {
            clientUserId: encodeURIComponent(service.email), // $scope.email, can be email or any other unique string
            clientId: 'YOUR-CLIENTID-FROM-HUMAN-API-HERE', // grab it from app settings page, under auth
            finish: function(err, sessionTokenObject) {

                $http.post('/connect/finish', sessionTokenObject)
                    .success(function(response) {
                        //console.log(response);
                        dfd.resolve(response);
                        service.tokenObject = response.accessToken;
                    })
                    .error(function(error) {
                        console.log(error);
                    })
            },
            close: function() {
                // optional callback that will be called if the user closes the popup 
                // without connecting any data sources.
            },
            error: function(err) {}
        }
        HumanConnect.open(options);
        return dfd.promise;
    }

    service.getTokenObject = function() {
        return service.tokenObject;
    }


    service.results = {};
   service.getResults = function() {
       console.log("Get request made it to the service");
       var dfd = $q.defer();
       $http.get('/connect/demo')
           .success(function(response) {
               //console.log("Results of the GET: ", response);
               dfd.resolve(response)
               service.results = response; 
           })
           .error(function(error) {
               console.log(error);
           })
       return dfd.promise;
   }


   return service;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////






});
