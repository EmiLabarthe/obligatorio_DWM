import { Proposal } from "./proposal";

export interface Session{
    _id: string,
    proposal: Proposal,
    currentPosition: number
}


/*
const sessionSchema = new mongoose.Schema({
    code:{
        type: Number
    },
    proposal:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' 
    },
    reactionList:{
        type:Array,
    },
    currentPosition:{
        type:Number
    },
    active:{
        type:Boolean
    }
});

*/