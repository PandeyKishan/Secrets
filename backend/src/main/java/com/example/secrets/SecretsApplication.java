package com.example.secrets;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

@SpringBootApplication
@org.springframework.scheduling.annotation.EnableAsync
public class SecretsApplication {

	public static void main(String[] args) {
		// Only try to load .env in local development
		File envFile = new File("./backend/.env");
		if (envFile.exists()) {
			Dotenv dotenv = Dotenv.configure()
					.directory("./backend")
					.load();
			
			dotenv.entries().forEach(entry -> {
				if (System.getProperty(entry.getKey()) == null) {
					System.setProperty(entry.getKey(), entry.getValue());
				}
			});
		}
		
		SpringApplication.run(SecretsApplication.class, args);
	}

}
