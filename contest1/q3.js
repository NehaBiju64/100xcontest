let input=[
  { user: "A", amount: 100 },
  { user: "B", amount: 200 },
  { user: "A", amount: 50 }
]

let output={};
for(i=0;i<input.length;i++){
    let user=input[i].user;
    let amount=input[i].amount;

    if( user in output){
        output[user]+=amount;
        
    }
    else{
        output[user]=amount;
        

    }

    

    
    

}

console.log(output);