<template>
    <nav class="new-sidebar">
      <div v-for="(item, index) in items" :key="index" class="card"> <!-- <div v-for="(item, index) in items" :key="index" class="card">: This sets up a loop using v-for to iterate over each item in the items array. For each item, it creates a <div> element with the class "card". The :key attribute is used to provide a unique identifier for each rendered item. -->
        <!-- v-for="(item, index) in items" is looping over each item in the items array and rendering the content inside the loop for each item -->
        <!-- IMPORTANT: Yes, that's correct! The v-for directive is creating a <div> element for each item in the items array. For every iteration of the loop, a new <div> element with the class "card" is generated in the DOM structure. Each of these <div> elements represents a single item in the array, allowing you to dynamically render content for each item. This is a common pattern in Vue.js for rendering lists of items based on data from an array or iterable.-->
          <div v-if="item.hexacolor" :style="{ backgroundColor: item.hexacolor, width: '100%', height: '100px' }"></div>
          <img class="img-css" v-if="item.imagepath" :src="item.imagepath" />
          <p class="text-start fs-14px fw-bold pt-3">{{ item.title }}</p>
          <p class="text-start fs-14px">{{ item.amount }}</p>
          <p class="text-start fs-12px pt-3">{{ item.paragraph }}</p>
        
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { CAR_VARIANTS } from '~/constants/general';
  
  const props = defineProps({
    option: {
      type: String,
      required: true
    }
  });
  
  const items = ref([]); // Initializes a reactive reference to an empty array that will be populated and tracked by Vue, allowing dynamic updates in the template
  
  // Function to load data based on the selected option
  const loadData = (option) => {
    switch(option) {
      case CAR_VARIANTS.TRIM:
        items.value = [
          { title: '2016 i8 Automatic', amount: '$22,480.00 MSRP 19', paragraph: 'Petrol100 kW 136 hp Benifit in kind 19% 54.3-58.9 mpg CO2 emission 112.0 -122.0 g/km' },
          { title: '2016 7series', amount: '$22,480.00 MSRP 19', paragraph: 'Petrol100 kW 136 hp Benifit in kind 19% 54.3-58.9 mpg CO2 emission 112.0 -122.0 g/km' },
          { title: '2016 i8 Automatic', amount: '$22,480.00 MSRP 19', paragraph: 'Petrol100 kW 136 hp Benifit in kind 19% 54.3-58.9 mpg CO2 emission 112.0 -122.0 g/km' },
          { title: '2016 7series', amount: '$22,480.00 MSRP 19', paragraph: 'Petrol100 kW 136 hp Benifit in kind 19% 54.3-58.9 mpg CO2 emission 112.0 -122.0 g/km' },
        ];
        break;
      case CAR_VARIANTS.PACKAGES:
        items.value = [
          { imagepath: 'https://ascentoncloud.com/selfpos/images/package1.jpg', title: 'Media Package Professional', amount: '$900.00' },
          { imagepath: 'https://ascentoncloud.com/selfpos/images/package2.jpg', title: 'Interior Comfort Package', amount: '$550.00' },
          { imagepath: 'https://ascentoncloud.com/selfpos/images/package3.jpg', title: 'Driver Comfort Package', amount: '$550.00', paragraph: 'Severntronic Steering Crusie control with break park distance control (PDC), rearS0507' }
        ];
        break;
      case CAR_VARIANTS.COLOR:
        items.value = [
          { hexacolor: '#333', title: 'Stealth', amount: '$ 550.00' },
          { hexacolor: '#ccc', title: 'Stealth', amount: '$ 550.00' },
        ];
        break;
      case CAR_VARIANTS.WHEELS:
        items.value = [
          { imagepath: 'https://ascentoncloud.com/selfpos/images/wheel2.jpg', title: '16 "Star-spoke style 654 light alloy wheels', amount: '$ 550.00' },
          { imagepath: 'https://ascentoncloud.com/selfpos/images/wheel1.jpg', title: '16 "Star-spoke style 654 light alloy wheels', amount: '$ 550.00' },
        ];
        break;
      case CAR_VARIANTS.INTERIOR:
        items.value = [
          { hexacolor: '#333', title: 'Fineline Stream Wood Interior trim with Oxside Silver finish', amount: '$ 550.00' },
          { hexacolor: '#ccc', title: 'Aluminium interior trim with Black high-gloss finish', amount: '$ 550.00' },
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
    width: 70%;
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

  .fs-12px
  {
    font-size: 12px;
  }

  .fs-14px
  {
    font-size: 14px;
  }

  .img-css
  {
    width: 100%;
    height: auto;
  }
  </style>
  