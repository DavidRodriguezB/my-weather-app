import React from 'react';
import { Card } from 'semantic-ui-react'
import moment from 'moment';

const CardExampleCard = ({weatherData}) => (
  weatherData.daily.map((day) =>
    <Card>
      <Card.Content>
          <Card.Header className="header">{moment(day.dt * 1000).format('dddd, MMMM Do')}</Card.Header>
          <p>{day.temp.day} &deg;C</p>
          <div class="iconWrapper"><i class={day.weather[0].main}></i></div>
          <p>Humidity: {day.humidity} %</p>
      </Card.Content>
    </Card>
  )
)

export default CardExampleCard;