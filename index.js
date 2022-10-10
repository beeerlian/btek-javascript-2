const readline = require('readline');
const internal = require('stream');
const rl = readline.createInterface({
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
       distance = parseInt(input);
       if (distance) {
              const totalFee = calculateFee(distance);
              const serviceFee = calculateServiceFee(totalFee);


              console.log(`Fee : ${currency.format(totalFee)}`);
              console.log(`Service Fee : ${currency.format(serviceFee)}`);
              console.log(`Tekan enter untuk lanjut, q untuk keluar`);
       }

}

const app = async () => {

       let it = rl[Symbol.asyncIterator]();
       rl.setPrompt('Masukan Jarak : ')
       rl.prompt()
       for await (const line of it) {
              if (!line) {
                     rl.setPrompt('Masukan Jarak : ')
                     rl.prompt()
              }
              if (line.toLowerCase() === 'q') {
                     rl.setPrompt('Keluar')
                     rl.prompt()
                     running = false;
                     break;
              }
              calculate(line);
       }
       rl.close();

}


app()

//proses looping menggunakan for
