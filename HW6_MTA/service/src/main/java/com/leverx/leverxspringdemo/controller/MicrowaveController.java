package com.leverx.leverxspringdemo.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Microwave;
import com.leverx.leverxspringdemo.service.MicrowaveService;

@RestController
public class MicrowaveController {

	@Autowired
	private MicrowaveService microwaveService;

	@GetMapping(value = "/microwave")
	public List<Microwave> getAllMicrowave() {
		return microwaveService.getMicrowaveAll();
	}

	@GetMapping(value = "/microwaveServices/{id}")
	public Microwave getMicroServices(@PathVariable String id) throws SQLException {
		return microwaveService.getMicroServices(id);
	}

	@GetMapping(value = "/microwave/{id}")
	public Microwave getMicrowave(@PathVariable String id) {
		return microwaveService.getMicrowave(id);
	}

	@PostMapping(value = "/microwave")
	public void createMicrowave(@RequestBody Microwave microwave) {
		microwaveService.createMicrowave(microwave);
	}

	@DeleteMapping(value = "/microwave/{id}")
	public void deleteMicrowave(@PathVariable String id) {
		microwaveService.deleteMicrowave(id);
	}

	@PutMapping(value = "/microwave")
	public void updateMicrowave(@RequestBody Microwave microwave) {
		microwaveService.updatePerson(microwave);
	}

}
