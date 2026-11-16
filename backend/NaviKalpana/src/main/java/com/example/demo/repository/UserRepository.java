package com.example.demo.repository;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.User;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int registerUser(User user) {

        String sql = """
                INSERT INTO users
                (full_name, email, mobile, password)
                VALUES (?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                user.getFullName(),
                user.getEmail(),
                user.getMobile(),
                user.getPassword()
        );
    }
    public boolean emailExists(String email) {

        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";

        Integer count = jdbcTemplate.queryForObject(
                sql, Integer.class, email);

        return count != null && count > 0;
    }
    public User findByEmail(String email) {

        String sql = "SELECT * FROM users WHERE email = ?";

        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> {

            User user = new User();

            user.setUserId(rs.getInt("user_id"));
            user.setFullName(rs.getString("full_name"));
            user.setEmail(rs.getString("email"));
            user.setMobile(rs.getString("mobile"));
            user.setPassword(rs.getString("password"));

            return user;
        }, email);

        return users.isEmpty() ? null : users.get(0);
    }
}
