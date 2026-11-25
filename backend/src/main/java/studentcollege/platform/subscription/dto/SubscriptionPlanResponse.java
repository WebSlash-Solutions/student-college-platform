package studentcollege.platform.subscription.dto;

import java.util.List;

public class SubscriptionPlanResponse {

    private String planId;
    private String planName;
    private double monthlyPrice;
    private String tagline;
    private String icon;
    private List<String> features;
    private List<SubscriptionPeriodResponse> periods;

    public SubscriptionPlanResponse(
            String planId,
            String planName,
            double monthlyPrice,
            String tagline,
            String icon,
            List<String> features,
            List<SubscriptionPeriodResponse> periods) {

        this.planId = planId;
        this.planName = planName;
        this.monthlyPrice = monthlyPrice;
        this.tagline = tagline;
        this.icon = icon;
        this.features = features;
        this.periods = periods;
    }

    public String getPlanId() {
        return planId;
    }

    public String getPlanName() {
        return planName;
    }

    public double getMonthlyPrice() {
        return monthlyPrice;
    }

    public String getTagline() {
        return tagline;
    }

    public String getIcon() {
        return icon;
    }

    public List<String> getFeatures() {
        return features;
    }

    public List<SubscriptionPeriodResponse> getPeriods() {
        return periods;
    }
}