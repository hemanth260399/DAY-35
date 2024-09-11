<h1>Day-35 task student and mentor creation</h1>
<ul>
  <li>In this task i have created api for student and mentor and some logic are used to assign a student to mentor and change the student to mentor and display student list and previous mentor</li>
  <Li>I have created the student in mongoose to give restrict the missing fileds by this user want to enter every field otherwise validation error will show fileds are (student_name,dob,student_email,student_number)</Li>
  <li>i have created the model for student the model is in DB files</li>
  <li>I have created another api for mentor using mongoose same as students to avoid empty field (mentor_name,mentor_email,mentor_number,language,courses)</li>
  <li>I have 2 get call for student and mentor and 2 post call for student and mentor</li>
  <li>I have created patch call for mulutple student assign and mentor change opertion</li>
  <li>I have created the get call to get all student list for particular mentor and another one is pervious mento for particular student </li>
  <Li>I used cloud mongodb for database and i have used express router for sepreate the student and mentor </Li>
  <li>
    1.https://day-35-3cd5.onrender.com/student-Get call for all student
    2.https://day-35-3cd5.onrender.com/student-Post call for student
    3.https://day-35-3cd5.onrender.com/mentor-Get call for all mentor
    4.https://day-35-3cd5.onrender.com/mentor-Post call for mentor
    5.https://day-35-3cd5.onrender.com/mentor/addstudent/<mentor-name>-Patch call to add a multiple student for mentor
    6.https://day-35-3cd5.onrender.com/student/changementor/<student-name>-Patch call to change or add the new mentor
    7.https://day-35-3cd5.onrender.com/mentor/getstudentlist/<mentor-name>-get call to get all student list for particuar mentor
    8.https://day-35-3cd5.onrender.com/student/studentprementor/<student-name>-get call to get previous mentor for paticularv student
  </li>
</ul>
