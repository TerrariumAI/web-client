import PropTypes from "prop-types";
import { Stage, Layer, Rect, Image } from "react-konva";
import { Typography } from "@material-ui/core";
import EntityRect from "./entityRect";
import { withStyles } from "@material-ui/styles";
import EffectRect from "./effectRect";

// TODO: This should not be hard coded!
const ENV_MAX_POSITION = 100 // Max position an entity can be in, defined by the environment

const STAGE_WIDTH = 300
const CELLS_IN_VIEW = 16
const CELL_SIZE = STAGE_WIDTH/CELLS_IN_VIEW
const EFFECT_SIZE = CELL_SIZE/2

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class EnvRender extends React.Component {
  renderEnvironment() {
    const { entities, effects } = this.props;
    const envObjects = [];
    // Render entities
    if (entities) {
      Object.keys(entities).map(id => {
        const e = entities[id];
        const screenPos = {
          x: e.x * CELL_SIZE,
          y: e.y * CELL_SIZE
        }
        envObjects.push(
          <EntityRect
            key={id}
            entity={e}
            screenPos={screenPos}
            worldPos={{x: e.x, y: e.y}}
            width={CELL_SIZE}
            height={CELL_SIZE}
          />
        )
      })
    }
    // Render effects
    if (effects) {
      Object.keys(effects).map(id => {
        const eff = effects[id];
        const screenPos = {
          x: eff.x * CELL_SIZE,
          y: eff.y * CELL_SIZE
        }
        envObjects.push(
          <EffectRect
            key={id}
            effect={eff}
            screenPos={screenPos}
            worldPos={{x: eff.x, y: eff.y}}
            width={EFFECT_SIZE}
            height={EFFECT_SIZE}
          />
        )
      })
    }

    return envObjects
  }

  render() {
    const { classes, targetPos } = this.props;
    return (
      <div 
        className={classes.root} 
        ref={node => {
          this.container = node;
        }}
      >
        <Stage width={STAGE_WIDTH} height={STAGE_WIDTH}>
          <Layer 
            scaleY={-1} 
            offsetX={targetPos.x * CELL_SIZE - STAGE_WIDTH/2} 
            offsetY={STAGE_WIDTH/2 + (targetPos.y * CELL_SIZE)}
          >
            <Rect
              x={0}
              y={0}
              width={ENV_MAX_POSITION * CELL_SIZE}
              height={ENV_MAX_POSITION * CELL_SIZE}
              fill={"#32ff7e"}
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