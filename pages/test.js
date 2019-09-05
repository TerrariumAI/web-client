import { Typography } from "@material-ui/core";
import EnvRender from "../components/konva/envRender";

const ENTITIES = {
  test_id: {x: 1, y: 1}
}
const EFFECTS = {
  test_id_2: {x: 2, y: 2, timestamp: (new Date((new Date()).getTime() - 1000)).getTime()/1000, decay: 1.1}
}

class MyApp extends React.Component {
  render() {
    return (
      <Typography>
        <EnvRender 
          entities={ENTITIES}
          effects={EFFECTS}
        />
      </Typography>
    );
  }
}

export default MyApp;