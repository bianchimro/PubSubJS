logs = []

function runTest(){

    a = { 

        responseSync : function(data, sender){

            logs.push("SYNC:data is:"+ data);
            if(sender)
                logs.push("SYNC:sender id is:"+ sender.id);
            else
                logs.push("SYNC:no sender specified");
        },

        responseAsync : function(data, sender){
            alert ("async");
            logs.push("ASYNC:data is:"+ data);
            if(sender)
                logs.push("ASYNC:sender id is:"+ sender.id);
            else
                logs.push("ASYNC:no sender specified");
        }


    }


    b = { id : 1}

    logs.push("notification with sender discrimination");
    PubSub.subscribeAsync("notification", a.responseAsync, b);
    PubSub.subscribeSync("notification", a.responseSync, b);
    PubSub.publish("notification", b, [1,2,3]);
    PubSub.publish("notification", null, [1,2,3]);
    
    logs.push("notification with no sender discrimination");
    PubSub.subscribeSync("other notification", a.responseSync);
    PubSub.publish("other notification", null, [4,5,6]);


    console.log(logs);
    
   

}
