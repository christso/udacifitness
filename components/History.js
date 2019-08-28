import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'

class History extends Component {
  async componentDidMount () {
    const { dispatch } = this.props

    const entries = await fetchCalendarResults();
    dispatch(receiveEntries(entries));
    if (!entries[timeToString()]) {
      dispatch(addEntry({
        [timeToString()]: getDailyReminderValue()
      }))
    }

    this.setState(() => ({ready: true}));
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(History) 