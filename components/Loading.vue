<!-- <template>
    <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>{{ progress }}% loaded</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define reactive variables
const loading = ref(true);
const progress = ref(0);

// Function to update progress
function updateProgress(event: ProgressEvent) {
    if (event.lengthComputable) {
        progress.value = Math.round((event.loaded / event.total) * 100);
    }
}
</script>

<style scoped>
/* Your component styles here */
</style> -->
