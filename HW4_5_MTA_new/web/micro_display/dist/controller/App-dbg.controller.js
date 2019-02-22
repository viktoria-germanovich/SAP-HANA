sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
], function (Controller,Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {
		onInit: function () {
			console.log("controller init")
		},
		createMicrowave: function () {
			var Brand = this.getView().byId("input_brand").getValue();

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
		},
		updateMicrowave: function () {
			var oTable = this.getView().byId("microTable");
			var Brand = this.getView().byId("input_brand").getValue();
			var oSelectedItem = oTable.getSelectedItem();
			var index = oTable.indexOfItem(oSelectedItem);
			if (index === -1){
				sap.m.MessageToast.show("Row is not selected!");
			}else
			{
		
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
			
			if (index === -1){
				sap.m.MessageToast.show("Row is not selected!");
			}else{
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

		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("brand", FilterOperator.Contains, sValue);

			oView.byId("microTable").getBinding("microwaves").filter(oFilter, FilterType.Application);
		},


	});
});