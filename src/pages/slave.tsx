import * as React from "react"
import { Button } from "../components";
import MonacoEditor from 'react-monaco-editor';
import { DataUriToImage, ImageToDataUri, Traverse, ReactClass, PlainObjectGenerator } from "../slaves";

interface IReplaceFrom {
   fromRegex: string
}

interface StringReplacement extends IReplaceFrom {
   to: string
}

class Replace extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);
      this.replace = this.replace.bind(this);
   }

   replace(str: string, ...replacements: StringReplacement[]): string {
      for (var i = 0; i < replacements.length; i++) {
         str = str.replace(new RegExp(replacements[i].fromRegex, 'g'), replacements[i].to);
      }
      return str;
   }

   render() {
      return (
         <div>
            Textual Generation By template in clipboard
       </div>
      );
   }
}

export default class Slave extends React.Component<{}, {}> {
   render() {
      return (
         <div>
            <Container name="Data Uri to Image">
               <DataUriToImage />
            </Container>
            <Container name="Image to Data Uri">
               <ImageToDataUri />
            </Container>

            <Container name="Image to Data Uri">
               <PlainObjectGenerator />
            </Container>
            {/*
            <br />
            <Replace />
            <br> */}
            <Container name="HTML to React JSX">
               <ReactClass/>
            </Container>
            <Container name="create batch script">
               <BatMaker/>
            </Container>
            <Container name="get datauri for json">
               <Traverse/>
            </Container>
            <Container name="trying out m$ editor">
               <MonacoEditor
                  width="800"
                  height="600"
                  language="javascript"
                  theme="vs-dark"
               />
            </Container>
         </div>
      );
   }
}

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

interface BatMakerState {
   commands: string[]
}

class BatMaker extends React.Component<{}, BatMakerState> {
   constructor(props: {}) {
      super(props);
      this.state = { commands: [] };
      this.createBatchScript = this.createBatchScript.bind(this);
      this.template = this.template.bind(this);
      this.replace = this.replace.bind(this);
   }

   template(token: string): string {
      return this.replace("if not exist {0} ( mkdir {0} )", { fromRegex: "\\{0\\}", to: `"${token}"` });
   }

   replace(str: string, ...replacements: StringReplacement[]): string {
      for (var i = 0; i < replacements.length; i++) {
         str = str.replace(new RegExp(replacements[i].fromRegex, 'g'), replacements[i].to); 
      }
      return str;
   }
   
   createBatchScript() {
      navigator.clipboard && navigator.clipboard
      .readText()
      .then(text => {
         this.setState({
            commands: text.split(/\r?\n/).filter(token => token).map(token => this.template(token))
         });
      })
      .catch(() => {
         this.setState({
            commands: []
         })
      });
   }


   render() {
      const { commands } = this.state;
      return (
         <div>
            <Button onClick={this.createBatchScript}>Create from clipboard</Button>
            { commands && commands.length > 0 && <a download="script.bat" href={`data:text/html,${commands.join("\n")}`}>Download</a> }
         </div>
      );
   }
}