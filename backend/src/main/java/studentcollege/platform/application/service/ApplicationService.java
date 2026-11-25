package studentcollege.platform.application.service;

import java.util.List;

import studentcollege.platform.application.entity.Application;

public interface ApplicationService {

    Application createApplication(Application application);

    List<Application> getAllApplications();

    List<Application> getApplicationsByStatus(String status);

    Application getApplicationById(Long id);

    Application updateApplicationStatus(Long id, String status);

    void deleteApplication(Long id);
}