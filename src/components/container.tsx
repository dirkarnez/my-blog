import * as React from "react";

interface ContainerProps  {
   name: string
}

const Container: React.SFC<ContainerProps> = ({name, children}) => {
   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title">{name}</h5>
            { children }
         </div>
      </div>
   )
}

export default Container;