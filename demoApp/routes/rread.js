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
