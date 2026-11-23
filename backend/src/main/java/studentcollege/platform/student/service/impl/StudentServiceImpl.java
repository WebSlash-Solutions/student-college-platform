package studentcollege.platform.student.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import studentcollege.platform.student.entity.Student;
import studentcollege.platform.student.repository.StudentRepository;
import studentcollege.platform.student.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = getStudentById(id);

        existingStudent.setName(student.getName());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setTenthMarks(student.getTenthMarks());
        existingStudent.setTwelfthMarks(student.getTwelfthMarks());
        existingStudent.setCutoff(student.getCutoff());
        existingStudent.setCourseInterested(student.getCourseInterested());

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}