const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Twitter = require("twitter");
const config = require("./config.js");
const T = new Twitter(config);
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/post", (req, res) => {
  console.log(req.body);

  const params = {
    q: `#${req.body.post}`,
    count: req.body.count,
    result_type: "mixed", // recent, popular or mixed
    lang: "en"
  };

  T.get("search/tweets", params, function(err, data, response) {
    // If there is no error, proceed
    if (!err) {
      // Loop through the returned tweets
      for (let i = 0; i < data.statuses.length; i++) {
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str };
        // Try to Favorite the selected Tweet
        T.post("favorites/create", id, function(err, response) {
          // If the favorite fails, log the error message
          if (err) {
            console.log(err[0].message);
          }
          // If the favorite is successful, log the url of the tweet
          else {
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log(
              "Favorited: ",
              `https://twitter.com/${username}/status/${tweetId}`
            );
          }
        });
        res.write("   Done!   ");
      }
      res.end();
    } else {
      console.log(err);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
