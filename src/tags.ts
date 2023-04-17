on('change:arm1_tags change:arm2_tags change:arm1b_tags change:arm2b_tags change:system_signature_tags change:system_modular_1_tags change:system_modular_2_tags', (event) => {
    let slot = (event.sourceAttribute || '')
    getAttrs([`${slot}`], values => {
      let tags = values[slot]
      let slotName = slot + "_max"
      let cleanTag = tags.replace(/[\W_]+/g," ").replace("Spin Up", "SpinUp")
      const out: any = {}
      out[slotName] = cleanTag
      setAttrs(out)
    })
  }
)
