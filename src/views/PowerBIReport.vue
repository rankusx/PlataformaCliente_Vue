<template>
  <div class="powerbi-report">
    <div class="header">
      <button class="back-button" @click="goBack">Volver</button>
      <h2>Informe Power BI</h2>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else id="powerbi-embed" ref="reportContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { models, factories, service } from 'powerbi-client';

const router = useRouter();
const reportContainer = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);

const goBack = () => {
  router.push('/');
};

onMounted(() => {
  if (reportContainer.value) {
    try {
      const embedConfig = {
        type: 'report',
        id: '<your-report-id>',
        embedUrl: '<your-embed-url>',
        accessToken: '<your-access-token>',
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          background: models.BackgroundType.Transparent,
        }
      };

      const powerbi = new service.Service(
        factories.hpmFactory,
        factories.wpmpFactory,
        factories.routerFactory
      );

      powerbi.embed(reportContainer.value, embedConfig);
    } catch (e) {
      console.error('Error initializing Power BI report:', e);
      error.value = 'Error al cargar el informe de Power BI. Por favor, inténtelo de nuevo más tarde.';
    }
  }
});
</script>

<style scoped>
.powerbi-report {
  width: 100%;
  height: 600px;
  margin-top: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}

h2 {
  margin: 0;
}

#powerbi-embed {
  height: 100%;
  width: 100%;
}

.error-message {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  padding: 20px;
}
</style>