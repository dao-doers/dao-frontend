import React, { useEffect, useState } from 'react';
import moment from 'moment-mini';

import styled from '@emotion/styled';

import Typography from '@mui/material/Typography';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const Timer = React.memo(({ reset }: { reset: boolean }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0);
    }
  }, [reset]);

  useEffect(() => {
    const timer = time >= 0 && setTimeout(() => setTime(time + 1000), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [time]);

  return <TypographyBold variant="body2">{`${moment.duration(time, 'millisecond').humanize()} ago`}</TypographyBold>;
});

export default Timer;
