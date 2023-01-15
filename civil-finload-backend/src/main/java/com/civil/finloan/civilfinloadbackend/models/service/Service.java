package com.civil.finloan.civilfinloadbackend.models.service;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "_service")
public class Service {

	public Service() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String type;
	private String code;
	private String imgUrl;
	private String description;
	@OneToMany(
			fetch = FetchType.LAZY,
			cascade = CascadeType.ALL,
			mappedBy = "service",
			targetEntity = Detail.class)
	private List<Detail> detail;
	
	public Service(String type, String code, String imgUrl, String description, List<Detail> detail) {
		this.type = type;
		this.code = code;
		this.imgUrl = imgUrl;
		this.description = description;
		this.detail = detail;
	}

	public int getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public String getCode() {
		return code;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public String getDescription() {
		return description;
	}

	public List<Detail> getDetail() {
		return detail;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", type=" + type + ", code=" + code + ", imgUrl=" + imgUrl + ", description="
				+ description + ", detail=" + detail + "]";
	}

}
