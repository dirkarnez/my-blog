import * as React from "react";
import { Button } from "../components";
import arrayToTree from "array-to-tree";
import Graph from "graph-data-structure";

interface Relation {
   tableName: string,
   foreignKey: string,
   foreignTable: string,
   foreignTablePrimaryKey: string
}

export default class DropTableScriptGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);

      this.generate = this.generate.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            if (!text) {
               return;
            }

            var createTableRegex = `CREATE\\s+TABLE\\s+([^\(\\s]+)`;
            var tableNamesMatchedToDrop = text.match(new RegExp(createTableRegex, "gi"));
            
            if (!tableNamesMatchedToDrop) {
               return;
            }

            var tables = tableNamesMatchedToDrop
            .map(matched => matched.match(new RegExp(createTableRegex, "i")))
            .map(matched => matched ? matched[1] : "");


            var regexString = `ALTER\\s+TABLE\\s+([^\\s]+)\\s+ADD\\s+CONSTRAINT\\s+[^\\s]+\\s+FOREIGN KEY\\s+\\(([^\\s]+)\\)\\s+REFERENCES\\s+([^\\s]+)\\s+\\(([^\\s]+)\\)`;

            var dropsCommandsMatched = text.match(new RegExp(regexString, "gmis"));

            if (dropsCommandsMatched) {
               var temp = dropsCommandsMatched
                  .map(match => match.match(new RegExp(regexString)))
                  .map(match => match ? ({tableName: match[1], foreignKey: match[2], foreignTable: match[3], foreignTablePrimaryKey: match[4]} as Relation) : ({} as Relation));
            
               // console.log(JSON.stringify(temp));
               // var tree = arrayToTree(temp, { parentProperty: "tableName", customID: "foreignTable" });
               // console.log(JSON.stringify(tree));

               var graph = Graph();
               for (var i = 0; i < tables.length; i++) {
               
                  var table = tables[i];
                  var afterTables = temp.filter(relation => relation.tableName == table).map(relation => relation.foreignTable);

                  graph.addNode(table);
                  afterTables.forEach(afterTable => {
                     graph.addNode(afterTable);
                     graph.addEdge(table, afterTable);
                  });
               }

               console.log(`${graph.topologicalSort().map(table => `DROP TABLE ${table}`).join(";\n\n")};`);
            }
            
            if (tableNamesMatchedToDrop) {
               return navigator.clipboard && navigator.clipboard
                  .writeText(`${tableNamesMatchedToDrop.map(match => match.replace(/create/gi, "DROP")).join(";\n\n")};`)
            } else {
               throw new Error("Not Match");
            }
         })
         .then(() => {
            alert("done");
         })
         .catch(err => {
            alert(err);
         })
   }

   render() {
      return (
         <div>
            <Button onClick={this.generate}>Generate</Button>
         </div>
      );
   }
}