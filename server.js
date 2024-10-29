const express = require('express');
const app = express();
app.use(express.json());

let users = {}; // Penyimpanan sementara, gunakan database untuk produksi.

app.post('/claim-airdrop', (req, res) => {
    const { walletAddress, referrer } = req.body;

    if (!users[walletAddress]) {
        users[walletAddress] = { claimed: true, referrer };

        // Logika untuk memanggil smart contract di sini jika diperlukan
        res.json({ message: "Airdrop berhasil diklaim!" });
    } else {
        res.status(400).json({ message: "Anda sudah mengklaim airdrop." });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
