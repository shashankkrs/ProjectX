const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

function changeVehicleBackground(filename) {
  return new Promise((resolve, reject) => {
    let inputImage = path.join(
      __dirname,
      "..",
      "public/images/vehicle_images/" + filename
    );
    let outputImage = path.join(
      __dirname,
      "..",
      "public/images/temppic/" + filename
    );

    const command = `rembg i ${inputImage} ${outputImage}`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        fs.rename(outputImage, inputImage, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function changeProfileBackground(filename) {
  return new Promise((resolve, reject) => {
    let inputImage = path.join(
      __dirname,
      "..",
      "public/images/profilepic/" + filename
    );
    let outputImage = path.join(
      __dirname,
      "..",
      "public/images/temppic/" + filename
    );

    const command = `rembg i ${inputImage} ${outputImage}`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        fs.rename(outputImage, inputImage, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

module.exports = {
  changeVehicleBackground,
  changeProfileBackground
};
