// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
import { Body, Controller, Get, Post, Query, Route, Tags } from 'tsoa';

import Contracts from './common/Contracts';

import SwapInfo from './swap/SwapInfo';
import SwapTokensList from './swap/SwapTokensList';
import SwapParameters from './swap/SwapParameters';
import SwapTargets from './swap/SwapTargets';

/**
 * THIS IS WORK IN PROGRESS AND SUBJECT TO CHANGE!
 */

@Tags('Blockchain')
@Route('blockchain')
export class BlockchainController extends Controller {
  /**
   * Fetch all contracts needed by the application
   */
  @Get('contracts')
  // eslint-disable-next-line class-methods-use-this
  public async getContracts(): Promise<Contracts> {
    return new Promise<Contracts>(() => {
      throw new Error('Just API Schema');
    });
  }
}

@Tags('Swap Page')
@Route('swap')
export class SwapController extends Controller {
  /**
   * Fetch parameters to use as swap settings modal
   */
  @Get('parameters')
  // eslint-disable-next-line class-methods-use-this
  public async getParameters(): Promise<SwapParameters> {
    return new Promise<SwapParameters>(() => {
      throw new Error('Just API Schema');
    });
  }

  /**
   * Fetch options to use as swap selectable tokens
   */
  @Get('tokensList')
  // eslint-disable-next-line class-methods-use-this
  public async getTokensList(): Promise<SwapTokensList> {
    return new Promise<SwapTokensList>(() => {
      throw new Error('Just API Schema');
    });
  }

  /**
   * Get information about current swap configuration
   * @param requestBody current swap configuration
   */
  @Post('info')
  // eslint-disable-next-line class-methods-use-this
  public async postInfo(@Body() requestBody: SwapTargets): Promise<SwapInfo> {
    return new Promise<SwapInfo>(() => {
      throw new Error('Just API Schema');
    });
  }
}
