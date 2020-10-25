import blockConf from '../../confs/block-conf'
import { customAnimation } from '../../libs/animation'

export default class BaseBlock {
  constructor(type) {
    this.type = type // cuboid | cylinder 长方体或者圆柱体
    this.height = blockConf.height
    this.width = blockConf.width
    this.status = 'stop'
    this.scale = 1
  }
  update () {
    if (this.status == 'shrink') {
      this._shrink()
    }
  }

  shrink () {
    this.status = 'shrink'
  }

  _shrink () {
    const DELTA_SCALE = 0.005
    const MIN_SCALE = 0.55
    this.scale -= DELTA_SCALE
    this.scale = Math.max(MIN_SCALE, this.scale)
    if (this.scale <= MIN_SCALE) {
      return
    }
    this.instance.scale.y = this.scale
    const deltaY = this.height * DELTA_SCALE / 2
    this.instance.position.y -= deltaY
  }
  rebound () {
    this.status = 'stop'
    this.scale = 1
    customAnimation.to(0.5, this.instance.scale, {y : 1}, 'Elastic.easeOut')
    customAnimation.to(0.5, this.instance.position, {y : 0}, 'Elastic.easeOut')
  }
}