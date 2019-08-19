import * as React from "react";
import { Button } from "../components";
import MonacoEditor from "react-monaco-editor";
import Graph from "graph-data-structure";

interface Relation {
  tableName: string;
  foreignKey: string;
  foreignTable: string;
  foreignTablePrimaryKey: string;
}

interface DropTableScriptGeneratorState {
  dropTableCommands: string;
}

export default class DropTableScriptGenerator extends React.Component<
  {},
  DropTableScriptGeneratorState
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dropTableCommands: ""
    };

    this.generate = this.generate.bind(this);
  }

  generate() {
    navigator.clipboard &&
      navigator.clipboard
        .readText()
        .then(text => {
          if (!text) {
            return;
          }

          var createTableRegex = `CREATE\\s+TABLE\\s+([^\(\\s]+)`;
          var tableNamesMatchedToDrop = text.match(
            new RegExp(createTableRegex, "gi")
          );

          if (!tableNamesMatchedToDrop) {
            return;
          }

          var tables = tableNamesMatchedToDrop
            .map(matched => matched.match(new RegExp(createTableRegex, "i")))
            .map(matched => (matched ? matched[1] : ""));

          var regexString = `ALTER\\s+TABLE\\s+([^\\s]+)\\s+ADD\\s+CONSTRAINT\\s+[^\\s]+\\s+FOREIGN KEY\\s+\\(\\s*([^\\s]+)\\s*\\)\\s+REFERENCES\\s+(\\s*[^\\s]+\\s*)\\s+\\(\\s*([^\\s]+)\\s*\\)`;

          var dropsCommandsMatched = text.match(
            new RegExp(regexString, "gmis")
          );

          if (!dropsCommandsMatched) {
            return;
          }

          var temp = dropsCommandsMatched
            .map(match => match.match(new RegExp(regexString)))
            .map(match =>
              match
                ? ({
                    tableName: match[1],
                    foreignKey: match[2],
                    foreignTable: match[3],
                    foreignTablePrimaryKey: match[4]
                  } as Relation)
                : ({} as Relation)
            );

          var graph = Graph();

          tables.forEach(table => {
            var afterTables = temp
              .filter(relation => relation.tableName == table)
              .map(relation => relation.foreignTable);

            graph.addNode(table);

            afterTables.forEach(afterTable => {
              graph.addNode(afterTable);
              graph.addEdge(table, afterTable);
            });
          });

          var dropTableCommands = graph
            .topologicalSort()
            .map(table => `DROP TABLE ${table}`);

          if (dropTableCommands.length == tables.length) {
            var dropTableCommandsJoined = `${dropTableCommands.join(";\n\n")};`;

            this.setState({
              dropTableCommands: dropTableCommandsJoined
            });

            return (
              navigator.clipboard &&
              navigator.clipboard.writeText(dropTableCommandsJoined)
            );
          } else {
            throw new Error("Not all tables are to be dropped.");
          }
        })
        .then(() => {
          alert("done");
        })
        .catch(err => {
          alert(err);
        });
  }

  render() {
    const { dropTableCommands } = this.state;
    return (
      <div>
        <Button onClick={this.generate}>Generate</Button>
        <br />
        {dropTableCommands && (
          <MonacoEditor height="600" language="sql" theme="vs-dark" value={dropTableCommands}/>
        )}
      </div>
    );
  }
}