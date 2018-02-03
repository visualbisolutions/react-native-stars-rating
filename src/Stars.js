// @flow

import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import autobind from 'class-autobind';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Stars-style';

type Props = {
  size?: number;
  color?: number;
  rate: number;
  rateMax: number;
  isActive: boolean;
  onStarPress?: (rating: number) => void;
  isHalfStarEnabled?: boolean;
  rounding: 'up' | 'down';
};

type State = {
  activeIndex: number;
};

export default class Stars extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    let {rounding} = this.props;
    this.state = {
      activeIndex: this.props.rate === 0 ?
        0 :
        rounding === 'up' ?
          Math.round(this.props.rate * 2) / 2 :
          Math.floor(this.props.rate * 2) / 2,
    };
  }
  _changeActiveIndex(i: number) {
    let {onStarPress, isHalfStarEnabled} = this.props;
    onStarPress ? onStarPress(isHalfStarEnabled ? i / 2 : i) : null;
    this.setState({
      activeIndex: isHalfStarEnabled ? i / 2 : i,
    });
  }
  render() {
    let {size, color, rateMax, isActive, isHalfStarEnabled} = this.props;
    let customSize = null;
    let starCustomStyle = null;
    let stars = [];
    let starShape = '';
    if (isHalfStarEnabled) {
      if (size != null) {
        customSize = {
          width: size / 2,
          height: size,
        };
        starCustomStyle = {
          fontSize: size,
          color: color ? color : '#EEB211',
        };
      } else {
        starCustomStyle = {
          color: color ? color : '#EEB211',
        }
      }
      let rateCount = this.state.activeIndex * 2;
      let currIndex = 0;
      let extraStyle = {
        left: size ? size * -1 : -20,
      };
      for (let i = 1; i <= rateCount; i++) {
        if (i % 2 === 0) {
          currIndex = i;
          starShape = 'star';
          stars.push(
            <View key={i} style={[styles.starsWrapper, size ? {width: size, height: size} : {}]}>
              <Icon
                name={starShape}
                style={[styles.starIcon, starCustomStyle]}
              />
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i - 1) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
            </View>);
        } else if (i === rateCount) {
          currIndex = i + 1;
          starShape = 'star-half';
          stars.push(
            <View key={i} style={[styles.starsWrapper, size ? {width: size, height: size} : {}]}>
              <Icon
                name={starShape}
                style={[styles.starIcon, starCustomStyle]}
              />
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i + 1) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
            </View>);
        }
      }
      let maxRateCount = rateMax * 2;
      for (let i = currIndex + 1; i <= maxRateCount; i++) {
        if (i % 2 === 0) {
          stars.push(
            <View key={i} style={[styles.starsWrapper, size ? {width: size, height: size} : {}]}>
              <Icon
                name="star-border"
                style={[styles.starIcon, starCustomStyle]}
              />
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i - 1) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => isActive ? this._changeActiveIndex(i) : {}}
              >
                <View style={[styles.starLogicalPixel, customSize, extraStyle]} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
      }
    } else {
      if (size != null) {
        customSize = {
          width: size,
          height: size,
        };
        starCustomStyle = {
          fontSize: size,
          color: color ? color : '#EEB211',
        };
      }
      let extraStyle = {
        left: size ? size * -1 : -20,
      };
      let currIndex = this.state.activeIndex;
      for (let i = 1; i <= currIndex; i++) {
        starShape = 'star';
        stars.push(
          <View key={i} style={[styles.starsWrapper, customSize]}>
            <Icon
              name={starShape}
              style={[styles.starIcon, starCustomStyle]}
            />
            <TouchableWithoutFeedback onPress={() => isActive ? this._changeActiveIndex(i) : null}>
              <View style={[styles.starFullLogicalPixel, customSize, extraStyle]} />
            </TouchableWithoutFeedback>
          </View>
        );
      }
      for (let i = currIndex + 1; i <= rateMax; i++) {
        starShape = 'star-border';
        stars.push(
          <View key={i} style={[styles.starsWrapper, customSize]}>
            <Icon
              name={starShape}
              style={[styles.starIcon, starCustomStyle]}
            />
            <TouchableWithoutFeedback onPress={() => isActive ? this._changeActiveIndex(i) : null}>
              <View style={[styles.starFullLogicalPixel, customSize, extraStyle]} />
            </TouchableWithoutFeedback>
          </View>
        );
      }
    }
    return (
      <View style={{flexDirection: 'row'}}>
        {stars}
      </View>
    );
  }
}
