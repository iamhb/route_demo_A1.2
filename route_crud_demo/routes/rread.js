/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 10-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

/*
used to show all data in db
@params no params from client
*/

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
