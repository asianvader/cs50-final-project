import React from "react";
import dayjs from "dayjs";

function FeedActivityTable(props) {
  const data = props.data;
  console.log(data);
  //   Sort data by descending date order
  data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <th>Date</th>
        <th>Activity</th>
        <th>Volumn (ml)</th>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={`row-${index}`}>
            <td>{dayjs(item.date).toString().replace("GMT", "")}</td>
            <td>{item.activity}</td>
            <td>{item.information}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FeedActivityTable;
