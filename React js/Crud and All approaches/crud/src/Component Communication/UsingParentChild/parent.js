import React from "react";

import ChildComponent from "./child";

function ParentComponent()
{
   debugger;
    const dataToPass="hello from parent Component"
    return(
        <div>
            <ChildComponent passedData={dataToPass}/>
        </div>
    )
}

export default ParentComponent;