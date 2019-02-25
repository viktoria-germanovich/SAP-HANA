package com.leverx.leverxspringdemo.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.MicrowaveDao;
import com.leverx.leverxspringdemo.domain.Microwave;

@Service
public class MicrowaveService {
	
	@Autowired
	private MicrowaveDao microwaveDao;
	
	public List<Microwave> getMicrowaveAll() {
		return microwaveDao.getAll();
	}
	public Microwave getMicroServices(String id) throws SQLException {
		return microwaveDao.getServices(id);
	}
	
	public Microwave getMicrowave(String id) {
		Optional<Microwave> microwaveOptional = this.microwaveDao.getById(id);
		Microwave microwave = null;
		if (microwaveOptional.isPresent()) {
			microwave = microwaveOptional.get();
		}
		return microwave;
	}
	
	public void createMicrowave(Microwave microwave) {
		this.microwaveDao.save(microwave);
	}
	
	public void updatePerson(Microwave microwave) {
		this.microwaveDao.update(microwave);
	}
	
	public void deleteMicrowave(String id) {
		this.microwaveDao.delete(id);
	}
	
}
