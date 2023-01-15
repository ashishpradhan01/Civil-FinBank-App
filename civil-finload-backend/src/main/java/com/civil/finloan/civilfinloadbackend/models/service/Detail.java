package com.civil.finloan.civilfinloadbackend.models.service;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="_detail")
public class Detail {
	
	public Detail() {}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String type;
	private double rate;
	private int min;
	private int max;
	private int tenure;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "service_id")
	private Service service;
	
	public Detail( String type, double rate, int min, int max, int tenure) {
		this.type = type;
		this.rate = rate;
		this.min = min;
		this.max = max;
		this.tenure = tenure;
	}

	public int getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public double getRate() {
		return rate;
	}

	public int getMin() {
		return min;
	}

	public int getMax() {
		return max;
	}

	public int getTenure() {
		return tenure;
	}
	
	public void setService(Service service) {
		this.service = service;
	}

	@Override
	public String toString() {
		return "Detail [id=" + id + ", type=" + type + ", rate=" + rate + ", min=" + min + ", max=" + max + ", tenure="
				+ tenure + "]";
	}
	
}
