```graph TD
    %% --- ESTILOS VISUAIS ---
    classDef soft fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1,rx:5,ry:5;
    classDef hard fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100,rx:5,ry:5;
    classDef ai fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#4a148c,rx:10,ry:10;
    classDef final fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,stroke-dasharray: 5 5,color:#1b5e20,rx:5,ry:5;

    %% --- COLUNA 1: O MUNDO DIGITAL (Soft Sensor) ---
    subgraph Lado_Software ["🟦 SOFT SENSOR (Dados Históricos)"]
        direction TB
        BD[("🗄️ Base de Dados<br/>(Telemetria & Eventos)")]:::soft
        ALG("⚙️ Algoritmo Python<br/>(Seu Código)"):::soft
        GABARITO{{"💎 DATASET DE TREINO<br/>(Ground Truth)"}}:::soft
        
        BD -->|Extrai| ALG
        ALG -->|Gera| GABARITO
    end

    %% --- COLUNA 2: O CÉREBRO (Fusão) ---
    subgraph Centro_Inteligencia ["🧠 MOTOR DE FUSÃO (Machine Learning)"]
        direction TB
        TREINO("🔄 Treinamento & Validação<br/>(Isolation Forest)"):::ai
        MODELO("✅ Modelo Calibrado<br/>(Assinatura Digital)"):::ai
        
        GABARITO -.->|Ensina o Padrão| TREINO
    end

    %% --- COLUNA 3: O MUNDO FÍSICO (Hard Sensor) ---
    subgraph Lado_Hardware ["🟧 HARD SENSOR (Hardware IoT)"]
        direction TB
        SENSOR["📡 Nó Sensor<br/>(Piezoelétrico)"]:::hard
        PROCESS("🎛️ Pré-Processamento<br/>(FFT & Filtragem)"):::hard
        
        SENSOR -->|Sinal Bruto| PROCESS
        PROCESS -->|Features de Vibração| TREINO
    end

    %% --- SAÍDA ---
    TREINO --> MODELO
    MODELO --> DECISAO["📱 DASHBOARD & ALERTAS<br/>(Decisão Operacional)"]:::final

    %% Conexões para layout
    linkStyle default stroke:#333,stroke-width:2px;
```
