package com.example.springbootchatgptfruits.service;

import com.example.springbootchatgptfruits.model.ComparisonRequest;
import com.example.springbootchatgptfruits.model.ComparisonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

@Service
public class ComparisonService {

    private static final String FALLBACK_COMPARISON = "Unable to compare items at this time. Please try again later.";

    @Autowired
    private ClaudeApiService claudeApiService;

    public ComparisonResult compareItems(ComparisonRequest request) {
        try {
            String apiKey = System.getenv("ANTHROPIC_API_KEY");
            if (apiKey == null) {
                System.out.println("🚨 ANTHROPIC_API_KEY not set → using fallback comparison");
                return createFallbackComparison(request);
            }

            String prompt = buildComparisonPrompt(request);
            String result = claudeApiService.sendMessage(prompt);

            System.out.println("✅ Comparison result from Claude: " + result);
            return parseComparisonResult(request, result);

        } catch (Exception e) {
            System.out.println("🚨 Claude API error: " + e.getMessage() + " → using fallback comparison");
            return createFallbackComparison(request);
        }
    }

    private String buildComparisonPrompt(ComparisonRequest request) {
        String category = request.getCategory() != null ? request.getCategory() : "general products";
        
        return String.format(
            "Compare %s and %s as %s. Provide a detailed comparison covering:\n" +
            "1. Price (if applicable)\n" +
            "2. Key Features (3-4 features each)\n" +
            "3. Pros (2-3 pros each)\n" +
            "4. Cons (2-3 cons each)\n" +
            "5. Recommendation with reasoning\n" +
            "6. Brief summary\n\n" +
            "Format your response clearly with headings and bullet points.",
            request.getItemA(), request.getItemB(), category
        );
    }

    private ComparisonResult parseComparisonResult(ComparisonRequest request, String gptResponse) {
        ComparisonResult result = new ComparisonResult();
        result.setItemA(request.getItemA());
        result.setItemB(request.getItemB());
        result.setCategory(request.getCategory());

        String[] lines = gptResponse.split("\n");
        List<String> itemAFeatures = new ArrayList<>();
        List<String> itemBFeatures = new ArrayList<>();
        List<String> itemAPros = new ArrayList<>();
        List<String> itemACons = new ArrayList<>();
        List<String> itemBPros = new ArrayList<>();
        List<String> itemBCons = new ArrayList<>();
        StringBuilder recommendation = new StringBuilder();
        StringBuilder summary = new StringBuilder();

        String currentSection = "";
        for (String line : lines) {
            line = line.trim();
            if (line.toLowerCase().contains("price")) {
                currentSection = "price";
                result.setPriceComparison(line);
            } else if (line.toLowerCase().contains("feature")) {
                currentSection = "features";
            } else if (line.toLowerCase().contains("pros")) {
                currentSection = "pros";
            } else if (line.toLowerCase().contains("cons")) {
                currentSection = "cons";
            } else if (line.toLowerCase().contains("recommendation")) {
                currentSection = "recommendation";
            } else if (line.toLowerCase().contains("summary")) {
                currentSection = "summary";
            } else if (line.startsWith("- ") || line.startsWith("• ")) {
                String item = line.substring(2).trim();
                switch (currentSection) {
                    case "features":
                        if (line.toLowerCase().contains(request.getItemA().toLowerCase())) {
                            itemAFeatures.add(item);
                        } else {
                            itemBFeatures.add(item);
                        }
                        break;
                    case "pros":
                        if (line.toLowerCase().contains(request.getItemA().toLowerCase())) {
                            itemAPros.add(item);
                        } else {
                            itemBPros.add(item);
                        }
                        break;
                    case "cons":
                        if (line.toLowerCase().contains(request.getItemA().toLowerCase())) {
                            itemACons.add(item);
                        } else {
                            itemBCons.add(item);
                        }
                        break;
                }
            } else if (!line.isEmpty()) {
                if (currentSection.equals("recommendation")) {
                    recommendation.append(line).append(" ");
                } else if (currentSection.equals("summary")) {
                    summary.append(line).append(" ");
                }
            }
        }

        result.setItemAFeatures(itemAFeatures);
        result.setItemBFeatures(itemBFeatures);
        result.setItemAPros(itemAPros);
        result.setItemAConsuments(itemACons);
        result.setItemBPros(itemBPros);
        result.setItemBCons(itemBCons);
        result.setRecommendation(recommendation.toString().trim());
        result.setSummary(summary.toString().trim());

        if (result.getSummary().isEmpty()) {
            result.setSummary(gptResponse.substring(0, Math.min(200, gptResponse.length())) + "...");
        }

        return result;
    }

    private ComparisonResult createFallbackComparison(ComparisonRequest request) {
        ComparisonResult result = new ComparisonResult();
        result.setItemA(request.getItemA());
        result.setItemB(request.getItemB());
        result.setCategory(request.getCategory());
        result.setItemAFeatures(Arrays.asList("Feature information unavailable"));
        result.setItemBFeatures(Arrays.asList("Feature information unavailable"));
        result.setItemAPros(Arrays.asList("Pros information unavailable"));
        result.setItemAConsuments(Arrays.asList("Cons information unavailable"));
        result.setItemBPros(Arrays.asList("Pros information unavailable"));
        result.setItemBCons(Arrays.asList("Cons information unavailable"));
        result.setPriceComparison("Price comparison unavailable");
        result.setRecommendation("Unable to provide recommendation at this time");
        result.setSummary(FALLBACK_COMPARISON);
        return result;
    }
}