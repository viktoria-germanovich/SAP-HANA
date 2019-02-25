package com.leverx.leverxspringdemo.domain;

import java.util.List;

public class Microwave {
	
	private String microid;
	
	private String brand;
	
	public List<Services> servList;
	

	public void setServices(List<Services> servList) {
		this.servList = servList;
	}
	
	public String getMicroid() {
		return microid;
	}

	public void setMicroid(String microid) {
		this.microid = microid;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}
	
}