import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet } from 'react-native';

import RootNavigator from './pages/app';
AppRegistry.registerComponent('rnote', () => RootNavigator);
