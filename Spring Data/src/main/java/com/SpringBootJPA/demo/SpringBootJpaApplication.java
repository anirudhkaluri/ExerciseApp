 package com.SpringBootJPA.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootJpaApplication {

	public static void main(String[] args) {
		System.out.println("we started our springboot app");
		SpringApplication.run(SpringBootJpaApplication.class, args);
	}

}
