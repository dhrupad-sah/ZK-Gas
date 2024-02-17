const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const ethers = require("ethers");
const { config } = require("dotenv");
const FactoryABI = require("./ABI/Factory.json");
const ZKCommunityABI = require("./ABI/ZKCommunity.json");
const VerifierABI = require("./ABI/UltraVerifier.json");
const ZKPollABI = require("./ABI/ZKPoll.json")
const bodyParser = require("body-parser");
const toml = require('@iarna/toml');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;
config();

app.use(bodyParser.json()); 
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);

const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const signer = wallet.provider.getSigner(wallet.address);

const pollRouter = require('./routes/Poll.js')
const userRouter = require('./routes/User.js')

const FactoryContract = new ethers.Contract(
  FactoryABI.address,
  FactoryABI.abi,
  signer
);

app.post("/joinCommunity", async (req, res) => {

  try {
    const filePath = path.join(
      __dirname,
      "../",
      "noir-app",
      "circuits",
      "Prover.toml"
    );

    const communityAddress = await FactoryContract.functions.getCommunity(req.body.communityId);

    const communityContract = new ethers.Contract(
      communityAddress[0],
      ZKCommunityABI.abi,
      signer
    );

    const communityRules = await communityContract.functions.getRules();

    const domainPub = communityRules[0];
    const regionPub = communityRules[1];
    const genderPub = communityRules[2];

    const privateData = {
      domain: req.body.domain,
      gender: req.body.gender,
      region: req.body.region,
    };

    const pubData = {
      domainPub: domainPub,
      genderPub: genderPub,
      regionPub: regionPub,

    };

    let tomlString = "";

    for (const key in privateData) {
      if (Object.hasOwnProperty.call(privateData, key)) {
        tomlString += `${key} = "${privateData[key]}"\n`;
      }
    }
    for (const key in pubData) {
      if (Object.hasOwnProperty.call(pubData, key)) {
        tomlString += `${key} = "${pubData[key]}"\n`;
      }
    }

    fs.writeFile(filePath, tomlString, async (err) => {

      if (err) {
        console.error("Error writing to TOML file:", err);
        res.status(500).send("Error writing to TOML file");
      }

        exec("bash ./scripts/auto_deploy.sh", async (error, stdout, stderr) => {

          if (error) {
            console.error("Error running shell commands:", error);
            res.status(500).send("false");
            return;
          }
  
          console.log("Shell commands executed successfully:", stdout);
          
          const proof = fs.readFileSync(
            "../noir-app/circuits/proofs/noirstarter.proof"
          )   
  
          const proofHex = "0x" + proof.toString();
  
          const verifierToml = fs.readFileSync('../noir-app/circuits/Verifier.toml', 'utf8');
          const verifierData = toml.parse(verifierToml);
  
          const domainPub = verifierData.domainPub;
          const genderPub = verifierData.genderPub;
          const regionPub = verifierData.regionPub;

          const VerifierContract = new ethers.Contract(
            VerifierABI.address,
            VerifierABI.abi,
            signer
          );
  
          const pubArray = [domainPub, regionPub, genderPub];
  
          const bool = await communityContract.functions.joinCommunity(proofHex, pubArray);
          
          res.send(bool);  
          // console.log(bool);
        });

    });

  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(400).send("Error parsing JSON");
  }
});

app.post("/joinPoll", async (req, res) => {

  try {
    const filePath = path.join(
      __dirname,
      "../",
      "noir-app",
      "circuits",
      "Prover.toml"
    );

    const PollAddress = await FactoryContract.functions.getPoll(req.body.pollId);

    const PollContract = new ethers.Contract(
      PollAddress[0],
      ZKPollABI.abi,
      signer
    );

    const pollRules = await PollContract.functions.getRules();

    // console.log("domain", pollRules[0]);
    // console.log("region", pollRules[1]);
    // console.log("gender", pollRules[2]);


    const domainPub = pollRules[0];
    const regionPub = pollRules[1];
    const genderPub = pollRules[2];

    const privateData = {
      domain: req.body.domain,
      gender: req.body.gender,
      region: req.body.region,
    };

    const pubData = {
      domainPub: domainPub,
      genderPub: genderPub,
      regionPub: regionPub,

    };

    let tomlString = "";

    for (const key in privateData) {
      if (Object.hasOwnProperty.call(privateData, key)) {
        tomlString += `${key} = "${privateData[key]}"\n`;
      }
    }
    for (const key in pubData) {
      if (Object.hasOwnProperty.call(pubData, key)) {
        tomlString += `${key} = "${pubData[key]}"\n`;
      }
    }

    fs.writeFile(filePath, tomlString, async (err) => {

      if (err) {
        console.error("Error writing to TOML file:", err);
        res.status(500).send("Error writing to TOML file");
      }

      exec("bash ./scripts/auto_deploy.sh", async (error, stdout, stderr) => {

        if (error) {
          console.error("Error running shell commands:", error);
          res.status(500).send("Error running shell commands");
          return;
        }

        console.log("Shell commands executed successfully:", stdout);
        
        const proof = fs.readFileSync(
          "../noir-app/circuits/proofs/noirstarter.proof"
        )   

        const proofHex = "0x" + proof.toString();

        const verifierToml = fs.readFileSync('../noir-app/circuits/Verifier.toml', 'utf8');
        const verifierData = toml.parse(verifierToml);

        const domainPub = verifierData.domainPub;
        const genderPub = verifierData.genderPub;
        const regionPub = verifierData.regionPub;

        const pubArray = [domainPub, regionPub, genderPub];

        const bool = await PollContract.functions.joinPoll(proofHex, pubArray);

        res.send(bool);

        // console.log(bool);
      });
    });

  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(400).send("Error parsing JSON");
  }
});

app.get('/', (req, res, next) => {
  res.send("Hello from server");
})

app.use('/api/poll', pollRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});