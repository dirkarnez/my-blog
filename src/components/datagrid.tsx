import * as React from "react";
import { Button } from ".";

// interface DataGridProps {
//    data: object[];
//    headers: Header[];
// }

// interface Header {
//    label: string;
// }

// key: (data: object) => string;

enum Direction {
   H,
   V
}

interface DataGridState {
   direction: Direction
}

export default class DataGrid extends React.Component<{}, DataGridState> {
   constructor(props: {}) {
      super(props);
      this.state = {
         direction: Direction.H
      };

      this.handleChangeDirection = this.handleChangeDirection.bind(this);
   } 

   handleChangeDirection() {
      this.setState({direction: this.state.direction == Direction.H ? Direction.V : Direction.H})
   }
   
   render() {
    const data: any[] = JSON.parse(`[
         {
            "id": "8341C9C4BBB4CC4DE05011AC0200007C",
            "code": "H",
            "description": "Hospital",
            "isActive": true
         },
         {
            "id": "8341C9C4BBB5CC4DE05011AC0200007C",
            "code": "D",
            "description": "Doctor",
            "isActive": true
         }
      ]`);

      const { direction } = this.state;
    return (
       <div>
         <table style={{ width: "100%" }}>
         { direction != Direction.V ? 
         <React.Fragment>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Is Active</th>
               </tr>
            </thead>
            <tbody>
               {data.map((datum, index) => (
                  <tr key={index}>
                  <td>{datum.id}</td>
                  <td>{datum.code}</td>
                  <td>{datum.description}</td>
                  <td>{datum.isActive}</td>
                  </tr>
               ))}
            </tbody>
         </React.Fragment>
          : 
             <tbody>
               <tr>
                  <th>ID</th>
                  <td>32</td>
               </tr>
               <tr>
                  <th>Code</th>
                  <td>324</td>
               </tr>
             </tbody>
         }
         
         </table>
         <Button onClick={this.handleChangeDirection}/>
       </div>
      
    );
  }
}
