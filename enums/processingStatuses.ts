import { LoaderStatus } from 'components/DAOCircleLoader/DAOCircleLoader';

// eslint-disable-next-line @typescript-eslint/naming-convention
enum PROCESSING_STATUSES {
  PROCESSING = 'processing',
  ERROR = 'error',
  SUCCESS = 'success',
  IDLE = 'idle',
}

export const mapToLoader = (status?: PROCESSING_STATUSES): LoaderStatus => {
  switch (status) {
    case PROCESSING_STATUSES.SUCCESS:
      return 'success';
    case PROCESSING_STATUSES.ERROR:
      return 'error';
    default:
      return 'loading';
  }
};

export default PROCESSING_STATUSES;
