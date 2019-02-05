import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import styles from "../styles.css";

function DadJoke(props) {
  const { classes } = props;
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      (async function() {
        try {
          const response = await fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
          });
          if (!response.ok) {
            throw new Error(response.status); // 404
          }
          const data = await response.json();
          setFetching(false);
          setData(data);
          // setPosts(json.data.children.map(it => it.data));
        } catch (error) {
          console.log("Ooops, error", error.message);
        }
      })();
    },
    [isFetching]
  );

  return (
    <Card className="card transition">
      <CardContent>
        <Typography
          component="h3"
          variant="overline"
          color="error"
          align="center"
          gutterBottom
        >
          {data && data.joke}
        </Typography>
      </CardContent>
      <CardActions className="cta">
        <Button
          variant="outlined"
          color="default"
          size="small"
          onClick={() => setFetching(true)}
          disabled={isFetching}
        >
          {" "}
          Dad Joke{" "}
        </Button>
      </CardActions>
    </Card>
  );
}

DadJoke.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DadJoke);
