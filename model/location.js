import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  state:{
    type:String,
    required: true,
  },
  city:{
    type:String,
    required: true,
  },
  pincode:{
    type:Number,
    required: true,
    // minlength: [6, 'pincode must be 6']
  },
  phoneNumber:{
    type:Number,
    required:true,
    // length:10,
  },
  fullAddress:{
    type:String,
    required : true,
  }
})

export const location = mongoose.model("locations", locationSchema);

