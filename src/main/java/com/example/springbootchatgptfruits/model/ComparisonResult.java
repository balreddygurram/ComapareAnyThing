package com.example.springbootchatgptfruits.model;

import java.util.List;

public class ComparisonResult {
    private String itemA;
    private String itemB;
    private String category;
    private List<String> itemAFeatures;
    private List<String> itemBFeatures;
    private List<String> itemAPros;
    private List<String> itemAConsuments;
    private List<String> itemBPros;
    private List<String> itemBCons;
    private String priceComparison;
    private String recommendation;
    private String summary;

    public ComparisonResult() {
    }

    public String getItemA() {
        return itemA;
    }

    public void setItemA(String itemA) {
        this.itemA = itemA;
    }

    public String getItemB() {
        return itemB;
    }

    public void setItemB(String itemB) {
        this.itemB = itemB;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getItemAFeatures() {
        return itemAFeatures;
    }

    public void setItemAFeatures(List<String> itemAFeatures) {
        this.itemAFeatures = itemAFeatures;
    }

    public List<String> getItemBFeatures() {
        return itemBFeatures;
    }

    public void setItemBFeatures(List<String> itemBFeatures) {
        this.itemBFeatures = itemBFeatures;
    }

    public List<String> getItemAPros() {
        return itemAPros;
    }

    public void setItemAPros(List<String> itemAPros) {
        this.itemAPros = itemAPros;
    }

    public List<String> getItemAConsuments() {
        return itemAConsuments;
    }

    public void setItemAConsuments(List<String> itemAConsuments) {
        this.itemAConsuments = itemAConsuments;
    }

    public List<String> getItemBPros() {
        return itemBPros;
    }

    public void setItemBPros(List<String> itemBPros) {
        this.itemBPros = itemBPros;
    }

    public List<String> getItemBCons() {
        return itemBCons;
    }

    public void setItemBCons(List<String> itemBCons) {
        this.itemBCons = itemBCons;
    }

    public String getPriceComparison() {
        return priceComparison;
    }

    public void setPriceComparison(String priceComparison) {
        this.priceComparison = priceComparison;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}