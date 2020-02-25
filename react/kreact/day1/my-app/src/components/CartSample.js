import React, {Component} from 'react';

export default class CartSample extends Component {
    // 状态的初始化一般放在构造器中
    constructor(props) {
        super(props);
        this.state = {
            goods: [
                { id: 1, text: "web全栈架构师" },
                { id: 2, text: "python工程师" },
            ],
            text: "",
            cart: []
        };
        this.addGood = this.addGood.bind(this);
    }
    // 回调函数声明为箭头函数,不用手动绑定this
    textChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    // 加购函数
    addToCart = (good) => {
        // 创建新购物车
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex( c => c.id === good.id);
        const item = newCart[idx];
        if(item) {
            newCart.splice(idx, 1, { ...item, count: item.count + 1})
        }else {
            newCart.push({...good, count: 1})
        }
        // 更新
        this.setState({cart: newCart})
    }

    add = (good) => {
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex( c => c.id === good.id);
        const item = newCart[idx];
        if(item) {
            newCart.splice(idx, 1, { ...item, count: item.count + 1})
        }
        // 更新
        this.setState({cart: newCart})
    }

    minus = (good) => {
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex( c => c.id === good.id);
        const item = newCart[idx];
        if(item) {
            newCart.splice(idx, 1, { ...item, count: item.count - 1})
        }
        // 更新
        this.setState({cart: newCart})
    }


    addGood() {
        // this.setState(prevState => {
        //     prevState.goods.push({id: prevState.goods.length + 1, text: prevState.text})
        // })
        this.setState(prevState => {
            return {
                goods: [...prevState.goods, {id: prevState.goods.length + 1, text: prevState.text}]
            }
        })
    }
    render() {
        // const title = this.props.title ? <h1>{this.props.title}</h1> : null;
        return (
            <div>
                {/*{title}*/}
                {/*条件渲染*/}
                {this.props.title && <h1>{this.props.title}</h1>}

                {/*列表渲染*/}
                <div>
                    <input type="text" value={this.state.text} onChange={this.textChange} />
                    <button onClick={this.addGood}>添加商品</button>
                </div>
                <ul>
                    {this.state.goods.map(good =>( <li key={good.id}>{good.text} <button onClick={() =>this.addToCart(good)}>添加到购物车</button></li>))}
                </ul>

                {/*购物车*/}
                <Cart data={this.state.cart} minus={this.minus} add={this.add}></Cart>
            </div>
        );
    }
}

function Cart({data, minus, add}) {
    return (
        <table>
            <tbody>
            {data.map(d => ( <tr key={d.id}>
                <td>{d.text}</td>
                <td>
                    <button onClick={() => minus(d)}>-</button>
                    {d.count}
                    <button onClick={() => add(d)}>+</button>
                </td>
            </tr>))}
            </tbody>
        </table>
    )
}
