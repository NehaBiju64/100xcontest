let input=[[1,2,3,4], [5,6,7,8], [10,4,2,1], [1], [-10, 8]];

let a=[]
for(let i=0;i<input.length;i++){
    sum=0;
    for(let j=0;j<input[i].length;j++){
        sum=sum+input[i][j];


    }
    if(sum<-1){
        a.push(0);
    }
    else{
        a.push(sum);
    }

}

console.log(a);