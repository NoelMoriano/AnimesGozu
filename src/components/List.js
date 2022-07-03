export const List = (props) => {
    return <ul>
        {
            props.listMenu.map((item, index)=> <li key={index + 1}>{index + 1 + item}</li>)
        }
    </ul>
}