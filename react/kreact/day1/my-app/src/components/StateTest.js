import React, {Component} from 'react';

class StateTest extends Component {
    state = {
        counter: 1
    };
    componentDidMount() {
        // 不要直接修改状态值
        // this.state.counter += 1;

        // 批量执行 counter 2
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })

        // 函数式写法，新值依赖旧值
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        });
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        });
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        });
        // 等同于
        this.setState(prevState => ({
            counter: prevState.counter + 1
        }))
    }

    render() {
        return (
            <div>
                {this.state.counter}
            </div>
        );
    }
}

export default StateTest;