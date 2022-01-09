import _ from "lodash"
import { serverTimeConversion } from ".";

export const isProtected  = (values) => { 
  return   _.find( values,  v  =>   v.status === "Completed" ) ? "Yes"  :  "No"
}
let completedStatus = (values) =>  _.filter(values,  v => v.status === "Completed");

export const lastBackupTime = (values) => { 
    const completedStatusVals  = completedStatus(values);
   if(completedStatusVals.length  === 0 ) { 
       return  "NA"
   }
   else  { 
      const lastestTime  =  _.sortBy(completedStatusVals, "startTime");
      return serverTimeConversion(lastestTime[completedStatusVals.length  - 1].startTime)
   }
};

export const averageTimeTaken  = (values) => { 
    const completedStatusVals  = completedStatus(values);
    if(completedStatusVals.length  === 0 ) { 
        return  "NA"
    }
    else  {  
      const avgTimeValue  =  (_.sumBy(completedStatusVals,  (v) =>  v.endTime - v.startTime)) / (completedStatusVals.length *60)
      return  `${Math.round(avgTimeValue)} mins`
    }
}