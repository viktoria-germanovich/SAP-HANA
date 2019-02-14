sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.db.controller.App", {
		productFactory: function (sId) {
			var oUIControl;

			oUIControl = this.byId("peopleTable").clone(sId);
			console.log(sId);

			return oUIControl;
		}

	});
});