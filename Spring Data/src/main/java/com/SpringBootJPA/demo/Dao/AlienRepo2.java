package com.SpringBootJPA.demo.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringBootJPA.demo.model.Alien;

public interface AlienRepo2 extends JpaRepository<Alien,Integer>{
	
	
}
