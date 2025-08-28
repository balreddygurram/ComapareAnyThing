package com.example.springbootchatgptfruits.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
public class ClaudeApiService {

    private static final String CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
    private static final String CLAUDE_MODEL = "claude-3-haiku-20240307";
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    private final OkHttpClient httpClient;
    private final ObjectMapper objectMapper;

    public ClaudeApiService() {
        this.httpClient = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public String sendMessage(String prompt) throws IOException {
        String apiKey = System.getenv("ANTHROPIC_API_KEY");
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("ANTHROPIC_API_KEY environment variable is not set");
        }

        String requestBody = String.format("""
            {
                "model": "%s",
                "max_tokens": 1000,
                "messages": [
                    {
                        "role": "user",
                        "content": "%s"
                    }
                ]
            }
            """, CLAUDE_MODEL, escapeJsonString(prompt));

        Request request = new Request.Builder()
                .url(CLAUDE_API_URL)
                .post(RequestBody.create(requestBody, JSON))
                .addHeader("Content-Type", "application/json")
                .addHeader("x-api-key", apiKey)
                .addHeader("anthropic-version", "2023-06-01")
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "Unknown error";
                throw new IOException("Claude API request failed: " + response.code() + " - " + errorBody);
            }

            String responseBody = response.body().string();
            JsonNode jsonResponse = objectMapper.readTree(responseBody);
            
            JsonNode contentArray = jsonResponse.get("content");
            if (contentArray != null && contentArray.isArray() && contentArray.size() > 0) {
                JsonNode firstContent = contentArray.get(0);
                JsonNode textNode = firstContent.get("text");
                if (textNode != null) {
                    return textNode.asText();
                }
            }
            
            throw new IOException("Unexpected response format from Claude API");
        }
    }

    private String escapeJsonString(String str) {
        return str.replace("\\", "\\\\")
                  .replace("\"", "\\\"")
                  .replace("\n", "\\n")
                  .replace("\r", "\\r")
                  .replace("\t", "\\t");
    }
}