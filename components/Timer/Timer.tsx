import React, { useEffect, useState } from 'react';
import moment from 'moment-mini';

const Timer = React.memo(
  ({ reset }: { reset: boolean }): JSX.Element => {
    const [time, setTime] = useState(0);

    useEffect(() => {
      if (reset) {
        setTime(0);
      }
      const timer = time >= 0 && setTimeout(() => setTime(time + 1000), 1000);
      return () => clearInterval(timer as NodeJS.Timeout);
    }, [time]);

    return <span>{`Last update: ${moment.duration(time, 'millisecond').humanize()}`}</span>;
  },
);

export default Timer;
