import '../model/connection.js';
import url from 'url';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';
import contactSchemaModel from '../model/contact.model.js';


export var save =async(req,res)=>{
    var contactList = await contactSchemaModel.find();
    // console.log(contactList);
    var len = contactList.length;
    
    var _id = (len==0)?1:contactList[len-1]._id+1;

    var contactDetail = req.body;
   // console.log(contactDetail);
    contactDetail = {
  ...contactDetail,
  _id: _id,
 
 
  info: new Date() // Use ISO format
};
    //console.log(contactDetail);
    try{
     
     const contacts = await contactSchemaModel.create(contactDetail)
    res.status(201).json({"status":"Resourse created successfully"});
    }

catch(err){
    res.status(500).json({"status":"false"});
}
}
export const fetch = async(req,res)=>{
   
   
     var contact = await contactSchemaModel.find();
    
     if(contact.length!=0){
        
         res.status(201).json(contact);

     }
     else{
        
         res.status(404).json({"result":"contact not found in database"});
    }
}
// export const update = async(req,res)=>{
   
//      var condition_obj = req.body.condition_obj;
//    //console.log(condition_obj);
//    var contact = await contactSchemaModel.findOne(condition_obj);
//    // console.log(contact);
//   if(contact){
//           var update_contact = await contactSchemaModel.updateOne(
//   req.body.condition_obj,
//   { $set: req.body.content_obj }
// );
//         if(update_contact){
//              res.status(200).json({"result":"updated successfully"});
//          }
//     else{
//           res.status(500).json({"result":"not updated successfully"});
//           }
//  }
//     else{
//      res.status(404).json({"result":"contact not found in database"});
//     }
// }
// export const deletecontact = async(req,res)=>{
//     var contact = await contactSchemaModel.findOne(req.body);
//     //console.log(contact);
//     if(contact){
//         var delete_contact = await contactSchemaModel.deleteOne((req.body));
//         if(delete_contact){
//             res.status(200).json({"result":"contact  deleted successfully"});
//         }
//         else{
//             res.status(500).json({"result":"contact not deleted successfully"});
//         }
//         }
    
//     else{
//          res.status(404).json({"result":"contact not found in database"});
//     }
// }
// export const login = async(req,res)=>{
//      //console.log("h");
//      var contactDetail  = {...req.body,"status":1};
//     // console.log(contactDetail);
//      var contactList = await contactSchemaModel.find(contactDetail);
//      //console.log(contactList);
//      if(contactList.length!=0){
//          const payload = {"subject":contactList[0].email};
//          const key = rs.generate();
//          const token = jwt.sign(payload,key);
//          res.status(200).json({"token":token,"contactList":contactList[0]});

//      }
//      else{
//          res.status(500).json({"token":"token error"});
//      }
// } 