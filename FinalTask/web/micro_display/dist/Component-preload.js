jQuery.sap.registerPreloadedModules({version:"2.0",name:"micro_display/Component-preload",modules:{"micro_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(i,t){"use strict";return i.extend("micro_display.Component",{metadata:{manifest:"json"},init:function(){i.prototype.init.apply(this,arguments)}})});',"micro_display/controller/App.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],function(e,t){"use strict";return e.extend("micro_display.controller.App",{onInit:function(){console.log("controller init")},createMicrowave:function(){var e=this.getView().byId("input_brand").getValue(),i=this.getView().byId("input_color").getValue();if(""===e||""===i)t.show("Type in a brand and a color!");else{var o={};o.brand=e,o.color=i;this.getView().getModel("microwaves").create("/Microwaves",o,{sucsess:function(){jQuery.sap.log.info("Sucsess")},error:function(){jQuery.sap.log.error("Error")}})}},updateMicrowave:function(){var e=this.getView().byId("microTable"),i=this.getView().byId("input_brand").getValue(),o=this.getView().byId("input_color").getValue(),s=e.getSelectedItem();if(-1===e.indexOfItem(s))t.show("Row is not selected!");else{var n=e.getSelectedItem().getBindingContext("microwaves").getObject().microid,r={};r.brand=i,r.color=o,r.ts_update=null,r.ts_create=null,this.getView().getModel("microwaves").update("/Microwaves(\'"+n+"\')",r,{merge:!1,success:function(){jQuery.sap.log.info("Sucsess")},error:function(){jQuery.sap.log.error("Error")}})}},deleteMicrowave:function(){var e=this.getView().byId("microTable"),i=e.getSelectedItem();if(-1===e.indexOfItem(i))t.show("Row is not selected!");else{var o=e.getSelectedItem().getBindingContext("microwaves").getObject().microid,s={async:!0,crossDomain:!0,url:"https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsjs/microwave/microwave.xsjs?microid="+o,method:"DELETE",headers:{"content-type":"application/json"},processData:!1};$.ajax(s).done(function(e){console.log(e),i.getBindingContext("microwaves").getModel().refresh(!0)})}},checkDone:function(e){e.getParameter("selected")?(this.getView().byId("input_brand").setEnabled(!0),this.getView().byId("input_color").setEnabled(!0),this.getView().byId("createButton").setEnabled(!0),this.getView().byId("updateButton").setEnabled(!0)):(this.getView().byId("input_brand").setEnabled(!1),this.getView().byId("input_color").setEnabled(!1),this.getView().byId("createButton").setEnabled(!1),this.getView().byId("updateButton").setEnabled(!1))},selectFridge:function(){var e=this.byId("microTable"),t=e.getSelectedItem(),i=t.getBindingContext("microwaves").getObject();this.byId("dateCreate").setText(i.ts_create),this.byId("dateUpdate").setText(i.ts_update)}})});',"micro_display/view/App.view.xml":'<mvc:View controllerName="micro_display.controller.App" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App id="home"><Page title="{i18n>homePageTitle}"><Panel class="sapUiResponsiveMargin" width="auto"><content><Table \r\n                        id="microTable" \r\n                        growing="true" \r\n                        growingThreshold="5" \r\n                        items="{path: \'microwaves>/Microwaves\'}"\r\n                        mode="SingleSelectMaster"\r\n                        selectionChange="selectFridge"\r\n                        headerName="Main information"><headerToolbar><OverflowToolbar><content><Text text="Enabled" /><CheckBox selected="false" select="checkDone" enabled="true" /><Label text="Brand" class="sapUiSmallMargin" /><Input id="input_brand" placeholder="{i18n>Placeholder}" width="250px" enabled="false" /><Label text="Color" class="sapUiSmallMargin" /><Input id="input_color" placeholder="{i18n>Placeholder}" width="250px" enabled="false" /></content></OverflowToolbar></headerToolbar><columns><Column id="idColumn"><Text text="{i18n>idNameLabelText}" /></Column><Column id="brandColumn"><Text text="{i18n>brandLabelText}" /></Column><Column id="colorColumn"><Text text="{i18n>colorLabelText}" /></Column></columns><items><ColumnListItem><cells><Text text="{microwaves>microid}" /></cells><cells><Text text="{microwaves>brand}" /></cells><cells><Text text="{microwaves>color}" /></cells></ColumnListItem></items></Table></content></Panel><Panel id="productDetailsPanel" headerText="{i18n>addInfoHeader}" class="sapUiResponsiveMargin" width="auto"><l:VerticalLayout><Label text="{i18n>Created}:" /><Text id="dateCreate" /><Label text="{i18n>Updated}:" /><Text id="dateUpdate" /></l:VerticalLayout></Panel><footer><Toolbar><ToolbarSpacer /><Button id="createButton" text="Create" icon="sap-icon://add" press=".createMicrowave" enabled="false" /><Button id="updateButton" text="Edit" icon="sap-icon://edit" press=".updateMicrowave" enabled="false" /><Button id="deleteButton" text="Delete" icon="sap-icon://delete" press=".deleteMicrowave" /></Toolbar></footer></Page></App></Shell></mvc:View>',"micro_display/i18n/i18n.properties":'appTitle="Microwave Display"\r\nappDescription="Homework 4"\r\nidNameLabelText=ID\r\nbrandLabelText=Brand\r\ncolorLabelText=Color\r\nhomePageTitle=MICROWAVES\r\nPlaceholder=Type in a brand to create or edit\r\naddInfoHeader=Additional information:\r\nCreated=Date Of Create\r\nUpdated=Date Of Update',"micro_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"micro_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize_plus"]},"sap.ui5":{"rootView":{"viewName":"micro_display.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"micro_display.i18n.i18n"}},"microwaves":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}},"resources":{"css":[{"uri":"css/style.css"}]}}}'}});