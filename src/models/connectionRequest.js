const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    status:{
        type: String,
        required:true,
        enum:{
            values: ["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is incorrect status type!`
        }
    }
},
{
    timestamps: true
})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this
    //checks if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection Request to yourself!")
    }
    //next();
})

connectionRequestSchema.index({fromUserId:1, toUserId:1})

const ConnectionRequestModel = mongoose.model("ConnectionRequestModel", connectionRequestSchema)

module.exports = ConnectionRequestModel