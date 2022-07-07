import { defineComponent, h, PropType } from 'vue'
import graphData from '@/helpers/graphData'

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({})
    },
    topic: {
      type: String as PropType<'age' | 'gender'>,
      default: 'age',
      required: true
    },
    type: {
      type: String as PropType<'case' | 'death'>,
      default: 'case',
      required: true
    },
  },
  setup(props, { emit }) {
    type Key = keyof typeof graphData
    const field: Key = `${props.type}_by_${props.topic}`
    const data = graphData[field].map(x => x.value)
    const labels = graphData[field].map(x => x.label)
    
    const chartData = {
      labels,
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          borderColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data,
          cutout: '80%',
          borderRadius: 0
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }

    const plugins: Plugin[] = [{
      id: 'doughnutLabelsLine',
      afterDraw(chart, args, options){
        const { ctx, chartArea: { top, left, width, height } } = chart
        
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y } = datapoint.tooltipPosition()

            const halfWidth = width / 2 + left
            const halfHeight = height / 2 + top
            
            const xLine = x >= halfWidth ? x + 15 : x - 15
            const yLine = y >= halfHeight ? y + 15 : y - 15
            const extraLine = x >= halfWidth ? 15 : -15

            // line
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(xLine, yLine)
            ctx.lineTo(xLine + extraLine, yLine)
            ctx.strokeStyle = '#FFF'
            ctx.stroke()

            // text
            const textWidth = ctx.measureText(chart.data.labels?.[index] as string).width + 5
            ctx.font = '12px Arial'

            // control the position
            const textXPosition = x >= halfWidth ? 'left' : 'right'
            const plusFivePx = x >= halfWidth ? 5 : -5
            ctx.textAlign = textXPosition
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#FFF'
            ctx.fillText(chart.data.labels?.[index] as string, xLine + extraLine + plusFivePx, yLine)
          })
        })
      }
    }]

    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins,
        "onChart:rendered": () => emit('graph-ready')
      })
  }
})
