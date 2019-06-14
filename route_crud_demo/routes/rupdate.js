/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 10-05-2019                                                             *                                                                       *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;
/*
used to update data in db
@params req{object} http req object from client
req object={
                refValue -for matching the value with db and get document from db
                newFname -new first name data
                newLname -new last name data
                newAge -new age data
            }
*/
exports.updateData= function (req, res) 
{
    console.log(" in update api ");
    console.log("values:");
    console.log(req.body.empid+ " "+ req.body.newFname + " " + req.body.newLname + " "+ req.body.newAge);

/*    mdemoCollection.updateOne(  { empid : req.body.empid },
                                { $set:{ "fname": req.body.newFname,
                                        "lname": req.body.newLname,
                                        "age": req.body.newAge }},
                                function (err, docs)
                                {
                                    if(err)
                                    {
                                        res.status(500).json(err);
                                        console.log(err);
                                    }
                                    else if(docs)
                                    {
                                        console.log(docs);
                                        console.log("Updated successfully");
                                        res.status(200).json(docs);
                                    }
                                }); */

    mdemoCollection.find(function(err, data){
        if(!err)
        {
            fetchDataAndUpdateOne(req,res,data);
        } 
        else{
            console.log(err);
            res.json({message: "Error when fetching and checking data"});
        }
    });

    function fetchDataAndUpdateOne(req,res,data){
        isNameMatchFound=false;
        //array to store all fetched data
        var dataArr=[];
        dataArr=data;
        console.log(req.body);

        for(let i=0;i< data.length;i++)
        {
            // console.log( dataArr[i].fname + "---" + req.body.newFname+ "---" + dataArr[i].lname+ "---" + req.body.newLname);
            if( (dataArr[i].fname == req.body.newFname) && (dataArr[i].lname == req.body.newLname) )
            {   
                console.log( dataArr[i].fname + "---" + dataArr[i].lname);
                isNameMatchFound=true;
            }
        }

        if(!isNameMatchFound)
        {
            mdemoCollection.updateOne(  { empid : req.body.empid },
                                { $set:{ "fname": req.body.newFname,
                                        "lname": req.body.newLname,
                                        "age": req.body.newAge }},
                                function (err, docs)
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                        res.status(500).json({ err: err, message: "Error while updating data",  updateFlag: false});
                                    }
                                    else if(docs)
                                    {
                                        console.log(docs);
                                        console.log("Updated successfully");
                                        res.status(200).json({ data: docs , message:" Data updated successfully ",  updateFlag: true});
                                    }
                                });
        }
        else
        {
            console.log("Data already exists");
            res.json({message: "Data Already exist" , updateFlag: false });
        }
    }




}