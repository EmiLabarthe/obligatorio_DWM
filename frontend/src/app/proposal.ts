import { Activity } from "./activity";

export interface Proposal{
    title: string,
    activities: Activity[],
    _id: string
};