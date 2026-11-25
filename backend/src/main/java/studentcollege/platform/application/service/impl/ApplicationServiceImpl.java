package studentcollege.platform.application.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import studentcollege.platform.application.entity.Application;
import studentcollege.platform.application.repository.ApplicationRepository;
import studentcollege.platform.application.service.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(
            ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Application createApplication(Application application) {

        if (application.getStatus() == null ||
                application.getStatus().isBlank()) {

            application.setStatus("NEW");
        }

        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    @Override
    public List<Application> getApplicationsByStatus(String status) {

        return applicationRepository.findByStatus(status);
    }

    @Override
    public Application getApplicationById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Application not found with id: " + id
                        )
                );
    }

    @Override
    public Application updateApplicationStatus(
            Long id,
            String status) {

        Application application =
                getApplicationById(id);

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    @Override
    public void deleteApplication(Long id) {

        applicationRepository.deleteById(id);
    }
}