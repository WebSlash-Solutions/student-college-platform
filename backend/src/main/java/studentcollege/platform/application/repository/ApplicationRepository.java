package studentcollege.platform.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import studentcollege.platform.application.entity.Application;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByStatus(String status);
}