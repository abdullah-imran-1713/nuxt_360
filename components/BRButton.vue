

<template>
    <button class="transparent-button">Apply Changes</button>
</template>

<style  scoped>
.transparent-button {
  position: absolute;
  bottom: 20px; /* Adjust this value to set the distance from the bottom */
  right: 20px; /* Adjust this value to set the distance from the right */
  background-color: rgba(255, 255, 255, 0.1); /* Adjust transparency here */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000; /* Ensure button stays on top */
}
</style>