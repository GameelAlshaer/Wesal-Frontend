<template >
  <div >
    <b-navbar toggleable="lg" type="dark"  class="p-3 pe-5 d-flex justify-content-between poistion-unset ">
      <b-navbar-brand href="#"><img src="@/assets/logo.png" alt="logo" width="85"></b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav style="color: #bb9276">

        <b-nav-item href="../Login" class="bg-white rounded-2 mx-3 btn-hover" >تسجيل الدخول</b-nav-item>
        <b-nav-item href="../Register" class="bg-white rounded-2 mx-3 btn-hover">إنشاء حساب</b-nav-item>
      </b-navbar-nav>

    </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar1'
}
</script>
<style>
.bgN{
  background-color: rgba(25, 135, 84,0.5);


}
.navbar-dark .navbar-nav .nav-link{
  
   color:#bb9276!important;
    font-weight: bold  ;
 }
 .navbar-collapse{
  flex-grow: 0 !important; 
 }
 .btn-hover{
  transition: 0.3s;}
  
.btn-hover:hover {
  background-color: rgb(255, 221, 199) !important;
  color: white !important;
  border-radius: 5px;
}

</style>