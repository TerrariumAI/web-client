const SwitchComponent = ({ show, children }) => {
  if (show) {
    return children;
  }
  return null;
};

export default SwitchComponent;
