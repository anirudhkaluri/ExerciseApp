package com.SpringBootJPA.demo.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.SpringBootJPA.demo.model.Alien;

public interface AlienRepo extends CrudRepository<Alien,Integer>{
	
	List<Alien> findByTech(String tech);
	List<Alien> findByAidGreaterThan(int aid);
	@Query("from Alien where tech=?1 order by name")
	List<Alien> findByTechSorted(String tech);

}
