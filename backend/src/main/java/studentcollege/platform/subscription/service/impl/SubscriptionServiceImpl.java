
package studentcollege.platform.subscription.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import studentcollege.platform.subscription.dto.SubscriptionPlanResponse;
import studentcollege.platform.subscription.service.SubscriptionService;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Override
    public List<SubscriptionPlanResponse> getAllPlans() {

        return List.of(

            new SubscriptionPlanResponse(
                "elite",
                "Elite",
                999,
                List.of(
                    "College listing in search",
                    "Browse all student lead previews",
                    "Email support"
                )
            ),

            new SubscriptionPlanResponse(
                "gold",
                "Gold",
                1999,
                List.of(
                    "Everything in Elite",
                    "Featured badge on college profile",
                    "Priority in district search",
                    "Lead export CSV"
                )
            ),

            new SubscriptionPlanResponse(
                "diamond",
                "Diamond",
                3999,
                List.of(
                    "Everything in Gold",
                    "Top placement in search results",
                    "Dedicated account manager",
                    "Admission campaign support"
                )
            )
        );
    }
}
