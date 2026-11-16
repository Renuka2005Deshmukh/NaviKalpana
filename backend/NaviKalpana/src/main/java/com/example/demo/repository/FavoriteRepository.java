
package com.example.demo.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
 // Check if Favorite Already Exists
    public boolean isFavoriteExists(int userId, int ideaId) {

        String sql = """
                SELECT COUNT(*)
                FROM favorites
                WHERE user_id = ? AND idea_id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                userId,
                ideaId
        );

        return count != null && count > 0;
    }

    // Add Favorite
    public int addFavorite(int userId, int ideaId) {

        String sql = """
                INSERT INTO favorites (user_id, idea_id)
                VALUES (?, ?)
                """;

        return jdbcTemplate.update(sql, userId, ideaId);
    }

    // Remove Favorite
    public int removeFavorite(int userId, int ideaId) {

        String sql = """
                DELETE FROM favorites
                WHERE user_id = ? AND idea_id = ?
                """;

        return jdbcTemplate.update(sql, userId, ideaId);
    }

    // Get User Favorites
    public List<Map<String, Object>> getFavoritesByUser(int userId) {

        String sql = """
                SELECT
                    f.favorite_id,
                    i.idea_id,
                    i.title,
                    i.description,
                    i.estimated_cost,
                    i.purpose,
                    m.material_name
                FROM favorites f
                JOIN ideas i ON f.idea_id = i.idea_id
                JOIN materials m ON i.material_id = m.material_id
                WHERE f.user_id = ?
                """;

        return jdbcTemplate.queryForList(sql, userId);
    }
}
