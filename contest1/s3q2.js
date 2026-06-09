let fs=require('fs')

fs.readFile('marks.json','utf-8',(err,data)=>{
    if(err){
        console.log(err);
        return err;
    }

    const users=JSON.parse(data);

    const mark=users.map(s=>s.marks)

    const highest=Math.max(...mark);
    const lowest=Math.min(...mark);
    const average=mark.reduce((sum,m)=>sum+m,0)

    const report=`Highest:${highest}\nLowest:${lowest}\nAverage:${average}`;
    fs.writeFile('report.txt',report,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('report generated successfully')
        console.log(report);
    }

    );

});