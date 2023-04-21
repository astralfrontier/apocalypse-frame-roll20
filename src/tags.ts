const tagSystems = [
  'arm1',
  'arm2',
  'arm1b',
  'arm2b',
  'system_signature',
  'system_modular_1',
  'system_modular_2',
]
  .map((tagSystem) => `change:${tagSystem}_range change:${tagSystem}_tags`)
  .join(' ')

on(tagSystems, (event) => {
  let slot = (event.sourceAttribute || '').replace(/_(range|tags)$/, '')
  getAttrs([`${slot}_range`, `${slot}_tags`], (values) => {
    let tags = `${values[`${slot}_range`]} ${values[`${slot}_tags`]}`
    let cleanTag = tags.replace(/[\W_]+/g, ' ').replace('Spin Up', 'SpinUp')
    const out: any = {}
    let tooltip = `${slot}_tooltip`
    out[tooltip] = cleanTag
    console.dir({ tags, cleanTag, out })
    setAttrs(out)
  })
})
