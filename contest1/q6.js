let roles={ admin:["read","write"], user:["read"], staff: ["write"]};
let checkRole="user";
let action="write";


    if ( roles[checkRole] && roles[checkRole].includes(action)){
       console.log ("true");
    } 
    else{
        console.log("false");
    }
