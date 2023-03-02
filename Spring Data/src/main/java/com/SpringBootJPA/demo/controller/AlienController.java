package com.SpringBootJPA.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.SpringBootJPA.demo.Dao.AlienRepo;
import com.SpringBootJPA.demo.Dao.AlienRepo2;
import com.SpringBootJPA.demo.model.Alien;

//@Controller
/*
 *  we will change the annotation for controller from @Controller to @RestController 
 *  so that we can remove the annotation @ResponseBody every time. 
 *  Spring will take care of it if we use @RestController
 */
@RestController
public class AlienController {
	
	@Autowired
	AlienRepo repo;
	
	@Autowired
	AlienRepo2 repo2; //this is with JpaRepository
	
	@RequestMapping("/")
	public String home() {
		return "home.jsp"; //for this to return jsp we need to add tomcat jasper.
	}
	
	/*
	 * We removed this since we are using @PostMapping / alien REST request to add an alien 
	@RequestMapping("/addAlien")
	public String addAlien(Alien alien) {
		
		repo.save(alien);
		return "home.jsp";
	}
	*/
	
	@RequestMapping("/getAlien")
	public ModelAndView getAlien(@RequestParam int aid) {
		
		ModelAndView mv=new ModelAndView("showAlien.jsp");
		Alien alien=repo.findById(aid).orElse(new Alien());
		System.out.println("\n\n\nAliens with ID greater than+"+aid);
		System.out.println(repo.findByAidGreaterThan(aid));
		mv.addObject(alien);
		return mv;
	}
	
	@RequestMapping("/getWithTech")
	public void getWithTech(@RequestParam String tech) {
		System.out.println(repo.findByTech(tech));
		
		System.out.println("\n\n\n\nAFTER SORTING");
		
		System.out.println(repo.findByTechSorted(tech));
		
	}
	/*
	 * This is with CrudRepository
	@RequestMapping("/aliens")
	@ResponseBody
	public String getAllAliens() {
		return repo.findAll().toString(); //this is with CrudRepository
	
	}
	*/
	
	
	//Lets write it with JpaRepository

	//This sends data in xml or json format depending on clien request header
	@RequestMapping("/aliens")
	//@ResponseBody //Removed this annotation since we are using @RestController
	public List<Alien> getAllAliens(){
		return repo2.findAll(); //we are using JpaRepository
		//we get a json format now
	}
	
	
	//lets restrict the above function to send only xml
	/*
	@RequestMapping(path="/aliens",produces= {"application/xml"})
	@ResponseBody
	public List<Alien> getAllAliens(){
		return repo2.findAll(); 
		//we get a xml format now
	}
	*/
	
	/*
	 *This if we use CrudRepository
	@RequestMapping("/alien/{aid}")
	@ResponseBody
	public String getSpecificAlien(@PathVariable("aid") int aid) {
		return repo.findById(aid).toString(); 
	}
	*/
	
	//Lets use JpaRepository
	
	
	
	 // This sends data in xml or json format depending on clien request header
	@GetMapping("/alien/{aid}")
	//@ResponseBody //Removed this annotation since we are using @RestController
	public Optional<Alien> getSpecificAlien(@PathVariable("aid") int aid) {
		return repo2.findById(aid); //we get a json format now
	}
	
	
	/*
	//lets restrict it to sending only xml format data
	@RequestMapping(path="/alien/{aid}",produces= {"application/xml"})
	@ResponseBody
	public Optional<Alien> getSpecificAlien(@PathVariable("aid") int aid) {
		return repo2.findById(aid); //we get a xml format now
	}
	*/
	
	@PostMapping(path="/alien",consumes= {"application/json"}) //no need of @ResponseBody 
	public Alien addAlien(@RequestBody Alien alien) {
		repo2.save(alien);
		return alien;
	}
	
	@DeleteMapping("/alien/{aid}")
	public String deleteAlien(@PathVariable("aid") int aid) {
		//first verify if there is aid
		Alien al= repo2.getOne(aid);
		repo.delete(al);
		
		return "deleted";
	}
	
	@PutMapping(path="/alien",consumes= {"application/json"})
	public Alien saveOrUpdateAlien(@RequestBody Alien alien) {
		
		repo.save(alien);
		return alien;
		
	}
	
	
}
