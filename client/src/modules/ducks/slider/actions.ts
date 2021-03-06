import { createAction } from 'modules/utils'
import { ActionsUnion } from 'modules/utils/types'
import { Texture } from 'three'
import * as types from './types'

// export const updateCurrentSlide = (current: number) =>
//   createAction(types.UPDATE_CURRENT_SLIDE, current)

// export const userLoginSuccess = user => ({
//   payload: {
//     user
//   },
//   type: types.USER_LOGIN_SUCCESS
// })

// export const userLoginFail = error => ({
//   payload: {
//     error
//   },
//   type: types.USER_LOGIN_FAIL
// })

export const Actions = {
  loadTextures: (textures: Texture[]) =>
    createAction(types.LOAD_TEXTURES, { textures }),
  resetSlider: () => createAction(types.RESET_SLIDER),
  toggleSliderMoving: (toggle: boolean) =>
    createAction(types.TOGGLE_SLIDER_MOVING, { toggle }),
  updateCurrentSlide: (current: number) =>
    createAction(types.UPDATE_CURRENT_SLIDE, { current }),
  updatePercentTraveled: (percentTraveled: number) =>
    createAction(types.UPDATE_PERCENT_TRAVELED, { percentTraveled })
}

export type Actions = ActionsUnion<typeof Actions>
