<template>
  <div>
    <!-- Using a <nav> element for a sidebar is a common practice because it signifies that the content within it is navigation-related. -->
      <nav
      id="sidebarMenu" 
      :class="['sidebar', { 'swipe-right': showNewSidebar }]"
    > <!-- (:class) is called class directive and Using the :class Directive: This approach allows you to dynamically bind classes to an element based on data or expressions. It provides more flexibility for conditionally applying classes.-->
      <!--  The :class binding is a Vue.js feature that dynamically binds classes to an element based on certain conditions.  -->
      <!--  In this case, the sidebar has a base class of 'sidebar', which is always applied. Additionally, the class 'swipe-right' is conditionally applied based on the value of the showNewSidebar variable. When showNewSidebar is true, the 'swipe-right' class is applied  -->
      
    
    <div class="sidebar-buttons">
        <button class="sidebar-button" @click="showNewSidebar = false">Order Test Drive</button> <!-- When the button is clicked, the expression showNewSidebar = false is executed -->
        <NuxtLink to="/" class="d-flex justify-content-center text-decoration-none"><button class="sidebar-button" @click="showNewSidebar = false">Change Vehicle</button></NuxtLink>
        <button class="sidebar-button" @click="showNewSidebar = false, handleStartOverClick()">Start Over</button>
        <button class="sidebar-button" @click="showNewSidebar = false, handleSaveClick()">Save</button>
        <button class="sidebar-button text-start" @click="handleClick(CAR_VARIANTS.TRIM), handleCamera()">Trim</button> <!-- When the button is clicked, the handleClick method is called with the argument 'Trim' -->
        <button class="sidebar-button text-start" @click="handleClick(CAR_VARIANTS.PACKAGES), handleCamera()">Packages</button>
        <button class="sidebar-button text-start" @click="handleClick(CAR_VARIANTS.COLOR), handleCamera()">Color</button>
        <button class="sidebar-button text-start" @click="handleClick(CAR_VARIANTS.WHEELS), handleCamera()">Wheels</button>
        <button class="sidebar-button text-start" @click="handleClick(CAR_VARIANTS.INTERIOR), handleInteriorClick()">Interior</button>
      </div>
    </nav>

<!-- component invocation that conditionally renders the NewSidebar component based on the value of the showNewSidebar variable. -->
    <NewSidebar v-if="showNewSidebar" :option="selectedOption" />
    <!-- v-if="showNewSidebar": This is a Vue.js directive (v-if) that conditionally renders the NewSidebar component based on the truthiness of the showNewSidebar variable. If showNewSidebar is true, the NewSidebar component will be rendered; otherwise, it will not be rendered. -->
    <!-- When you use the :option binding in Vue.js, you are passing data from the parent component to the child component through a prop named option-->
  
    <!--EXPLAINATION: 
    Parent Component (SidebarMenu): The parent component (in this case, SidebarMenu) has access to a piece of data named selectedOption. This data likely represents the currently selected option in the sidebar menu.
    Child Component (NewSidebar): The child component (NewSidebar) expects to receive data through a prop named option. This prop is used by the child component to customize its behavior or content based on the data passed from the parent.
    Binding (:option="selectedOption"): In the parent component's template, you use the :option binding to bind the selectedOption data from the parent component to the option prop of the child component. This means that the value of selectedOption in the parent component will be passed to the option prop of the NewSidebar component
    Child Component Usage: Inside the NewSidebar component, you can access the passed option data through the props object. You can then use this data to customize the behavior or content of the NewSidebar component based on the value of option-->
  
  
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CAR_VARIANTS } from '~/constants/general';

const showNewSidebar = ref(false); // This line initializes a reactive reference named showNewSidebar with an initial value of false. This variable likely controls the visibility of the sidebar.
const selectedOption = ref(''); //  This line initializes another reactive reference named selectedOption with an initial value of an empty string. This variable likely holds the currently selected option in the sidebar.

const handleClick = (optonclick) => { // This defines a function named handleClick that takes an option parameter. When called, this function updates the values of selectedOption and showNewSidebar. It sets selectedOption to the passed option value and sets showNewSidebar to true, likely indicating that the sidebar should be shown
  selectedOption.value = optonclick;
  showNewSidebar.value = true;
};

const emit = defineEmits(['switch-to-interior']);

const handleInteriorClick = () => {
  
  emit('switch-to-interior');
};

const handleStartOverClick = () => {
  emit('switch-to-basic');
};
const handleSaveClick = () => {
  emit('switch-to-basic');
  alert('saved!')
};
const handleCamera = () => {
  emit('switch-to-basic');
};

</script>

<style scoped>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar-button {
  background: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px 0;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  width: 80%;
  align-self: center;
}

.sidebar-button:hover {
  background: white;
  color: black;
}
/* the nth-child pseudo-class is used to target specific instances of the .sidebar-button class within the sidebar component.  */
.sidebar-button:nth-child(-n+4) {  /*  This rule targets the first four */
  border: 1px solid white;
}

.sidebar-button:nth-child(n+5) { /*  This rule target all starting from 5th and onwards */
  border: none;
  box-shadow: none;
}

.swipe-right {
  transform: translateX(300px);
}
</style>
