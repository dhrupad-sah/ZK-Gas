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
const toml = require('@iarna/toml');
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

    const domainPub = "xx@iiits";
    const regionPub = "xxxxxxAP";
    const genderPub = "xxxxxxxM";

function stringToBytes32(str) {
  const bytes32 = ethers.utils.formatBytes32String(str);
  return bytes32;
}

function stringToBytes32Array(str) {
  const bytes32Array = [];
  for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const bytes32 = ethers.utils.formatBytes32String(char);
      bytes32Array.push(bytes32);
  }
  return bytes32Array;
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

    // console.log(communityAddress);

    const communityContract = new ethers.Contract(
      communityAddress[0],
      ZKCommunityABI.abi,
      signer
    );

    // console.log(communityContract);

    // const communityRules = await communityContract.functions.getRules();

    // console.log(communityRules);

    // const domainPub = communityRules[0].domainPub;
    // const regionPub = communityRules[0].regionPub;
    // const genderPub = communityRules[0].genderPub;

    const data = {
      domain: req.body.domain,
      region: req.body.region,
      gender: req.body.gender,
    };

    // const pubData = {
    //   domainPub: domainPub,
    //   regionPub: regionPub,
    //   genderPub: genderPub,
    // };

    const pubData = {
      domainPub: "0x7878406969697473",
      regionPub: "0x7878787878784150",
      genderPub: "0x787878787878784d",
    };

    // console.log(data);

    let tomlString = "";

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        tomlString += `${key} = "${data[key]}"\n`;
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

        res.send("Files written!")

        const proofHex = "0x" + proof.toString();
        // console.log(proofHex);

        const VerifyContract = new ethers.Contract(
          VerifierABI.address,
          VerifierABI.abi,
          signer
        );

        const verifierToml = fs.readFileSync('../noir-app/circuits/Verifier.toml', 'utf8');
        const verifierData = toml.parse(verifierToml);

        const domainPub = verifierData.domainPub;
        const genderPub = verifierData.genderPub;
        const regionPub = verifierData.regionPub;

        const pubArray = [domainPub, genderPub, regionPub];

        // console.log(pubArray);

        const bool = VerifyContract.functions.verify(proof, pubArray);

        console.log(bool);
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