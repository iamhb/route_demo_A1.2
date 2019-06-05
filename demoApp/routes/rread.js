/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../public/models/mdemocollection').demoCollection;

exports.showData= function(req, res) 
{ 
	console.log("in showData server api");
    
        //var mdemoCollectionObj = new mdemoCollection();
        mdemoCollection.find(function(err, data) {
            if (err)
            {
                res.send(err)
                console.log(err);
            }
            console.log(data);
            res.json(data);
        });
    }


exports.showColumnData= function(req, res) 
{ 
    
    var queryVar={};
    var projectionVar = {"fname":1,"lname":1,"age":1} ;
    
    console.log("in showColumn Data server api: "+ req.body.columnValue);
    console.log(req.body);
        if(req.body.columnValue == "fname")
        {
                 projectionVar = { "fname":1, _id:0} ;
                 console.log("fname selected");
        }

        else if(req.body.columnValue == "lname")
        {
                 projectionVar = { "lname":1, _id:0} ;
                 console.log("lname selected");

        }else if(req.body.columnValue == "age")
        {

                  projectionVar = { "age":1, _id:0 } ;
                 console.log("age selected");
        }
        //var mdemoCollectionObj = new mdemoCollection();

 //var jsonProjection = {_id:0,"year":1,"quarter":1,"daily":1,"sms":1,"paid":1} ;

        mdemoCollection.find(queryVar,
                            projectionVar,
            function(err, data) {
            if (err)
            {
                res.send(err)
                console.log(err);
            }
            console.log("showing column values");
            console.log(data);
            res.json(data);
        });

}