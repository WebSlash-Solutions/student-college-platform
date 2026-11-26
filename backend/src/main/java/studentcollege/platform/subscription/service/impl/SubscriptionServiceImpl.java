package studentcollege.platform.subscription.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import studentcollege.platform.subscription.dto.SubscriptionPeriodResponse;
import studentcollege.platform.subscription.dto.SubscriptionPlanResponse;
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

        List<SubscriptionPlan> plans =
                subscriptionPlanRepository.findByActiveTrue();

        return plans.stream()
                .map(this::buildPlanResponse)
                .toList();
    }

    private SubscriptionPlanResponse buildPlanResponse(
            SubscriptionPlan plan) {

        List<SubscriptionPlanPeriod> periods =
                periodRepository.findByPlanIdOrderByMonthsAsc(
                        plan.getPlanId());

        List<SubscriptionPeriodResponse> periodResponses =
                periods.stream()
                        .map(period -> new SubscriptionPeriodResponse(
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