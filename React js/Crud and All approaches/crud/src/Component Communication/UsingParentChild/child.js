import React from "react";
function ChildComponent(proprs)//proprs={passedData: "hello from parent Component"}
{
    debugger;
    return(
        <div>
            <p>{proprs.passedData}</p>
        </div>
    )

}
export default ChildComponent;