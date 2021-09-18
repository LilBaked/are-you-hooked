function ChangeSalary(props) {
    return(
        <button onClick= {props.click } symbol={props.symbol}>{props.children}</button>
    )
}
export default ChangeSalary;