/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : Controller for index.html                                              *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/

var app = angular.module('crudApp', []);
app.controller('mainController', function($scope, $http) 
{

console.log("in mainController");

//loading data automatically from db when page is loaded
 $http.get('/api/showData')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' +data);
        });

$scope.createTodo = function() {
    if($scope.firstname && $scope.lastname &&  $scope.age && $scope.age >1   )
        {

        $scope.firstname= $scope.firstname.charAt(0).toUpperCase() + $scope.firstname.slice(1);
        $scope.lastname=  $scope.lastname.charAt(0).toUpperCase() + $scope.lastname.slice(1);

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
                $scope.isSuccess= true ;
                $scope.isValidFailed=false ;
            })
            .error(function(data) {
                console.log('Error: ');
            });
    }else
        {
            $scope.isValidFailed=true ;
            $scope.isSuccess= false ;
        }
    $scope.showValues();
    };


$scope.showColumnValues= function(columnValue)
{
    if(columnValue)
    {
       $scope.formData ={
                            columnValue: columnValue
                        };
console.log($scope.formData);

        $http.post('/api/showColumnData', $scope.formData)
        .success(function(data) {
            $scope.columnValueArr = data;

            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' +data);
        });  
    }
}

$scope.removeItem= function(removeVar){
    console.log("in removeItem, value:" + removeVar);
      //sending variable to db(server.js) to delete that value's entire document in db
    $scope.formData={
                        remVar: removeVar,
                    };
    $http.post('/api/removeData', $scope.formData)
        .success(function(data) 
        {
            console.log("delete success");
            $scope.showValues();
            console.log(data);
        })
        .error(function(data) 
        {
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
        .success(function(data)
        {
            console.log(data);
            $scope.showValues();
        })
        .error(function(err)
        {
        console.log("error:" + err);
        });
    }
});