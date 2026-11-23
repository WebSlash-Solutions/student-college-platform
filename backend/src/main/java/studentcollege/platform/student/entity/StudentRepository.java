package studentcollege.platform.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studentcollege.platform.student.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}