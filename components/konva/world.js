import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect } from "react-konva";
import EntityRect from "./entityRect";

const CANVAS_SIZE = 400;
const CELLS_IN_REGION = 10;
const CELL_SIZE = CANVAS_SIZE / (CELLS_IN_REGION * 3); // 3 because the user looks at center with 2 each side, 3 regions

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class World extends React.Component {
  state = {
    // Currently selected cell
    selectedPos: null,
    // What cell we are centered on
    centerPos: {
      x: 0,
      y: 0
    },
    // Any errors that come up
    error: ""
  };

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = event => {
    let { centerPos } = this.state;
    const { onCenterPosChange } = this.props;
    switch (event.keyCode) {
      case UP_KEY_CODE:
        centerPos.y += 1;
        this.setState({ centerPos });
        event.preventDefault();
        break;
      case DOWN_KEY_CODE:
        centerPos.y -= 1;
        this.setState({ centerPos });
        event.preventDefault();
        break;
      case LEFT_KEY_CODE:
        centerPos.x -= 1;
        this.setState({ centerPos });
        event.preventDefault();
        break;
      case RIGHT_KEY_CODE:
        centerPos.x += 1;
        this.setState({ centerPos });
        event.preventDefault();
        break;
      default:
        break;
    }
    if (onCenterPosChange) {
      onCenterPosChange(centerPos);
    }
  };

  // When a cell is clicked
  onCellClick = worldPos => {
    const { onCellClick } = this.props;
    this.setState({
      selectedPos: worldPos
    });
    if (onCellClick) {
      onCellClick(worldPos);
    }
  };

  renderCells = () => {
    const { selectedPos, centerPos } = this.state;
    const { getEntityByPos } = this.props;
    let cells = [];
    for (let x = 0; x < CELLS_IN_REGION * 3; x++) {
      for (let y = 0; y < CELLS_IN_REGION * 3; y++) {
        let screenPos = {
          x: x * CELL_SIZE,
          y: y * CELL_SIZE
        };
        let worldPos = {
          x: x - (CELLS_IN_REGION * 3) / 2 + centerPos.x,
          y: -(y - (CELLS_IN_REGION * 3) / 2 - centerPos.y)
        };
        cells.push(
          <EntityRect
            entity={getEntityByPos(worldPos)}
            screenPos={screenPos}
            worldPos={worldPos}
            width={CELL_SIZE}
            height={CELL_SIZE}
            selected={
              selectedPos &&
              selectedPos.x === worldPos.x &&
              selectedPos.y === worldPos.y
            }
            onClick={this.onCellClick}
          />
        );
      }
    }
    return cells;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
          <Layer ref={ref => (this.layer = ref)}>
            <Rect
              x={0}
              y={0}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              fill={"#32ff7e"}
            />
            {this.renderCells()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

World.propTypes = {
  classes: PropTypes.object.isRequired,
  getEntityByPos: PropTypes.func
};

export default withStyles(styles)(World);
