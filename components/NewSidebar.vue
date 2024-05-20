<template>
    <nav class="new-sidebar">
      <div v-for="(item, index) in items" :key="index" class="card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    option: String
  });
  
  const items = ref([]);
  
  // Function to load data based on the selected option
  const loadData = (option) => {
    switch(option) {
      case 'Trim':
        items.value = [
          { title: 'Trim Option 1', content: 'Content for Trim Option 1' },
          { title: 'Trim Option 2', content: 'Content for Trim Option 2' },
        ];
        break;
      case 'Color':
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
  