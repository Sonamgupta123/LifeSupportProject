import '../model/connection.js';
import url from 'url';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';
import donorSchemaModel from '../model/donor.model.js';
import sendMail from './email.controller.js';


export var save =async(req,res)=>{
    var donorList = await donorSchemaModel.find();
    // console.log(donorList);
    var len = donorList.length;
    
    var _id = (len==0)?1:donorList[len-1]._id+1;

    var donorDetail = req.body;
   // console.log(donorDetail);
    donorDetail ={...donorDetail,"_id":_id,"role":"donor","status":0,"info":Date()};
    //console.log(donorDetail);
    try{
     
     const donors = await donorSchemaModel.create(donorDetail)
     sendMail(donors.email,donors.password);
    res.status(201).json({"status":"Resourse created successfully"});
    }

catch(err){
  console.log(err)
    res.status(500).json({"status":"false"});
}
}
export const fetch = async (req, res) => {
  try {
    const { donorType, city, bloodGroup, organs } = url.parse(req.url, true).query;

    const condition = {};

    if (donorType) condition.donorType = donorType;

    if (city) {
      // Capitalize city (e.g., indore -> Indore)
      condition.city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    }

    if (donorType === 'blood' && bloodGroup) {
      condition.bloodGroup = bloodGroup;
    }

    if (donorType === 'organ' && organs) {
      // Case-insensitive match inside the `organs` array
      condition.organs = { $in: [organs.toLowerCase()] };
    }

    const donors = await donorSchemaModel.find(condition);
   // console.log("Matched Donors:", donors);

    if (donors.length !== 0) {
      return res.status(200).json(donors);
    } else {
      return res.status(404).json({ result: "No matching donors found." });
    }

  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ result: "Internal Server Error" });
  }
};
export const update = async(req,res)=>{
   
     var condition_obj = req.body.condition_obj;
   //console.log(condition_obj);
   var donor = await donorSchemaModel.findOne(condition_obj);
   // console.log(donor);
  if(donor){
          var update_donor = await donorSchemaModel.updateOne(
  req.body.condition_obj,
  { $set: req.body.content_obj }
);
        if(update_donor){
             res.status(200).json({"result":"updated successfully"});
         }
    else{
          res.status(500).json({"result":"not updated successfully"});
          }
 }
    else{
     res.status(404).json({"result":"donor not found in database"});
    }
}
export const deletedonor = async(req,res)=>{
    var donor = await donorSchemaModel.findOne(req.body);
    //console.log(donor);
    if(donor){
        var delete_donor = await donorSchemaModel.deleteOne((req.body));
        if(delete_donor){
            res.status(200).json({"result":"donor  deleted successfully"});
        }
        else{
            res.status(500).json({"result":"donor not deleted successfully"});
        }
        }
    
    else{
         res.status(404).json({"result":"donor not found in database"});
    }
}
export const login = async(req,res)=>{
     //console.log("h");
     var donorDetail  = {...req.body,"status":1};
    // console.log(donorDetail);
     var donorList = await donorSchemaModel.find(donorDetail);
     //console.log(donorList);
     if(donorList.length!=0){
         const payload = {"subject":donorList[0].email};
         const key = rs.generate();
         const token = jwt.sign(payload,key);
         res.status(200).json({"token":token,"donorList":donorList[0]});

     }
     else{
         res.status(500).json({"token":"token error"});
     }
} 