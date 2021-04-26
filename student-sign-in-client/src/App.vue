<template>
 <div id="app">
   <!-- the new-student-form is a conversion of NewStudentForm-->
   <!-- student-added from NewStudentForm-->
   <!-- when new-student occurs newStudent is called-->
   <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
   <!-- binds with students from StudentTable-->
   <student-table v-bind:students="students" v-on:student-arrived-or-left="studentArrivedOrLeft" 
   v-on:delete-student="studentDeleted" >
   </student-table>
  <!-- student is prop in student message-->
   <student-message v-bind:student="mostRecentStudent"></student-message> 

 </div> 
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  emits:['student-added'],

  data(){
    return{
      students: [],
      mostRecentStudent: {}
    
    }
  },
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  mounted() {
    //load all students, make a request of the api
    //runs at start
    this.updateStudents()
  },
  methods: {
    updateStudents(){
        this.$student_api.getAllStudents().then(students => {
          //this.students is empty list here, students is from api
          this.students = students
        }).catch( () => alert('Unable to fetch student list'))
    },
    // student is data from NewStudentForm
      newStudentAdded(student){
     this.$student_api.addStudent(student).then( () => {
       this.updateStudents()
     }).catch(err => {
       // an axios response, joining error messages
       let msg = err.response.data.join(',')
       alert('Error adding student\n' + msg)
     })
    },
    // student and present are from student table
    studentArrivedOrLeft(student, present){
      //update present with present it's sent
      student.present = present
      this.$student_api.updateStudent(student).then( () => {
        // updates mostRecentStudent on top of this page
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () => alert('Unable to update student'))
    },
    studentDeleted(student){
     this.$student_api.deleteStudent(student.id).then( () => {
       this.updateStudents()
       this.mostRecentStudent = {}
     }).catch( () => alert('Unable to delete student'))
}
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>