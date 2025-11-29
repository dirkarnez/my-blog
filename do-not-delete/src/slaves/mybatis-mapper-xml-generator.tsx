import * as React from "react";
import { Button } from "../components";

const template = `
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.ewell.bill.mapper.FeeTypeMapper" >
    <resultMap id="BaseResultMap" type="com.ewell.bill.po.FeeType" >
        <id column="ID" property="id" jdbcType="VARCHAR" />
    </resultMap>
    <sql id="baseSql">
        ID
    </sql>
    <select id="selectAll" resultMap="BaseResultMap" >
        select
        <include refid="baseSql"/>
        from FEE_TYPE
    </select>
</mapper>
`;

export default class MyBatisMapperXMLGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);

      this.generate = this.generate.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .writeText(template)
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