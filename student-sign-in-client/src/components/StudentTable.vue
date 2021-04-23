<template>
  <div>
     <div class="card student-list m-2 p-2">
            <h4 class="card-title">Student List</h4>
            <div class="edit-table-toggle form-check">
              <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
              <label for="edit-table" class="form-check-label">Edit Table?</label>
            </div>
            <div id="student-table">
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>StarID</th>
                        <th>Present?</th>
                        <!-- shows if editTable is true-->
                        <th v-show="editTable">Delete</th>
                    </tr>

                    <!-- student from props is bound to student in v-for--><!-- v-on sends event data to App.vue to update--> 
                     <student-row v-for='student in students' v-bind:student="student" 
                     v-bind:key="student.starID" 
                     v-on:student-arrived-or-left="arrivedOrLeft" 
                     v-on:delete-student="deleteStudent"
                     v-bind:edit="editTable">
                     </student-row>
                </table>
            </div>
        </div>

  </div>




</template>



<script>
// @ is short for src
import StudentRow from '@/components/StudentRow.vue'


export default {
  name: 'StudentTable', 
  // components lets StudentTable know it has a StudentRow as a component
  components: {
    StudentRow

  },
  // emits verifies it was sent to parent
  emits:['student-arrived-or-left'],
  props: {
    students: Array
    },
    data(){
      return{
        editTable: false
      }
      },
     methods: {  // present is from $event.target.present tells if student is present
      arrivedOrLeft(student, present){
        this.$emit('student-arrived-or-left', student, present)

      },
      deleteStudent(student){
        this.$emit('delete-student', student)

      }
    }
    

  }

</script>


<!-- scoped means styles will only apply to this component-->
<style scoped>


</style>