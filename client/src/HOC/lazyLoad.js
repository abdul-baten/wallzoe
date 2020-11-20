import React, { Component } from 'react'

const lazyLoad = importComponent => {
  return class extends Component {
    state = {
      component: null
    }

    async componentDidMount() {
      importComponent().then(async cmp => {
        const component = await importComponent()
        this.setState({ component: component.default })
      })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }
}

export default lazyLoad
