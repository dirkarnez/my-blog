import * as React from "react";
import { Button } from "../components";

interface InsertFrontEndState {
   front: string,
   end: string
}

export default class InsertFrontEnd extends React.Component<{}, InsertFrontEndState> {
   constructor(props: {}) {
      super(props);

      this.state = {
         front: "",
         end: ""
      }

      this.handleFrontInput = this.handleFrontInput.bind(this);
      this.handleEndInput = this.handleEndInput.bind(this);
      this.generate = this.generate.bind(this);
   }


   handleFrontInput(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target && event.target.value) {
         this.setState({ front: event.target.value });
      }
   }
   
   handleEndInput(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target && event.target.value) {
        this.setState({ end: event.target.value });
      }
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            const { front, end } = this.state;

            return navigator.clipboard && navigator.clipboard
               .writeText(text.split(/\r?\n/).map(token => `${front}${token}${end}`).join("\n"));
         })
         .then(() => {
            alert("done");
         })
         .catch(err => {
            alert(err);
         });
   }

   render() {
      const { front, end } = this.state;

      return (
         <div>
            <label>Front</label>
            <input
               type="text"
               value={front}
               onChange={this.handleFrontInput}
            />
            <label>Fields</label>
            <input
               type="text"
               value={end}
               onChange={this.handleEndInput}
            />
            <Button onClick={this.generate}>Generate</Button>
         </div>
      );
   }
}