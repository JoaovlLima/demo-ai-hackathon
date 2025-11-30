from flask import Flask, render_template, jsonify
from ai_engine import EcoHullAI
import pandas as pd
import random

app = Flask(__name__)
ai = EcoHullAI()

CURRENT_MODE = 'normal'
CURRENT_SHIP_INDEX = 0 

# --- CARREGAMENTO DO CSV (Mantenha igual ao anterior) ---
def load_ships():
    try:
        df = pd.read_csv('Dados navios Hackathon.xlsx - Dados navios.csv') # SEU ARQUIVO AQUI
        ships = []
        for _, row in df.iterrows():
            ships.append({
                "nome": row['Nome do navio'],
                "classe": row['Classe'],
                "tipo": row['Tipo'],
                "porte": row['Porte Bruto']
            })
        return ships
    except:
        return [{"nome": "RAFAEL SANTOS", "classe": "Suezmax", "tipo": "Petroleiro"}]

FLEET_DATA = load_ships()

@app.route('/')
def home():
    return render_template('index.html', ships=FLEET_DATA)

@app.route('/api/status')
def get_status():
    # 1. Pega dados
    sensor_data = ai.get_sensor_data(mode=CURRENT_MODE)
    
    # 2. Analisa e GERA O GRÁFICO
    result = ai.analyze_and_plot(sensor_data)
    
    current_ship = FLEET_DATA[CURRENT_SHIP_INDEX]
    
    # Cálculo financeiro
    fuel_waste = 0.0
    if result['status'] == 'dirty':
        fuel_waste = random.uniform(2000, 3500)
    
    response = {
        "timestamp": "Ao Vivo",
        "ship_data": current_ship,
        "ai_analysis": result, # Aqui vem a imagem do gráfico
        "economics": {
            "fuel_loss_money": round(fuel_waste, 2),
            "efficiency": 98 if result['status'] == 'clean' else random.randint(80, 90)
        }
    }
    return jsonify(response)

# ... (Mantenha as rotas set_mode e change_ship iguais ao anterior) ...
@app.route('/api/set_mode/<mode>')
def set_mode(mode):
    global CURRENT_MODE
    if mode in ['normal', 'critical']:
        CURRENT_MODE = mode
        return jsonify({"success": True})
    return jsonify({"success": False})

@app.route('/api/change_ship/<int:index>')
def change_ship(index):
    global CURRENT_SHIP_INDEX
    if 0 <= index < len(FLEET_DATA):
        CURRENT_SHIP_INDEX = index
        return jsonify({"success": True})
    return jsonify({"success": False})

if __name__ == '__main__':
    app.run(debug=True)