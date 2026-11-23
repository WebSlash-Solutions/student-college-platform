
package studentcollege.platform.subscription.service;

import java.util.List;
import studentcollege.platform.subscription.dto.SubscriptionPlanResponse;

public interface SubscriptionService {

    List<SubscriptionPlanResponse> getAllPlans();
}
