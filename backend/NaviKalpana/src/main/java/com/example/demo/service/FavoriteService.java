
package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.repository.FavoriteRepository;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public String addFavorite(int userId, int ideaId) {

        if (favoriteRepository.isFavoriteExists(userId, ideaId)) {
            return "This idea is already in your favourites!";
        }

        favoriteRepository.addFavorite(userId, ideaId);

        return "Idea added to Favourites ❤️";
    }

    public int removeFavorite(int userId, int ideaId) {
        return favoriteRepository.removeFavorite(userId, ideaId);
    }

    public List<Map<String, Object>> getFavoritesByUser(int userId) {
        return favoriteRepository.getFavoritesByUser(userId);
    }
}
