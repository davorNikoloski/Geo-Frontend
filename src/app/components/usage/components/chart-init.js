document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('usageChart')?.getContext('2d');
  if (!ctx) return;

  const usageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Requests',
          data: [],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(16, 185, 129)',
          pointBorderColor: 'rgb(15, 118, 110)',
          pointHoverBackgroundColor: 'rgb(5, 150, 105)',
          pointHoverBorderColor: 'rgb(255, 255, 255)',
        },
        {
          label: 'Avg Response Time (ms)',
          data: [],
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: 'rgb(79, 70, 229)',
          pointHoverBackgroundColor: 'rgb(67, 56, 202)',
          pointHoverBorderColor: 'rgb(255, 255, 255)',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgb(203, 213, 225)' } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgb(203, 213, 225)' } }
      },
      plugins: {
        legend: { labels: { color: 'rgb(203, 213, 225)' } },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: 'rgb(255, 255, 255)',
          bodyColor: 'rgb(203, 213, 225)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1
        }
      }
    }
  });

  window.usageChart = usageChart;
});