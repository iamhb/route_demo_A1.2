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
			})
			.when('/update/:id', {
				templateUrl : './update/update.html',
				controller  : 'updateController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($rootScope, $scope, $http) 
	{
		$scope.sp="";
	});

	scotchApp.controller('addController', function($rootScope, $scope, $http, $routeParams) 
	{	
		// to store fetched db values
		var todosVar=[];
		//false value by default to all alerts
		$scope.isMatchFound=false;
		$scope.isValidFailed=false;
		$scope.isSuccess= false;

		//fetching all values from db and store in todosVar
		$http.get('/api/showData')
        .success(function(data) 
        {
            todosVar=data;
            console.log(data);
            console.log(todosVar.length);
        })
        .error(function(data) 
        {
            console.log('Error: ' + data);
        });

        //function called when add button clicked
		$scope.createData = function() 
		{
			//validating data from client if false then it show enter valid information
		    if($scope.firstname && $scope.lastname &&  $scope.age && $scope.age >=1)
		    {
		        $scope.firstname= $scope.firstname.charAt(0).toUpperCase() + $scope.firstname.slice(1);
		        $scope.lastname=  $scope.lastname.charAt(0).toUpperCase() + $scope.lastname.slice(1);		            
				//checking values already exist in db		
		        for(let i=0;i<todosVar.length;i++)
		        {
		        	if((todosVar[i].fname==$scope.firstname) && (todosVar[i].lname==$scope.lastname ))
		        	{
		        		//if match found then add to db
		        		$scope.isMatchFound=true;
		        		$scope.firstname="";
			    		$scope.lastname="";
			    		$scope.age="";
		        	}
		        }
		        //if match not found then add to db
		        if(!$scope.isMatchFound)
		        {
		            $scope.formData = {
							            fname: $scope.firstname,
							            lname: $scope.lastname,
							            age: $scope.age
		            				  };
		    	//console.log("formdata:  " + $scope.formData);
		        console.log($scope.formData);
		        //sending values to db(server.js)
		        $http.post('/api/addData', $scope.formData)
		            .success(function(data) {
		                $scope.todos = data; //assigning value from db(Server.js)
		                console.log(data);
		                $scope.isSuccess= true ;
		                $scope.isValidFailed=false ;
		                $scope.firstname="";
			    		$scope.lastname="";
			    		$scope.age="";

		            })
		            .error(function(data) 
		            {
		                console.log('Error: '+data);
		                $scope.isValidFailed=true;
		       			$scope.isSuccess= false;
		            });
		   		}
		   		//if isMatchFound = true, false these below variables, for showing only match found alert
			    else
			    {	
			        $scope.isValidFailed=false;
			        $scope.isSuccess= false;
			    }
			}
			//if validation failed, then true valiation failed alert
			else
			{
			    	//used to show alert about enter valid information
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
	        	if(data)
	        	{
	            $scope.todos = data;
	            console.log(data);
	        	}
	        })
	        .error(function(data) 
	        {
	            console.log('Error: ' + data);
	        });
    	}
    	//deleting data
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
	//update route
	scotchApp.controller('updateController', function($scope, $http, $routeParams) 
	{
		$scope.updateRouteCheck= "in update";
		$scope.id= $routeParams.id;
		var updateByIdValues = [];
		console.log($scope.updateRouteCheck + " " + $scope.id);
	    console.log("in show values by id");

		//fetching values from db(Server.js)
     	$http.get('/api/showDataById'+$scope.id)
        .success(function(data) 
        {
        	/*console.log("data ithaan");*/
   		   updateByIdValues = data;
	       /* console.log(data);
	        console.log('after assign')
	        console.log(typeof($scope.updateByIdValues));
	        console.log('values');
	        console.log($scope.updateByIdValues)
	        console.log($scope.updateByIdValues[0].lname);
	        console.log($scope.updateByIdValues[0].age);*/
			// console.log($scope.updateByIdValues[0]._id);
			$scope.idTextBoxValue=updateByIdValues[0]._id
	        $scope.updatefirstname= updateByIdValues[0].fname;
      		$scope.updatelastname=updateByIdValues[0].lname;
      		$scope.updateage=updateByIdValues[0].age;
	    })
	  	.error(function(data) 
	    {
           console.log('Error: ' + data);
        });

		$scope.updateData=function()
        {
        	//false by default to all alert flag
        	$scope.isUpdateSuccess= false;
		    $scope.isUpdateFailed=false;
		    $scope.isNoModifyDone=false;

        	console.log("checking scope: " + updateByIdValues[0]._id);
        	//checking validation if true
        	if( $scope.updatefirstname && $scope.updatelastname && ($scope.updateage && $scope.updateage >=1) )
        	{
        		$scope.updatefirstname= $scope.updatefirstname.charAt(0).toUpperCase() + $scope.updatefirstname.slice(1);
		        $scope.updatelastname=  $scope.updatelastname.charAt(0).toUpperCase() + $scope.updatelastname.slice(1);
             	console.log("in update function js");

             	//checking modification done with old values, if true
             	if(!( ($scope.updatefirstname == updateByIdValues[0].fname) && ($scope.updatelastname==updateByIdValues[0].lname )))
             	{
	        		$scope.formData={
								        id: updateByIdValues[0]._id,
								        newFname: $scope.updatefirstname,
								        newLname: $scope.updatelastname,
								        newAge: $scope.updateage
	       					  		};
	       			//sending all updated values
				    $http.post('/api/updateData', $scope.formData)
				        .success(function(data)
				        {
				            console.log(data);
				            $scope.isUpdateSuccess= true;
						    $scope.isUpdateFailed=false;
						    $scope.isNoModifyDone=false;
				        })
				        .error(function(err)
				        {
				            console.log("error:" + err);
				            $scope.isUpdateSuccess= false;
						    $scope.isUpdateFailed=true;
						    $scope.isNoModifyDone=false;
				        });
			    }
			    //if no modification is done with old values
			    else
			    {
			    	$scope.isUpdateSuccess= false;
					$scope.isUpdateFailed=false;
					$scope.isNoModifyDone=true;
			    }
		    }
		    //if validation failed
	        else
	        {
	        	$scope.isUpdateSuccess= false;
			    $scope.isUpdateFailed=true;
			    $scope.isNoModifyDone=false; 
	        }
   		}
	});