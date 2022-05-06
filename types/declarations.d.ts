import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { State } from './redux/store';
import { Apollo } from './config/apollo';

declare module '@reduxjs/toolkit' {
  type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
  };

  function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {
      state: State; // this line makes a difference
      extra: {
        apollo: Apollo;
      };
    },
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
    options?: any,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
