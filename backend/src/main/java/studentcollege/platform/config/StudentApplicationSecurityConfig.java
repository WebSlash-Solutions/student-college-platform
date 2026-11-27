package studentcollege.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class StudentApplicationSecurityConfig {

    @Bean
    public SecurityFilterChain studentApplicationSecurityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // Student APIs
                .requestMatchers("/api/students/**").permitAll()

                // Application APIs
                .requestMatchers("/api/applications/**").permitAll()

                // Other APIs
                .anyRequest().authenticated()
            );

        return http.build();
    }
}