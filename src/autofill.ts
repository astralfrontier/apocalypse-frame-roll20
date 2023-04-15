on('change:frame_model', (event) => {
  const frame = variables.frames.find(
    (frame: any) => frame.frame_model == event.newValue
  )
  if (frame) {
    setAttrs(frame)
  }
})

on('change:system_modular_1_name change:system_modular_2_name', (event) => {
  const slot = (event.sourceAttribute || '').replace(/_name$/, '')
  const system = variables.systems.find(
    (system: any) => system.slot_name == event.newValue
  )
  if (system) {
    const O: any = {}
    for (let key in system) {
      O[`${key.replace('slot', slot)}`] = system[key]
    }
    setAttrs(O)
  }
})

on(
  'change:arm1_name change:arm2_name change:arm1b_name change:arm2b_name',
  (event) => {
    const slot = (event.sourceAttribute || '').replace(/_name$/, '')
    const armament = variables.armaments.find(
      (arm: any) => arm.slot_name == event.newValue
    )
    if (armament) {
      const O: any = {}
      for (let key in armament) {
        O[`${key.replace('slot', slot)}`] = armament[key]
      }
      setAttrs(O)
    }
  }
)
