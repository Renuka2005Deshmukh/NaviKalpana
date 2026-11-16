package com.example.demo.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class IdeaRepository {

    private final JdbcTemplate jdbcTemplate;

    public IdeaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllIdeas() {

        String sql = """
                SELECT
                    i.idea_id,
                    i.title,
                    i.description,
                    i.difficulty,
                    i.estimated_cost,
                    i.purpose,
                    m.material_name
                FROM ideas i
                JOIN materials m
                ON i.material_id = m.material_id
                """;

        return jdbcTemplate.queryForList(sql);
    }
    public List<Map<String, Object>> getIdeasByMaterial(String materialName) {

        String sql = """
                SELECT
                    i.idea_id,
                    i.title,
                    i.description,
                    i.difficulty,
                    i.estimated_cost,
                    i.purpose,
                    m.material_name
                FROM ideas i
                JOIN materials m
                ON i.material_id = m.material_id
                WHERE m.material_name = ?
                """;

        return jdbcTemplate.queryForList(sql, materialName);
    }
    public List<Map<String, Object>> getIdeasByBudget(double budget) {

        String sql = """
                SELECT
                    i.idea_id,
                    i.title,
                    i.description,
                    i.difficulty,
                    i.estimated_cost,
                    i.purpose,
                    m.material_name
                FROM ideas i
                JOIN materials m
                ON i.material_id = m.material_id
                WHERE i.estimated_cost <= ?
                """;

        return jdbcTemplate.queryForList(sql, budget);
    }
    public List<Map<String, Object>> getIdeasByPurpose(String purpose){

        String sql = """
                SELECT
                    i.idea_id,
                    i.title,
                    i.description,
                    i.difficulty,
                    i.estimated_cost,
                    i.purpose,
                    m.material_name
                FROM ideas i
                JOIN materials m
                ON i.material_id = m.material_id
                WHERE i.purpose = ?
                """;

        return jdbcTemplate.queryForList(sql, purpose);
    }
}