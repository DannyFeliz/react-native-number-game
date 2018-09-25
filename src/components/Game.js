import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import RandomNumber from "./RandomNumber";
import PropTypes from "prop-types";
class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired
  };

  state = {
    selectedIds: []
  };

  randomNumber = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  target = this.randomNumber
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isNumberSelectd = (numberIndex) =>
    this.state.selectedIds.indexOf(numberIndex) >= 0;

  selectNumber = (numberIndex) => {
    console.log("Copied:", numberIndex);
    console.log(this.state.selectedIds);
    this.setState((state) => ({
      selectedIds: [...state.selectedIds, numberIndex]
    }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumber[curr];
    }, 0);

    if (sumSelected < this.target) {
      return "PLAYING";
    }

    if (sumSelected == this.target) {
      return "WON";
    }

    if (sumSelected > this.target) {
      return "LOST";
    }
  };

  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles["STATUS_" + gameStatus]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumber.map((number, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={number}
              isDisabled={
                this.isNumberSelectd(index) || gameStatus != "PLAYING"
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flex: 1
  },

  target: {
    fontSize: 50,
    backgroundColor: "#bbb",
    margin: 50,
    textAlign: "center"
  },

  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

  STATUS_PLAYING: {
    backgroundColor: "#bbb"
  },

  STATUS_WON: {
    backgroundColor: "green"
  },

  STATUS_LOST: {
    backgroundColor: "red"
  }
});

export default Game;
