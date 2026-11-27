package studentcollege.platform.application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student Basic Details
    private String name;
    private String phone;
    private String email;

    // Personal Details
    private String dob;
    private String gender;

    // Academic Details
    private Double tenthMarks;
    private Double twelfthMarks;

    private String stream;

    private Double maths;
    private Double physics;
    private Double chemistry;
    private Double biology;
    private Double bioMaths;

    private Double cutoff;

    // College / Course Details
    private String collegeName;
    private String city;
    private String courseName;

    // Application Status
    private String status;

    // Default Constructor
    public Application() {
    }

    // Constructor
    public Application(
            String name,
            String phone,
            String email,
            String dob,
            String gender,
            Double tenthMarks,
            Double twelfthMarks,
            String stream,
            Double maths,
            Double physics,
            Double chemistry,
            Double biology,
            Double bioMaths,
            Double cutoff,
            String collegeName,
            String city,
            String courseName,
            String status
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.tenthMarks = tenthMarks;
        this.twelfthMarks = twelfthMarks;
        this.stream = stream;
        this.maths = maths;
        this.physics = physics;
        this.chemistry = chemistry;
        this.biology = biology;
        this.bioMaths = bioMaths;
        this.cutoff = cutoff;
        this.collegeName = collegeName;
        this.city = city;
        this.courseName = courseName;
        this.status = status;
    }

    // ID
    public Long getId() {
        return id;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Date of Birth
    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    // Gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // 10th Marks
    public Double getTenthMarks() {
        return tenthMarks;
    }

    public void setTenthMarks(Double tenthMarks) {
        this.tenthMarks = tenthMarks;
    }

    // 12th Marks
    public Double getTwelfthMarks() {
        return twelfthMarks;
    }

    public void setTwelfthMarks(Double twelfthMarks) {
        this.twelfthMarks = twelfthMarks;
    }

    // Stream
    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    // Maths
    public Double getMaths() {
        return maths;
    }

    public void setMaths(Double maths) {
        this.maths = maths;
    }

    // Physics
    public Double getPhysics() {
        return physics;
    }

    public void setPhysics(Double physics) {
        this.physics = physics;
    }

    // Chemistry
    public Double getChemistry() {
        return chemistry;
    }

    public void setChemistry(Double chemistry) {
        this.chemistry = chemistry;
    }

    // Biology
    public Double getBiology() {
        return biology;
    }

    public void setBiology(Double biology) {
        this.biology = biology;
    }

    // Bio Maths
    public Double getBioMaths() {
        return bioMaths;
    }

    public void setBioMaths(Double bioMaths) {
        this.bioMaths = bioMaths;
    }

    // Cutoff
    public Double getCutoff() {
        return cutoff;
    }

    public void setCutoff(Double cutoff) {
        this.cutoff = cutoff;
    }

    // College Name
    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    // City
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Course Name
    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}