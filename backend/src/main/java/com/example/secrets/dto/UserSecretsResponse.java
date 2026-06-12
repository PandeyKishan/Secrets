package com.example.secrets.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class UserSecretsResponse {
    private String username;
    private List<String> secrets;
}
