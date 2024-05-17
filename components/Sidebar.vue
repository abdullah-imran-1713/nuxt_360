<template>
    <div>
      <nav
        id="sidebarMenu"
        :class="['sidebar', { 'swipe-right': showNewSidebar }]"
      >
        <div class="sidebar-buttons">
          <button class="sidebar-button bordered" @click="showNewSidebar = false">Order Test Drive</button>
          <button class="sidebar-button bordered" @click="showNewSidebar = false">Change Vehicle</button>
          <button class="sidebar-button bordered" @click="showNewSidebar = false">Start Over</button>
          <button class="sidebar-button bordered" @click="showNewSidebar = false">Save</button>
          <button class="sidebar-button" @click="showNewSidebar = true">Option 5</button> <!-- New button -->
          <button class="sidebar-button" @click="showNewSidebar = true">Option 6</button> <!-- New button -->
          <button class="sidebar-button" @click="showNewSidebar = true">Option 7</button> <!-- New button -->
          <button class="sidebar-button" @click="showNewSidebar = true">Option 8</button> <!-- New button -->
          <button class="sidebar-button" @click="showNewSidebar = true">Option 9</button> <!-- New button -->
        </div>
      </nav>
  
      <!-- New Sidebar -->
      <nav id="newSidebar" v-if="showNewSidebar" class="new-sidebar">
        <!-- New Sidebar Content -->
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showNewSidebar = ref(false);
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
    background-color: rgba(255, 255, 255, 0.1); /* Adjust transparency here */
    transition: transform 0.3s ease;
  }
  
  .sidebar-buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .sidebar-button {
    background: none;
    border: 1px solid white;
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
  
  .swipe-right {
    transform: translateX(200px); /* Adjust sidebar width */
  }
  
  .new-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px; /* Adjust sidebar width */
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5); /* Example background color */
    transition: transform 0.3s ease;
    transform: translateX(-200px); /* Slide in from left */
  }
  </style>
  