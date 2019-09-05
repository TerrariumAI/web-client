import { Typography } from "@material-ui/core";
import EnvRender from "../components/konva/envRender";

const ENTITIES = {
  test_id: {x: 1, y: 1}
}
class MyApp extends React.Component {
  render() {
    return (
      <Typography>
        <EnvRender 
          entities={ENTITIES}
        />
      </Typography>
    );
  }
}

export default MyApp;