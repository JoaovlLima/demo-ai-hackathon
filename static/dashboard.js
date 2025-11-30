// Configuração do Gráfico (Chart.js)
const ctx = document.getElementById('sensorChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nível de Vibração (Piezo)',
            data: [],
            borderColor: '#008542',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(0, 133, 66, 0.1)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true, max: 10 }
        },
        animation: false
    }
});

// Função para atualizar a tela
async function fetchData() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // 1. Atualizar KPI Cards
        document.getElementById('vibration-val').innerText = data.ai_analysis.raw_vibration;
        document.getElementById('money-val').innerText = `$${data.economics.fuel_loss_money}`;
        document.getElementById('efficiency-val').innerText = `${data.economics.efficiency}%`;

        // 2. ATUALIZAR O GRÁFICO DO PYTHON (A Imagem)
        const plotImage = document.getElementById('python-plot');
        plotImage.src = data.ai_analysis.plot_image; // Magia aqui!

        // 3. Atualizar Status (Texto e Cor)
        const statusDiv = document.getElementById('status-indicator');
        if (data.ai_analysis.status === 'dirty') {
            statusDiv.innerText = "CRÍTICO - ANOMALIA DETECTADA";
            statusDiv.className = "status-badge red";
            // Muda cor do gráfico de linha
            chart.data.datasets[0].borderColor = '#DC2626';
            chart.data.datasets[0].backgroundColor = 'rgba(220, 38, 38, 0.2)';
        } else {
            statusDiv.innerText = "NORMAL - PADRÃO APRENDIDO";
            statusDiv.className = "status-badge green";
            // Muda cor do gráfico de linha
            chart.data.datasets[0].borderColor = '#008542';
            chart.data.datasets[0].backgroundColor = 'rgba(0, 133, 66, 0.1)';
        }

        // 3. Atualizar Gráfico (Efeito Tempo Real)
        const now = new Date().toLocaleTimeString();
        if (chart.data.labels.length > 20) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(data.ai_analysis.raw_vibration);
        chart.update();

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Botões de Demo (Chamam a API para mudar o modo)
async function setMode(mode) {
    await fetch(`/api/set_mode/${mode}`);
}

// Loop de Atualização (A cada 1 segundo)
setInterval(fetchData, 1000);