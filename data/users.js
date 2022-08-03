const mongoCollections = require('../config/mongoCollection');
const allUsers = mongoCollections.users;
const bcrypt = require("bcryptjs");
const dataVal = require("./dataValidation")
var moment = require('moment');



module.exports = {
    
    async postInTime(isInTime){
        const tz = moment.tz.guess();
        //let date = moment().format('L'); 
        let time = moment().format('LT');
        //let type =  'in';
        let Data = {
           // Date: date,
            Date: tz,
            Time: time,
           // Type: type
        };
        const userCollection = await allUsers();
        //const userFound = await userCollection.findOne({ User: 1 });

        if(isInTime){
            const data = await userCollection.updateOne(
                { Email: "" },
                { $addToSet: { 'Time.In': Data } }
                
            );
           
            if (!data.acknowledged || !data.modifiedCount) throw "Could not post In Time "; 
            else return {userInserted: true};
        }
        else if(!isInTime){
            const data = await userCollection.updateOne(
                { Email: "" },
                { $addToSet: { 'Time.Out': Data } }
                
            );
           
            if (!data.acknowledged || !data.modifiedCount) throw "Could not post In Time "; 
            else return {userInserted: true};
            }

        
    },
   

    async getTotalHours(){
    const startTime = moment("12:26:59 am", "HH:mm:ss a");
    const endTime = moment("06:12:07 pm", "HH:mm:ss a");
    const duration = moment.duration(endTime.diff(startTime));
    const minutes = parseInt(duration.asMinutes());

    const Totalminutes =+ minutes 

    },

    async generateReport(){
        const userCollection = await allUsers();
        const userFound = await userCollection.findOne({ User: 1 });

        return userFound.Time
    }
};