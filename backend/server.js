const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const ethers = require('ethers');

const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON bodies
app.use(express.json());

app.post("/config", (req, res) => {
  // let buffer = Buffer.from(JSON.stringify(data.domain));

  try {
    const filePath = path.join(
      __dirname,
      "../",
      "noir-app",
      "circuits",
      "Prover.toml"
    );

    const domainPub = "xx@iiits";
    const regionPub = "xxxxxxAP";
    const genderPub = "xxxxxxxM";

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

    console.log(tomlString);

    // const jsonDomain = JSON.stringify(tomlDomain);
    // const jsonRegion = JSON.stringify(tomlRegion);
    // const jsonGender = JSON.stringify(tomlGender);

    // const bufferDomain = Buffer.from(jsonDomain, 'utf-8');
    // const bufferRegion = Buffer.from(jsonRegion, 'utf-8');
    // const bufferGender = Buffer.from(jsonGender, 'utf-8');

    // Write the TOML string to the specified file path
    fs.writeFile(filePath, tomlString, (err) => {
      if (err) {
        console.error("Error writing to TOML file:", err);
        res.status(500).send("Error writing to TOML file");
      }
      exec("bash ./scripts/auto_deploy.sh", (error, stdout, stderr) => {
        if (error) {
          console.error("Error running shell commands:", error);
          res.status(500).send("Error running shell commands");
          return;
        }
        console.log("Shell commands executed successfully:", stdout);
        res
          .status(200)
          .send("TOML file written and shell commands executed successfully");
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
