sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
], function (Controller, MessageToast, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {
		onInit: function () {
			console.log("controller init")
		},
		createMicrowave: function () {
			var Brand = this.getView().byId("input_brand").getValue();
			if (Brand === "") {
				MessageToast.show("Type in a brand!");
			} else {
				var oModel = {};
				oModel.brand = Brand;

				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.create('/Microwaves', oModel, {
					sucsess: function () {
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
		},
		updateMicrowave: function () {
			var oTable = this.getView().byId("microTable");
			var Brand = this.getView().byId("input_brand").getValue();
			var oSelectedItem = oTable.getSelectedItem();
			var index = oTable.indexOfItem(oSelectedItem);
			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;

				var oModel = {};
				oModel.brand = Brand;
				oModel.ts_update = null;
				oModel.ts_create = null;

				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.update("/Microwaves('" + microid + "')", oModel, {
					merge: false,
					success: function () {
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
		},
		deleteMicrowave: function () {
			var oTable = this.getView().byId("microTable");
			var oSelectedItem = oTable.getSelectedItem();
			var index = oTable.indexOfItem(oSelectedItem);

			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsjs/microwave/microwave.xsjs?microid=" + microid,
					"method": "DELETE",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false
				};
				$.ajax(settings).done(function (response) {
					console.log(response);
					oSelectedItem.getBindingContext("microwaves").getModel().refresh(true);
				});
			}
		},

		// onSearch: function () {

		// 	var sValue = this.getView().byId("searchField").getValue();
		// 	console.log(sValue);
		// 	var oFilter = new Filter("brand", FilterOperator.Contains, sValue);
		// 	console.log(oFilter);
		// 	this.getView().byId("microTable")
		// 	.getBindingContext("microwaves")
		// 	.filter(oFilter, FilterType.Application);
		// },

		checkDone: function (oEvent) {
			var check = oEvent.getParameter("selected");
			if (check) {
				this.getView().byId("input_brand").setEnabled(true);
				this.getView().byId("createButton").setEnabled(true);
				this.getView().byId("updateButton").setEnabled(true);
			} else {
				this.getView().byId("input_brand").setEnabled(false);
				this.getView().byId("createButton").setEnabled(false);
				this.getView().byId("updateButton").setEnabled(false);
			}
		}
	});
});