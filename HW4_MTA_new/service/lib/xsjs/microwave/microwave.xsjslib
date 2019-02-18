var microwave = function (connection) 
{
    const MICRO_TABLE = "HiMTA::Microwave";
    const MICRO_ID = "HiMTA::microid"

    function Result() {
        this.aParams = [];
        this.aValues = [];
        this.sql = "";
    };
      
    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${MICRO_TABLE}"`);
        result.forEach(x => $.trace.error(JSON.stringify(x)));
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oMicro) {
        //Get Next ID Number
        oMicro.microid = getNextval();
        //generate query
        const statement = createPreparedInsertStatement(MICRO_TABLE, oMicro);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oMicro));
    };

    this.doPut = function (oMicro) {
        let sql = `UPDATE "${MICRO_TABLE}" SET "brand"='${oMicro.brand}' WHERE "microid"=${oMicro.microid};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oMicro));
    };

    this.doDelete = function (microid) {
        const statement = createPreparedDeleteStatement(MICRO_TABLE, {microid: microid});
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody("Deleted");
    };

    function getNextval() {
        const statement = `select \"${MICRO_ID}\".NEXTVAL as "ID" from "${MICRO_TABLE}"`;
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