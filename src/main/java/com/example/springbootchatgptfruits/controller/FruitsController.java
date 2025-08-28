package com.example.springbootchatgptfruits.controller;

import com.example.springbootchatgptfruits.service.ClaudeApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FruitsController {

    @Autowired
    private ClaudeApiService claudeApiService;

    @GetMapping("/fruits")
    public String getFruits() {
        try {
            String apiKey = System.getenv("ANTHROPIC_API_KEY");
            if (apiKey == null) {
                System.out.println("🚨 ANTHROPIC_API_KEY not set → using fallback fruits");
                return "🍎 Apple, 🍌 Banana, 🥭 Mango, 🍊 Orange, 🍇 Grapes"; // static fallback
            }

            String result = claudeApiService.sendMessage("List 5 random fruits with emojis");
            System.out.println("✅ Returning dynamic fruits from Claude: " + result);
            return result;

        } catch (Exception e) {
            System.out.println("🚨 Claude API error: " + e.getMessage() + " → using fallback fruits");
            return "🍎 Apple, 🍌 Banana, 🥭 Mango, 🍊 Orange, 🍇 Grapes"; // fallback
        }
    }

}
