package com.example.barberIO.repositories;

import com.example.barberIO.models.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
}
