import { Activity } from "./activity";

export interface Proposal{
    title: string,
    id: number,
    activities: Activity[]
};