# Janus <h1>
  <img src="icons/janus_1.png" alt="Janus Logo" width="40" style="vertical-align: middle; margin-right: 10px;">
  Janus
</h1>


Semplice estensione Chrome per bloccare cookie wall, tracciamenti e contenuti invasivi su siti come Corriere.it, Repubblica.it e altri portali.

## Changelog - Versione 1.2

Data rilascio: [02 luglio 2025]

### Novità introdotte

- **Introdotta whitelist per domini noti**: in modalità "parziale", alcuni domini (YouTube, Google News, ecc.) sono ora esclusi dai blocchi più aggressivi per garantire la corretta fruizione dei contenuti.

- **Gestione più intelligente delle modalità**:
  - In modalità `partial`, gli script **non vengono bloccati**, mentre altre risorse (XHR, media, websocket…) sì.
  - In modalità `full`, viene attivato un blocco **completo**, inclusi gli script.

- **Aggiunta logica di esclusione (`excludedDomains`)** per personalizzare il comportamento a seconda dei siti.


---

### Considerazioni

Questa versione migliora l’equilibrio tra privacy e usabilità, evitando blocchi su siti affidabili e popolari durante la normale navigazione informativa.



## Funzionalità principali

- **Blocco cookie wall e tracciatori** su siti notoriamente invadenti
- **Tre modalità selezionabili**:
  - `Off`: disattivata
  - `Parziale`: blocca solo tracciamento e overlay, ma consente i cookie funzionali
  - `Totale`: blocco completo di tracking, cookie wall e richieste di consenso
- **Popup interattivo** per cambiare modalità al volo
- **Stato persistente** salvato per ogni sito (anche al riavvio del browser)

## Come installare 

1. Scarica il codice:
   - Clicca su **Code → Download ZIP**
   - Estrai la cartella `Janus-main/`

2. Vai su Chrome: chrome://extensions/
3. Attiva **Modalità sviluppatore** (in alto a destra)

4. Clicca su:
- **“Carica estensione non pacchettizzata”**
- Seleziona la cartella `Janus-main/`

Fatto! L’icona comparirà in alto a destra.

---

## Privacy

Questa estensione:
- Non raccoglie alcun dato
- Non invia richieste esterne
- Tutto avviene **localmente sul tuo browser**

---

## Supporto

Apri una [Issue](https://github.com/Autoformazione/Janus/issues) su GitHub per problemi o suggerimenti.

