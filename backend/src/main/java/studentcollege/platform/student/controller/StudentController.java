package studentcollege.platform.student.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import studentcollege.platform.student.entity.Student;
import studentcollege.platform.student.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Create Student
    @PostMapping
    public ResponseEntity<Student> createStudent(
            @RequestBody Student student) {

        Student savedStudent = studentService.createStudent(student);

        return ResponseEntity.ok(savedStudent);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        List<Student> students = studentService.getAllStudents();

        return ResponseEntity.ok(students);
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Long id) {

        Student student = studentService.getStudentById(id);

        return ResponseEntity.ok(student);
    }

    // Update Student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        Student updatedStudent =
                studentService.updateStudent(id, student);

        return ResponseEntity.ok(updatedStudent);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok("Student deleted successfully");
    }
}