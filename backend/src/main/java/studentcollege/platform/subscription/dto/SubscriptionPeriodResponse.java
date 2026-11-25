package studentcollege.platform.subscription.dto;

import java.util.List;

public class SubscriptionPeriodResponse {

    private String periodId;
    private String label;
    private int months;
    private int discount;
    private List<String> features;

    public SubscriptionPeriodResponse(
            String periodId,
            String label,
            int months,
            int discount,
            List<String> features) {

        this.periodId = periodId;
        this.label = label;
        this.months = months;
        this.discount = discount;
        this.features = features;
    }

    public String getPeriodId() {
        return periodId;
    }

    public String getLabel() {
        return label;
    }

    public int getMonths() {
        return months;
    }

    public int getDiscount() {
        return discount;
    }

    public List<String> getFeatures() {
        return features;
    }
}