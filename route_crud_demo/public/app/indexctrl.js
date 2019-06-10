	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) 
	{
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : './home/home.html',
				controller  : 'mainController'
			})

			// route for the add page
			.when('/add', {
				templateUrl : './add/add.html',
				controller  : 'addController'
			})

			// route for the edit page
			.when('/edit', {
				templateUrl : './edit/edit.html',
				controller  : 'editController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http) {});

	scotchApp.controller('addController', function($scope, $http) 
	{
		$scope.createData = function() 
		{
		    if($scope.firstname && $scope.lastname &&  $scope.age && $scope.age >=1)
		    {
		        $scope.firstname= $scope.firstname.charAt(0).toUpperCase() + $scope.firstname.slice(1);
		        $scope.lastname=  $scope.lastname.charAt(0).toUpperCase() + $scope.lastname.slice(1);
		            
		            $scope.formData = {
							            fname: $scope.firstname,
							            lname: $scope.lastname,
							            age: $scope.age
		            				  };

		    	console.log("formdata:  " + $scope.formData);
		        console.log($scope.formData);
		        //sending values to db(server.js)
		        $http.post('/api/addData', $scope.formData)
		            .success(function(data) 
		            {
		                $scope.todos = data; //assigning value from db(Server.js)
		                console.log(data);
		                $scope.isSuccess= true ;
		                $scope.isValidFailed=false ;
		            })
		            .error(function(data) 
		            {
		                console.log('Error: '+data);
		                $scope.isValidFailed=true;
		       			$scope.isSuccess= false;
		            });
		    }
		    else
		    {
		        $scope.isValidFailed=true;
		        $scope.isSuccess= false;
		    }
	    }
	});

	scotchApp.controller('editController', function($scope, $http) 
	{
		console.log("in show values api js");
		//fetching values from db(Server.js)
     	$http.get('/api/showData')
        .success(function(data) 
        {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) 
        {
            console.log('Error: ' + data);
        });

        $scope.showValues = function()
        {
	      	console.log("in show values api js");
			//fetching values from db(Server.js)
	     	$http.get('/api/showData')
	        .success(function(data) 
	        {
	            $scope.todos = data;
	            console.log(data);
	        })
	        .error(function(data) 
	        {
	            console.log('Error: ' + data);
	        });
    	}

        $scope.showDataInUpdate= function(tempTodoArr)
        {
        	console.log("showDataInUpdate");
        	console.log(tempTodoArr);	
        	$scope.updatefirstname= tempTodoArr.fname
        	$scope.updatelastname=tempTodoArr.lname
        	$scope.updateage=tempTodoArr.age;
        	$scope.refVar=tempTodoArr.fname; //for mongodb reference
        }

        $scope.updateData=function()
        {
        	if($scope.updatefirstname && $scope.updatelastname && ($scope.updateage && $scope.updateage >=1) )
        	{
        		$scope.updatefirstname= $scope.updatefirstname.charAt(0).toUpperCase() + $scope.updatefirstname.slice(1);
		        $scope.updatelastname=  $scope.updatelastname.charAt(0).toUpperCase() + $scope.updatelastname.slice(1);
             	console.log("in update function js");
        		$scope.formData = {
					        refValue: $scope.refVar,
					        newFname: $scope.updatefirstname,
					        newLname: $scope.updatelastname,
					        newAge: $scope.updateage
       					  };
			    $http.post('/api/updateData', $scope.formData)
			        .success(function(data)
			        {
			            $scope.showValues();
			            console.log(data);
			            $scope.isUpdateSuccess= true;
					    $scope.isUpdateFailed=false;
			        })
			        .error(function(err)
			        {
			            console.log("error:" + err);
			            $scope.isUpdateSuccess= false;
					    $scope.isUpdateFailed=true;
			        });
		    }
	        else
	        {
	        	$scope.isUpdateSuccess= false;
			    $scope.isUpdateFailed=true;
	        }
   		}

        $scope.removeData= function(removeVar)
        {
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
	            console.log('Error: '+data);
	        });
    	}
	});