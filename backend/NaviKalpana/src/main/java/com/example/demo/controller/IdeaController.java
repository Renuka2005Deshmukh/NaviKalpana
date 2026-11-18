package com.example.demo.controller;
import java.util.List;


import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.demo.service.IdeaService;
import com.example.demo.RecommendationRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ideas")
public class IdeaController {

    private final IdeaService ideaService;

    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @GetMapping
    public List<Map<String, Object>> getAllIdeas() {
        return ideaService.getAllIdeas();
    }
    @GetMapping("/material/{materialName}")
    public List<Map<String,Object>>
    getIdeasByMaterial(@PathVariable String materialName){
    	return 
    			ideaService.getIdeasByMaterial(materialName);
    }
    @GetMapping("/budget/{budget}")
    public List<Map<String,Object>>
    getIdeasByBudget(@PathVariable double budget){
    	return 
    			ideaService.getIdeasByBudget(budget);
    }
    @GetMapping("/purpose/{purpose}")
    public List<Map<String,Object>>
    getIdeasByPurpose(@PathVariable String purpose){
    	return 
    			ideaService.getIdeasByPurpose(purpose);
    }
    @PostMapping("/recommend")
    public List<Map<String, Object>> 
    recommendIdeas(@RequestBody RecommendationRequest request) {
    	System.out.println("Material IDs:"+request.getMaterialIds());
    	System.out.println("Budget:"+request.getBudget());
    	System.out.println("Purpose:"+request.getPurpose());

        return ideaService.getIdeasByMaterials(
                request.getMaterialIds(),
                request.getBudget(),
                request.getPurpose()
        );
    }
    
}