package studentcollege.platform.subscription.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studentcollege.platform.subscription.entity.SubscriptionPlanPeriod;

@Repository
public interface SubscriptionPlanPeriodRepository
        extends JpaRepository<SubscriptionPlanPeriod, Long> {

    List<SubscriptionPlanPeriod> findByPlanIdOrderByMonthsAsc(String planId);
}