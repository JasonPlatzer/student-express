<!-- this is a child of StudentTable-->
<!-- makes each row in student table a component-->
<template> 
 <tr   v-bind:class=" { present: student.present, absent: !student.present } "  >
                      <td> {{ student.name }} </td> 
                      <td> {{ student.starID}}  </td>
                      <td>                          <!--$event sends data if checked occurs $event.target is the component, the html that causes event, checked is true or false-->            
                          <input type="checkbox" v-bind:checked="student.present" v-on:change="arrivedOrLeft(student, $event.target.checked)">
                      </td> 
                      <td v-show="edit"><img v-on:click="deleteStudent" src="@/assets/delete.png"></td> 
                    </tr>



</template>

<script> 
export default {
name: 'StudentRow',
emits: ['student-arrived-or-left', 'delete-student'],
props: {
    student: Object,
    edit: Boolean
},
methods: {
    arrivedOrLeft(student, present){
        this.$emit('student-arrived-or-left', student, present)
    },
    deleteStudent(){
        if (confirm(`delete ${this.student.name}?`)){
        this.$emit('delete-student', this.student)
        }
    }
}
}


</script>

<style scoped>
.present{
color: grey;
font-weight: italic;
}
.absent{
  color: black;
  font-weight: bold;
}
img{
    height: 35px;
}

</style>