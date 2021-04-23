<template>

   <div v-if="student.name">
            <div class="alert alert-info" v-if="student.present">
                Welcome, {{ student.name }}
            </div>
            <div class="alert alert-success" v-else>
                Gooddbye, {{ student.name }}. See you later!

            </div>

        </div>




</template>


<script>
export default {
  name: 'StudentMessage',
  props:{
    student: Object
  }
}



</script>


<!-- scoped means styles will only apply to this component-->
<style scoped>

</style>