import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Image } from "react-konva";
import EntityRect from "./entityRect";
var _ = require("lodash");

const CELLS_IN_REGION = 16;

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
    // Width of stage
    stageWidth: 400,
    // Currently selected cell
    selectedPos: null,
    // What cell we are centered on
    centerPos: {
      x: 9,
      y: 9
    },
    region: this.getRegionForPos({ x: 0, y: 0 }),
    // Any errors that come up
    error: ""
  };

  componentDidMount() {
    // Add key event listener
    document.addEventListener("keydown", this._handleKeyDown);
    // Get the size of the container and set the canvas size
    this.checkSize();
    // TODO: here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener("resize", this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
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
        if (centerPos.y < 0) {
          break;
        }
        centerPos.y -= 1;
        this.changeCenterPos(centerPos);
        event.preventDefault();
        break;
      case LEFT_KEY_CODE:
          if (centerPos.x < 0) {
            break;
          }
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
    if (newCenterPos.x < 0 || newCenterPos.y < 0) { // If negative
      // Don't change
      return
    }
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
    return {
      x: Math.floor(x / CELLS_IN_REGION),
      y: Math.floor(y / CELLS_IN_REGION)
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
    const { selectedPos, centerPos, stageWidth } = this.state;
    const { getEntityByPos } = this.props;
    const cellSize = stageWidth / CELLS_IN_REGION
    let cells = [];
    for (let x = 0; x < CELLS_IN_REGION; x++) {
      for (let y = 0; y < CELLS_IN_REGION; y++) {
        let screenPos = {
          x: x * cellSize,
          y: y * cellSize
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
            width={cellSize}
            height={cellSize}
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

  checkSize = () => {
    const width = this.container.offsetWidth;
    this.setState({
      stageWidth: width
    });
  };

  render() {
    const { classes } = this.props;
    const {stageWidth} = this.state;
    return (
      <div 
        className={classes.root} 
        ref={node => {
          this.container = node;
        }}
      >
        <Stage width={stageWidth} height={stageWidth}>
          <Layer ref={ref => (this.layer = ref)}>
            <Rect
              x={0}
              y={0}
              width={stageWidth}
              height={stageWidth}
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
