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
    result_type: req.body.type, // recent, popular or mixed
    lang: "en"
  };

  T.get("search/tweets", params, function(err, data, response) {
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++) {
        let id = { id: data.statuses[i].id_str };
        T.post("favorites/create", id, function(err, response) {
          if (err) {
            console.log(err[0].message);
          } else {
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
