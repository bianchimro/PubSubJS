logs = []

function runTest(){

    a = { 

        response : function(data, sender){

            logs.push("data is:"+ data);
            if(sender)
                logs.push("sender id is:"+ sender.id);
            else
                logs.push("no sender specified");
        }

    }


    b = { id : 1}

    logs.push("notification with sender discrimination");
    PubSub.subscribe("notification", a.response, b);
    PubSub.publishSync("notification", b, [1,2,3]);
    PubSub.publishSync("notification", null, [1,2,3]);

    
    logs.push("notification with no sender discrimination");
    PubSub.subscribe("other notification", a.response);
    PubSub.publishSync("other notification", null, [4,5,6]);


    console.log(logs);
    
   

}
