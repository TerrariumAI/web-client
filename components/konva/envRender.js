import PropTypes from "prop-types";
import { Stage, Layer, Rect, Image } from "react-konva";
import { Typography } from "@material-ui/core";
import EntityRect from "./entityRect";
import { withStyles } from "@material-ui/styles";
import useImage from 'use-image';
import EffectRect from "./effectRect";

// TODO: This should not be hard coded!
const ENV_MAX_POSITION = 100 // Max position an entity can be in, defined by the environment

const DEFAULT_STAGE_WIDTH = 300
const CELLS_IN_VIEW = 16

const styles = theme => ({
  root: {
    display: "flex"
  }
});

const BackgroundRect = props => {
  const [grassImg] = useImage('/static/grass.png');
  return (
    <Rect
      {...props}
      // fill={"#32ff7e"}
      fillPatternImage={grassImg}
    />
  )
}

class EnvRender extends React.Component {
  state = {
    stageWidth: DEFAULT_STAGE_WIDTH,
  }
  componentDidMount() {
    // Get the size of the container and set the canvas size
    this.checkSize();
    // TODO: here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener("resize", this.checkSize);
    // Refresh every second
    this.interval = setInterval(() => this.setState(this.state), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
    clearInterval(this.interval);
  }
  
  renderEnvironment() {
    const { entities, effects, targetPos } = this.props;
    const { stageWidth, selectedPos } = this.state;
    const cellSize = stageWidth/CELLS_IN_VIEW;
    const effectSize = cellSize / 2;
    const envObjects = [];
    // Calc min and max we can see so we know whether or not to render
    const min = {x: targetPos.x - CELLS_IN_VIEW/2, y: targetPos.y - CELLS_IN_VIEW/2}
    const max = {x: targetPos.x + CELLS_IN_VIEW/2, y: targetPos.y + CELLS_IN_VIEW/2}
    // Render entities
    if (entities) {
      Object.keys(entities).map(id => {
        const e = entities[id];
        if (!e) { // Removing an entity will make it undefined but won't remove the id
          return null
        }
        // Skip the entity if it's out of view
        if (e.x < min.x || e.y < min.y || e.x > max.x || e.y > max.y) {
          return null
        }
        // Get screen position of entity
        const screenPos = {
          x: e.x * cellSize,
          y: e.y * cellSize
        }
        // Add entity to environment to render
        envObjects.push(
          <EntityRect
            key={id}
            entity={e}
            screenPos={screenPos}
            worldPos={{x: e.x, y: e.y}}
            width={cellSize}
            height={cellSize}
            onClick={this.onCellClick}
            selected={selectedPos ? selectedPos.x == e.x && selectedPos.y == e.y : false}
          />
        )
      })
    }
    // Render effects
    if (effects) {
      Object.keys(effects).map(id => {
        const eff = effects[id];
        const screenPos = {
          x: eff.x * cellSize,
          y: eff.y * cellSize
        }
        envObjects.push(
          <EffectRect
            key={id}
            effect={eff}
            screenPos={screenPos}
            worldPos={{x: eff.x, y: eff.y}}
            width={effectSize}
            height={effectSize}
          />
        )
      })
    }

    return envObjects
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

  checkSize = () => {
    const width = this.container.offsetWidth;
    this.setState({
      stageWidth: width,
    });
  };

  render() {
    const { classes, targetPos } = this.props;
    const { stageWidth } = this.state;
    const cellSize = stageWidth/CELLS_IN_VIEW;
    return (
      <div 
        className={classes.root} 
        ref={node => {
          this.container = node;
        }}
      >
        <Stage width={stageWidth} height={stageWidth}>
          <Layer 
            scaleY={-1} 
            offsetX={targetPos.x * cellSize - stageWidth/2} 
            offsetY={stageWidth/2 + (targetPos.y * cellSize)}
          >
            {/* <GrassImage 
              x={0}
              y={0}
              width={ENV_MAX_POSITION * cellSize}
              height={ENV_MAX_POSITION * cellSize}
            /> */}
            <BackgroundRect
              x={0}
              y={0}
              width={ENV_MAX_POSITION * cellSize}
              height={ENV_MAX_POSITION * cellSize}
              fillPatternScaleX={2}
            />
            {this.renderEnvironment()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

EnvRender.propTypes = {
  classes: PropTypes.object.isRequired,
  entities: PropTypes.object
};

export default withStyles(styles)(EnvRender)