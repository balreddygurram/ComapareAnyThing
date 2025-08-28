package com.example.springbootchatgptfruits.controller;

import com.example.springbootchatgptfruits.model.ComparisonRequest;
import com.example.springbootchatgptfruits.model.ComparisonResult;
import com.example.springbootchatgptfruits.service.ComparisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ComparisonController {

    @Autowired
    private ComparisonService comparisonService;

    @PostMapping("/compare")
    public ResponseEntity<ComparisonResult> compareItems(@RequestBody ComparisonRequest request) {
        try {
            if (request.getItemA() == null || request.getItemA().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (request.getItemB() == null || request.getItemB().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            ComparisonResult result = comparisonService.compareItems(request);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            System.out.println("🚨 Error in comparison controller: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/compare/sample")
    public ResponseEntity<ComparisonResult> getSampleComparison() {
        ComparisonRequest sampleRequest = new ComparisonRequest("iPhone 15", "Samsung Galaxy S23", "smartphones");
        ComparisonResult result = comparisonService.compareItems(sampleRequest);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/compare/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Comparison service is running!");
    }
}