package com.civil.finloan.civilfinloadbackend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil.finloan.civilfinloadbackend.exception.ServiceNotFoundException;
import com.civil.finloan.civilfinloadbackend.models.service.Detail;
import com.civil.finloan.civilfinloadbackend.models.service.DetailRepository;
import com.civil.finloan.civilfinloadbackend.models.service.Service;
import com.civil.finloan.civilfinloadbackend.models.service.ServiceRepository;

@RestController
@RequestMapping("/api/v1")
public class ServiceController {

	private final ServiceRepository serviceRepository;
	private final DetailRepository detailRepository;

	public ServiceController(ServiceRepository serviceRepository, DetailRepository detailRepository) {
		this.serviceRepository = serviceRepository;
		this.detailRepository = detailRepository;
	}

	@GetMapping("/services")
	public ResponseEntity<List<Service>> getServices() {
		var services = serviceRepository.findAll();
		return ResponseEntity.ok(services);
	}

	@GetMapping("/services/{id}")
	public ResponseEntity<Service> getOneServices(@PathVariable int id) {
		var services = serviceRepository.findAll().stream()
				.filter(service -> service.getId() == id).findFirst().get();
		return ResponseEntity.ok(services);
	}

	@PostMapping("/services")
	public ResponseEntity<Object> createService(@RequestBody Service service) {
		Service serv = serviceRepository.save(service);
		return ResponseEntity.status(HttpStatus.CREATED).body(serv);
	}

	@PostMapping("/services/{id}/detail")
	public ResponseEntity<Object> createDetail(@PathVariable int id, @RequestBody Detail detail)
			throws ServiceNotFoundException {
		Service service = serviceRepository.findById(id).orElse(null);
		if (service == null) {
			throw new ServiceNotFoundException(String.format("id: %s", id));
		}
		detail.setService(service);
		detailRepository.save(detail);
		return ResponseEntity.status(HttpStatus.CREATED).body(service);
	}

}
