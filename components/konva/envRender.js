import PropTypes from "prop-types";
import { Stage, Layer, Rect, Image } from "react-konva";
import { Typography } from "@material-ui/core";
import EntityRect from "./entityRect";
import { withStyles } from "@material-ui/styles";

const STAGE_WIDTH = 300
const CELL_SIZE = 50

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class EnvRender extends React.Component {

  renderEnvironment() {
    const { entities } = this.props;
    const envObjects = [];
    // Render entities
    if (entities) {
      Object.keys(entities).map(id => {
        const e = entities[id]
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

    return envObjects
  }

  render() {
    const { classes } = this.props;
    return (
      <div 
        className={classes.root} 
        ref={node => {
          this.container = node;
        }}
      >
        <Stage width={STAGE_WIDTH} height={STAGE_WIDTH}>
          <Layer scaleY={-1} offsetY={STAGE_WIDTH}>
            <Rect
              x={0}
              y={0}
              width={STAGE_WIDTH}
              height={STAGE_WIDTH}
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