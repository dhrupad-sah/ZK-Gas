const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const ethers = require("ethers");
const { config } = require("dotenv");
const FactoryABI = require("./ABI/Factory.json");
const ZKCommunityABI = require("./ABI/ZKCommunity.json");
const VerifierABI = require("./ABI/UltraVerifier.json");
const bodyParser = require("body-parser");
config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);
// const signer = provider.getSigner();
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const signer = wallet.provider.getSigner(wallet.address);
// console.log(signer);
const FactoryContract = new ethers.Contract(
  FactoryABI.address,
  FactoryABI.abi,
  signer
);

const app = express();
const PORT = 3000;
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON bodies
app.use(express.json());

function stringToBytes32(str) {
  const bytes32 = ethers.utils.formatBytes32String(str);
  return bytes32;
}

app.post("/config", async (req, res) => {
  // let buffer = Buffer.from(JSON.stringify(data.domain));

  try {
    const filePath = path.join(
      __dirname,
      "../",
      "noir-app",
      "circuits",
      "Prover.toml"
    );

    const communityAddress = await FactoryContract.functions.getCommunity(req.body.communityId);

    console.log(communityAddress[0]);

    const communityContract = new ethers.Contract(
      communityAddress[0],
      ZKCommunityABI.abi,
      signer
    );

    // console.log(communityContract);

    const communityRules = await communityContract.functions.getRules();

    console.log(typeof(communityRules[0].domainPub));

    const domainPub = communityRules[0].domainPub;
    const regionPub = communityRules[0].regionPub;
    const genderPub = communityRules[0].genderPub;

    const domainPubBytes32 = stringToBytes32(domainPub);
    const regionPubBytes32 = stringToBytes32(regionPub);
    const genderPubBytes32 = stringToBytes32(genderPub);

    const publicInputs = [domainPubBytes32, regionPubBytes32, genderPubBytes32];

    console.log(publicInputs);

    const data = {
      domain: req.body.domain,
      region: req.body.region,
      gender: req.body.gender,
    };

    const pubData = {
      domainPub: domainPub,
      regionPub: regionPub,
      genderPub: genderPub,
    };

    // console.log(data);

    let tomlString = "";

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const arrayString = data[key].join(", ");
        tomlString += `${key} = [${arrayString}]\n`;
      }
    }
    for (const key in pubData) {
      if (Object.hasOwnProperty.call(pubData, key)) {
        tomlString += `${key} = "${pubData[key]}"\n`;
      }
    }

    // Write the TOML string to the specified file path
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
        );        

        const proofHex = "0x" + proof.toString();
        console.log(proofHex);

        const VerifyContract = new ethers.Contract(
          VerifierABI.address,
          VerifierABI.abi,
          signer
        );

        const bool = VerifyContract.functions.verify(proofHex, publicInputs);

        console.log(VerifyContract);
      });
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(400).send("Error parsing JSON");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});