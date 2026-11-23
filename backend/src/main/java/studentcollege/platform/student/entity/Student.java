package studentcollege.platform.student.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String email;

    private Double tenthMarks;

    private Double twelfthMarks;

    private Double cutoff;

    private String courseInterested;

    public Student() {
    }

    public Student(
            String name,
            String phone,
            String email,
            Double tenthMarks,
            Double twelfthMarks,
            Double cutoff,
            String courseInterested
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.tenthMarks = tenthMarks;
        this.twelfthMarks = twelfthMarks;
        this.cutoff = cutoff;
        this.courseInterested = courseInterested;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getTenthMarks() {
        return tenthMarks;
    }

    public void setTenthMarks(Double tenthMarks) {
        this.tenthMarks = tenthMarks;
    }

    public Double getTwelfthMarks() {
        return twelfthMarks;
    }

    public void setTwelfthMarks(Double twelfthMarks) {
        this.twelfthMarks = twelfthMarks;
    }

    public Double getCutoff() {
        return cutoff;
    }

    public void setCutoff(Double cutoff) {
        this.cutoff = cutoff;
    }

    public String getCourseInterested() {
        return courseInterested;
    }

    public void setCourseInterested(String courseInterested) {
        this.courseInterested = courseInterested;
    }
}