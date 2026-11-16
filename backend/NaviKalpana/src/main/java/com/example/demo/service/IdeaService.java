package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.repository.IdeaRepository;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;

    public IdeaService(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    public List<Map<String, Object>> getAllIdeas() {
        return ideaRepository.getAllIdeas();
    }
    public List<Map<String,Object>>
    getIdeasByMaterial(String materialName){
    	return
    ideaRepository.getIdeasByMaterial(materialName);
    }
    public List<Map<String,Object>>
    getIdeasByBudget(double budget){
    	return
    ideaRepository.getIdeasByBudget(budget);
    }
       public List<Map<String,Object>>
    getIdeasByPurpose(String purpose){
    	return
    ideaRepository.getIdeasByPurpose(purpose);
    }
}