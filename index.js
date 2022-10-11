const rl = require('readline').createInterface({
       input: process.stdin,
       output: process.stdout
});

const currency = new Intl.NumberFormat("id-ID", {
       currency: "IDR",
       style: "currency"
})

const calculateFee = (distance) => {

       if (distance <= 2) {
              return 8000;
       }
       else {
              return distance * 5000;
       }
}

const calculateServiceFee = (distance) => {
       return distance * 0.045;
}

const calculate = (input) => {
       try {
              distance = parseInt(input);

              if (!distance) {
                     throw "Hanya menerima input dalam angka";
              }
              const totalFee = calculateFee(distance);
              const serviceFee = calculateServiceFee(totalFee);


              return { totalFee, serviceFee }
       } catch (error) {
              throw new Error(error);
       }

}

const getInput = (readline) => {
       return new Promise((resolve, reject) => {
              readline.on('line', (input) => {
                     try {
                            if (input.toLowerCase() === 'q') {
                                   throw new Error('exit...')
                            }
                            const data = calculate(input);
                            resolve(data);
                     } catch (error) {
                            reject(error)
                     }
              });
              readline.on('SIGINT', () => {
                     reject(new Error("exit..."));
              });


       })
}

const showInstruction = (readline) => {
       readline.setPrompt('\nMasukan jarak :');
       readline.prompt();
}

const startApp = async () => {
       let running = true;

       while (running) {
              try {
                     showInstruction(rl)
                     const data = await getInput(rl);
                     console.log("===========================================================")
                     console.log(`Fee : ${currency.format(data.totalFee)}`);
                     console.log(`Service Fee : ${currency.format(data.serviceFee)}`);
                     console.log("===========================================================")
                     console.log(`Tekan Q/q untuk keluar`);
                     showInstruction(rl);
              } catch (error) {
                     console.log(error.message);
                     running = false;
              }
       }
       rl.close();
}


startApp()

