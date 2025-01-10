import { TSeason } from "../types";

export const fuzzyDateInt=(date:Date)=>{
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); 
const day = String(date.getDate()).padStart(2, '0');
const fuzzyDateInt = parseInt(year + month + day);

console.log(fuzzyDateInt);

}
 export const getCurrentSeason=():TSeason=>{
    const month = new Date().getMonth();
    if([0,1,11].includes(month))return "WINTER";
    else if([2,3,4].includes(month))return "SPRING";
    else if([5,6,7].includes(month))return "SUMMER";
    else return "FALL";
    
 }