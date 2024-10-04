<template>
  <div class="home">
    <h1>Bienvenido a la Plataforma de Cliente</h1>
    <p>Selecciona un informe para descargar o ver:</p>
    <div class="reports-grid">
      <div v-for="report in reports" :key="report.id" class="report-card">
        <h3>{{ report.name }}</h3>
        <button v-if="report.type === 'excel'" @click="downloadReport(report.id)">Descargar Excel</button>
        <router-link v-else-if="report.type === 'powerbi'" :to="{ name: 'PowerBIReport' }" class="powerbi-link">Ver informe Power BI</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'

interface Report {
  id: number
  name: string
  type: 'excel' | 'powerbi'
}

const reports = ref<Report[]>([
  { id: 1, name: 'Informe de Ventas', type: 'excel' },
  { id: 2, name: 'Informe de Gastos', type: 'excel' },
  { id: 3, name: 'Informe de Clientes', type: 'excel' },
  { id: 4, name: 'Dashboard General', type: 'powerbi' },
])

const downloadReport = async (reportId: number) => {
  try {
    // Simulamos datos del informe
    const reportData = [
      { Fecha: '2023-01-01', Concepto: 'Venta 1', Monto: 1000 },
      { Fecha: '2023-01-02', Concepto: 'Venta 2', Monto: 1500 },
      { Fecha: '2023-01-03', Concepto: 'Venta 3', Monto: 2000 },
    ]
    
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Informe')
    
    const headers = Object.keys(reportData[0])
    worksheet.addRow(headers)
    
    reportData.forEach((row: any) => {
      worksheet.addRow(Object.values(row))
    })
    
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `informe_${reportId}.xlsx`)
  } catch (error) {
    console.error('Error al descargar el informe:', error)
    alert('Error al descargar el informe')
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.report-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.report-card:hover {
  transform: translateY(-5px);
}

h3 {
  margin-top: 0;
  color: #2c3e50;
}

button, .powerbi-link {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

button:hover, .powerbi-link:hover {
  background-color: #2980b9;
}
</style>