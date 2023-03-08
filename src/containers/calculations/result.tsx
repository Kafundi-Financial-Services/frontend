import { Card } from 'antd'
import React, { Component } from 'react'

class App extends Component<{result: any}> {
    constructor(props: any) {
        super(props)
        // this.state = {result: this.props.result}
    }

    render() {
        return (
            <div className="site-card-border-less-wrapper">
                {/* <Card bordered={false} style={{ width: 300 }}> */}
                <p>Result:</p>
                <p>{this.props.result.result}</p>

                {/* </Card> */}
            </div>
        )
    }
}

export default App
