import * as React from "react";
import { Button } from "../components";

const template = `
import com.ewell.bill.service.BillingConfigService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Api(description = "My Description")
@Slf4j
@RequestMapping("/")
@RestController
public class MyController {

   @ApiOperation("HelloWorld")
   @GetMapping("/hello-world")
   List<String> helloWorld(String keyWords) throws Exception {
      return Arrays.asList("HelloWorld");
   }
}
`;

export default class ControllerGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);

      this.generate = this.generate.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard.writeText(template)
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