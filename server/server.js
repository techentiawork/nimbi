require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Web3 } = require("web3");
const PoolContractABI = require("./PoolContractABI.json");
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contractAddress = process.env.CONTRACT_ADDRESS;
const poolContract = new web3.eth.Contract(PoolContractABI, contractAddress);

const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAddress = process.env.OWNER_ADDRESS;

app.use(cors()).use(express.json());

const transferPool = async (walletAddress, amount) => {
    try {
        const createRoomData = poolContract.methods.transferPool(walletAddress, amount).encodeABI();
        const gasEstimate = await web3.eth.estimateGas({
            from: ownerAddress,
            to: contractAddress,
            data: createRoomData,
        });
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: ownerAddress,
            to: contractAddress,
            gas: gasEstimate,
            gasPrice: gasPrice,
            data: createRoomData,
        };

        const signedTx = await web3.eth.accounts.signTransaction(
            tx,
            ownerPrivateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );

        const formattedReceipt = JSON.parse(
            JSON.stringify(receipt, (key, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return "amount transferred successfully";
    } catch (error) {
        console.log(error);
        return "Failed to resolve pool";
    }
};

const refund = async (walletAddress, amount) => {
    try {
        const createRoomData = poolContract.methods
            .refund(walletAddress, amount)
            .encodeABI();
        const gasEstimate = await web3.eth.estimateGas({
            from: ownerAddress,
            to: contractAddress,
            data: createRoomData,
        });
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: ownerAddress,
            to: contractAddress,
            gas: gasEstimate,
            gasPrice: gasPrice,
            data: createRoomData,
        };

        const signedTx = await web3.eth.accounts.signTransaction(
            tx,
            ownerPrivateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );

        return "Refunded successfully";
    } catch (error) {
        return "Error in refunding pool";
    }
};

app.get("/result", async (req, res) => {
    try {
        let date = new Date();
        if (req.query["amount"] == 1000)
            res.status(200).send(date.getTime() % 2 === 0 ? "head" : "tail");
        else if (req.query["amount"] == 10000)
            res.status(200).send(Math.random() < 0.5 ? "head" : "tail");
        else res.status(200).send(Math.random() > 0.5 ? "head" : "tail");
    } catch (err) {
        res.status(500).json({
            success: false,
            response: "Error in deciding result",
            err: err.message,
        });
    }
});

app.post("/distribute", async (req, res) => {
    try {
        const { walletAddress, amount } = req.body;

        const newAmount = BigInt(amount * 2).toString();
        const response = await transferPool(walletAddress, newAmount);

        if (response === "amount transferred successfully")
            res.status(200).json({ success: true, response });
        else{
            const refundRes = await refund(walletAddress, amount);
            res.status(200).json({ success: false, response,refundRes });
        }
    } catch (err) {
        res.status(500).json({ success: false, response: "Error in refunding", err: err.message });
    }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
