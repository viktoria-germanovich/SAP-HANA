package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.ServicesDao;
import com.leverx.leverxspringdemo.domain.Services;

@Service
public class ServicesService {
	
	@Autowired
	private ServicesDao servicesDao;
	
	public List<Services> getServicesAll() {
		return servicesDao.getAll();
	}
	
	public Services getServices(String id) {
		Optional<Services> servicesOptional = this.servicesDao.getById(id);
		Services services = null;
		if (servicesOptional.isPresent()) {
			services = servicesOptional.get();
		}
		return services;
	}
	
	public void createServices(Services services) {
		this.servicesDao.save(services);
	}
	
	public void updateServices(Services services) {
		this.servicesDao.update(services);
	}
	
	public void deleteServices(String id) {
		this.servicesDao.delete(id);
	}
	
}
