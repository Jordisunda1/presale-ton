const tonConnect = new TonConnectUI(tonConnectConfig);
document.getElementById('connect-wallet').addEventListener('click', async () => {
    try {
        await tonConnect.connectWallet();
        document.getElementById('connect-wallet').style.display = 'none';
        document.getElementById('airdrop-section').style.display = 'block';
    } catch (error) {
        console.error("Wallet connection failed:", error);
    }
});

document.getElementById('claim-airdrop').addEventListener('click', async () => {
    if (tonConnect.connected) {
        const walletAddress = tonConnect.wallet.address;
        const referrer = new URLSearchParams(window.location.search).get('ref') || '';

        try {
            const response = await fetch('/claim-airdrop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress, referrer })
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Claim failed: " + error.message);
        }

        const referralLink = `${window.location.origin}?ref=${walletAddress}`;
        document.getElementById('referral-link').value = referralLink;
    } else {
        alert("Silakan hubungkan wallet terlebih dahulu.");
    }
});

function copyReferralLink() {
    const referralLink = document.getElementById('referral-link');
    referralLink.select();
    document.execCommand("copy");
    alert("Referral link copied!");
}
