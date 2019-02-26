sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, MessageToast, Fragment, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {

		onInit: function () {
			this.oTable = this.getView().byId("microTable");
			this.mModel = this.getView().getModel("microModel");
			this.cModel = this.getView().getModel("configModel");
		},

		createMicrowave: function () {
			var Brand = this.mModel.getProperty("/brand"),
				Color = this.mModel.getProperty("/color");
			if (!Brand || !Color) {
				MessageToast.show("Type in a brand and a color!");
			} else {

				var obj = this.mModel.getData();
				delete obj.ts_update;
				delete obj.ts_create;
				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.create('/Microwaves', obj, {
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
			var Brand = this.mModel.getProperty("/brand"),
				Color = this.mModel.getProperty("/color"),
				oSelectedItem = this.oTable.getSelectedItem();
			if (!oSelectedItem) {
				MessageToast.show("Row is not selected!");
			} else if (!Brand || !Color) {
				MessageToast.show("Type in a brand and a color!");
			} else {
				var microid = oSelectedItem.getBindingContext("microwaves").getProperty("microid"),
					obj = this.mModel.getData(),
					oDataModel = this.getView().getModel("microwaves");

				oDataModel.update("/Microwaves('" + microid + "')", obj, {
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
			var oSelectedItem = this.oTable.getSelectedItem();
			if (!oSelectedItem) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = this.oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;
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

		selectFridge: function (oEvent) {
			var selItem = this.oTable.getSelectedItem(),
				obj = selItem.getBindingContext("microwaves").getObject(),
				check = oEvent.getParameter("selected");
			this.byId("dateCreate").setText(obj.ts_create);
			this.byId("dateUpdate").setText(obj.ts_update);
			this.cModel.setProperty("/bool", check);
		},

		onDialogPress: function () {
			var oView = this.getView();

			if (!this.byId("Dialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "micro_display.view.Dialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("Dialog").open();
			}

		},
		onCloseDialog: function () {
			this.getView().byId("Dialog").close();
		},

		onSearch: function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("brand", FilterOperator.Contains, sValue);

			oView.byId("microTable").getBinding("items").filter(oFilter, FilterType.Application);
		}
	});
});