import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore, withFirebase } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AddIcon,
  PersonIcon,
  Dialog,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import uuidv4 from "uuid/v4";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

let NewRemoteModelDialog = props => {
  const classes = useStyles();

  const { firestore, firebase, onClose, ...other } = props;

  const [values, setValues] = React.useState({
    name: null,
    description: null
  });

  function handleClose() {
    onClose();
  }

  function handleListItemClick(value) {
    onClose();
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSubmit() {
    const { name, description } = values;
    // validate
    if (
      name != null &&
      name !== "" &&
      description != null &&
      description != ""
    ) {
      // submit
      firestore.add("remoteModels", {
        name,
        description,
        secretKey: uuidv4(),
        ownerUID: firebase.auth().currentUser.uid
      });
      onClose();
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title">New Remote Model</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Name your model and give it a description. This will be public and
          other users will see this when they click on your agents in the
          environment.
        </DialogContentText>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-name"
            label="Description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  withFirestore,
  withFirebase
)(NewRemoteModelDialog);
