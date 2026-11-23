
package studentcollege.platform.subscription.dto;

import java.util.List;

public class SubscriptionPlanResponse {

    private String planId;
    private String planName;
    private double monthlyPrice;
    private List<String> features;

    public SubscriptionPlanResponse(String planId, String planName,
                                    double monthlyPrice, List<String> features) {
        this.planId = planId;
        this.planName = planName;
        this.monthlyPrice = monthlyPrice;
        this.features = features;
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

    public List<String> getFeatures() {
        return features;
    }
}
