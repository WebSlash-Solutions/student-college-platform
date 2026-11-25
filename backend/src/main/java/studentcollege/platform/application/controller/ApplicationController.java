package studentcollege.platform.application.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import studentcollege.platform.application.entity.Application;
import studentcollege.platform.application.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // Create Application
    @PostMapping
    public ResponseEntity<Application> createApplication(
            @RequestBody Application application) {

        Application savedApplication =
                applicationService.createApplication(application);

        return ResponseEntity.ok(savedApplication);
    }

    // Get All Applications
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {

        List<Application> applications =
                applicationService.getAllApplications();

        return ResponseEntity.ok(applications);
    }

    // Get Applications By Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(
            @PathVariable String status) {

        List<Application> applications =
                applicationService.getApplicationsByStatus(status);

        return ResponseEntity.ok(applications);
    }

    // Get Application By ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(
            @PathVariable Long id) {

        Application application =
                applicationService.getApplicationById(id);

        return ResponseEntity.ok(application);
    }

    // Update Application Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Application updatedApplication =
                applicationService.updateApplicationStatus(
                        id,
                        status
                );

        return ResponseEntity.ok(updatedApplication);
    }

    // Delete Application
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.ok(
                "Application deleted successfully"
        );
    }
}