
package com.example.demo.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.example.demo.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/add")
    public String addFavorite(@RequestParam int userId,
                              @RequestParam int ideaId) {
        return favoriteService.addFavorite(userId, ideaId);
    }
    @DeleteMapping("/remove")
    public String removeFavorite(@RequestParam int userId,
                                 @RequestParam int ideaId) {
        int result = favoriteService.removeFavorite(userId, ideaId);
        return result > 0 ? "Favorite removed successfully!" : "Favorite not found!";
    }

    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getFavorites(@PathVariable int userId) {
        return favoriteService.getFavoritesByUser(userId);
    }
}
