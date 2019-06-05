/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../public/models/mdemocollection').demoCollection;

exports.removeData= function (req, res) {
	console.log("In Server Remove");
    console.log("values:" + req.body.remVar);
    mdemoCollection.remove( {"fname": req.body.remVar },
        function (err, docs) {
                if(err)
                    {
                        res.status(500).json(err);
                    }
                else if(docs)
                    {
                        console.log(docs);
                        console.log("del successfully");
                        res.status(200).json(docs);
                    }
});
	
}