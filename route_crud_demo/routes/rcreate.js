/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 10-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

/*
used to create data in db
@params req{object} http req object from client
req object={
                fname -new first name data from client
                lname -new last name data from client
                age -new age from age
            }
*/
exports.addData= function(req, res) {
      console.log("in server add api");
      //console.log("values:" + req.body);

      mdemoCollection.find(function(err, data) {
            if (!err)
            {
                fetchAllData(req,res,data);
            } 
            else{
              console.log(err);
              res.status(500).json({ message:"error while fetching data", addFlag: false});
            } 
        });
}

function fetchAllData(req,res,data){
    isNameMatchFound=false;
    isEmpidMatchFound= false;
    var dataArr=[];
    dataArr=data;
    console.log("in fetchall data function");
    console.log("values");
    console.log(req.body);

    for(let i=0;i< data.length;i++)
    {
        if((dataArr[i].empid == req.body.empid))
        {
            isEmpidMatchFound=true;
            break;
        }

        if((dataArr[i].fname==req.body.fname)&&(dataArr[i].lname== req.body.lname))
        {
            isNameMatchFound=true;
            break;
        }
    }

      if(!isNameMatchFound && !isEmpidMatchFound )
      {
          mdemoCollectionObj = new mdemoCollection();
          mdemoCollectionObj.fname=req.body.fname;
          mdemoCollectionObj.lname=req.body.lname;
          mdemoCollectionObj.age=req.body.age;
          mdemoCollectionObj.empid=req.body.empid;
          
          mdemoCollectionObj.save(function(err,data){
            if(err)
            {
              console.log("error occured");
              console.log(err);
              res.json({message: "error while adding data" , addFlag: false });
            }
            else
            {
              console.log("Data added Successfully");
              res.status(200).json({message:"Data added Successfully", addFlag: true});
            }
          });
      }
      else
      {
         console.log("data already exists");
          res.json({message: "Data Already exist" , addFlag: false });
      }
}



