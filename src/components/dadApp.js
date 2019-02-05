import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const styles = {
  card: {
    minWidth: 100
  },
  pos: {
    marginBottom: 12
  },
  textAlign: "center"
};

function SimpleCard(props) {
  const { classes } = props;
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(response.status); // 404
    }
    const data = await response.json();
    setFetching(false);
    setData(data);
    console.log(data.joke);
  };

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
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h6" variant="h1" gutterBottom>
          <div className={classes.textAlign}>{data && data.joke}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          onClick={() => setFetching(true)}
          disabled={isFetching}
        >
          Dad Joke
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
