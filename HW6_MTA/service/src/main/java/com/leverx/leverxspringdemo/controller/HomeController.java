package com.leverx.leverxspringdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.leverx.leverxspringdemo.domain.Destination;

import com.leverx.leverxspringdemo.service.CloudService;
import com.leverx.leverxspringdemo.service.SecurityService;
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class HomeController {
	
	private static final String FINAL_NAME = "given_name";
	private static final String FAMILY_NAME = "family_name";
	
	@Autowired
	private CloudPlatform platform;
	
	@Autowired
	private CloudService cloudService;
	
	@Autowired
	private SecurityService securityService;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		Map<String, JsonElement> vcap = cloudService.getSpaceName();
		JsonElement vc = vcap.get("space_name");
		model.addAttribute("VCAP",vc.toString());
		String appName = platform.getApplicationName();
		model.addAttribute("appName", appName);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "index";
	}
	
	@RequestMapping(value="/jwt", method=RequestMethod.GET)  
	public String getJWT(Model model) {   
		Optional<AuthToken> token = cloudService.getCurrToken();
		JsonObject jo = cloudService.getInfo(token);
		JsonElement name = jo.get(FINAL_NAME);
		JsonElement familyname = jo.get(FAMILY_NAME);
		model.addAttribute("token", jo);
		model.addAttribute("name", name);
		model.addAttribute("familyname", familyname);
		return "jwt"; 
	} 
	
	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}
	
	@RequestMapping(value="/scopeFail", method=RequestMethod.GET)
	public String checkScopeFailed() throws AccessDeniedException {
		securityService.userHasAuthorization("Download");
		return "scope";
	}
}
