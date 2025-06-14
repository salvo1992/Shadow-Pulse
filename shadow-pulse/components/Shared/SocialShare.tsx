import * as Sharing from 'expo-sharing';

export const shareScore = async (score: number) => {
  if (!(await Sharing.isAvailableAsync())) {
    alert('Condivisione non disponibile sul dispositivo.');
    return;
  }
  await Sharing.shareAsync(`Ho totalizzato ${score} punti su Shadow Pulse! Prova anche tu!`);

    const message = `Ho totalizzato ${score} punti su Shadow Pulse! Prova anche tu!`;
    const options = {
        dialogTitle: 'Condividi il tuo punteggio',
        message,
    };
    
    try {
        await Sharing.shareAsync(message, options);
    } catch (error) {
        console.error('Errore durante la condivisione:', error);
        alert('Errore durante la condivisione del punteggio.');
    }
    };
