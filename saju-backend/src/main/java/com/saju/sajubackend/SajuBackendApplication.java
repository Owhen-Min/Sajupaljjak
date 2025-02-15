package com.saju.sajubackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@EnableJpaAuditing
@SpringBootApplication
public class SajuBackendApplication {
    private static final Logger logger = LoggerFactory.getLogger(SajuBackendApplication.class);

    public static void main(String[] args) {
        logger.info("---------------------start-----------------");
        SpringApplication.run(SajuBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner printActiveProfiles(Environment environment) {
        return args -> {
            logger.info("✅ Active Profiles: {}", Arrays.toString(environment.getActiveProfiles()));
            logger.info("🛠️ Current Property: {}", environment.getProperty("spring.datasource.url"));
        };
    }
}
