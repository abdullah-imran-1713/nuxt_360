<!-- <script setup lang="ts">
import TheExperience from '~/component/TheExperience.vue';
</script>

<template>
    <div>
        <ClientOnly>
            <TheExperience />
        </ClientOnly>

        <h1>This is home page</h1>
        <div>
    <img src="https://www.mad4wheels.com/img/free-car-images/mobile/19684/bmw-m3-g81-touring-2023-679235.jpg" alt="Image description">
  </div>
        
    </div>
</template>
 -->

 <script setup lang="ts">
 
 </script>
 
 <template>
    <ClientOnly>
        <TheExperience />
        <Sidebar />
        <BRButton />
    </ClientOnly>
</template>
 
 <style lang="scss" scoped>
 
 </style>