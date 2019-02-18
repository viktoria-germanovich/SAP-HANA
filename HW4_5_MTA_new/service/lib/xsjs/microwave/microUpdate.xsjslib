 
 const MICRO_TABLE = "HiMTA::Microwave";
 const CURR_TIMESTAMP_FUN = "current_timestamp";
 const SetToJSON = $.import('xsjs.microwave', 'prepareToRequest').setToJSON;
 const setToJSON = new SetToJSON();

function microUpdate(param) {
  var after = param.afterTableName;
  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();
  var oMicroItems = setToJSON.recordSetToJSON(oResult, "items");
  var oMicro = oMicroItems.items[0];
  $.trace.error(JSON.stringify(oMicro));
  var uStmt;
  uStmt = param.connection.prepareStatement(`UPDATE "${MICRO_TABLE}" SET "brand"='${oMicro.brand}',"ts_update" = ${CURR_TIMESTAMP_FUN} WHERE "microid"=${oMicro.microid};`);
  uStmt.executeUpdate();
}
