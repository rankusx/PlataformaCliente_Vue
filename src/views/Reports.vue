<template>
  <div class="reports">
    <h2>Informes disponibles</h2>
    <ul>
      <li v-for="report in reports" :key="report.id">
        {{ report.name }}
        <button @click="downloadReport(report.id)">Descargar Excel</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

interface Report {
  id: number
  name: string
}

const reports = ref<Report[]>([
  { id: 1, name: 'Informe de Ventas' },
  { id: 2, name: 'Informe de Gastos' },
  { id: 3, name: 'Informe de Clientes' },
])

onMounted(() => {
  // Aquí normalmente cargaríamos los informes del backend
  console.log('Token de autenticación:', authStore.token)
})

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
.reports {
  max-width: 600px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>