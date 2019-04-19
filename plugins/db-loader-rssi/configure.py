import pandas as pd

NAMES ={
'locations':["Coal Oil Point"],
'collector':["UAV: Matrice 100"],
'device':   ["RTL-SDR New"]
}

SOURCES = [
    {
        "name": "CHANNEL_SCAN-1",
        'label': "SB 1",
        'location': 0,
        'vehicle': 0,
        'device': 0,
        "altitude-adjust": -14.11,
    },
    {
        "name": "CHANNEL_SCAN-2",
        'label': "SB 1",
        'location': 0,
        'vehicle': 0,
        'device': 0,
        "altitude-adjust": -14.11,
    },
    {
        "name": "CHANNEL_SCAN-3",
        'label': "SB 1",
        'location': 0,
        'vehicle': 0,
        'device': 0,
        "altitude-adjust": -14.11,
    },

]


RESULTS = pd.DataFrame()
RTL_DATA = pd.DataFrame()
DRONE_LOGS = pd.DataFrame()




