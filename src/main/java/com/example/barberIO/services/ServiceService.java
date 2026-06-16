package com.example.barberIO.services;

import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.ServiceRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceService extends EmpresaAwareServiceImpl<ServiceModel, Long, ServiceRepository> {

    public ServiceService(ServiceRepository repository) {
        super(repository);
    }
}
