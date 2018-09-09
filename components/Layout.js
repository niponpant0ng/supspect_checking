import Header from "./Header"

const layoutStyle = {
  margin: 10,
}

export default (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)