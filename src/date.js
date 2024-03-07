import React from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';

const Moment = ({ timestamp }) => {
  // Sử dụng moment để chuyển đổi timestamp thành định dạng ngày tháng
  const formattedDate = moment(timestamp).format('D-M-Y H:m:s');

  return (
    <Text style={styles.listItem}>Create at: {formattedDate}</Text>
  );
};



export default Moment
const styles = StyleSheet.create({ 
    listItem: {
        fontSize: 16
      },
})