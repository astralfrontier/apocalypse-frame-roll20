on('change:frame_model', (event) => {
  const frame = variables.frames.find(
    (frame: any) => frame.frame_model == event.newValue
  )
  if (frame) {
    setAttrs(frame)
  }
  getAttrs(
    [
      'attr_arm1_damage',
      'attr_arm2_damage',
      'attr_arm1b_damage',
      'attr_arm2b_damage',
      'attr_system_signature_damage',
      'attr_system_modular_1_damage',
      'attr_system_modular_2_damage',
    ],
    (v) => {
      let defaults: AttributeBundle = {
        arm1_damage: '0',
        arm1b_damage: '3',
        arm2_damage: '0',
        arm2b_damage: '3',
        system_signature_damage: '0',
        system_modular_1_damage: '0',
        system_modular_2_damage: '0',
      }
      for (let key of Object.keys(defaults)) {
        if (v[key]) {
          delete defaults[key]
        }
      }
      setAttrs(defaults)
    }
  )
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
