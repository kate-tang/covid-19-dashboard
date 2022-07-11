import { defineComponent, h, PropType } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale,
  ChartData, ChartOptions, Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default defineComponent({
  name: 'LineChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({})
    },
    plugins: {
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => []
    },
    type: {
      type: String as PropType<'new' | 'total'>,
      default: 'new',
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const chartData: ChartData<'line'> = {
      labels: props.data.label,
      datasets: [
        {
          label: '案例數',
          backgroundColor: '#FF6B6B',
          borderColor: '#FF6B6B',
          pointBackgroundColor: '#FF6B6B',
          pointBorderColor: '#FF6B6B',
          borderWidth: 1,
          data: props.data[props.type],
          pointRadius: 1,
          pointHoverRadius: 3,
        }
      ]
    }

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
    }

    const plugins: Plugin<'line'>[] = []

    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
