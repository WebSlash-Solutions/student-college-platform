package studentcollege.platform.subscription.service;

import java.util.List;

import studentcollege.platform.subscription.dto.SubscriptionPlanResponse;
import studentcollege.platform.subscription.dto.SubscriptionRequest;

public interface SubscriptionService {

    List<SubscriptionPlanResponse> getAllPlans();

    SubscriptionPlanResponse createPlan(
            SubscriptionRequest request);

    SubscriptionPlanResponse updatePlan(
            String planId,
            SubscriptionRequest request);

    void deletePlan(String planId);
}