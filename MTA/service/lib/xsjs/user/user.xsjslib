var user = function (connection) 
{
    const USER_TABLE = "HiMTA::User";
    const USER_ID = "HiMTA::usid"

    function Result() {
        this.aParams = [];
        this.aValues = [];
        this.sql = "";
    };
      
    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${USER_TABLE}"`);
        result.forEach(x => $.trace.error(JSON.stringify(x)));
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oUser) {
        //Get Next ID Number
        oUser.usid = getNextval();
        //generate query
        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };

    this.doPut = function (oUser) {
        let sql = `UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oUser));
    };

    this.doDelete = function (usid) {
        const statement = createPreparedDeleteStatement(USER_TABLE, {usid: usid});
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody("Deleted");
    };

    function getNextval() {
        const statement = `select "HiMTA::usid".NEXTVAL as "ID" from "${USER_TABLE}"`;
        const result = connection.executeQuery(statement);
        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
        let oResult = new Result();
        let sColumnList = '',
            sValueList = '';

        for(let key in oValueObject){
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);            
        }
        $.trace.error("svalue " + sValueList);
        $.trace.error("scolumn: " + sColumnList);
        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);
        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;
        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = new Result();
        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }
        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;
        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
  
};