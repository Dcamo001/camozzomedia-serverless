"use strict";

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.fetchGallery = async (event, context) => {
  const bucket = "camozzomedia";
  const path_to_folder = "/images/California";
  const params = { Bucket: bucket, Delimiter: path_to_folder };

  s3.listObjects(params, function(err, data) {
    const message = err
      ? "Could not load objects from s3" + err
      : "Loaded " + data.Contents.length + " items from s3";

    return {
      statusCode: err ? 500 : 200,
      body: JSON.stringify({
        message,
        gallery: data.Contents
      })
    };
  });
};
