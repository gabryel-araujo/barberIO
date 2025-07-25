package com.example.barberIO.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.barberIO.models.HorarioFuncionamentoModel;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface HorarioFuncionamentoRepository extends JpaRepository<HorarioFuncionamentoModel, Long>{
	
	@Query("SELECT h FROM HorarioFuncionamentoModel h WHERE h.config_empresa.id = :config_empresa_id")
	List<HorarioFuncionamentoModel> findAllByEmpresa(@Param("config_empresa_id") Long config_empresa_id);
	
	@Query("SELECT h.abertura FROM HorarioFuncionamentoModel h where h.codigo_dia = :codigo and h.aberto = true")
	LocalTime verificarAbertura(@Param("codigo")int codigo);
	
	@Query("SELECT h.fechamento FROM HorarioFuncionamentoModel h where h.codigo_dia = :codigo and h.aberto = true")
	LocalTime verificarFechamento(@Param("codigo")int codigo);
}
