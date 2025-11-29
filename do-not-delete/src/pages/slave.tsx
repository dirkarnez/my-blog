import * as React from "react"
import { Container, DataGrid } from "../components";
import MonacoEditor from 'react-monaco-editor';
import { 
   DataUriToImage, ImageToDataUri, ExcelToMarkdown,
   Traverse, ReactClass, PlainObjectGenerator, Replace, JsObjectToJson, InsertFrontEnd,
   ControllerGenerator, DropTableScriptGenerator, InsertScriptGenerator, MyBatisMapperXMLGenerator, BatMaker, DatabasePlainObjectGenerator
} from "../slaves";

export default class Slave extends React.Component<{}, {}> {
   render() {
      return (
         <div>
            <Container name="Excel to Markdown">
               <ExcelToMarkdown/>
            </Container>
            <Container name="DataGrid">
               <DataGrid/>
            </Container>
            <Container name="Insert Front End">
               <InsertFrontEnd/>
            </Container>
            <Container name="Database Plain Object Generator">
               <DatabasePlainObjectGenerator/>
            </Container>
            <Container name="MyBatis Mapper XML Generator">
               <MyBatisMapperXMLGenerator/>
            </Container>
            <Container name="Insert Script Generator">
               <InsertScriptGenerator/>
            </Container>
            <Container name="Create Drop Table Script">
               <DropTableScriptGenerator/>
            </Container>
            <Container name="Controller Generator">
               <ControllerGenerator/>
            </Container>
            <Container name="JS Object to JSON">
               <JsObjectToJson/>
            </Container>
            <Container name="Data Uri to Image">
               <DataUriToImage/>
            </Container>
            <Container name="Image to Data Uri">
               <ImageToDataUri/>
            </Container>
            <Container name="Image to Data Uri">
               <PlainObjectGenerator/>
            </Container>
            <Container name="Replace">
               <Replace/>
            </Container>
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
                  height="600"
                  language="javascript"
                  theme="vs-dark"
               />
            </Container>
         </div>
      );
   }
}