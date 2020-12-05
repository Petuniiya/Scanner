import { Observable } from 'rxjs';

export class SealService{
    public getSealData(sealId){
        console.log("service works!")
        let data = [
            {
                name:"seal 12234",
                code:"12234",
                active:true
            },
            {
                name:"seal 12235",
                code:"12235",
                active:true
            },
            {
                name:"seal 12236",
                code:"12236",
                active:false
            }
        ]
        console.log("test ",data.find(i=>i.code==sealId))
        return data.find(i=>i.code==sealId);
}
}