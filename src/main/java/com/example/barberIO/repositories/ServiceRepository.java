package com.example.barberIO.repositories;

import com.example.barberIO.models.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
}
