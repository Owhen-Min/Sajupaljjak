package com.saju.sajubackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@SpringBootApplication
public class SajuBackendApplication {

    public static void main(String[] args) {
        System.out.println("---------------------start-----------------");
        SpringApplication.run(SajuBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner printActiveProfiles(Environment environment) {
        return args -> {
            System.out.println("✅ Active Profiles: " + Arrays.toString(environment.getActiveProfiles()));
            System.out.println("🛠️ Current Property: " + environment.getProperty("spring.datasource.url")); // 예제용
        };
    }
}
