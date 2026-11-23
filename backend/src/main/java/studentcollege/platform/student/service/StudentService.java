package studentcollege.platform.student.service;

import java.util.List;

import studentcollege.platform.student.entity.Student;

public interface StudentService {

    Student createStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student student);

    void deleteStudent(Long id);
}