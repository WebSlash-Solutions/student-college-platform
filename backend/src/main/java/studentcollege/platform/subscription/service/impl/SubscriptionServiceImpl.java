package studentcollege.platform.subscription.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import studentcollege.platform.subscription.dto.SubscriptionPeriodResponse;
import studentcollege.platform.subscription.dto.SubscriptionPlanResponse;
import studentcollege.platform.subscription.dto.SubscriptionRequest;
import studentcollege.platform.subscription.entity.SubscriptionPlan;
import studentcollege.platform.subscription.entity.SubscriptionPlanPeriod;
import studentcollege.platform.subscription.repository.SubscriptionPlanPeriodRepository;
import studentcollege.platform.subscription.repository.SubscriptionPlanRepository;
import studentcollege.platform.subscription.service.SubscriptionService;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final SubscriptionPlanPeriodRepository periodRepository;

    public SubscriptionServiceImpl(
            SubscriptionPlanRepository subscriptionPlanRepository,
            SubscriptionPlanPeriodRepository periodRepository) {

        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.periodRepository = periodRepository;
    }

    @Override
    public List<SubscriptionPlanResponse> getAllPlans() {
        return subscriptionPlanRepository.findByActiveTrue()
                .stream()
                .map(this::buildPlanResponse)
                .toList();
    }

    @Override
    public SubscriptionPlanResponse createPlan(
            SubscriptionRequest request) {

        if (subscriptionPlanRepository.existsByPlanId(
                request.getPlanId())) {
            throw new RuntimeException("Plan ID already exists");
        }

        SubscriptionPlan plan = new SubscriptionPlan();

        plan.setPlanId(request.getPlanId());
        plan.setPlanName(request.getPlanName());
        plan.setMonthlyPrice(request.getMonthlyPrice());
        plan.setTagline(request.getTagline());
        plan.setIcon(request.getIcon());
        plan.setFeatures(request.getFeatures());
        plan.setActive(request.isActive());

        SubscriptionPlan savedPlan =
                subscriptionPlanRepository.save(plan);

        return buildPlanResponse(savedPlan);
    }

    @Override
    public SubscriptionPlanResponse updatePlan(
            String planId,
            SubscriptionRequest request) {

        SubscriptionPlan plan =
                subscriptionPlanRepository.findByPlanId(planId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Plan not found"));

        plan.setPlanName(request.getPlanName());
        plan.setMonthlyPrice(request.getMonthlyPrice());
        plan.setTagline(request.getTagline());
        plan.setIcon(request.getIcon());
        plan.setFeatures(request.getFeatures());
        plan.setActive(request.isActive());

        SubscriptionPlan updatedPlan =
                subscriptionPlanRepository.save(plan);

        return buildPlanResponse(updatedPlan);
    }

    @Override
    public void deletePlan(String planId) {

        SubscriptionPlan plan =
                subscriptionPlanRepository.findByPlanId(planId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Plan not found"));

        subscriptionPlanRepository.delete(plan);
    }

    private SubscriptionPlanResponse buildPlanResponse(
            SubscriptionPlan plan) {

        List<SubscriptionPlanPeriod> periods =
                periodRepository.findByPlanIdOrderByMonthsAsc(
                        plan.getPlanId());

        List<SubscriptionPeriodResponse> periodResponses =
                periods.stream()
                        .map(period ->
                                new SubscriptionPeriodResponse(
                                        period.getPeriodId(),
                                        period.getLabel(),
                                        period.getMonths(),
                                        period.getPrice().doubleValue(),
                                        period.getDiscount(),
                                        period.getFeatures()
                                ))
                        .toList();

        return new SubscriptionPlanResponse(
                plan.getPlanId(),
                plan.getPlanName(),
                plan.getMonthlyPrice().doubleValue(),
                plan.getTagline(),
                plan.getIcon(),
                plan.getFeatures(),
                periodResponses
        );
    }
}