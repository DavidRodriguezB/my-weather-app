import React from 'react';
import moment from 'moment';

const SliderDay = ({dayData}) => (
  dayData.hourly.map((hour) =>
    <div class="slide" key={moment(hour.dt * 1000).format('ddd HH:mm:ss')}>
        <h3>{moment(hour.dt * 1000).format('ddd HH:mm:ss')}</h3>
        {((moment(hour.dt * 1000).format('HH') >= '22' || moment(hour.dt * 1000).format('HH') <= '06') && hour.weather[0].main === 'Clear') ? (
          <div class="iconWrapper"><i class="Night"></i></div>
       ): (
          <div class="iconWrapper"><i class={hour.weather[0].main}></i></div>
       )}
        <p>{hour.temp} &deg;C</p>
      
    </div>
  )
)

export default SliderDay;