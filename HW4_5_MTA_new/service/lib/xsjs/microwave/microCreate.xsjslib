/*
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */
 const MICRO_TABLE = "HiMTA::Microwave";
 const micro_id = "HiMTA::microid";
 const CURR_TIMESTAMP_FUN = "current_timestamp";
 const SetToJSON = $.import('xsjs.microwave', 'prepareToRequest').setToJSON;
 const setToJSON = new SetToJSON();

function microCreate(param){
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;
    //Get Input New Record Values
    var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();
    var oMicroItems = setToJSON.recordSetToJSON(oResult, "items");
    var oMicro = oMicroItems.items[0];
    $.trace.error(JSON.stringify(oMicro));
	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement('select "HiMTA::microid".NEXTVAL from dummy'); 
	var result = pStmt.executeQuery();
    
    while (result.next()) {
		oMicro.microid = result.getString(1);
	}
    
    $.trace.error(JSON.stringify(oMicro));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${MICRO_TABLE}"\ values(?,?,?,?)`);
	fillAndExecute(pStmt, oMicro);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	//pStmt.executeUpdate();
	//pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?)" );
	fillAndExecute(pStmt, oMicro);
}
function fillAndExecute(pStmt, oMicro) {
	pStmt.setString(1, oMicro.microid.toString());
	pStmt.setString(2, oMicro.brand.toString());	
	pStmt.setString(3, (new Date().toISOString));
	pStmt.setString(4, (new Date().toISOString));	
	pStmt.executeUpdate();
	pStmt.close();	
}
