package studentcollege.platform.subscription.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studentcollege.platform.subscription.entity.SubscriptionPlan;

@Repository
public interface SubscriptionPlanRepository
        extends JpaRepository<SubscriptionPlan, Long> {

    List<SubscriptionPlan> findByActiveTrue();

    Optional<SubscriptionPlan> findByPlanIdAndActiveTrue(String planId);

    boolean existsByPlanId(String planId);
}