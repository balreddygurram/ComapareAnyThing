package com.example.springbootchatgptfruits.model;

public class ComparisonRequest {
    private String itemA;
    private String itemB;
    private String category;

    public ComparisonRequest() {
    }

    public ComparisonRequest(String itemA, String itemB, String category) {
        this.itemA = itemA;
        this.itemB = itemB;
        this.category = category;
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
}