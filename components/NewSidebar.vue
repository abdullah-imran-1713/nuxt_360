<template>
    <nav class="new-sidebar">
      <div v-for="(item, index) in items" :key="index" class="card"> <!-- <div v-for="(item, index) in items" :key="index" class="card">: This sets up a loop using v-for to iterate over each item in the items array. For each item, it creates a <div> element with the class "card". The :key attribute is used to provide a unique identifier for each rendered item. -->
        <!-- v-for="(item, index) in items" is looping over each item in the items array and rendering the content inside the loop for each item -->
        <!-- IMPORTANT: Yes, that's correct! The v-for directive is creating a <div> element for each item in the items array. For every iteration of the loop, a new <div> element with the class "card" is generated in the DOM structure. Each of these <div> elements represents a single item in the array, allowing you to dynamically render content for each item. This is a common pattern in Vue.js for rendering lists of items based on data from an array or iterable.-->
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
import { CAR_VARIANTS } from '~/constants/general';
  
  const props = defineProps({
    option: String
  });
  
  const items = ref([]); // const items = ref([]); initializes a reactive reference to an empty array that will be populated and tracked by Vue, allowing dynamic updates in the template
  
  // Function to load data based on the selected option
  const loadData = (option) => {
    switch(option) {
      case CAR_VARIANTS.TRIM:
        items.value = [
          { title: 'Trim Option 1', content: 'Content for Trim Option 1' },
          { title: 'Trim Option 2', content: 'Content for Trim Option 2' },
        ];
        break;
      case CAR_VARIANTS.COLOR:
        items.value = [
          { title: 'Red', content: 'Content for Red Color' },
          { title: 'Blue', content: 'Content for Blue Color' },
        ];
        break;
      default:
        items.value = [];
    }
  }
  
  // Watch for changes in the prop
  watch(() => props.option, (newValue) => {
    loadData(newValue);
  });
  
  // Load initial data if option is already set
  if (props.option) {
    loadData(props.option);
  }
  </script>
  
  <style scoped>
  .new-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow-y: auto;
    transition: transform 0.3s ease;
    transform: translateX(0);
  }
  
  .card {
    background-color: white;
    color: black;
    padding: 15px;
    margin: 10px 0;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .card h3 {
    margin: 0 0 10px 0;
  }
  
  .card p {
    margin: 0;
  }
  </style>
  