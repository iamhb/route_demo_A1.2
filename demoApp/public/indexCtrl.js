var app = angular.module('crudApp', []);
app.controller('mainController', function($scope, $http) {
    console.log("in mainController");

 $http.get('/api/showData')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' );
        });


// when landing on the page, get all todos and show them
  /*$http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
*/
     // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
    	console.log("in js api:   "+ $scope.firstname+ "-" + $scope.lastname + "-" +  $scope.age);

        $scope.formData = {
            fname: $scope.firstname,
            lname: $scope.lastname,
            age: $scope.age
            };

    	console.log("formdata:  " + $scope.formData);
      console.log($scope.formData);

//sending values to db(server.js)
        $http.post('/api/addData', $scope.formData)
            .success(function(data) {
                $scope.todos = data; //assigning value from db(Server.js)
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ');
            });

            $scope.showValues();
    };

    $scope.removeItem= function(removeVar){
      console.log("in removeItem, value:" + removeVar);
      //sending variable to db(server.js) to delete that value's entire document in db

      $scope.formData = {
            remVar: removeVar,
            };


      $http.post('/api/removeData', $scope.formData)
            .success(function(data) {
                console.log("delete success");
                $scope.showValues();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ');
            });

    }

    $scope.showValues = function(){
      console.log("in show values api js");
//fetching values from db(Server.js)
      $http.get('/api/showData')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.updateValueFun = function(){
        console.log("in update function js");
        console.log("old value:"+ $scope.selectedValue + "new value:" + $scope.updatedValue);
             $scope.formData = {
            oldValue: $scope.selectedValue,
            newValue: $scope.updatedValue
            };

        $http.post('/api/updateData', $scope.formData)
            .success(function(data){
                console.log(data);
                $scope.showValues();
            })
            .error(function(err){
                console.log("error:" + err);
            });
    }


});