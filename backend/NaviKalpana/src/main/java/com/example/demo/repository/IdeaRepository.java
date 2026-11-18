package com.example.demo.repository;
import java.util.ArrayList;
import java.util.Collections;
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
    public List<Map<String, Object>> getIdeasByMaterials(
            List<Integer> materialIds, double budget, String purpose) {

        if (materialIds == null || materialIds.isEmpty()) {
            return new ArrayList<>();
        }

        List<Integer> uniqueIds = materialIds.stream()
                .distinct()
                .toList();

        String placeholders = String.join(",",
                Collections.nCopies(uniqueIds.size(), "?"));

        String sql = """
            SELECT
                i.idea_id,
                i.title,
                i.description,
                i.difficulty,
                i.estimated_cost,
                i.purpose,
                GROUP_CONCAT(DISTINCT m.material_name) AS material_names
            FROM ideas i
            JOIN idea_materials im ON i.idea_id = im.idea_id
            JOIN materials m ON im.material_id = m.material_id
            WHERE im.material_id IN (""" + placeholders + """
            )
            AND i.estimated_cost <= ?
            AND (? IS NULL OR LOWER(i.purpose) = LOWER(?))
            GROUP BY i.idea_id, i.title, i.description,
                     i.difficulty, i.estimated_cost, i.purpose
            HAVING COUNT(DISTINCT im.material_id) = ?
            ORDER BY i.estimated_cost ASC
            """;

        List<Object> params = new ArrayList<>();
        params.addAll(uniqueIds);
        params.add(budget);
        params.add(purpose);
        params.add(purpose);
        params.add(uniqueIds.size());
        System.out.println("PARAMS:"+ params);

 	   System.out.println("SQL:"+ sql);
 	   

        return jdbcTemplate.queryForList(sql, params.toArray());
    }
    
}