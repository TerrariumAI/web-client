import React, { Component } from "react";
import { render } from "react-dom";
import { Rect } from "react-konva";
import Konva from "konva";
class EffectRect extends React.Component {
  handleClick = () => {
    this.setState({
      clicked: true
    });
  };

  render() {
    const {
      effect,
      screenPos,
      width,
      height,
    } = this.props;
    let fill = "white";
    if (!effect) { // Empty
      return null
    } else { 
      let strength = 100 / Math.pow(effect.decay, (new Date().getTime() / 1000) - effect.timestamp)
      strength = Math.round(strength)
      let strengthHex = strength.toString(16)
      if (strengthHex.length != 2) {
        strengthHex = "00"
      }
      fill = "#5ac0e6"+strengthHex;
    }
    return (
      <Rect
        x={screenPos.x + width/2}
        y={screenPos.y + height/2}
        width={width}
        height={height}
        fill={fill}
      />
    );
  }
}

export default EffectRect;
