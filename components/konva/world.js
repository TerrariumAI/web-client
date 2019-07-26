import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Image } from "react-konva";
import EntityRect from "./entityRect";
var _ = require("lodash");

const CANVAS_SIZE = 400;
const CELLS_IN_REGION = 16;
const CELL_SIZE = CANVAS_SIZE / CELLS_IN_REGION; // 3 because the user looks at center with 2 each side, 3 regions

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
    region: this.getRegionForPos({ x: 0, y: 0 }),
    // Any errors that come up
    error: ""
  };

  componentDidMount() {
    // Add key event listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  /**
   * _handleKeyDown - Detect any key down events and move the center pos
   *   accordingly.
   */
  _handleKeyDown = event => {
    let { centerPos } = this.state;
    const { onCenterPosChange } = this.props;
    switch (event.keyCode) {
      case UP_KEY_CODE:
        centerPos.y += 1;
        this.changeCenterPos(centerPos);
        event.preventDefault();
        break;
      case DOWN_KEY_CODE:
        centerPos.y -= 1;
        this.changeCenterPos(centerPos);
        event.preventDefault();
        break;
      case LEFT_KEY_CODE:
        centerPos.x -= 1;
        this.changeCenterPos(centerPos);
        event.preventDefault();
        break;
      case RIGHT_KEY_CODE:
        centerPos.x += 1;
        this.changeCenterPos(centerPos);
        event.preventDefault();
        break;
      default:
        break;
    }
    if (onCenterPosChange) {
      onCenterPosChange(centerPos);
    }
  };

  /**
   * changeCenterPos - change the centerPos to the new given centerPos and
   *   change the region if needed.
   */
  changeCenterPos = newCenterPos => {
    const { region } = this.state;
    const { onRegionChange } = this.props;
    const newRegion = this.getRegionForPos(newCenterPos);
    this.setState({ centerPos: newCenterPos });
    if (!_.isEqual(region, newRegion)) {
      if (onRegionChange) {
        onRegionChange(newRegion);
        this.setState({ region: newRegion });
      }
    }
  };

  /**
   * getRegionForPos (UTIL) - Converts a position to a region
   */
  getRegionForPos(p) {
    let x = p.x;
    let y = p.y;
    if (x < 0) {
      x -= CELLS_IN_REGION;
    }
    if (y < 0) {
      y -= CELLS_IN_REGION;
    }
    return {
      x:
        x <= 0
          ? Math.ceil(x / CELLS_IN_REGION)
          : Math.floor(x / CELLS_IN_REGION),
      y:
        y <= 0
          ? Math.ceil(y / CELLS_IN_REGION)
          : Math.floor(y / CELLS_IN_REGION)
    };
  }

  // When a cell is clicked
  onCellClick = (worldPos, entity) => {
    const { onCellClick } = this.props;
    this.setState({
      selectedPos: worldPos
    });
    if (onCellClick) {
      onCellClick(worldPos, entity);
    }
  };

  renderCells = () => {
    const { selectedPos, centerPos } = this.state;
    const { getEntityByPos } = this.props;
    let cells = [];
    for (let x = 0; x < CELLS_IN_REGION; x++) {
      for (let y = 0; y < CELLS_IN_REGION; y++) {
        let screenPos = {
          x: x * CELL_SIZE,
          y: y * CELL_SIZE
        };
        let worldPos = {
          x: x - CELLS_IN_REGION / 2 + centerPos.x,
          y: -(y - CELLS_IN_REGION / 2 - centerPos.y)
        };
        cells.push(
          <EntityRect
            key={`${worldPos.x}.${worldPos.y}`}
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
