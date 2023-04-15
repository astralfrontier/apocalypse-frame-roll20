/// <reference path="sheet.d.ts" />

// Documentation: https://wiki.roll20.net/Sheet_Worker_Scripts

function recalculateTrackerValues(event: Roll20Event) {
  if (event.sourceType == 'player') {
    const [attr, _box, slot] = (event.sourceAttribute || 'foo_bar_1').split('_')
    const newValue =
      event.newValue == 'on' ? parseInt(slot) : parseInt(slot) - 1
    const O: any = {}
    for (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
      O[`${attr}_box_${i}`] = i > newValue ? '0' : 'on'
    }
    O[attr] = newValue
    setAttrs(O)
  }
}

function recalculateTrackerMaximums(event: Roll20Event) {
  getAttrs(
    ['drive', 'speed', 'control', 'vigor_base', 'tension_base', 'fuel_base'],
    (v) => {
      const O: any = {}
      O['vigor_max'] =
        (parseInt(v['drive']) || 0) + (parseInt(v['vigor_base']) || 0)
      O['tension_max'] =
        (parseInt(v['speed']) || 0) + (parseInt(v['tension_base']) || 0)
      O['fuel_max'] =
        (parseInt(v['control']) || 0) + (parseInt(v['fuel_base']) || 0)
      setAttrs(O)
    }
  )
}

for (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
  on(
    `change:vigor_box_${i} change:tension_box_${i} change:fuel_box_${i}`,
    recalculateTrackerValues
  )
}

/**
 * Recalculate maximum values
 */
on(
  'change:drive change:speed change:control change:vigor_base change:tension_base change:fuel_base',
  recalculateTrackerMaximums
)
