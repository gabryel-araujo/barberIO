package com.example.barberIO.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.barberIO.services.ConfigEmpresaService;

@RestController
public class ConfigEmpresaController {
	
	@Autowired
	private ConfigEmpresaService configEmpresaService;
	
	@GetMapping

}
