```mermaid
graph TD
    %% --- DEFINIÇÃO DE ESTILOS ---
    classDef soft fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1,rx:5,ry:5;
    classDef hard fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100,rx:5,ry:5;
    classDef ai fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#4a148c,rx:10,ry:10;
    classDef final fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,stroke-dasharray: 5 5,color:#1b5e20,rx:5,ry:5;
    classDef database fill:#eceff1,stroke:#455a64,stroke-width:2px,color:#37474f;

    %% --- COLUNA 1: SOFT SENSOR (Mundo Digital) ---
    subgraph Lado_Software ["🟦 SOFT SENSOR (Histórico & Física)"]
        direction TB
        BD[("🗄️ Base de Dados<br/>(Telemetria & Eventos)")]:::database
        ALG("⚙️ Algoritmo Python<br/>(Lei do Almirantado)"):::soft
        GABARITO{{"💎 DATASET DE TREINO<br/>(Ground Truth)"}}:::soft
        
        BD -->|Extração ETL| ALG
        ALG -->|Cálculo Físico| GABARITO
    end

    %% --- COLUNA 2: FUSÃO DE DADOS (Inteligência) ---
    subgraph Centro_Inteligencia ["🧠 HULLSENSE AI (Motor de Fusão)"]
        direction TB
        TREINO("🔄 Treinamento Supervisionado<br/>(Isolation Forest)"):::ai
        MODELO("✅ Modelo Calibrado<br/>(Assinatura Digital)"):::ai
        
        GABARITO -.->|Ensina o Padrão| TREINO
    end

    %% --- COLUNA 3: HARD SENSOR (Mundo Físico) ---
    subgraph Lado_Hardware ["🟧 HARD SENSOR (IoT)"]
        direction TB
        SENSOR["📡 Nó Sensor<br/>(Piezoelétrico)"]:::hard
        PROCESS("🎛️ Pré-Processamento<br/>(FFT & Filtragem)"):::hard
        
        SENSOR -->|Sinal Bruto| PROCESS
        PROCESS -->|Features de Vibração| TREINO
    end

    %% --- SAÍDA ---
    TREINO --> MODELO
    MODELO --> DECISAO["📱 DASHBOARD & ALERTAS<br/>(Tomada de Decisão)"]:::final

    %% Conexões Estruturais
    linkStyle default stroke:#333,stroke-width:2px;
