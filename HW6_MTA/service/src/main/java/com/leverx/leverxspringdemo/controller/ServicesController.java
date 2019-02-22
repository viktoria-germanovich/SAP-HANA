package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Services;
import com.leverx.leverxspringdemo.service.ServicesService;

@RestController
public class ServicesController {
	
	@Autowired
	private ServicesService servicesService;
	
	@GetMapping(value="/services")
	public List<Services> getAllServices() {
		return servicesService.getServicesAll();
	}
	
	@GetMapping(value="/services/{id}")
	public Services getServices(@PathVariable String id) {
		return servicesService.getServices(id);
	}
	
	@PostMapping(value="/services")
	public void createServices(@RequestBody Services services) {
		servicesService.createServices(services);
	}
	
	@DeleteMapping(value="/services/{id}")
	public void deleteServices(@PathVariable String id) {
		servicesService.deleteServices(id);
	}
	
	@PutMapping(value="/services")
	public void updateServices(@RequestBody Services services) {
		servicesService.updateServices(services);
	}
	
}
